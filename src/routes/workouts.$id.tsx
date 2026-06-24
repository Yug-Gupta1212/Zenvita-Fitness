import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Timer, Flame, Dumbbell, Heart, CheckCircle2, Award, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { workouts } from "./workouts";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/workouts/$id")({
  loader: ({ params }) => {
    const workout = workouts.find((w) => w.id === params.id);
    if (!workout) throw notFound();
    return { workout };
  },
  notFoundComponent: () => (
    <AppShell title="Not found">
      <p className="text-sm text-muted-foreground">Workout not found.</p>
    </AppShell>
  ),
  errorComponent: ({ error }) => (
    <AppShell title="Error">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </AppShell>
  ),
  component: WorkoutDetail,
});

const exerciseDataMap: Record<string, Array<{ name: string; sets: number; reps: string; rest: string }>> = {
  Strength: [
    { name: "Push-ups", sets: 4, reps: "12", rest: "45s" },
    { name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: "60s" },
    { name: "Overhead Shoulder Press", sets: 3, reps: "10", rest: "45s" },
    { name: "Incline Dumbbell Flys", sets: 3, reps: "12", rest: "45s" },
    { name: "Dumbbell Lateral Raises", sets: 3, reps: "15", rest: "30s" },
    { name: "Bodyweight Tricep Dips", sets: 3, reps: "12", rest: "30s" },
  ],
  Cardio: [
    { name: "High Knee Runs", sets: 3, reps: "45s", rest: "15s" },
    { name: "Mountain Climbers", sets: 3, reps: "40s", rest: "20s" },
    { name: "Jumping Jacks", sets: 3, reps: "60s", rest: "15s" },
    { name: "Burpees", sets: 3, reps: "30s", rest: "30s" },
    { name: "Fast Skaters", sets: 3, reps: "45s", rest: "15s" },
  ],
  Yoga: [
    { name: "Sun Salutation A", sets: 3, reps: "Flow", rest: "15s" },
    { name: "Warrior II Pose", sets: 2, reps: "Hold 30s", rest: "10s" },
    { name: "Downward Facing Dog", sets: 2, reps: "Hold 45s", rest: "15s" },
    { name: "Child's Pose Recovery", sets: 1, reps: "Hold 60s", rest: "0s" },
    { name: "Savasana Integration", sets: 1, reps: "Hold 3m", rest: "0s" },
  ],
  Core: [
    { name: "Forearm Plank", sets: 3, reps: "60s", rest: "30s" },
    { name: "Bicycle Crunches", sets: 3, reps: "20 reps", rest: "15s" },
    { name: "Hollow Body Hold", sets: 3, reps: "30s", rest: "30s" },
    { name: "Russian Twists", sets: 3, reps: "24 reps", rest: "15s" },
    { name: "Superman Extension", sets: 3, reps: "15 reps", rest: "20s" },
  ],
};

const recommendationsMap: Record<string, Array<{ name: string; duration: string; type: string }>> = {
  Strength: [
    { name: "Upper Body Hypertrophy Primer", duration: "5 min", type: "Warm-up" },
    { name: "Rotator Cuff Dynamic Stability", duration: "6 min", type: "Mobility" },
    { name: "Chest & Triceps Static Stretching", duration: "8 min", type: "Flexibility" },
  ],
  Cardio: [
    { name: "Ankle & Calf Dynamic Release", duration: "4 min", type: "Mobility" },
    { name: "Post-HIIT Controlled Breathing", duration: "5 min", type: "Breathing" },
    { name: "Leg & Hip Flexor Static Stretch", duration: "8 min", type: "Recovery" },
  ],
  Yoga: [
    { name: "Dynamic Flexibility Routine", duration: "10 min", type: "Flexibility" },
    { name: "Deep Hip & Hamstring Opening", duration: "8 min", type: "Mobility" },
    { name: "Ujjayi Breathwork Activation", duration: "5 min", type: "Breathing" },
  ],
  Core: [
    { name: "Lower Back Lumbar Support Flow", duration: "6 min", type: "Mobility" },
    { name: "Cat-Cow Spine Warm-up", duration: "3 min", type: "Warm-up" },
    { name: "Cored form adjustments tutorial", duration: "Read", type: "Tip" },
  ],
};

