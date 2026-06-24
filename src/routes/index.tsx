import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame, Footprints, Heart, Droplet, Activity, Play, ChevronRight,
  Target, Zap, TrendingUp, Plus, Minus, CheckCircle, Sparkles, Moon
} from "lucide-react";
import { AppShell, StatCard, SectionHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db, MealLog, SleepLog } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { HealthWrap } from "@/components/HealthWrap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zenvita — Your Daily Health" },
      { name: "description", content: "Track workouts, nutrition, sleep and recovery with AI-powered insights." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState("");
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [sleeps, setSleeps] = useState<SleepLog[]>([]);
  const [water, setWater] = useState(1.8); // Liters
  const [wrapOpen, setWrapOpen] = useState(false);
  
  // Dynamic metrics
  const [caloriesBurned, setCaloriesBurned] = useState(420);
  const [stepsCount, setStepsCount] = useState(8412);
  const [heartRate, setHeartRate] = useState(68);

  useEffect(() => {
    const loadSessionAndData = async () => {
      const { data } = await auth.getSession();
      if (data.session) {
        setProfile(data.session.profile);
        setUserId(data.session.user.id);
        
        // Fetch tracking info
        const mealData = await db.getMeals(data.session.user.id);
        setMeals(mealData);

        const sleepData = await db.getSleepLogs(data.session.user.id);
        setSleeps(sleepData);
      }
    };

    loadSessionAndData();

    // Listen for updates
    const { data: authListener } = auth.onAuthStateChange((event, session) => {
      if (session) {
        setProfile(session.profile);
        setUserId(session.user.id);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Compute daily totals
  const calorieGoal = 2400; // default
  const proteinGoal = profile?.fitnessGoal === "build_muscle" ? 150 : 120; // g
  const carbGoal = 250; // g
  const fatGoal = 70; // g

  const totalCaloriesConsumed = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProteinConsumed = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbsConsumed = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFatsConsumed = meals.reduce((sum, m) => sum + m.fats, 0);

  // 1. AI HEALTH SCORE COMPUTATION
  // Compute value out of 100 based on stats
  const calculateHealthScore = () => {
    let score = 50; // base

    // Sleep quality (up to 20 points)
    if (sleeps.length > 0) {
      const avgSleepQuality = sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length;
      score += (avgSleepQuality / 100) * 20;
    } else {
      score += 15;
    }

    // Hydration (up to 10 points)
    const waterRatio = Math.min(1, water / 3.0);
    score += waterRatio * 10;

    // Nutrition calorie balance (up to 10 points)
    const calDiff = Math.abs(totalCaloriesConsumed - calorieGoal);
    if (calDiff < 200) score += 10;
    else if (calDiff < 500) score += 7;
    else if (calDiff < 800) score += 4;

    // Activity (up to 10 points)
    const workoutPct = Math.min(1, (profile?.workoutsCount || 0) / 10);
    score += workoutPct * 10;

    return Math.min(100, Math.round(score));
  };

  const healthScore = calculateHealthScore();

  // 2. PERSONALIZED AI INSIGHT GENERATION
  const generateInsight = () => {
    if (sleeps.length > 0 && sleeps[sleeps.length - 1].quality < 80) {
      return {
        title: "Prioritize Deep Sleep tonight",
        desc: `Your last sleep quality was ${sleeps[sleeps.length - 1].quality}%. Try shifting bedtime 30 minutes earlier to align with your REM consistency goal.`,
      };
    }

    if (totalCaloriesConsumed > 0 && totalProteinConsumed < proteinGoal * 0.5) {
      return {
        title: "Increase Protein Intake",
        desc: `You have consumed ${totalProteinConsumed}g / ${proteinGoal}g protein. Adding eggs or Greek yogurt to snacks will help support muscle recovery.`,
      };
    }

    if (water < 2.0) {
      return {
        title: "Hydration levels are low",
        desc: `You are at ${water}L today. Dehydration impacts cardiovascular efficiency. Drink 2 glasses of water before your next workout.`,
      };
    }

    return {
      title: "Recovery state is optimal",
      desc: "Your HRV and sleep cycles are perfectly aligned. This is a great day to attempt high-intensity cardio or load progression in lifting.",
    };
  };

  const insight = generateInsight();

  // Adjust hydration
  const addWater = () => setWater((w) => parseFloat((w + 0.25).toFixed(2)));
  const subWater = () => setWater((w) => parseFloat(Math.max(0, w - 0.25).toFixed(2)));

  // Compute sleep duration for display
  const lastSleep = sleeps[sleeps.length - 1];
  const sleepHours = lastSleep ? Math.floor(lastSleep.duration) : 7;
  const sleepMins = lastSleep ? Math.round((lastSleep.duration % 1) * 60) : 42;

  // Nutrition donut data
  const nutritionData = [
    { label: "Protein", value: totalProteinConsumed, max: proteinGoal, color: "#e85d2f" },
    { label: "Carbs", value: totalCarbsConsumed, max: carbGoal, color: "#ff7a3d" },
    { label: "Fats", value: totalFatsConsumed, max: fatGoal, color: "#c2410c" },
  ];

  return (
    <AppShell 
      subtitle={`Good morning, ${profile?.name?.split(" ")?.[0] || "User"} 👋`} 
      title="Today's Pulse"
    >
      {/* === TOP SECTION: Score + Stats Row === */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Vitality Score Card */}
        <div className="lg:col-span-3 relative overflow-hidden rounded-3xl glass-strong p-6">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Vitality Score</p>
          <div className="flex items-center gap-4 mt-3">
            <ScoreRing value={healthScore} />
            <div>
              <p className="font-[Instrument_Serif] text-2xl leading-none text-foreground">
                {healthScore >= 90 ? "Excellent" : healthScore >= 80 ? "Optimal" : healthScore >= 70 ? "Good" : "Fair"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <Heart className="h-3 w-3 text-[var(--brand)]" />
                {heartRate} <span className="text-muted-foreground/60">bpm</span>
              </p>
              <p className="text-[9px] text-muted-foreground mt-0.5">↑ 6 from yesterday</p>
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="lg:col-span-3">
          <StatCard label="Steps" value={stepsCount.toLocaleString()} unit="/ 10,000 steps" icon={Footprints} />
        </div>

        {/* Calories Card */}
        <div className="lg:col-span-3">
          <StatCard label="Calories" value={`${totalCaloriesConsumed > 0 ? totalCaloriesConsumed.toLocaleString() : '1,840'}`} unit={`/ ${calorieGoal.toLocaleString()} kcal`} icon={Flame} accent />
        </div>

        {/* Sleep Card */}
        <div className="lg:col-span-3">
          <motion.div 
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl p-4 glass border border-border shadow-card h-full flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold">Sleep</span>
              <Moon className="h-4.5 w-4.5 text-indigo-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-foreground">{sleepHours}h {sleepMins}m</span>
            </div>
            <p className="text-[10px] text-emerald-500 font-semibold mt-1">Good Quality</p>
          </motion.div>
        </div>
      </div>

      {/* === MIDDLE SECTION: Workout + Nutrition === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Today's Workout Card - With Image BG */}
        <div className="relative">
          <SectionHeader
            title="Today's Workout"
            action={<Link to="/workouts" className="text-xs text-[var(--brand)] inline-flex items-center gap-1 font-semibold">View all <ChevronRight className="h-3 w-3" /></Link>}
          />
          <Link
            to="/workouts/$id"
            params={{ id: "hiit-inferno" }}
            className="relative block overflow-hidden rounded-2xl border border-border shadow-card h-[200px] group"
          >
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80)', filter: 'brightness(0.45)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-5">
              <p className="text-[10px] text-white/80 font-bold tracking-wider uppercase">HIIT Inferno</p>
              <p className="font-[Instrument_Serif] text-2xl mt-0.5 text-white">20 min — 360 kcal</p>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-brand text-white text-xs font-semibold shadow-glow hover:opacity-90 transition-all">
                  <Play className="h-3.5 w-3.5" fill="white" /> Start Workout
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Nutrition Summary Card */}
        <div className="relative">
          <SectionHeader title="Nutrition Summary" />
          <div className="rounded-2xl glass p-5 border border-border shadow-card">
            <div className="flex items-center gap-5">
              {/* Donut Chart */}
              <div className="relative h-28 w-28 shrink-0">
                <NutritionDonut 
                  calories={totalCaloriesConsumed > 0 ? totalCaloriesConsumed : 1840} 
                  goal={calorieGoal} 
                  macros={nutritionData} 
                />
              </div>
              {/* Macro Breakdown */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Calories</p>
                  <p className="text-sm font-bold text-foreground">{totalCaloriesConsumed > 0 ? totalCaloriesConsumed.toLocaleString() : '1,840'} <span className="text-[10px] text-muted-foreground font-normal">({calorieGoal.toLocaleString()} kcal)</span></p>
                </div>
                {nutritionData.map((m) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: m.color }} />
                    <span className="text-[10px] text-muted-foreground font-semibold w-14">{m.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, (m.value / m.max) * 100)}%`, background: m.color }} />
                    </div>
                    <span className="text-[10px] text-foreground font-semibold w-16 text-right">{m.value}g / {m.max}g</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === AI INSIGHT + HYDRATION + STREAK ROW === */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* AI Insight */}
        <div className="lg:col-span-5">
          <SectionHeader title="AI Insight" />
          <div className="rounded-2xl glass p-4 border border-border shadow-card flex gap-3.5 relative overflow-hidden h-[calc(100%-2rem)]">
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--brand)]/10 blur-xl pointer-events-none" />
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shrink-0 text-white shadow-glow mt-0.5">
              <Zap className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                {insight.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold">
                {insight.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Hydration */}
        <div className="lg:col-span-4">
          <SectionHeader title="Hydration" />
          <motion.div 
            whileHover={{ y: -2 }}
            className="relative overflow-hidden rounded-2xl p-4 glass border border-border shadow-card"
          >
            <div className="flex items-center justify-between">
              <Droplet className="h-5 w-5 text-sky-400" />
              <div className="flex gap-2">
                <button 
                  onClick={subWater}
                  className="grid place-items-center h-7 w-7 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border active:scale-95 transition-all text-xs cursor-pointer"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <button 
                  onClick={addWater}
                  className="grid place-items-center h-7 w-7 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 active:scale-95 text-sky-500 border border-sky-500/20 transition-all text-xs cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-foreground">{water}</span>
              <span className="text-xs text-muted-foreground font-semibold">L / 3.0L</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-sky-400 rounded-full" style={{ width: `${Math.min(100, (water / 3.0) * 100)}%` }} />
            </div>
          </motion.div>
        </div>

        {/* Streak Counter */}
        <div className="lg:col-span-3">
          <SectionHeader title="Streak" />
          <div className="rounded-2xl glass p-4 border border-border shadow-card text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-brand opacity-15 blur-2xl pointer-events-none" />
            <div className="relative">
              <span className="text-3xl">🔥</span>
              <p className="font-[Instrument_Serif] text-3xl text-foreground mt-1 font-bold">{profile?.streak || 7} Days Streak</p>
              <p className="text-[10px] text-muted-foreground font-semibold mt-1">Keep it going!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Wrap Banner */}
      <div className="rounded-2xl glass p-4 mb-6 border border-[var(--brand)]/20 shadow-card flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 h-16 w-16 bg-[var(--brand)]/5 blur-xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
            <Sparkles className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Your Weekly Vitality Wrap is ready</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 font-semibold">Explore sleep and workout consistency reports.</p>
          </div>
        </div>
        <button 
          onClick={() => setWrapOpen(true)}
          className="text-[10px] bg-gradient-brand text-white font-bold px-3 py-1.5 rounded-full hover:opacity-95 transition-all cursor-pointer"
        >
          View Report
        </button>
      </div>

      {/* Goals */}
      <SectionHeader title="Goals & Streaks" />
      <div className="space-y-3">
        {[
          { icon: Target, label: "Workouts streak", value: profile?.streak || 0, max: 7, unit: "days" },
          { icon: Activity, label: "Total workouts", value: profile?.workoutsCount || 0, max: 30, unit: "completed" },
          { icon: TrendingUp, label: "Daily Protein Progress", value: totalProteinConsumed, max: proteinGoal, unit: "g" },
        ].map((g) => {
          const pct = Math.min(100, Math.round((g.value / g.max) * 100));
          const Icon = g.icon;
          return (
            <div key={g.label} className="rounded-2xl glass p-4 border border-border shadow-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4.5 w-4.5 text-[var(--brand)]" />
                  <span className="text-xs text-foreground font-bold">{g.label}</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold">
                  {g.value} / {g.max} {g.unit}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-brand" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <HealthWrap isOpen={wrapOpen} onClose={() => setWrapOpen(false)} />
    </AppShell>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  
  // Animating the progress ring
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const animatedOffset = c - (value / 100) * c;
    const t = setTimeout(() => {
      setOffset(animatedOffset);
    }, 200);
    return () => clearTimeout(t);
  }, [value, c]);

  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="7" />
        <motion.circle
          cx="50" cy="50" r={r} fill="none" stroke="url(#g)" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff7a3d" />
            <stop offset="100%" stopColor="#e85d2f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-[Instrument_Serif] text-4xl text-foreground font-bold"
        >
          {value}
        </motion.span>
      </div>
    </div>
  );
}

/** Nutrition Donut Chart Component */
function NutritionDonut({ calories, goal, macros }: { calories: number; goal: number; macros: { label: string; value: number; max: number; color: string }[] }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, (calories / goal) * 100);
  
  return (
    <div className="relative h-28 w-28">
      <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
        {macros.map((m, i) => {
          const segPct = m.max > 0 ? (m.value / goal) * 100 : 0;
          const prevPcts = macros.slice(0, i).reduce((sum, pm) => sum + (pm.max > 0 ? (pm.value / goal) * 100 : 0), 0);
          return (
            <motion.circle
              key={m.label}
              cx="50" cy="50" r={r} fill="none"
              stroke={m.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: c - (segPct / 100) * c }}
              transition={{ duration: 1, ease: "easeOut", delay: i * 0.15 }}
              style={{ transform: `rotate(${(prevPcts / 100) * 360}deg)`, transformOrigin: '50% 50%' }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="font-[Instrument_Serif] text-lg text-foreground font-bold leading-none">{Math.round(pct)}%</p>
          <p className="text-[8px] text-muted-foreground mt-0.5">of goal</p>
        </div>
      </div>
    </div>
  );
}