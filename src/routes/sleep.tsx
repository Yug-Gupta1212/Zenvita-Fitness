import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sunrise, Clock, Heart, Plus, X, Sparkles, TrendingUp } from "lucide-react";
import { AppShell, SectionHeader, StatCard } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db, SleepLog } from "@/lib/supabase";
import { getSafeWindow } from "@/lib/browser-safe";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/sleep")({
  component: SleepPage,
});

function SleepPage() {
  const [userId, setUserId] = useState("");
  const [sleeps, setSleeps] = useState<SleepLog[]>([]);
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Form State
  const [bedtime, setBedtime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [quality, setQuality] = useState(85);
  const [restingHeartRate, setRestingHeartRate] = useState(58);
  const [logDate, setLogDate] = useState("");

  useEffect(() => {
    setLogDate(getTodayDate());

    const loadSessionAndData = async () => {
      const { data } = await auth.getSession();
      if (data.session) {
        setUserId(data.session.user.id);
        const sleepData = await db.getSleepLogs(data.session.user.id);
        setSleeps(sleepData);
      }
    };

    loadSessionAndData();

    const openHandler = () => setOnboardOpen(true);
    const win = getSafeWindow();
    win?.addEventListener('zenvita:open-sleep-log', openHandler as EventListener);

    return () => {
      win?.removeEventListener('zenvita:open-sleep-log', openHandler as EventListener);
    };
  }, []);

  // Compute stats — most recent log by date
  const lastNight = sleeps.length > 0
    ? [...sleeps].sort((a, b) => b.date.localeCompare(a.date))[0]
    : undefined;
  
  // Calculate average sleep stats
  const averageDuration = sleeps.length > 0
    ? parseFloat((sleeps.reduce((sum, s) => sum + s.duration, 0) / sleeps.length).toFixed(1))
    : 0;

  const averageQuality = sleeps.length > 0
    ? Math.round(sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length)
    : 0;

  const averageRHR = sleeps.length > 0
    ? Math.round(sleeps.reduce((sum, s) => sum + s.restingHeartRate, 0) / sleeps.length)
    : 0;

  // Consistency check
  const calculateConsistency = () => {
    if (sleeps.length < 2) return "Establishing";
    // Analyze bedtime hours
    const times = sleeps.map((s) => {
      const [h, m] = s.bedtime.split(":").map(Number);
      return h < 12 ? h + 24 + m/60 : h + m/60; // offset post-midnight bedtimes
    });
    const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length;
    const variance = times.reduce((sum, t) => sum + Math.pow(t - avgTime, 2), 0) / times.length;
    
    if (variance < 0.25) return "Excellent"; // < 30 mins dev
    if (variance < 1.00) return "Optimal"; // < 1 hr dev
    return "Variable";
  };

  const consistency = calculateConsistency();

  // Dynamic Insight Generator
  const generateSleepInsight = () => {
    if (sleeps.length === 0) {
      return "Log sleep metrics for a few days to compute AI recovery trends.";
    }

    const earlyBedtimeSleeps = sleeps.filter((s) => {
      const [h] = s.bedtime.split(":").map(Number);
      return h >= 21 && h < 23; // Bedtime between 9pm and 11pm
    });

    if (earlyBedtimeSleeps.length > 0) {
      const avgEarlyQuality = earlyBedtimeSleeps.reduce((sum, s) => sum + s.quality, 0) / earlyBedtimeSleeps.length;
      const otherSleeps = sleeps.filter((s) => {
        const [h] = s.bedtime.split(":").map(Number);
        return h >= 23 || h < 6;
      });
      const avgOtherQuality = otherSleeps.length > 0 
        ? otherSleeps.reduce((sum, s) => sum + s.quality, 0) / otherSleeps.length 
        : 0;

      if (avgEarlyQuality > avgOtherQuality) {
        return "You sleep best when you go to bed before 11 PM. Your REM phase is 14% longer on those nights.";
      }
    }

    if (averageRHR > 65) {
      return "Your Resting Heart Rate is elevated. Avoid eating within 3 hours of sleep to improve recovery score.";
    }

    return "Bedtime consistency is excellent. Maintain this rhythm to optimize growth hormone release cycles.";
  };

  const sleepInsight = generateSleepInsight();

  // Calculate duration from bedtime and wakeTime
  const calculateDuration = (bed: string, wake: string) => {
    const [bh, bm] = bed.split(":").map(Number);
    const [wh, wm] = wake.split(":").map(Number);
    
    let diff = (wh + wm/60) - (bh + bm/60);
    if (diff < 0) {
      diff += 24; // spans midnight
    }
    return parseFloat(diff.toFixed(2));
  };

  const handleLogSleep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bedtime || !wakeTime) return;

    setSaving(true);

    let activeUserId = userId;
    if (!activeUserId) {
      const { data } = await auth.getSession();
      if (data.session) {
        activeUserId = data.session.user.id;
        setUserId(activeUserId);
      }
    }
    if (!activeUserId) {
      setSaving(false);
      return;
    }

    const duration = calculateDuration(bedtime, wakeTime);

    try {
      const newLog = await db.addSleepLog({
        userId: activeUserId,
        bedtime,
        wakeTime,
        duration,
        quality,
        restingHeartRate,
        date: logDate,
      });

      // Add notif
      await db.addNotification({
        userId: activeUserId,
        title: "Sleep Tracked",
        message: `Sleep logged for ${logDate}. Quality scored at ${quality}% (${duration} hours).`,
        type: "sleep",
      });

      // Update state
      setSleeps((s) => {
        const filtered = s.filter((item) => item.date !== logDate);
        return [...filtered, newLog].sort((a, b) => a.date.localeCompare(b.date));
      });
      setOnboardOpen(false);
      setLogDate(new Date().toISOString().split("T")[0]);
      setBedtime("22:30");
      setWakeTime("06:30");
      setQuality(85);
      setRestingHeartRate(58);

      setSuccessMsg("Sleep session logged");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (err) {
      console.error("Error logging sleep:", err);
      setSuccessMsg("Failed to log. Try again.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const chartData = sleeps.map((s) => ({
    date: new Date(s.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" }),
    Quality: s.quality,
    Hours: s.duration,
  }));

  const stages = [
    { name: "Deep", pct: lastNight ? 22 : 0, color: "#c2410c" },
    { name: "REM", pct: lastNight ? 28 : 0, color: "#e85d2f" },
    { name: "Light", pct: lastNight ? 44 : 0, color: "#ff7a3d" },
    { name: "Awake", pct: lastNight ? 6 : 0, color: "var(--muted-foreground)" },
  ];

  return (
    <AppShell subtitle="Recover deeper" title="Sleep">

      {/* Last Night Summary */}
      <div className="rounded-3xl glass-strong p-6 mb-6 relative overflow-hidden border border-border shadow-card">
        <div className="absolute -top-20 -right-12 h-44 w-44 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Last night</p>
            <p className="font-[Instrument_Serif] text-5xl mt-1 text-foreground">
              {lastNight ? `${Math.floor(lastNight.duration)}h ${Math.round((lastNight.duration % 1) * 60)}m` : "No log"}
            </p>
            <p className="text-xs text-muted-foreground mt-1.5 font-medium">
              {lastNight ? `Quality ${lastNight.quality} · Restful` : "Tap '+' to log sleep session"}
            </p>
          </div>

          <button 
            onClick={() => setOnboardOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand shadow-glow text-white hover:opacity-95 active:scale-95 transition-all cursor-pointer z-40"
            aria-label="Log sleep"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {lastNight && (
          <>
            <div className="mt-5.5 flex h-3.5 w-full overflow-hidden rounded-full shadow-inner">
              {stages.map((s) => (
                <div key={s.name} style={{ width: `${s.pct}%`, background: s.color }} />
              ))}
            </div>
            
            <div className="mt-3.5 grid grid-cols-4 gap-2 text-[10px] font-semibold">
              {stages.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <p className="text-foreground mt-1 pl-3.5">{s.pct}%</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Grid stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard label="Bedtime" value={lastNight?.bedtime || "--:--"} unit={lastNight ? "PM" : ""} icon={Moon} />
        <StatCard label="Avg Quality" value={averageQuality > 0 ? `${averageQuality}%` : "--"} icon={Sunrise} />
        <StatCard label="Resting HR" value={lastNight?.restingHeartRate || averageRHR || "--"} unit="bpm" icon={Heart} />
        <StatCard label="Bedtime Consistency" value={consistency} icon={Clock} />
      </div>

      {/* Recharts Trends */}
      {sleeps.length > 0 && (
        <>
          <div className="rounded-3xl glass p-5 mb-6 border border-border shadow-card">
            <SectionHeader title="Sleep Duration (Hours)" />
            <div className="h-44 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} domain={[0, 12]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", color: "var(--foreground)" }}
                    labelStyle={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                    itemStyle={{ color: "var(--foreground)", fontSize: "12px" }}
                    formatter={(value: number) => [`${value}h`, "Duration"]}
                  />
                  <Bar dataKey="Hours" fill="#e85d2f" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl glass p-5 mb-6 border border-border shadow-card">
            <SectionHeader title="7-Day Sleep Trends" />
          <div className="h-52 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7a3d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff7a3d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} domain={[40, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", color: "var(--foreground)" }}
                  labelStyle={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                  itemStyle={{ color: "var(--foreground)", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="Quality" stroke="#e85d2f" strokeWidth={2} fillOpacity={1} fill="url(#colorQuality)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

          <SectionHeader title="Sleep Log History" />
          <div className="space-y-3 mb-6">
            {[...sleeps].sort((a, b) => b.date.localeCompare(a.date)).map((log) => (
              <div key={log.id} className="rounded-2xl glass p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {new Date(log.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {log.bedtime} → {log.wakeTime} · Quality {log.quality}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-[Instrument_Serif] text-2xl text-foreground">
                      {Math.floor(log.duration)}h {Math.round((log.duration % 1) * 60)}m
                    </p>
                    <p className="text-[10px] text-muted-foreground">{log.restingHeartRate} bpm</p>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-brand"
                    style={{ width: `${Math.min(100, (log.duration / 10) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* AI Insights */}
      <SectionHeader title="Sleep Recovery Insights" />
      <div className="rounded-2xl glass p-4 mb-6 border border-border shadow-card flex gap-3.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--brand)]/10 blur-xl pointer-events-none" />
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shrink-0 text-white shadow-glow">
          <Sparkles className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">Sleep Consistency Report</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{sleepInsight}</p>
        </div>
      </div>

      {/* Wind-down routines */}
      <SectionHeader title="Wind-down routine" />
      <div className="space-y-3">
        {["Breathwork · 5 min", "Sleep story · The Forest", "Magnesium reminder · 9:30 PM"].map((s) => (
          <div key={s} className="rounded-2xl glass p-4 text-xs font-semibold text-foreground border border-border hover:border-[var(--brand)]/20 hover:bg-muted/50 transition-all cursor-pointer">
            {s}
          </div>
        ))}
      </div>

      {/* SLEEP ONBOARDING / LOG MODAL */}
      <AnimatePresence>
        {onboardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOnboardOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm font-semibold text-foreground">Log Sleep Session</h3>
                <button 
                  onClick={() => setOnboardOpen(false)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleLogSleep} className="mt-4 space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Bedtime</label>
                    <input
                      type="time"
                      required
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Wake Time</label>
                    <input
                      type="time"
                      required
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Sleep Quality (0-100)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Resting Heart Rate (bpm)</label>
                    <input
                      type="number"
                      required
                      min="30"
                      max="120"
                      value={restingHeartRate}
                      onChange={(e) => setRestingHeartRate(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full mt-4 rounded-xl py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow ${saving ? 'opacity-70 cursor-wait bg-[var(--brand)]' : 'bg-gradient-brand'}`}
                >
                  {saving ? 'Logging...' : 'Log Session'}
                </button>
                {successMsg && (
                  <p className="text-sm text-emerald-400 font-semibold mt-3 text-center">{successMsg}</p>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}