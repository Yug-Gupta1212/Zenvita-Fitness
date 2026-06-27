import { createFileRoute } from "@tanstack/react-router";
import { 
  Heart, Activity, Scale, Percent, Droplet, Plus, X, 
  Sparkles, Check, Flame, ChevronRight, BrainCircuit
} from "lucide-react";
import { AppShell, SectionHeader, StatCard } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Zenvita — Health Metrics" },
    ],
  }),
  component: HealthPage,
});

interface HealthLog {
  id: string;
  date: string;
  heartRate: number;
  hrv: number;
  weight: number;
  bodyFat: number;
  water: number;
}

function HealthPage() {
  const [userId, setUserId] = useState("");
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [logModalOpen, setLogModalOpen] = useState(false);

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Form State
  const [logDate, setLogDate] = useState("");
  const [heartRate, setHeartRate] = useState(65);
  const [hrv, setHrv] = useState(58);
  const [weight, setWeight] = useState(70);
  const [bodyFat, setBodyFat] = useState(16.0);
  const [water, setWater] = useState(2.5);

  useEffect(() => {
    setLogDate(getTodayDate());

    const loadSessionAndLogs = async () => {
      const { data } = await auth.getSession();
      if (data.session) {
        setUserId(data.session.user.id);
        
        // Load custom logs from localStorage
        const storedLogsStr = localStorage.getItem("zenvita_health_metrics_logs");
        if (storedLogsStr) {
          setLogs(JSON.parse(storedLogsStr));
        } else {
          // Prepopulate default logs
          const defaultLogs: HealthLog[] = [
            { id: "h1", date: new Date(Date.now() - 518400000).toISOString().split("T")[0], heartRate: 64, hrv: 55, weight: 71.2, bodyFat: 16.5, water: 2.5 },
            { id: "h2", date: new Date(Date.now() - 432000000).toISOString().split("T")[0], heartRate: 62, hrv: 58, weight: 71.0, bodyFat: 16.4, water: 2.8 },
            { id: "h3", date: new Date(Date.now() - 345600000).toISOString().split("T")[0], heartRate: 68, hrv: 48, weight: 70.8, bodyFat: 16.2, water: 3.0 },
            { id: "h4", date: new Date(Date.now() - 259200000).toISOString().split("T")[0], heartRate: 65, hrv: 52, weight: 70.5, bodyFat: 16.1, water: 2.2 },
            { id: "h5", date: new Date(Date.now() - 172800000).toISOString().split("T")[0], heartRate: 61, hrv: 64, weight: 70.2, bodyFat: 15.9, water: 3.2 },
            { id: "h6", date: new Date(Date.now() - 86400000).toISOString().split("T")[0], heartRate: 63, hrv: 61, weight: 70.1, bodyFat: 15.8, water: 2.8 },
            { id: "h7", date: new Date().toISOString().split("T")[0], heartRate: 59, hrv: 68, weight: 70.0, bodyFat: 15.7, water: 3.0 }
          ];
          setLogs(defaultLogs);
          localStorage.setItem("zenvita_health_metrics_logs", JSON.stringify(defaultLogs));
        }
      }
    };
    loadSessionAndLogs();
  }, []);

  const handleLogMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: HealthLog = {
      id: "h-" + Math.random().toString(36).substring(2, 11),
      date: logDate,
      heartRate,
      hrv,
      weight,
      bodyFat,
      water
    };

    const updatedLogs = [...logs.filter((l) => l.date !== logDate), newLog].sort((a, b) => a.date.localeCompare(b.date));
    setLogs(updatedLogs);
    localStorage.setItem("zenvita_health_metrics_logs", JSON.stringify(updatedLogs));
    
    // Add notif
    db.addNotification({
      userId,
      title: "Health Metrics Updated",
      message: `Weight logged at ${weight} kg and Resting Heart Rate at ${heartRate} bpm.`,
      type: "ai"
    });

    setLogModalOpen(false);
  };

  // Get current state
  const latestLog = logs[logs.length - 1] || { heartRate: 60, hrv: 60, weight: 70, bodyFat: 16, water: 2.5 };
  
  // Trend calculations
  const calculateChange = (key: keyof Omit<HealthLog, "id" | "date">) => {
    if (logs.length < 2) return { val: 0, text: "neutral" };
    const latest = logs[logs.length - 1][key] as number;
    const prev = logs[logs.length - 2][key] as number;
    const diff = parseFloat((latest - prev).toFixed(1));
    return {
      val: Math.abs(diff),
      text: diff < 0 ? "decrease" : diff > 0 ? "increase" : "no change",
      isImproved: key === "hrv" || key === "water" ? diff > 0 : diff < 0
    };
  };

  const weightChange = calculateChange("weight");
  const hrvChange = calculateChange("hrv");

  // Recharts maps
  const chartData = logs.slice(-7).map((l) => ({
    date: new Date(l.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" }),
    Weight: l.weight,
    Fat: l.bodyFat,
    HRV: l.hrv,
    HeartRate: l.heartRate,
    Water: l.water
  }));

  return (
    <AppShell subtitle="Track vitals & wellness" title="Health Metrics">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Heart Rate" value={latestLog.heartRate} unit="bpm" icon={Heart} />
        <StatCard label="HRV Score" value={latestLog.hrv} unit="ms" icon={Activity} />
        <StatCard label="Weight" value={latestLog.weight} unit="kg" icon={Scale} />
        <StatCard label="Body Fat" value={latestLog.bodyFat} unit="%" icon={Percent} />
      </div>

      {/* Manual Logger Trigger */}
      <div className="rounded-2xl glass p-4.5 mb-6 border border-border shadow-card flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 h-16 w-16 bg-[var(--brand)]/5 blur-xl pointer-events-none" />
        <div className="flex items-center gap-3.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
            <Scale className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Log Today's Vital Metrics</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Keep your bio-metrics and recovery charts up to date.</p>
          </div>
        </div>
        <button 
          onClick={() => setLogModalOpen(true)}
          className="rounded-full bg-gradient-brand text-white font-semibold text-xs px-4 py-2 cursor-pointer shadow-glow hover:opacity-95 transition-all"
        >
          Log Vitals
        </button>
      </div>

      {/* Weight and Body Fat trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="rounded-3xl glass p-5 border border-border shadow-card">
          <SectionHeader title="Weight Progression (7 days)" />
          <div className="h-44 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7a3d" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#ff7a3d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} domain={["auto", "auto"]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", color: "var(--foreground)" }}
                  labelStyle={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                  itemStyle={{ color: "var(--foreground)", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="Weight" stroke="#ff7a3d" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl glass p-5 border border-border shadow-card">
          <SectionHeader title="Heart Rate & HRV (7 days)" />
          <div className="h-44 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", color: "var(--foreground)" }}
                  labelStyle={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                  itemStyle={{ color: "var(--foreground)", fontSize: "12px" }}
                />
                <Line type="monotone" dataKey="HRV" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="HeartRate" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Health Suggestions */}
      <SectionHeader title="Bio-insights Engine" />
      <div className="rounded-2xl glass p-5 mb-6 border border-border shadow-card relative overflow-hidden flex gap-4">
        <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-brand opacity-10 blur-xl pointer-events-none" />
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow shrink-0">
          <BrainCircuit className="h-5 w-5" />
        </span>
        <div>
          <h4 className="text-xs font-semibold text-foreground">Recovery Rhythm Analysis</h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Your Heart Rate Variability (HRV) is trending upwards at <b>+{latestLog.hrv - 60}ms</b> consistency. 
            This indicates that your parasympathetic nervous system is active and recovery cycles are performing extremely well.
            Weight has decreased by <b>{weightChange.val} kg</b>. Body Fat is resting at <b>{latestLog.bodyFat}%</b>, which matches your moderate fat loss path.
          </p>
        </div>
      </div>

      {/* Log modal */}
      <AnimatePresence>
        {logModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLogModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm font-semibold text-foreground">Log Today's Vitals</h3>
                <button 
                  onClick={() => setLogModalOpen(false)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleLogMetrics} className="mt-4 space-y-4">
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

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Body Fat (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={bodyFat}
                      onChange={(e) => setBodyFat(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Heart Rate (bpm)</label>
                    <input
                      type="number"
                      required
                      value={heartRate}
                      onChange={(e) => setHeartRate(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">HRV Score (ms)</label>
                    <input
                      type="number"
                      required
                      value={hrv}
                      onChange={(e) => setHrv(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Water Intake (Liters)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow cursor-pointer"
                >
                  Log Vital Records
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
