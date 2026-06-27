import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  User, Shield, Bell, Settings as SettingsIcon, LogOut, Trash2, Download, 
  Check, Globe, HelpCircle, UserCheck, Heart, Info
} from "lucide-react";
import { AppShell, SectionHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db, Profile } from "@/lib/supabase";
import { getSafeDocument, getSafeLocalStorage, getSafeWindow } from "@/lib/browser-safe";
import { motion } from "framer-motion";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Zenvita — Settings" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "health" | "notifications" | "privacy" | "preferences">("profile");

  // Health Profile Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState("Not specified");
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
  const [isSaved, setIsSaved] = useState(false);

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
        setGender(prof.gender || "Not specified");
        setActivityLevel(prof.activityLevel || "moderate");
        setFitnessGoal(prof.fitnessGoal || "improve_fitness");
        
        const storage = getSafeLocalStorage();
        const savedUnits = storage?.getItem("zenvita_pref_units") || "Metric";
        setUnits(savedUnits);
        const savedLanguage = storage?.getItem("zenvita_pref_language") || "English";
        setLanguage(savedLanguage);
        const currentTheme = storage?.getItem("zenvita-theme") || "dark";
        setDarkMode(currentTheme === "dark");
      }
    };

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    navigate({ to: "/auth/login" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !userId) return;

    const updated = await db.updateProfile(userId, {
      name,
      age,
      height,
      weight,
      gender,
      activityLevel,
      fitnessGoal,
    });

    if (updated) {
      setProfile(updated as any);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleUpdatePreference = (key: string, val: string) => {
    if (key === "units") {
      setUnits(val);
      const storage = getSafeLocalStorage();
      storage?.setItem("zenvita_pref_units", val);
    } else if (key === "language") {
      setLanguage(val);
      const storage = getSafeLocalStorage();
      storage?.setItem("zenvita_pref_language", val);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleToggleTheme = (isDark: boolean) => {
    setDarkMode(isDark);
    const themeName = isDark ? "dark" : "light";
    const storage = getSafeLocalStorage();
    const doc = getSafeDocument();
    storage?.setItem("zenvita-theme", themeName);
    doc?.documentElement.classList.remove("light", "dark");
    doc?.documentElement.classList.add(themeName);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportData = () => {
    const storage = getSafeLocalStorage();
    const data: Record<string, string | null> = {};
    if (storage) {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.startsWith("zenvita_")) {
          data[key] = storage.getItem(key);
        }
      }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const doc = getSafeDocument();
    const a = doc?.createElement("a");
    a.href = url;
    a.download = `zenvita_health_data_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const handleDownloadReport = () => {
    const reportText = `
=========================================
ZENVITA HEALTH & WELLNESS SUMMARY REPORT
Generated on: ${new Date().toLocaleDateString()}
=========================================

User Profile:
- Name: ${profile?.name}
- Email: ${profile?.email}
- Age: ${profile?.age} yrs
- Gender: ${gender}
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
    const doc = getSafeDocument();
    const a = doc?.createElement("a");
    a.href = url;
    a.download = `zenvita_health_report_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you absolutely certain you want to delete your Zenvita account? This clears all local records and cannot be undone.")) {
      const storage = getSafeLocalStorage();
      storage?.clear();
      const win = getSafeWindow();
      if (win) win.location.href = "/auth/signup";
    }
  };

  const menuItems = [
    { id: "profile" as const, icon: User, label: "Profile Settings", desc: "Manage name, avatar, and goals" },
    { id: "health" as const, icon: Heart, label: "Health Profile", desc: "Age, gender, weight, and height" },
    { id: "notifications" as const, icon: Bell, label: "Notifications", desc: "Push & email alerts" },
    { id: "preferences" as const, icon: SettingsIcon, label: "Preferences", desc: "Theme, units & language options" },
    { id: "privacy" as const, icon: Shield, label: "Privacy & Data", desc: "Export records & account controls" },
  ];

  const inputClass = "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)] transition-colors";
  const selectClass = `${inputClass} [&>option]:bg-card`;

  return (
    <AppShell subtitle="Configure your experience" title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
        {/* Navigation Sidebar (3 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="rounded-2xl glass p-1 border border-border flex flex-col space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive 
                      ? "text-white font-medium bg-gradient-brand shadow-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">{item.label}</p>
                    <p className={`text-[9px] truncate ${isActive ? "text-white/80" : "text-muted-foreground"}`}>{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <button 
            onClick={handleSignOut}
            className="w-full rounded-2xl glass p-3 text-xs font-semibold flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground border border-border hover:bg-muted active:scale-98 transition-all cursor-pointer mt-4"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        {/* Configurations Content Pane (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl glass-strong p-6 border border-border shadow-card relative overflow-hidden">
            {/* Ambient indicator */}
            <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-brand opacity-20 blur-2xl pointer-events-none" />

            {/* Title */}
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3.5 mb-5 flex items-center gap-2">
              {activeTab === "profile" && <User className="h-4.5 w-4.5 text-[var(--brand)]" />}
              {activeTab === "health" && <Heart className="h-4.5 w-4.5 text-[var(--brand)]" />}
              {activeTab === "notifications" && <Bell className="h-4.5 w-4.5 text-[var(--brand)]" />}
              {activeTab === "preferences" && <SettingsIcon className="h-4.5 w-4.5 text-[var(--brand)]" />}
              {activeTab === "privacy" && <Shield className="h-4.5 w-4.5 text-[var(--brand)]" />}
              {menuItems.find((it) => it.id === activeTab)?.label}
            </h3>

            {/* Success notification */}
            {isSaved && (
              <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-[11px] text-emerald-400 flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>Changes auto-saved successfully!</span>
              </div>
            )}

            {/* profile settings form */}
            {activeTab === "profile" && (
              <form onSubmit={handleSave} className="space-y-4.5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Email (Primary ID)</label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email || ""}
                    className="w-full bg-muted border border-border opacity-70 rounded-xl py-2.5 px-3.5 text-xs text-muted-foreground focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1.5"><Info className="h-3 w-3" /> Email address cannot be changed.</p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Fitness Goal</label>
                  <select
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value as any)}
                    className={selectClass}
                  >
                    <option value="improve_fitness">Improve Fitness & Core strength</option>
                    <option value="lose_weight">Lose Weight / Burn Fat</option>
                    <option value="build_muscle">Build Muscle / Gain Strength</option>
                    <option value="maintain">Maintain General Health & Mobility</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Activity Level</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value as any)}
                    className={selectClass}
                  >
                    <option value="sedentary">Sedentary (No physical activity)</option>
                    <option value="light">Lightly Active (1-3 days light exercise/week)</option>
                    <option value="moderate">Moderately Active (3-5 days active workouts/week)</option>
                    <option value="active">Active (6-7 days heavy workouts/week)</option>
                    <option value="very_active">Very Active (Twice daily workouts/athlete)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-brand py-2.5 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow hover:opacity-95 transition-all cursor-pointer mt-6"
                >
                  Save Profile Settings
                </button>
              </form>
            )}

            {/* health profile form */}
            {activeTab === "health" && (
              <form onSubmit={handleSave} className="space-y-4.5">
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Age (Years)</label>
                    <input
                      type="number"
                      required
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={selectClass}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Not specified">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      required
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      required
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-muted border border-border p-4 mt-6">
                  <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5"><UserCheck className="h-4 w-4 text-[var(--brand)]" /> Computed Insights</h4>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    Based on your weight of {weight}kg and height of {height}cm, your Body Mass Index (BMI) is <b>{(weight / Math.pow(height / 100, 2)).toFixed(1)}</b>. 
                    This aligns with your fitness goal of <b>{fitnessGoal?.replace("_", " ")}</b>.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-brand py-2.5 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow hover:opacity-95 transition-all cursor-pointer mt-6"
                >
                  Save Health Profile
                </button>
              </form>
            )}

            {/* notifications preferences */}
            {activeTab === "notifications" && (
              <div className="space-y-4">
                <div className="space-y-3.5">
                  <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Push Notifications</h4>
                  
                  <div className="flex items-center justify-between py-1 border-b border-border pb-2.5">
                    <div>
                      <p className="text-xs text-foreground font-medium">Workouts & Streaks</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Receive reminders to complete workouts and maintain active streaks.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={pushWorkouts}
                      onChange={(e) => { setPushWorkouts(e.target.checked); setIsSaved(true); setTimeout(() => setIsSaved(false), 3000); }}
                      className="accent-[var(--brand)] h-4 w-4 rounded cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-border pb-2.5">
                    <div>
                      <p className="text-xs text-foreground font-medium">Sleep Goal Alerts</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Get notified when it's time to wind down or when sleep target is reached.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={pushSleep}
                      onChange={(e) => { setPushSleep(e.target.checked); setIsSaved(true); setTimeout(() => setIsSaved(false), 3000); }}
                      className="accent-[var(--brand)] h-4 w-4 rounded cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-border pb-2.5">
                    <div>
                      <p className="text-xs text-foreground font-medium">AI Coaching Insights</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Instant alerts from the AI Coach about macro status or exercise guides.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={pushAI}
                      onChange={(e) => { setPushAI(e.target.checked); setIsSaved(true); setTimeout(() => setIsSaved(false), 3000); }}
                      className="accent-[var(--brand)] h-4 w-4 rounded cursor-pointer" 
                    />
                  </div>
                </div>

                <div className="space-y-3.5 pt-3.5">
                  <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Email Subscriptions</h4>
                  
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-xs text-foreground font-medium">Weekly Health Wrap Report</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Complete visual performance summary sent directly to your email.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={emailWeekly}
                      onChange={(e) => { setEmailWeekly(e.target.checked); setIsSaved(true); setTimeout(() => setIsSaved(false), 3000); }}
                      className="accent-[var(--brand)] h-4 w-4 rounded cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* preferences (theme, units, language) */}
            {activeTab === "preferences" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Display Theme</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleToggleTheme(true)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        darkMode ? "bg-gradient-brand text-white border-transparent shadow-glow" : "glass text-muted-foreground hover:text-foreground hover:bg-muted border-border"
                      }`}
                    >
                      Dark Mode (Pulse)
                    </button>
                    <button 
                      onClick={() => handleToggleTheme(false)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        !darkMode ? "bg-gradient-brand text-white border-transparent shadow-glow" : "glass text-muted-foreground hover:text-foreground hover:bg-muted border-border"
                      }`}
                    >
                      Light Mode (Aura)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Unit Preference</label>
                  <div className="flex items-center gap-3">
                    {["Metric", "Imperial"].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => handleUpdatePreference("units", unit)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          units === unit ? "bg-gradient-brand text-white border-transparent shadow-glow" : "glass text-muted-foreground hover:text-foreground hover:bg-muted border-border"
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
                    onChange={(e) => handleUpdatePreference("language", e.target.value)}
                    className={selectClass}
                  >
                    <option value="English">English (US)</option>
                    <option value="Spanish">Español (ES)</option>
                    <option value="French">Français (FR)</option>
                    <option value="German">Deutsch (DE)</option>
                  </select>
                </div>
              </div>
            )}

            {/* privacy and data data-controls */}
            {activeTab === "privacy" && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-normal mb-2">
                  Take control of your Zenvita information. Export your history or permanently clear logs down below.
                </p>

                <button 
                  onClick={handleExportData}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-[var(--brand)]/30 bg-muted hover:bg-muted/80 transition-all text-xs font-semibold text-foreground cursor-pointer"
                >
                  <span className="flex items-center gap-2.5"><Download className="h-4 w-4 text-[var(--brand)]" /> Export Personal Health Data (JSON)</span>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </button>

                <button 
                  onClick={handleDownloadReport}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-[var(--brand)]/30 bg-muted hover:bg-muted/80 transition-all text-xs font-semibold text-foreground cursor-pointer"
                >
                  <span className="flex items-center gap-2.5"><Globe className="h-4 w-4 text-[var(--brand)]" /> Download Performance Report (TXT)</span>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </button>

                <div className="pt-5 mt-2 border-t border-border">
                  <button 
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 text-xs font-semibold text-red-400 transition-all cursor-pointer justify-center"
                  >
                    <Trash2 className="h-4 w-4" /> Delete Account & Local Records
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </AppShell>
  );
}
