import { createFileRoute } from "@tanstack/react-router";
import { 
  TrendingUp, Award, CheckCircle2, Calendar, Download, 
  Flame, Sparkles, ChevronRight, Zap, Target, Star
} from "lucide-react";
import { AppShell, SectionHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db, Profile, MealLog, SleepLog } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Zenvita — Progress & Analytics" },
    ],
  }),
  component: ProgressPage,
});

interface DayStatus {
  dateStr: string;
  dayLabel: string;
  workout: boolean;
  nutrition: boolean;
  sleep: boolean;
}

function ProgressPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [sleeps, setSleeps] = useState<SleepLog[]>([]);
  const [userId, setUserId] = useState("");

  const getDeterministicValue = (seed: number, min: number, max: number) => min + ((seed * 37 + 11) % (max - min + 1));

  useEffect(() => {
    const loadSessionAndData = async () => {
      const { data } = await auth.getSession();
      if (data.session) {
        setProfile(data.session.profile);
        setUserId(data.session.user.id);

        const mealData = await db.getMeals(data.session.user.id);
        setMeals(mealData);

        const sleepData = await db.getSleepLogs(data.session.user.id);
        setSleeps(sleepData);
      }
    };
    loadSessionAndData();
  }, []);

  // Compute Calories trend
  // Let's generate a beautiful mock comparison of calories burned vs consumed for the last 7 days
  const last7DaysData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    
    // Sum meals on this day
    const dayMeals = meals.filter((m) => m.createdAt.startsWith(dateStr));
    const consumed = dayMeals.length > 0 ? dayMeals.reduce((sum, m) => sum + m.calories, 0) : 1600 + getDeterministicValue(i + 1, 0, 800);
    
    // Burned: default baseline + deterministic offset
    const daySleep = sleeps.find((s) => s.date === dateStr);
    const hasWorkout = i % 2 === 0 || i === 6;
    const burned = hasWorkout ? 2200 + getDeterministicValue(i + 3, 0, 200) : 1800 + getDeterministicValue(i + 7, 0, 150);

    return {
      name: dayName,
      Consumed: consumed,
      Burned: burned
    };
  });

  // Consistency calendar cells (last 21 days)
  const calendarDays: DayStatus[] = Array.from({ length: 21 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (20 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayLabel = date.getDate().toString();

    // Check goals
    const daySleep = sleeps.find((s) => s.date === dateStr);
    const dayMeals = meals.filter((m) => m.createdAt.startsWith(dateStr));
    const totalCal = dayMeals.reduce((sum, m) => sum + m.calories, 0);

    return {
      dateStr,
      dayLabel,
      workout: i % 3 !== 0, // mock workouts
      nutrition: totalCal > 1500 || (i % 2 === 0),
      sleep: daySleep ? daySleep.quality >= 80 : i % 2 !== 0
    };
  });

  // Achievements/Badges
  const badges = [
    { name: "First Step", desc: "Log at least 1 workout session", achieved: (profile?.workoutsCount || 0) >= 1, date: "June 14, 2026" },
    { name: "Consistency Hero", desc: "Maintain a 5-day streak", achieved: (profile?.streak || 0) >= 5, date: "June 18, 2026" },
    { name: "Iron Master", desc: "Complete 10 strength/cardio routines", achieved: (profile?.workoutsCount || 0) >= 10, date: "June 20, 2026" },
    { name: "Macro Pioneer", desc: "Track calories & macros properly", achieved: true, date: "June 15, 2026" },
    { name: "Sleep Champion", desc: "Sleep 8+ hours with 90%+ quality", achieved: sleeps.some((s) => s.quality >= 90), date: "June 19, 2026" },
    { name: "Hydration Master", desc: "Drink 3.0L water in a single day", achieved: true, date: "June 17, 2026" }
  ];

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
    a.download = `zenvita_progress_export_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  return (
    <AppShell subtitle="Analyze health history" title="Progress & Goals">
      {/* Analytics Summary */}
      <div className="rounded-3xl glass-strong p-6 mb-6 relative overflow-hidden border border-border shadow-card">
        <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-brand opacity-20 blur-2xl pointer-events-none" />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Active Streak</p>
            <p className="font-[Instrument_Serif] text-4xl text-foreground mt-1 font-bold">{profile?.streak || 0}d</p>
          </div>
          <div className="border-x border-border">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Total Routines</p>
            <p className="font-[Instrument_Serif] text-4xl text-foreground mt-1 font-bold">{profile?.workoutsCount || 0}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Goal Status</p>
            <p className="font-[Instrument_Serif] text-4xl text-[var(--brand)] mt-1 font-bold">88%</p>
          </div>
        </div>
      </div>

      {/* Energy Balance Chart */}
      <div className="rounded-3xl glass p-5 mb-6 border border-border shadow-card">
        <SectionHeader title="Calorie Balance vs Burned (7 days)" />
        <div className="h-52 w-full mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last7DaysData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7a3d" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#ff7a3d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", color: "var(--foreground)" }}
                labelStyle={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                itemStyle={{ color: "var(--foreground)", fontSize: "12px" }}
              />
              <Area type="monotone" name="Consumed" dataKey="Consumed" stroke="#ff7a3d" strokeWidth={2} fillOpacity={1} fill="url(#colorConsumed)" />
              <Area type="monotone" name="Burned" dataKey="Burned" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorBurned)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Goal Consistency Grid */}
      <div className="rounded-3xl glass p-5 mb-6 border border-border shadow-card">
        <SectionHeader 
          title="Goal Consistency Grid"
          action={
            <div className="flex gap-2 text-[9px] font-semibold">
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-400" />Workout</span>
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-400" />Food</span>
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" />Sleep</span>
            </div>
          }
        />
        <p className="text-[10px] text-muted-foreground mb-4">A visualization of goals completed during your active streak timeline.</p>
        
        <div className="grid grid-cols-7 gap-2.5 max-w-md mx-auto py-2">
          {calendarDays.map((day, idx) => (
            <div 
              key={idx} 
              className="aspect-square rounded-xl bg-muted border border-border flex flex-col items-center justify-between p-1.5 relative overflow-hidden"
            >
              <span className="text-[9px] text-muted-foreground font-semibold self-start">{day.dayLabel}</span>
              <div className="flex gap-0.5 justify-center mt-1">
                {day.workout && <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-glow" />}
                {day.nutrition && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-glow" />}
                {day.sleep && <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-glow" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements / Badges Section */}
      <SectionHeader title="Achievements & Badges" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {badges.map((badge, idx) => (
          <div 
            key={idx}
            className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all ${
              badge.achieved 
                ? "bg-[var(--brand)]/[0.03] border-[var(--brand)]/15" 
                : "bg-muted/50 border-border opacity-50"
            }`}
          >
            <span className={`grid h-11 w-11 place-items-center rounded-xl shrink-0 ${
              badge.achieved ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-muted-foreground"
            }`}>
              {badge.achieved ? <Star className="h-5 w-5 fill-white" /> : <Award className="h-5 w-5" />}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-foreground truncate">{badge.name}</h4>
                {badge.achieved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
              </div>
              <p className="text-[9px] text-muted-foreground truncate mt-0.5">{badge.desc}</p>
              {badge.achieved && <p className="text-[8px] text-[var(--brand)] font-semibold mt-1">Unlocked {badge.date}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Backup and export controls */}
      <div className="rounded-2xl glass p-4 border border-border flex items-center justify-between shadow-card mb-6">
        <div className="flex items-center gap-2">
          <Download className="h-4.5 w-4.5 text-[var(--brand)]" />
          <span className="text-xs text-foreground font-semibold">Export Progress Ledger</span>
        </div>
        <button 
          onClick={handleExportData}
          className="text-[10px] bg-gradient-brand text-white font-bold px-4 py-2 rounded-full hover:opacity-95 transition-all shadow-glow cursor-pointer"
        >
          Export JSON
        </button>
      </div>

    </AppShell>
  );
}
