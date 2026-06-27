import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { C as Plus, D as Moon, Z as Clock, f as Sunrise, h as Sparkles, n as X, z as Heart } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, r as StatCard, t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, o as Area, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sleep-H1y9ccVw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SleepPage() {
	const [userId, setUserId] = (0, import_react.useState)("");
	const [sleeps, setSleeps] = (0, import_react.useState)([]);
	const [onboardOpen, setOnboardOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)("");
	const getTodayDate = () => (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const [bedtime, setBedtime] = (0, import_react.useState)("22:30");
	const [wakeTime, setWakeTime] = (0, import_react.useState)("06:30");
	const [quality, setQuality] = (0, import_react.useState)(85);
	const [restingHeartRate, setRestingHeartRate] = (0, import_react.useState)(58);
	const [logDate, setLogDate] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setLogDate(getTodayDate());
		const loadSessionAndData = async () => {
			const { data } = await auth.getSession();
			if (data.session) {
				setUserId(data.session.user.id);
				setSleeps(await db.getSleepLogs(data.session.user.id));
			}
		};
		loadSessionAndData();
		const openHandler = () => setOnboardOpen(true);
		window.addEventListener("zenvita:open-sleep-log", openHandler);
		return () => {
			window.removeEventListener("zenvita:open-sleep-log", openHandler);
		};
	}, []);
	const lastNight = sleeps.length > 0 ? [...sleeps].sort((a, b) => b.date.localeCompare(a.date))[0] : void 0;
	sleeps.length > 0 && parseFloat((sleeps.reduce((sum, s) => sum + s.duration, 0) / sleeps.length).toFixed(1));
	const averageQuality = sleeps.length > 0 ? Math.round(sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length) : 0;
	const averageRHR = sleeps.length > 0 ? Math.round(sleeps.reduce((sum, s) => sum + s.restingHeartRate, 0) / sleeps.length) : 0;
	const calculateConsistency = () => {
		if (sleeps.length < 2) return "Establishing";
		const times = sleeps.map((s) => {
			const [h, m] = s.bedtime.split(":").map(Number);
			return h < 12 ? h + 24 + m / 60 : h + m / 60;
		});
		const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length;
		const variance = times.reduce((sum, t) => sum + Math.pow(t - avgTime, 2), 0) / times.length;
		if (variance < .25) return "Excellent";
		if (variance < 1) return "Optimal";
		return "Variable";
	};
	const consistency = calculateConsistency();
	const generateSleepInsight = () => {
		if (sleeps.length === 0) return "Log sleep metrics for a few days to compute AI recovery trends.";
		const earlyBedtimeSleeps = sleeps.filter((s) => {
			const [h] = s.bedtime.split(":").map(Number);
			return h >= 21 && h < 23;
		});
		if (earlyBedtimeSleeps.length > 0) {
			const avgEarlyQuality = earlyBedtimeSleeps.reduce((sum, s) => sum + s.quality, 0) / earlyBedtimeSleeps.length;
			const otherSleeps = sleeps.filter((s) => {
				const [h] = s.bedtime.split(":").map(Number);
				return h >= 23 || h < 6;
			});
			if (avgEarlyQuality > (otherSleeps.length > 0 ? otherSleeps.reduce((sum, s) => sum + s.quality, 0) / otherSleeps.length : 0)) return "You sleep best when you go to bed before 11 PM. Your REM phase is 14% longer on those nights.";
		}
		if (averageRHR > 65) return "Your Resting Heart Rate is elevated. Avoid eating within 3 hours of sleep to improve recovery score.";
		return "Bedtime consistency is excellent. Maintain this rhythm to optimize growth hormone release cycles.";
	};
	const sleepInsight = generateSleepInsight();
	const calculateDuration = (bed, wake) => {
		const [bh, bm] = bed.split(":").map(Number);
		const [wh, wm] = wake.split(":").map(Number);
		let diff = wh + wm / 60 - (bh + bm / 60);
		if (diff < 0) diff += 24;
		return parseFloat(diff.toFixed(2));
	};
	const handleLogSleep = async (e) => {
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
				date: logDate
			});
			await db.addNotification({
				userId: activeUserId,
				title: "Sleep Tracked",
				message: `Sleep logged for ${logDate}. Quality scored at ${quality}% (${duration} hours).`,
				type: "sleep"
			});
			setSleeps((s) => {
				return [...s.filter((item) => item.date !== logDate), newLog].sort((a, b) => a.date.localeCompare(b.date));
			});
			setOnboardOpen(false);
			setLogDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
			setBedtime("22:30");
			setWakeTime("06:30");
			setQuality(85);
			setRestingHeartRate(58);
			setSuccessMsg("Sleep session logged");
			setTimeout(() => setSuccessMsg(""), 2500);
		} catch (err) {
			console.error("Error logging sleep:", err);
			setSuccessMsg("Failed to log. Try again.");
			setTimeout(() => setSuccessMsg(""), 3e3);
		} finally {
			setSaving(false);
		}
	};
	const chartData = sleeps.map((s) => ({
		date: (/* @__PURE__ */ new Date(s.date + "T00:00:00")).toLocaleDateString("en-US", { weekday: "short" }),
		Quality: s.quality,
		Hours: s.duration
	}));
	const stages = [
		{
			name: "Deep",
			pct: lastNight ? 22 : 0,
			color: "#c2410c"
		},
		{
			name: "REM",
			pct: lastNight ? 28 : 0,
			color: "#e85d2f"
		},
		{
			name: "Light",
			pct: lastNight ? 44 : 0,
			color: "#ff7a3d"
		},
		{
			name: "Awake",
			pct: lastNight ? 6 : 0,
			color: "var(--muted-foreground)"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: "Recover deeper",
		title: "Sleep",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl glass-strong p-6 mb-6 relative overflow-hidden border border-border shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-12 h-44 w-44 rounded-full bg-gradient-brand opacity-20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
								children: "Last night"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-[Instrument_Serif] text-5xl mt-1 text-foreground",
								children: lastNight ? `${Math.floor(lastNight.duration)}h ${Math.round(lastNight.duration % 1 * 60)}m` : "No log"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1.5 font-medium",
								children: lastNight ? `Quality ${lastNight.quality} · Restful` : "Tap '+' to log sleep session"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOnboardOpen(true),
							className: "grid h-11 w-11 place-items-center rounded-full bg-gradient-brand shadow-glow text-white hover:opacity-95 active:scale-95 transition-all cursor-pointer z-40",
							"aria-label": "Log sleep",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
						})]
					}),
					lastNight && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5.5 flex h-3.5 w-full overflow-hidden rounded-full shadow-inner",
						children: stages.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							width: `${s.pct}%`,
							background: s.color
						} }, s.name))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3.5 grid grid-cols-4 gap-2 text-[10px] font-semibold",
						children: stages.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-2 w-2 rounded-full",
								style: { background: s.color }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: s.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-foreground mt-1 pl-3.5",
							children: [s.pct, "%"]
						})] }, s.name))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Bedtime",
						value: lastNight?.bedtime || "--:--",
						unit: lastNight ? "PM" : "",
						icon: Moon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Avg Quality",
						value: averageQuality > 0 ? `${averageQuality}%` : "--",
						icon: Sunrise
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Resting HR",
						value: lastNight?.restingHeartRate || averageRHR || "--",
						unit: "bpm",
						icon: Heart
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Bedtime Consistency",
						value: consistency,
						icon: Clock
					})
				]
			}),
			sleeps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass p-5 mb-6 border border-border shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Sleep Duration (Hours)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44 w-full mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
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
										tickLine: false,
										domain: [0, 12]
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
										},
										formatter: (value) => [`${value}h`, "Duration"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "Hours",
										fill: "#e85d2f",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass p-5 mb-6 border border-border shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "7-Day Sleep Trends" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-52 w-full mt-3",
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
										id: "colorQuality",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "#ff7a3d",
											stopOpacity: .3
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
										domain: [40, 100]
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
										dataKey: "Quality",
										stroke: "#e85d2f",
										strokeWidth: 2,
										fillOpacity: 1,
										fill: "url(#colorQuality)"
									})
								]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Sleep Log History" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 mb-6",
					children: [...sleeps].sort((a, b) => b.date.localeCompare(a.date)).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl glass p-4 border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: (/* @__PURE__ */ new Date(log.date + "T00:00:00")).toLocaleDateString("en-US", {
									weekday: "short",
									month: "short",
									day: "numeric"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: [
									log.bedtime,
									" → ",
									log.wakeTime,
									" · Quality ",
									log.quality,
									"%"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-[Instrument_Serif] text-2xl text-foreground",
									children: [
										Math.floor(log.duration),
										"h ",
										Math.round(log.duration % 1 * 60),
										"m"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-muted-foreground",
									children: [log.restingHeartRate, " bpm"]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-2 rounded-full bg-muted overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gradient-brand",
								style: { width: `${Math.min(100, log.duration / 10 * 100)}%` }
							})
						})]
					}, log.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Sleep Recovery Insights" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl glass p-4 mb-6 border border-border shadow-card flex gap-3.5 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--brand)]/10 blur-xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shrink-0 text-white shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4.5 w-4.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "Sleep Consistency Report"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1 leading-relaxed",
						children: sleepInsight
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Wind-down routine" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: [
					"Breathwork · 5 min",
					"Sleep story · The Forest",
					"Magnesium reminder · 9:30 PM"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl glass p-4 text-xs font-semibold text-foreground border border-border hover:border-[var(--brand)]/20 hover:bg-muted/50 transition-all cursor-pointer",
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: onboardOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setOnboardOpen(false),
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
					onClick: (e) => e.stopPropagation(),
					className: "relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Log Sleep Session"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOnboardOpen(false),
							className: "p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogSleep,
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
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Bedtime"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									required: true,
									value: bedtime,
									onChange: (e) => setBedtime(e.target.value),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Wake Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									required: true,
									value: wakeTime,
									onChange: (e) => setWakeTime(e.target.value),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Sleep Quality (0-100)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									min: "0",
									max: "100",
									value: quality,
									onChange: (e) => setQuality(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Resting Heart Rate (bpm)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									min: "30",
									max: "120",
									value: restingHeartRate,
									onChange: (e) => setRestingHeartRate(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: saving,
								className: `w-full mt-4 rounded-xl py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow ${saving ? "opacity-70 cursor-wait bg-[var(--brand)]" : "bg-gradient-brand"}`,
								children: saving ? "Logging..." : "Log Session"
							}),
							successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-emerald-400 font-semibold mt-3 text-center",
								children: successMsg
							})
						]
					})]
				})]
			}) })
		]
	});
}
//#endregion
export { SleepPage as component };
