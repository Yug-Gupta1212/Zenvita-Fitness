import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  Settings, Award, Bell, HeartPulse, Shield, ChevronRight, LogOut, X,
  User, Check, Download, Trash2, Globe, Eye
} from "lucide-react";
import { AppShell, SectionHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db, Profile } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Zenvita — Profile & Settings" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Health Profile Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [activityLevel, setActivityLevel] = useState<Profile["activityLevel"]>("moderate");
  const [fitnessGoal, setFitnessGoal] = useState<Profile["fitnessGoal"]>("improve_fitness");

  // Notifications Toggles
  const [pushWorkouts, setPushWorkouts] = useState(true);
  const [pushSleep, setPushSleep] = useState(true);
  const [pushAI, setPushAI] = useState(true);
  const [emailWeekly, setEmailWeekly] = useState(true);

  // Preferences
  const [darkMode, setDarkMode] = useState(true);
  const [units, setUnits] = useState("Metric");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await auth.getSession();
      if (data.session) {
        const prof = data.session.profile;
        setProfile(prof);
        setUserId(data.session.user.id);
        
        // Populate inputs
        setName(prof.name || "");
        setAge(prof.age || 25);
        setHeight(prof.height || 170);
        setWeight(prof.weight || 70);
        setActivityLevel(prof.activityLevel || "moderate");
        setFitnessGoal(prof.fitnessGoal || "improve_fitness");
      }
    };

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    navigate({ to: "/auth/login" });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !userId) return;

    const updated = await db.updateProfile(userId, {
      name,
      age,
      height,
      weight,
      activityLevel,
      fitnessGoal,
    });

    if (updated) {
      setProfile(updated as any);
      setActiveModal(null);
    }
  };

  // 1. DATA PRIVACY EXPORT
  const handleExportData = () => {
    const data: Record<string, string | null> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("zenvita_")) {
        data[key] = localStorage.getItem(key);
      }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zenvita_health_data_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  // 2. REPORT GENERATOR
  const handleDownloadReport = () => {
    const reportText = `
=========================================
ZENVITA HEALTH & WELLNESS SUMMARY REPORT
Generated on: ${new Date().toLocaleDateString()}
=========================================

User Profile:
- Name: ${profile?.name}
- Age: ${profile?.age}
- Height: ${profile?.height} cm
- Weight: ${profile?.weight} kg
- Fitness Goal: ${profile?.fitnessGoal?.replace("_", " ")}
- Activity Level: ${profile?.activityLevel}

Streaks & Achievements:
- Current Active Streak: ${profile?.streak} days
- Workouts Logged: ${profile?.workoutsCount} sessions
- Membership Status: Premium Member

Thank you for choosing Zenvita as your AI wellness companion.
=========================================
    `.trim();

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zenvita_health_report_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you absolute certain you want to delete your Zenvita account? This clears all logs.")) {
      localStorage.clear();
      window.location.href = "/auth/signup";
    }
  };

  const stats = [
    { label: "Workouts", value: profile?.workoutsCount || 0 },
    { label: "Streak", value: `${profile?.streak || 0}d` },
    { label: "PRs", value: "9" },
  ];

  const items = [
    { id: "health", icon: HeartPulse, label: "Health profile", desc: "Age, weight, height & goals" },
    { id: "achievements", icon: Award, label: "Achievements", desc: "Earned badges & milestones" },
    { id: "notifications", icon: Bell, label: "Notifications", desc: "Push & email alerts settings" },
    { id: "privacy", icon: Shield, label: "Privacy & data", desc: "Export records & account controls" },
    { id: "preferences", icon: Settings, label: "Preferences", desc: "Theme, units & language options" },
  ];

  // Achievements evaluation
  const badgesList = [
    { name: "First Step", desc: "Log at least 1 workout session", achieved: (profile?.workoutsCount || 0) >= 1 },
    { name: "Consistency Hero", desc: "Maintain a 5-day streak", achieved: (profile?.streak || 0) >= 5 },
    { name: "Iron Master", desc: "Complete 10 strength/cardio routines", achieved: (profile?.workoutsCount || 0) >= 10 },
    { name: "Macro Pioneer", desc: "Track calories & macros properly", achieved: true },
  ];

  return (
    <AppShell subtitle="Account" title="Profile">
      
      {/* Premium Profile Header */}
      <div className="rounded-3xl glass-strong p-6 mb-6 flex items-center gap-4 border border-border shadow-card">
        <div className="h-16 w-16 rounded-full bg-gradient-brand grid place-items-center text-white text-2xl font-[Instrument_Serif] shadow-glow">
          {profile?.name?.[0] || "U"}
        </div>
        <div className="flex-1">
          <p className="font-[Instrument_Serif] text-2xl leading-none text-foreground">{profile?.name || "User"}</p>
          <p className="text-xs text-muted-foreground mt-1.5 font-medium">
            Premium member · Joined {profile?.joinDate || "2026"}
          </p>
        </div>
      </div>

      {/* Profile quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl glass p-4 text-center border border-border shadow-card">
            <p className="font-[Instrument_Serif] text-2xl text-foreground font-bold">{s.value}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1.5 font-bold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Settings list buttons */}
      <SectionHeader title="Settings" />
      <div className="rounded-2xl glass overflow-hidden divide-y divide-border border border-border shadow-card mb-6">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button 
              key={it.id} 
              onClick={() => setActiveModal(it.id)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-[var(--brand)] shadow-inner">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{it.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{it.desc}</p>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      <button 
        onClick={handleSignOut}
        className="w-full rounded-2xl glass p-4 text-xs font-semibold flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50 active:scale-98 transition-all cursor-pointer"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>

      {/* -------------------- SETTINGS DIALOG MODALS -------------------- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {activeModal === "health" && "Health Profile"}
                  {activeModal === "achievements" && "Achievements"}
                  {activeModal === "notifications" && "Notification Preferences"}
                  {activeModal === "privacy" && "Privacy & Data Options"}
                  {activeModal === "preferences" && "App Preferences"}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* HEALTH PROFILE EDITOR */}
              {activeModal === "health" && (
                <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Age</label>
                      <input
                        type="number"
                        required
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Height (cm)</label>
                      <input
                        type="number"
                        required
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        required
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Activity Level</label>
                    <select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value as any)}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none [&>option]:bg-card"
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Lightly Active</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="active">Active</option>
                      <option value="very_active">Very Active</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Fitness Goal</label>
                    <select
                      value={fitnessGoal}
                      onChange={(e) => setFitnessGoal(e.target.value as any)}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none [&>option]:bg-card"
                    >
                      <option value="improve_fitness">Improve Fitness</option>
                      <option value="lose_weight">Lose Weight</option>
                      <option value="build_muscle">Build Muscle</option>
                      <option value="maintain">Maintain Health</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow"
                  >
                    Save Changes
                  </button>
                </form>
              )}

              {/* ACHIEVEMENTS VIEWER */}
              {activeModal === "achievements" && (
                <div className="mt-4 space-y-3.5">
                  {badgesList.map((badge, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all ${
                        badge.achieved 
                          ? "bg-[var(--brand)]/[0.03] border-[var(--brand)]/15" 
                          : "bg-muted/50 border-border opacity-60"
                      }`}
                    >
                      <span className={`grid h-10 w-10 place-items-center rounded-xl shrink-0 ${
                        badge.achieved ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-muted-foreground"
                      }`}>
                        <Award className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          {badge.name}
                          {badge.achieved && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                        </h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* NOTIFICATION PREFERENCES */}
              {activeModal === "notifications" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Push Notifications</h4>
                    
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-foreground font-medium">Workouts & Streaks</span>
                      <input 
                        type="checkbox" 
                        checked={pushWorkouts}
                        onChange={(e) => setPushWorkouts(e.target.checked)}
                        className="accent-[var(--brand)] h-4 w-4 rounded" 
                      />
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-foreground font-medium">Sleep Goal Alerts</span>
                      <input 
                        type="checkbox" 
                        checked={pushSleep}
                        onChange={(e) => setPushSleep(e.target.checked)}
                        className="accent-[var(--brand)] h-4 w-4 rounded" 
                      />
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-foreground font-medium">AI Coaching Insights</span>
                      <input 
                        type="checkbox" 
                        checked={pushAI}
                        onChange={(e) => setPushAI(e.target.checked)}
                        className="accent-[var(--brand)] h-4 w-4 rounded" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-border">
                    <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Email Subscriptions</h4>
                    
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs text-foreground font-medium">Weekly Health Wrap</span>
                      <input 
                        type="checkbox" 
                        checked={emailWeekly}
                        onChange={(e) => setEmailWeekly(e.target.checked)}
                        className="accent-[var(--brand)] h-4 w-4 rounded" 
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white shadow-glow"
                  >
                    Confirm Preferences
                  </button>
                </div>
              )}

              {/* PRIVACY & DATA DATA-CONTROLS */}
              {activeModal === "privacy" && (
                <div className="mt-4 space-y-3">
                  <button 
                    onClick={handleExportData}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-border bg-muted/50 hover:bg-muted transition-all text-xs font-semibold text-foreground cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><Download className="h-4 w-4" /> Export Health Data (JSON)</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <button 
                    onClick={handleDownloadReport}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-border bg-muted/50 hover:bg-muted transition-all text-xs font-semibold text-foreground cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Download Averages Report (TXT)</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <div className="pt-4 mt-2 border-t border-border">
                    <button 
                      onClick={handleDeleteAccount}
                      className="w-full flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/15 text-xs font-semibold text-red-400 transition-all cursor-pointer justify-center"
                    >
                      <Trash2 className="h-4 w-4" /> Delete Account & Local Data
                    </button>
                  </div>
                </div>
              )}

              {/* GENERAL PREFERENCES */}
              {activeModal === "preferences" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Dark Mode</label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setDarkMode(true)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border ${
                          darkMode ? "bg-gradient-brand text-white border-transparent" : "glass text-muted-foreground"
                        }`}
                      >
                        Enabled
                      </button>
                      <button 
                        onClick={() => setDarkMode(false)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border ${
                          !darkMode ? "bg-gradient-brand text-white border-transparent" : "glass text-muted-foreground"
                        }`}
                      >
                        Disabled (System)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Unit Preference</label>
                    <div className="flex items-center gap-4">
                      {["Metric", "Imperial"].map((unit) => (
                        <button
                          key={unit}
                          onClick={() => setUnits(unit)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold border ${
                            units === unit ? "bg-gradient-brand text-white border-transparent" : "glass text-muted-foreground"
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    >
                      <option value="English">English (US)</option>
                      <option value="Spanish">Español (ES)</option>
                      <option value="French">Français (FR)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full mt-2 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white shadow-glow"
                  >
                    Save Preferences
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}