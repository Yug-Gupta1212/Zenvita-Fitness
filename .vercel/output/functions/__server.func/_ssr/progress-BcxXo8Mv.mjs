import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { J as Download, Q as CircleCheck, at as Award, m as Star } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, o as Area, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-BcxXo8Mv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProgressPage() {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [meals, setMeals] = (0, import_react.useState)([]);
	const [sleeps, setSleeps] = (0, import_react.useState)([]);
	const [userId, setUserId] = (0, import_react.useState)("");
	const getDeterministicValue = (seed, min, max) => min + (seed * 37 + 11) % (max - min + 1);
	(0, import_react.useEffect)(() => {
		const loadSessionAndData = async () => {
			const { data } = await auth.getSession();
			if (data.session) {
				setProfile(data.session.profile);
				setUserId(data.session.user.id);
				setMeals(await db.getMeals(data.session.user.id));
				setSleeps(await db.getSleepLogs(data.session.user.id));
			}
		};
		loadSessionAndData();
	}, []);
	const last7DaysData = Array.from({ length: 7 }).map((_, i) => {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() - (6 - i));
		const dateStr = date.toISOString().split("T")[0];
		const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
		const dayMeals = meals.filter((m) => m.createdAt.startsWith(dateStr));
		const consumed = dayMeals.length > 0 ? dayMeals.reduce((sum, m) => sum + m.calories, 0) : 1600 + getDeterministicValue(i + 1, 0, 800);
		sleeps.find((s) => s.date === dateStr);
		return {
			name: dayName,
			Consumed: consumed,
			Burned: i % 2 === 0 || i === 6 ? 2200 + getDeterministicValue(i + 3, 0, 200) : 1800 + getDeterministicValue(i + 7, 0, 150)
		};
	});
	const calendarDays = Array.from({ length: 21 }).map((_, i) => {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() - (20 - i));
		const dateStr = date.toISOString().split("T")[0];
		const dayLabel = date.getDate().toString();
		const daySleep = sleeps.find((s) => s.date === dateStr);
		const totalCal = meals.filter((m) => m.createdAt.startsWith(dateStr)).reduce((sum, m) => sum + m.calories, 0);
		return {
			dateStr,
			dayLabel,
			workout: i % 3 !== 0,
			nutrition: totalCal > 1500 || i % 2 === 0,
			sleep: daySleep ? daySleep.quality >= 80 : i % 2 !== 0
		};
	});
	const badges = [
		{
			name: "First Step",
			desc: "Log at least 1 workout session",
			achieved: (profile?.workoutsCount || 0) >= 1,
			date: "June 14, 2026"
		},
		{
			name: "Consistency Hero",
			desc: "Maintain a 5-day streak",
			achieved: (profile?.streak || 0) >= 5,
			date: "June 18, 2026"
		},
		{
			name: "Iron Master",
			desc: "Complete 10 strength/cardio routines",
			achieved: (profile?.workoutsCount || 0) >= 10,
			date: "June 20, 2026"
		},
		{
			name: "Macro Pioneer",
			desc: "Track calories & macros properly",
			achieved: true,
			date: "June 15, 2026"
		},
		{
			name: "Sleep Champion",
			desc: "Sleep 8+ hours with 90%+ quality",
			achieved: sleeps.some((s) => s.quality >= 90),
			date: "June 19, 2026"
		},
		{
			name: "Hydration Master",
			desc: "Drink 3.0L water in a single day",
			achieved: true,
			date: "June 17, 2026"
		}
	];
	const handleExportData = () => {
		const data = {};
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith("zenvita_")) data[key] = localStorage.getItem(key);
		}
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `zenvita_progress_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
		a.click();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: "Analyze health history",
		title: "Progress & Goals",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl glass-strong p-6 mb-6 relative overflow-hidden border border-border shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-brand opacity-20 blur-2xl pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
							children: "Active Streak"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-[Instrument_Serif] text-4xl text-foreground mt-1 font-bold",
							children: [profile?.streak || 0, "d"]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-x border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
								children: "Total Routines"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-[Instrument_Serif] text-4xl text-foreground mt-1 font-bold",
								children: profile?.workoutsCount || 0
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
							children: "Goal Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-[Instrument_Serif] text-4xl text-[var(--brand)] mt-1 font-bold",
							children: "88%"
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl glass p-5 mb-6 border border-border shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Calorie Balance vs Burned (7 days)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-52 w-full mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: last7DaysData,
							margin: {
								top: 5,
								right: 5,
								left: -25,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "colorConsumed",
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
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "colorBurned",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "5%",
										stopColor: "#3B82F6",
										stopOpacity: .2
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "95%",
										stopColor: "#3B82F6",
										stopOpacity: 0
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									name: "Consumed",
									dataKey: "Consumed",
									stroke: "#ff7a3d",
									strokeWidth: 2,
									fillOpacity: 1,
									fill: "url(#colorConsumed)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									name: "Burned",
									dataKey: "Burned",
									stroke: "#3B82F6",
									strokeWidth: 2,
									fillOpacity: 1,
									fill: "url(#colorBurned)"
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl glass p-5 mb-6 border border-border shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Goal Consistency Grid",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 text-[9px] font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-orange-400" }), "Workout"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-green-400" }), "Food"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-blue-400" }), "Sleep"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground mb-4",
						children: "A visualization of goals completed during your active streak timeline."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-2.5 max-w-md mx-auto py-2",
						children: calendarDays.map((day, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aspect-square rounded-xl bg-muted border border-border flex flex-col items-center justify-between p-1.5 relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-muted-foreground font-semibold self-start",
								children: day.dayLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-0.5 justify-center mt-1",
								children: [
									day.workout && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-orange-400 shadow-glow" }),
									day.nutrition && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-glow" }),
									day.sleep && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-sky-400 shadow-glow" })
								]
							})]
						}, idx))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Achievements & Badges" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-3 mb-6",
				children: badges.map((badge, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-3.5 p-4 rounded-2xl border transition-all ${badge.achieved ? "bg-[var(--brand)]/[0.03] border-[var(--brand)]/15" : "bg-muted/50 border-border opacity-50"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `grid h-11 w-11 place-items-center rounded-xl shrink-0 ${badge.achieved ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-muted-foreground"}`,
						children: badge.achieved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 fill-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-foreground truncate",
									children: badge.name
								}), badge.achieved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-400 shrink-0" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9px] text-muted-foreground truncate mt-0.5",
								children: badge.desc
							}),
							badge.achieved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[8px] text-[var(--brand)] font-semibold mt-1",
								children: ["Unlocked ", badge.date]
							})
						]
					})]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl glass p-4 border border-border flex items-center justify-between shadow-card mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4.5 w-4.5 text-[var(--brand)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-foreground font-semibold",
						children: "Export Progress Ledger"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleExportData,
					className: "text-[10px] bg-gradient-brand text-white font-bold px-4 py-2 rounded-full hover:opacity-95 transition-all shadow-glow cursor-pointer",
					children: "Export JSON"
				})]
			})
		]
	});
}
//#endregion
export { ProgressPage as component };
