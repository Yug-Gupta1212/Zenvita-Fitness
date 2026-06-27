import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { T as Percent, ct as Activity, n as X, rt as BrainCircuit, x as Scale, z as Heart } from "../_libs/lucide-react.mjs";
import { n as getSafeLocalStorage } from "./browser-safe-DPMYmjS3.mjs";
import { n as SectionHeader, r as StatCard, t as AppShell } from "./AppShell-5p7JScr3.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, o as Area, r as LineChart, s as Line, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-DgnAoA7j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HealthPage() {
	const [userId, setUserId] = (0, import_react.useState)("");
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [logModalOpen, setLogModalOpen] = (0, import_react.useState)(false);
	const getTodayDate = () => (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const [logDate, setLogDate] = (0, import_react.useState)("");
	const [heartRate, setHeartRate] = (0, import_react.useState)(65);
	const [hrv, setHrv] = (0, import_react.useState)(58);
	const [weight, setWeight] = (0, import_react.useState)(70);
	const [bodyFat, setBodyFat] = (0, import_react.useState)(16);
	const [water, setWater] = (0, import_react.useState)(2.5);
	(0, import_react.useEffect)(() => {
		setLogDate(getTodayDate());
		const loadSessionAndLogs = async () => {
			const { data } = await auth.getSession();
			if (data.session) {
				setUserId(data.session.user.id);
				const storage = getSafeLocalStorage();
				const storedLogsStr = storage?.getItem("zenvita_health_metrics_logs");
				if (storedLogsStr) setLogs(JSON.parse(storedLogsStr));
				else {
					const defaultLogs = [
						{
							id: "h1",
							date: (/* @__PURE__ */ new Date(Date.now() - 5184e5)).toISOString().split("T")[0],
							heartRate: 64,
							hrv: 55,
							weight: 71.2,
							bodyFat: 16.5,
							water: 2.5
						},
						{
							id: "h2",
							date: (/* @__PURE__ */ new Date(Date.now() - 432e6)).toISOString().split("T")[0],
							heartRate: 62,
							hrv: 58,
							weight: 71,
							bodyFat: 16.4,
							water: 2.8
						},
						{
							id: "h3",
							date: (/* @__PURE__ */ new Date(Date.now() - 3456e5)).toISOString().split("T")[0],
							heartRate: 68,
							hrv: 48,
							weight: 70.8,
							bodyFat: 16.2,
							water: 3
						},
						{
							id: "h4",
							date: (/* @__PURE__ */ new Date(Date.now() - 2592e5)).toISOString().split("T")[0],
							heartRate: 65,
							hrv: 52,
							weight: 70.5,
							bodyFat: 16.1,
							water: 2.2
						},
						{
							id: "h5",
							date: (/* @__PURE__ */ new Date(Date.now() - 1728e5)).toISOString().split("T")[0],
							heartRate: 61,
							hrv: 64,
							weight: 70.2,
							bodyFat: 15.9,
							water: 3.2
						},
						{
							id: "h6",
							date: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString().split("T")[0],
							heartRate: 63,
							hrv: 61,
							weight: 70.1,
							bodyFat: 15.8,
							water: 2.8
						},
						{
							id: "h7",
							date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
							heartRate: 59,
							hrv: 68,
							weight: 70,
							bodyFat: 15.7,
							water: 3
						}
					];
					setLogs(defaultLogs);
					storage?.setItem("zenvita_health_metrics_logs", JSON.stringify(defaultLogs));
				}
			}
		};
		loadSessionAndLogs();
	}, []);
	const handleLogMetrics = (e) => {
		e.preventDefault();
		const newLog = {
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
		getSafeLocalStorage()?.setItem("zenvita_health_metrics_logs", JSON.stringify(updatedLogs));
		db.addNotification({
			userId,
			title: "Health Metrics Updated",
			message: `Weight logged at ${weight} kg and Resting Heart Rate at ${heartRate} bpm.`,
			type: "ai"
		});
		setLogModalOpen(false);
	};
	const latestLog = logs[logs.length - 1] || {
		heartRate: 60,
		hrv: 60,
		weight: 70,
		bodyFat: 16,
		water: 2.5
	};
	const calculateChange = (key) => {
		if (logs.length < 2) return {
			val: 0,
			text: "neutral"
		};
		const latest = logs[logs.length - 1][key];
		const prev = logs[logs.length - 2][key];
		const diff = parseFloat((latest - prev).toFixed(1));
		return {
			val: Math.abs(diff),
			text: diff < 0 ? "decrease" : diff > 0 ? "increase" : "no change",
			isImproved: key === "hrv" || key === "water" ? diff > 0 : diff < 0
		};
	};
	const weightChange = calculateChange("weight");
	calculateChange("hrv");
	const chartData = logs.slice(-7).map((l) => ({
		date: (/* @__PURE__ */ new Date(l.date + "T00:00:00")).toLocaleDateString("en-US", { weekday: "short" }),
		Weight: l.weight,
		Fat: l.bodyFat,
		HRV: l.hrv,
		HeartRate: l.heartRate,
		Water: l.water
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: "Track vitals & wellness",
		title: "Health Metrics",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Heart Rate",
						value: latestLog.heartRate,
						unit: "bpm",
						icon: Heart
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "HRV Score",
						value: latestLog.hrv,
						unit: "ms",
						icon: Activity
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Weight",
						value: latestLog.weight,
						unit: "kg",
						icon: Scale
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Body Fat",
						value: latestLog.bodyFat,
						unit: "%",
						icon: Percent
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl glass p-4.5 mb-6 border border-border shadow-card flex items-center justify-between relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 h-16 w-16 bg-[var(--brand)]/5 blur-xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-foreground",
							children: "Log Today's Vital Metrics"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground mt-0.5",
							children: "Keep your bio-metrics and recovery charts up to date."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLogModalOpen(true),
						className: "rounded-full bg-gradient-brand text-white font-semibold text-xs px-4 py-2 cursor-pointer shadow-glow hover:opacity-95 transition-all",
						children: "Log Vitals"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass p-5 border border-border shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Weight Progression (7 days)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44 w-full mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: chartData,
								margin: {
									top: 5,
									right: 5,
									left: -25,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorWeight",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "#ff7a3d",
											stopOpacity: .25
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "#ff7a3d",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "date",
										stroke: "var(--muted-foreground)",
										fontSize: 10,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--muted-foreground)",
										fontSize: 10,
										tickLine: false,
										domain: ["auto", "auto"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											backgroundColor: "var(--card)",
											border: "1px solid var(--border)",
											borderRadius: "12px",
											color: "var(--foreground)"
										},
										labelStyle: {
											color: "var(--muted-foreground)",
											fontSize: "10px"
										},
										itemStyle: {
											color: "var(--foreground)",
											fontSize: "12px"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Weight",
										stroke: "#ff7a3d",
										strokeWidth: 2.5,
										fillOpacity: 1,
										fill: "url(#colorWeight)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass p-5 border border-border shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Heart Rate & HRV (7 days)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44 w-full mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: chartData,
								margin: {
									top: 5,
									right: 5,
									left: -25,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "date",
										stroke: "var(--muted-foreground)",
										fontSize: 10,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--muted-foreground)",
										fontSize: 10,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											backgroundColor: "var(--card)",
											border: "1px solid var(--border)",
											borderRadius: "12px",
											color: "var(--foreground)"
										},
										labelStyle: {
											color: "var(--muted-foreground)",
											fontSize: "10px"
										},
										itemStyle: {
											color: "var(--foreground)",
											fontSize: "12px"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "HRV",
										stroke: "#22C55E",
										strokeWidth: 2,
										dot: { r: 3 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "HeartRate",
										stroke: "#3B82F6",
										strokeWidth: 2,
										dot: { r: 3 }
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Bio-insights Engine" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl glass p-5 mb-6 border border-border shadow-card relative overflow-hidden flex gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 h-24 w-24 bg-gradient-brand opacity-10 blur-xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-semibold text-foreground",
						children: "Recovery Rhythm Analysis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1 leading-relaxed",
						children: [
							"Your Heart Rate Variability (HRV) is trending upwards at ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								"+",
								latestLog.hrv - 60,
								"ms"
							] }),
							" consistency. This indicates that your parasympathetic nervous system is active and recovery cycles are performing extremely well. Weight has decreased by ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [weightChange.val, " kg"] }),
							". Body Fat is resting at ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [latestLog.bodyFat, "%"] }),
							", which matches your moderate fat loss path."
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: logModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setLogModalOpen(false),
					className: "fixed inset-0 bg-black/80 backdrop-blur-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95,
						y: 15
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						scale: .95,
						y: 15
					},
					className: "relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Log Today's Vitals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setLogModalOpen(false),
							className: "p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogMetrics,
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								required: true,
								value: logDate,
								onChange: (e) => setLogDate(e.target.value),
								className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Weight (kg)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.1",
									required: true,
									value: weight,
									onChange: (e) => setWeight(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Body Fat (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.1",
									required: true,
									value: bodyFat,
									onChange: (e) => setBodyFat(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Heart Rate (bpm)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: heartRate,
									onChange: (e) => setHeartRate(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "HRV Score (ms)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: hrv,
									onChange: (e) => setHrv(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
								children: "Water Intake (Liters)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.1",
								required: true,
								value: water,
								onChange: (e) => setWater(Number(e.target.value)),
								className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow cursor-pointer",
								children: "Log Vital Records"
							})
						]
					})]
				})]
			}) })
		]
	});
}
//#endregion
export { HealthPage as component };
