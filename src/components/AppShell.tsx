import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { 
  Home, Dumbbell, Apple, Moon, User, Bell, Search, 
  ChevronLeft, ChevronRight, X, Sparkles, Check, CheckSquare, Settings, Activity, Heart, TrendingUp, Users
} from "lucide-react";
// Plus removed — header quick-add disabled per user request
import { useEffect, useState, type ReactNode } from "react";
import { auth, db, Profile, AppNotification, isRealSupabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const tabs = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/nutrition", label: "Fuel", icon: Apple },
  { to: "/sleep", label: "Sleep", icon: Moon },
  { to: "/health", label: "Health", icon: Heart },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/community", label: "Community", icon: Users },
  { to: "/coach", label: "AI Coach", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
  hideHeader = false,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  hideHeader?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  
  const applyTheme = (nextTheme: "light" | "dark") => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
  };

  // Theme state
  const [theme, setThemeState] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = window.localStorage.getItem("zenvita-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("zenvita-theme", newTheme);
    }
    applyTheme(newTheme);
  };
  
  // Auth state
  const [loadingSession, setLoadingSession] = useState(true);
  const [session, setSession] = useState<any>(null);
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    workouts: any[];
    meals: any[];
    settings: any[];
    meds: any[];
  }>({ workouts: [], meals: [], settings: [], meds: [] });

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // 1. Session and Auth Check
  useEffect(() => {
    let mounted = true;
    
    const checkSession = async () => {
      const { data } = await auth.getSession();
      if (mounted) {
        if (!data.session) {
          navigate({ to: "/auth/login" });
        } else {
          setSession(data.session);
          loadNotifications(data.session.user.id);
        }
        setLoadingSession(false);
      }
    };

    checkSession();

    const { data: authListener } = auth.onAuthStateChange((event, sessionData) => {
      if (mounted) {
        if (!sessionData) {
          navigate({ to: "/auth/login" });
        } else {
          setSession(sessionData);
          loadNotifications(sessionData.user.id);
        }
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  // Global quick-add opener
  // quick-add removed — no global listener

  const loadNotifications = async (userId: string) => {
    const list = await db.getNotifications(userId);
    setNotifications(list);
  };

  const handleMarkAsRead = async (notifId: string) => {
    await db.markNotificationRead(notifId);
    if (session?.user?.id) {
      loadNotifications(session.user.id);
    }
  };

  // 2. Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ workouts: [], meals: [], settings: [], meds: [] });
      return;
    }

    const q = searchQuery.toLowerCase();
    
    // Search mock data
    const workouts = [
      { id: "upper-body-burn", name: "Upper Body Burn", type: "Strength", minutes: 32 },
      { id: "hiit-inferno", name: "HIIT Inferno", type: "Cardio", minutes: 20 },
      { id: "morning-mobility", name: "Morning Mobility", type: "Flexibility", minutes: 15 },
      { id: "leg-day-power", name: "Leg Day Power", type: "Strength", minutes: 45 },
      { id: "core-crusher", name: "Core Crusher", type: "Core", minutes: 18 },
      { id: "zen-yoga-flow", name: "Zen Yoga Flow", type: "Yoga", minutes: 28 },
    ].filter((w) => w.name.toLowerCase().includes(q) || w.type.toLowerCase().includes(q));

    const meals = [
      { name: "Oatmeal with berries", type: "Breakfast", kcal: 420 },
      { name: "Grilled chicken bowl", type: "Lunch", kcal: 580 },
      { name: "Greek yogurt", type: "Snack", kcal: 220 },
      { name: "Salmon & quinoa", type: "Dinner", kcal: 620 },
    ].filter((m) => m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q));

    const settings = [
      { name: "Health Profile", label: "Edit height, weight, goals" },
      { name: "Notifications Settings", label: "Configure push & email logs" },
      { name: "Privacy Export", label: "Export data to JSON" },
      { name: "Dark Mode Toggles", label: "Light / Dark switch" },
    ].filter((s) => s.name.toLowerCase().includes(q) || s.label.toLowerCase().includes(q));

    const meds = [
      { name: "Magnesium", time: "9:30 PM", purpose: "Muscle & Sleep Recovery" },
      { name: "Multivitamin", time: "8:00 AM", purpose: "General Wellness" },
      { name: "Vitamin D3", time: "8:00 AM", purpose: "Bone & Immune Support" },
    ].filter((m) => m.name.toLowerCase().includes(q) || m.purpose.toLowerCase().includes(q));

    setSearchResults({ workouts, meals, settings, meds });
  }, [searchQuery]);

  // Loading Screen
  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center">
        <motion.div 
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-[Instrument_Serif] text-3xl text-white tracking-widest"
        >
          Zenvita
        </motion.div>
        <div className="h-1 w-24 bg-white/10 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-gradient-brand w-1/2 rounded-full animate-pulse-glow" style={{ animationDuration: '1.5s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ink)] text-foreground flex transition-colors duration-300">
      {/* BACKGROUND AMBIENT GLOWS */}
      <div 
        className="pointer-events-none fixed inset-x-0 top-0 h-[450px] -z-0 transition-opacity duration-300 dark:opacity-100 opacity-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,93,47,0.2), transparent 70%)" }} 
      />
      <div 
        className="pointer-events-none fixed inset-x-0 bottom-0 h-[300px] -z-0 transition-opacity duration-300 dark:opacity-100 opacity-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(232,93,47,0.08), transparent 70%)" }} 
      />

      {/* 1. DESKTOP SIDEBAR NAVIGATION (>= 1024px) */}
      <aside 
        className={`hidden lg:flex flex-col border-r border-[var(--glass-border)] bg-[var(--sidebar-bg)] backdrop-blur-xl transition-all duration-300 z-30 sticky top-0 h-screen ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarCollapsed ? (
            <Activity className="h-6 w-6 text-[var(--brand)] mx-auto animate-pulse" />
          ) : (
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-[var(--brand)] animate-pulse" />
              <span className="font-[Instrument_Serif] text-2xl text-[var(--brand)] tracking-wider font-bold">Zenvita</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg glass text-muted-foreground hover:text-white mx-auto transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Sidebar Nav Tabs */}
        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {tabs.map((t) => {
            const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all relative ${
                  active 
                    ? "text-white font-medium bg-gradient-brand shadow-glow" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">{t.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Account details */}
        <div className="p-4 border-t border-[var(--glass-border)] transition-colors duration-300">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 p-2 bg-[var(--glass-bg)] rounded-2xl border border-[var(--glass-border)]">
              <div className="h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-white text-sm font-semibold">
                {session?.profile?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate">{session?.profile?.name || "User"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{session?.user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-white text-sm font-semibold">
              {session?.profile?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TABLET TOP NAV HEADER (768px - 1023px) */}
        <header className="hidden md:flex lg:hidden sticky top-0 z-30 border-b border-[var(--glass-border)] bg-[var(--sidebar-bg)] backdrop-blur-xl px-6 py-4 items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[var(--brand)] animate-pulse" />
            <span className="font-[Instrument_Serif] text-2xl text-[var(--brand)] font-bold">Zenvita</span>
          </div>
          <nav className="flex items-center gap-2">
            {tabs.map((t) => {
              const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
              const Icon = t.icon;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active 
                      ? "text-white bg-gradient-brand shadow-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-[var(--glass-bg)]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{t.label}</span>
                </Link>
              );
            })}
          </nav>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 relative z-10 w-full mx-auto max-w-[520px] md:max-w-[760px] lg:max-w-[1000px] px-4 md:px-8 pb-28 lg:pb-10 pt-6">
          
          {/* Default header for mobile & tablet (if not hidden) */}
          {!hideHeader && (
            <header className="flex items-center justify-between mb-8">
              <div>
                {subtitle && <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-0.5">{subtitle}</p>}
                <h1 className="font-[Instrument_Serif] text-4xl text-foreground leading-none">{title}</h1>
              </div>
              
              {/* Header Action Buttons */}
              <div className="flex items-center gap-2.5">
                <ThemeSwitcher theme={theme} setTheme={setTheme} />
                
                <button 
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search" 
                  className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5 active:scale-95 transition-all text-foreground"
                >
                  <Search className="h-4.5 w-4.5" />
                </button>
                
                <button 
                  onClick={() => setNotificationsOpen(true)}
                  aria-label="Notifications" 
                  className="relative grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5 active:scale-95 transition-all text-foreground"
                >
                  <Bell className="h-4.5 w-4.5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--brand)] shadow-glow animate-pulse" />
                  )}
                </button>
                
                {/* global quick-add removed; use page-specific + (e.g. Sleep card) instead */}
              </div>
            </header>
          )}

          {children}
        </main>
      </div>

      {/* 3. MOBILE BOTTOM TAB NAVIGATION (< 768px) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 px-4 md:hidden bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="mx-auto max-w-[480px] glass-strong rounded-2xl px-2 py-2 flex items-center justify-between relative shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
          {tabs.map((t) => {
            const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="relative flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-xl flex-1 transition-all"
              >
                {active && (
                  <motion.span 
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl bg-gradient-brand shadow-glow" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`relative h-5 w-5 transition-colors duration-200 ${active ? "text-white" : "text-muted-foreground"}`} />
                <span className={`relative text-[9px] uppercase tracking-wider font-semibold ${active ? "text-white" : "text-muted-foreground"}`}>
                  {t.label}
                </span>
              </Link>
            );
          })}
          
          {/* mobile quick-add removed */}
        </div>
      </nav>
      

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[550px] bg-[var(--modal-bg)] border border-[var(--glass-border)] rounded-3xl p-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] transition-colors duration-300 z-10"
            >
              <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search workouts, meals, sleep logs, medications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none py-1.5"
                  />
                </div>
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-full hover:bg-[var(--glass-bg-hover)] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[350px] overflow-y-auto mt-4 pr-1 space-y-4">
                {searchQuery ? (
                  <>
                    {/* Workouts */}
                    {searchResults.workouts.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Workouts</h4>
                        <div className="space-y-1.5">
                          {searchResults.workouts.map((w) => (
                            <Link 
                              key={w.id} 
                              to="/workouts/$id" 
                              params={{ id: w.id }}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center justify-between p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] transition-all text-left"
                            >
                              <div>
                                <p className="text-xs font-semibold text-foreground">{w.name}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{w.type} · {w.minutes} mins</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Meals */}
                    {searchResults.meals.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Meals Logged</h4>
                        <div className="space-y-1.5">
                          {searchResults.meals.map((m, i) => (
                            <Link 
                              key={i} 
                              to="/nutrition"
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center justify-between p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] transition-all text-left"
                            >
                              <div>
                                <p className="text-xs font-semibold text-foreground">{m.name}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{m.type} · {m.kcal} kcal</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Medications */}
                    {searchResults.meds.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Medications & Reminders</h4>
                        <div className="space-y-1.5">
                          {searchResults.meds.map((m, i) => (
                            <div key={i} className="p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] flex items-center justify-between border border-[var(--glass-border)]">
                              <div>
                                <p className="text-xs font-semibold text-foreground">{m.name}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{m.purpose} · scheduled {m.time}</p>
                              </div>
                              <span className="text-[9px] uppercase font-semibold text-[var(--brand)] bg-[var(--brand)]/10 px-2 py-0.5 rounded-full">active</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Settings */}
                    {searchResults.settings.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Settings & Profile</h4>
                        <div className="space-y-1.5">
                          {searchResults.settings.map((s, i) => (
                            <Link 
                              key={i} 
                              to="/profile"
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center justify-between p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] transition-all text-left"
                            >
                              <div>
                                <p className="text-xs font-semibold text-foreground">{s.name}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.workouts.length === 0 && 
                     searchResults.meals.length === 0 && 
                     searchResults.settings.length === 0 && 
                     searchResults.meds.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-xs text-muted-foreground">No results found for "{searchQuery}"</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-3 py-4">
                    <p className="text-xs text-muted-foreground mb-1.5">Try searching for:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Yoga", "HIIT", "Oats", "Magnesium", "Reset password", "Streak"].map((kw) => (
                        <button
                          key={kw}
                          onClick={() => setSearchQuery(kw)}
                          className="text-xs px-3.5 py-2 rounded-full border border-[var(--glass-border)] glass hover:bg-[var(--glass-bg-hover)] text-foreground transition-all"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NOTIFICATION CENTER DIALOG */}
      <AnimatePresence>
        {notificationsOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotificationsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[380px] h-[calc(100vh-32px)] md:h-[calc(100vh-48px)] bg-[var(--modal-bg)] border border-[var(--glass-border)] rounded-3xl p-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col transition-colors duration-300 z-10"
            >
              <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3.5">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[var(--brand)]" />
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold text-white bg-[var(--brand)] rounded-full px-2 py-0.5">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 rounded-full hover:bg-[var(--glass-bg-hover)] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Notification List */}
              <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => !n.read && handleMarkAsRead(n.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        n.read 
                          ? "bg-[var(--glass-bg)] border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)]" 
                          : "bg-[var(--brand)]/[0.04] border-[var(--brand)]/15 hover:bg-[var(--brand)]/[0.06] relative"
                      }`}
                    >
                      {!n.read && (
                        <span className="absolute top-3.5 right-3.5 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                      )}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                          {n.type}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[var(--glass-border)]" />
                        <span className="text-[9px] text-muted-foreground">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{n.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-normal">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-12">
                    <Sparkles className="h-8 w-8 text-muted-foreground/20 mb-2" />
                    <p className="text-xs">All caught up!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function StatCard({
  label, value, unit, icon: Icon, accent = false,
}: { label: string; value: string | number; unit?: string; icon: React.ComponentType<{ className?: string }>; accent?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      className={`relative overflow-hidden rounded-2xl p-4 border transition-all ${
        accent 
          ? "bg-gradient-brand text-white border-transparent shadow-glow" 
          : "glass border-border shadow-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs ${accent ? "text-white/80" : "text-muted-foreground"}`}>{label}</span>
        <Icon className={`h-4.5 w-4.5 ${accent ? "text-white" : "text-[var(--brand)]"}`} />
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-semibold">{value}</span>
        {unit && <span className={`text-xs ${accent ? "text-white/80" : "text-muted-foreground"}`}>{unit}</span>}
      </div>
    </motion.div>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3.5">
      <h2 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">{title}</h2>
      {action}
    </div>
  );
}