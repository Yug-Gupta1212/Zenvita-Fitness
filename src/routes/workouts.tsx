import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Dumbbell, Flame, Timer, ChevronRight, Play } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/AppShell";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/workouts")({
  component: WorkoutsLayout,
});

function WorkoutsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/workouts") return <Outlet />;
  return <WorkoutsIndex />;
}

export const workouts = [
  { id: "upper-body-burn", name: "Upper Body Burn", type: "Strength", minutes: 32, kcal: 420, level: "Intermediate", exercisesCount: 6 },
  { id: "hiit-inferno", name: "HIIT Inferno", type: "Cardio", minutes: 20, kcal: 360, level: "Advanced", exercisesCount: 8 },
  { id: "morning-mobility", name: "Morning Mobility", type: "Yoga", minutes: 15, kcal: 90, level: "Beginner", exercisesCount: 5 },
  { id: "leg-day-power", name: "Leg Day Power", type: "Strength", minutes: 45, kcal: 540, level: "Intermediate", exercisesCount: 7 },
  { id: "core-crusher", name: "Core Crusher", type: "Core", minutes: 18, kcal: 210, level: "Intermediate", exercisesCount: 6 },
  { id: "zen-yoga-flow", name: "Zen Yoga Flow", type: "Yoga", minutes: 28, kcal: 160, level: "All levels", exercisesCount: 6 },
];

function WorkoutsIndex() {
  const categories = ["All", "Strength", "Cardio", "Yoga", "Core"] as const;
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");

  const filteredWorkouts = workouts.filter((w) => {
    if (activeCategory === "All") return true;
    return w.type === activeCategory;
  });

  return (
    <AppShell subtitle="Train smart" title="Workouts">
      {/* Category Slider with Framer Motion Animation */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1 no-scrollbar">
        {categories.map((c) => {
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                isActive ? "text-white" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="workoutCategoryGlow"
                  className="absolute inset-0 rounded-full bg-gradient-brand shadow-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          to="/workouts/$id"
          params={{ id: "hiit-inferno" }}
          className="relative block overflow-hidden rounded-3xl p-6 bg-gradient-brand text-white border border-white/10 shadow-[0_20px_50px_-15px_rgba(232,93,47,0.45)]"
        >
          <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Featured Workout</p>
          <p className="font-[Instrument_Serif] text-3xl mt-1 text-white leading-tight">HIIT Inferno</p>
          <p className="text-xs opacity-90 mt-1">High Intensity Interval Cardio · 20 min · 360 kcal</p>
          
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-[var(--brand)] font-semibold px-4.5 py-2 text-xs hover:scale-105 active:scale-95 transition-all">
            <Play className="h-3.5 w-3.5" fill="currentColor" /> Start now
          </div>
        </Link>
      </motion.div>

      {/* Workouts List */}
      <SectionHeader title={`${activeCategory} Workouts (${filteredWorkouts.length})`} />
      <motion.div 
        layout
        className="space-y-3"
      >
        {filteredWorkouts.map((w) => (
          <motion.div
            layout
            key={w.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/workouts/$id"
              params={{ id: w.id }}
              className="flex items-center gap-4 rounded-2xl glass hover:bg-muted/50 border border-border p-4 transition-all"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-muted shadow-inner">
                <Dumbbell className="h-5 w-5 text-[var(--brand)]" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{w.name}</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-3.5 mt-1.5 font-medium">
                  <span className="inline-flex items-center gap-1"><Timer className="h-3.5 w-3.5" />{w.minutes}m</span>
                  <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" />{w.kcal}</span>
                  <span className="bg-muted px-2 py-0.5 rounded-full">{w.level}</span>
                </p>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AppShell>
  );
}