function WorkoutDetail() {
  const { workout } = Route.useLoaderData();
  const [userId, setUserId] = useState("");
  const [sessionState, setSessionState] = useState<"idle" | "active" | "completed">("idle");
  const [elapsed, setElapsed] = useState(0);

  // Recommendations mapping
  const categoryRecs = recommendationsMap[workout.type] || recommendationsMap["Strength"];
  const exercises = exerciseDataMap[workout.type] || exerciseDataMap["Strength"];

  useEffect(() => {
    auth.getSession().then(({ data }) => {
      if (data.session) setUserId(data.session.user.id);
    });

    let timer: NodeJS.Timeout;
    if (sessionState === "active") {
      timer = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionState]);

  const handleStartWorkout = () => {
    setSessionState("active");
    setElapsed(0);
  };

  const handleCompleteWorkout = async () => {
    setSessionState("completed");
    
    // Play sound / Trigger premium confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff7a3d", "#e85d2f", "#ffffff"],
    });

    if (userId) {
      // 1. Increment workout metrics in database / LocalStorage
      await db.incrementWorkout(userId);
      
      // 2. Add complete log to notifications
      await db.addNotification({
        userId,
        title: "Workout Logged! 🎉",
        message: `Outstanding job completing ${workout.name}! You burned approximately ${workout.kcal} kcal in ${Math.round(elapsed / 60) || 1} min.`,
        type: "sleep", // uses general logs design
      });
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  return (
    <AppShell hideHeader>
      <div className="flex items-center justify-between mb-4">
        <Link to="/workouts" className="grid h-10 w-10 place-items-center rounded-full glass text-foreground hover:bg-muted transition-colors">
          <ArrowLeft className="h-4.5 w-4.5" />
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{workout.type}</span>
        <span className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {sessionState === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            {/* Header Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 mb-6 border border-white/10 shadow-[0_20px_50px_-15px_rgba(232,93,47,0.4)]">
              <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/15 blur-3xl pointer-events-none" />
              <p className="text-[10px] uppercase tracking-widest text-white/80 font-bold">{workout.level}</p>
              <h2 className="font-[Instrument_Serif] text-4xl text-white mt-1 leading-tight">{workout.name}</h2>
              <div className="flex gap-4 mt-4 text-xs font-semibold text-white/95">
                <span className="inline-flex items-center gap-1"><Timer className="h-4 w-4" />{workout.minutes} min</span>
                <span className="inline-flex items-center gap-1"><Flame className="h-4 w-4" />{workout.kcal} kcal</span>
                <span className="inline-flex items-center gap-1"><Heart className="h-4 w-4" />Est. Heart Rate 135 bpm</span>
              </div>
              
              <button 
                onClick={handleStartWorkout}
                className="mt-5.5 inline-flex items-center gap-2 rounded-full bg-white text-[var(--brand)] font-bold text-xs px-6 py-3 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="h-4.5 w-4.5" fill="currentColor" /> Start workout
              </button>
            </div>
          </motion.div>
        )}

        {sessionState === "active" && (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="rounded-3xl glass-strong border border-[var(--brand)]/20 p-6 mb-6 text-center relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[var(--brand)]/10 blur-3xl" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--brand)] font-bold mb-1">Session In Progress</p>
            <h2 className="text-xl font-semibold text-foreground truncate mb-4">{workout.name}</h2>
            
            <div className="font-[Instrument_Serif] text-5xl text-foreground font-bold tracking-wider my-6">
              {formatTime(elapsed)}
            </div>

            <button 
              onClick={handleCompleteWorkout}
              className="rounded-full bg-gradient-brand text-white font-bold text-xs px-8 py-3.5 cursor-pointer shadow-glow hover:opacity-95 active:scale-95 transition-all"
            >
              Finish & Log Workout
            </button>
          </motion.div>
        )}

        {sessionState === "completed" && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-3xl glass-strong border border-emerald-500/20 p-6 mb-6 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none" />
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 grid place-items-center mb-3 text-emerald-400">
              <Award className="h-7 w-7" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-1">Congratulations!</p>
            <h2 className="text-2xl font-[Instrument_Serif] text-foreground">Workout Logged</h2>
            <p className="text-xs text-muted-foreground mt-2 px-6">
              Fantastic consistency! Your stats, streak, and macro parameters have been updated.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-full bg-muted border border-border hover:bg-muted/80 text-foreground font-semibold text-xs px-6 py-2.5 transition-all"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercises List */}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3.5">
        Exercises List · {exercises.length}
      </h3>
      <div className="space-y-3 mb-8">
        {exercises.map((e, i) => (
          <div key={e.name} className="flex items-center gap-4 rounded-2xl glass p-4 border border-border">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-xs text-[var(--brand)] font-bold shadow-inner">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground">{e.name}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{e.sets} sets × {e.reps} · rest {e.rest}</p>
            </div>
            <Dumbbell className="h-4.5 w-4.5 text-muted-foreground" />
          </div>
        ))}
      </div>

      {/* 3. WORKOUT RECOMMENDATION ENGINE */}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3.5 flex items-center gap-1.5">
        <Sparkles className="h-4 w-4 text-[var(--brand)]" /> Zenvita AI Recommendations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        {categoryRecs.map((rec, i) => (
          <div key={i} className="rounded-2xl glass p-4 border border-border flex flex-col justify-between hover:border-[var(--brand)]/20 transition-all text-left">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[var(--brand)] bg-[var(--brand)]/10 px-2 py-0.5 rounded-full">
                {rec.type}
              </span>
              <h4 className="text-xs font-bold text-foreground mt-2 leading-relaxed">{rec.name}</h4>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Estimated: {rec.duration}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl glass p-4 border border-border flex items-center gap-3 shadow-card">
        <CheckCircle2 className="h-5 w-5 text-[var(--brand)] shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">Form coaching enabled · Apple Watch sync ready</p>
      </div>
    </AppShell>
  );
}