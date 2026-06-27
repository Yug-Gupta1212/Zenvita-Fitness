import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { C as Plus, D as Moon, H as Footprints, J as Download, O as Minus, U as Flame, Z as Clock, _ as Share2, at as Award, c as TrendingUp, ct as Activity, d as Target, et as ChevronRight, h as Sparkles, n as X, q as Droplet, t as Zap, w as Play, z as Heart } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, r as StatCard, t as AppShell } from "./AppShell-5p7JScr3.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CjJl7eTy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HealthWrap({ isOpen, onClose }) {
	const triggerConfetti = () => {
		confetti_module_default({
			particleCount: 80,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: ["#ff7a3d", "#ffffff"]
		});
		confetti_module_default({
			particleCount: 80,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: ["#e85d2f", "#ffffff"]
		});
	};
	const handleDownload = () => {
		const data = `
=============================
   MY ZENVITA HEALTH WRAP
=============================
🏆 Workouts: 5 completed
🔥 Calories: 2,100 kcal burned
⚡ Best Streak: 7 Days
💤 Sleep Quality: 88% average
🥗 Nutrition consistency: 94%
=============================
"Your Health. Understood. Predicted. Improved."
    `.trim();
		const blob = new Blob([data], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `zenvita_weekly_wrap.txt`;
		a.click();
		triggerConfetti();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: onClose,
			className: "fixed inset-0 bg-black/85 backdrop-blur-md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .9,
				y: 30
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .9,
				y: 30
			},
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 200
			},
			className: "relative w-full max-w-[450px] bg-[var(--modal-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-colors duration-300 z-10 p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-40 bg-gradient-brand opacity-10 blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--glass-bg-hover)] text-muted-foreground hover:text-foreground transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.25em] text-[var(--brand)] font-bold",
							children: "Weekly wrap summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-[Instrument_Serif] text-4xl text-foreground mt-1",
							children: "Zenvita Vitality Wrap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1 max-w-[280px]",
							children: "Your activity, recovery and hydration compiled by AI."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 rounded-2xl bg-gradient-to-b from-[var(--glass-strong-bg)] to-[var(--glass-bg)] border border-[var(--glass-border)] p-5 relative overflow-hidden text-left shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-100px] right-[-100px] h-48 w-48 rounded-full bg-[var(--brand)]/10 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-4 pb-3 border-b border-[var(--glass-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-[Instrument_Serif] text-lg text-foreground",
								children: "Alex Morgan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] uppercase tracking-widest text-muted-foreground font-semibold",
								children: "June 2026"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4.5 w-4.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Workouts"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-foreground mt-0.5",
										children: "5 completed"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4.5 w-4.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Calories"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-foreground mt-0.5",
										children: "2,100 kcal"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4.5 w-4.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Best Streak"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-foreground mt-0.5",
										children: "7 Days"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4.5 w-4.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Sleep Quality"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-foreground mt-0.5",
										children: "88% average"
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 pt-4 border-t border-[var(--glass-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground italic leading-relaxed",
								children: "\"Outstanding nutrition consistency: 94% macro accuracy kept metabolic rate elevated throughout the week.\""
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleDownload,
						className: "flex-1 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] text-foreground py-3 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download Report"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							triggerConfetti();
							if (navigator.share) navigator.share({
								title: "My Zenvita Health Wrap",
								text: "Logged 5 workouts and achieved 88% sleep consistency this week on Zenvita!",
								url: window.location.origin
							}).catch(console.error);
							else alert("Share link copied to clipboard!");
						},
						className: "flex-1 rounded-xl bg-gradient-brand text-white py-3 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-glow hover:opacity-95 active:scale-95 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Share Wrap"]
					})]
				})
			]
		})]
	}) });
}
function HomePage() {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [userId, setUserId] = (0, import_react.useState)("");
	const [meals, setMeals] = (0, import_react.useState)([]);
	const [sleeps, setSleeps] = (0, import_react.useState)([]);
	const [water, setWater] = (0, import_react.useState)(1.8);
	const [wrapOpen, setWrapOpen] = (0, import_react.useState)(false);
	const [caloriesBurned, setCaloriesBurned] = (0, import_react.useState)(420);
	const [stepsCount, setStepsCount] = (0, import_react.useState)(8412);
	const [heartRate, setHeartRate] = (0, import_react.useState)(68);
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
	const calorieGoal = 2400;
	const proteinGoal = profile?.fitnessGoal === "build_muscle" ? 150 : 120;
	const carbGoal = 250;
	const fatGoal = 70;
	const totalCaloriesConsumed = meals.reduce((sum, m) => sum + m.calories, 0);
	const totalProteinConsumed = meals.reduce((sum, m) => sum + m.protein, 0);
	const totalCarbsConsumed = meals.reduce((sum, m) => sum + m.carbs, 0);
	const totalFatsConsumed = meals.reduce((sum, m) => sum + m.fats, 0);
	const calculateHealthScore = () => {
		let score = 50;
		if (sleeps.length > 0) {
			const avgSleepQuality = sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length;
			score += avgSleepQuality / 100 * 20;
		} else score += 15;
		const waterRatio = Math.min(1, water / 3);
		score += waterRatio * 10;
		const calDiff = Math.abs(totalCaloriesConsumed - calorieGoal);
		if (calDiff < 200) score += 10;
		else if (calDiff < 500) score += 7;
		else if (calDiff < 800) score += 4;
		const workoutPct = Math.min(1, (profile?.workoutsCount || 0) / 10);
		score += workoutPct * 10;
		return Math.min(100, Math.round(score));
	};
	const healthScore = calculateHealthScore();
	const generateInsight = () => {
		if (sleeps.length > 0 && sleeps[sleeps.length - 1].quality < 80) return {
			title: "Prioritize Deep Sleep tonight",
			desc: `Your last sleep quality was ${sleeps[sleeps.length - 1].quality}%. Try shifting bedtime 30 minutes earlier to align with your REM consistency goal.`
		};
		if (totalCaloriesConsumed > 0 && totalProteinConsumed < proteinGoal * .5) return {
			title: "Increase Protein Intake",
			desc: `You have consumed ${totalProteinConsumed}g / ${proteinGoal}g protein. Adding eggs or Greek yogurt to snacks will help support muscle recovery.`
		};
		if (water < 2) return {
			title: "Hydration levels are low",
			desc: `You are at ${water}L today. Dehydration impacts cardiovascular efficiency. Drink 2 glasses of water before your next workout.`
		};
		return {
			title: "Recovery state is optimal",
			desc: "Your HRV and sleep cycles are perfectly aligned. This is a great day to attempt high-intensity cardio or load progression in lifting."
		};
	};
	const insight = generateInsight();
	const addWater = () => setWater((w) => parseFloat((w + .25).toFixed(2)));
	const subWater = () => setWater((w) => parseFloat(Math.max(0, w - .25).toFixed(2)));
	const lastSleep = sleeps[sleeps.length - 1];
	const sleepHours = lastSleep ? Math.floor(lastSleep.duration) : 7;
	const sleepMins = lastSleep ? Math.round(lastSleep.duration % 1 * 60) : 42;
	const nutritionData = [
		{
			label: "Protein",
			value: totalProteinConsumed,
			max: proteinGoal,
			color: "#e85d2f"
		},
		{
			label: "Carbs",
			value: totalCarbsConsumed,
			max: carbGoal,
			color: "#ff7a3d"
		},
		{
			label: "Fats",
			value: totalFatsConsumed,
			max: fatGoal,
			color: "#c2410c"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: `Good morning, ${profile?.name?.split(" ")?.[0] || "User"} 👋`,
		title: "Today's Pulse",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3 relative overflow-hidden rounded-3xl glass-strong p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-brand opacity-20 blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
								children: "Vitality Score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, { value: healthScore }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-[Instrument_Serif] text-2xl leading-none text-foreground",
										children: healthScore >= 90 ? "Excellent" : healthScore >= 80 ? "Optimal" : healthScore >= 70 ? "Good" : "Fair"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 text-[var(--brand)]" }),
											heartRate,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground/60",
												children: "bpm"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] text-muted-foreground mt-0.5",
										children: "↑ 6 from yesterday"
									})
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Steps",
							value: stepsCount.toLocaleString(),
							unit: "/ 10,000 steps",
							icon: Footprints
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Calories",
							value: `${totalCaloriesConsumed > 0 ? totalCaloriesConsumed.toLocaleString() : "1,840"}`,
							unit: `/ ${calorieGoal.toLocaleString()} kcal`,
							icon: Flame,
							accent: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							whileHover: { y: -4 },
							className: "relative overflow-hidden rounded-2xl p-4 glass border border-border shadow-card h-full flex flex-col justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground font-semibold",
										children: "Sleep"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4.5 w-4.5 text-indigo-400" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex items-baseline gap-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-2xl font-semibold text-foreground",
										children: [
											sleepHours,
											"h ",
											sleepMins,
											"m"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-emerald-500 font-semibold mt-1",
									children: "Good Quality"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Today's Workout",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/workouts",
							className: "text-xs text-[var(--brand)] inline-flex items-center gap-1 font-semibold",
							children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/workouts/$id",
						params: { id: "hiit-inferno" },
						className: "relative block overflow-hidden rounded-2xl border border-border shadow-card h-[200px] group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105",
								style: {
									backgroundImage: "url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80)",
									filter: "brightness(0.45)"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-full flex flex-col justify-end p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-white/80 font-bold tracking-wider uppercase",
										children: "HIIT Inferno"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-[Instrument_Serif] text-2xl mt-0.5 text-white",
										children: "20 min — 360 kcal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-brand text-white text-xs font-semibold shadow-glow hover:opacity-90 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
												className: "h-3.5 w-3.5",
												fill: "white"
											}), " Start Workout"]
										})
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Nutrition Summary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl glass p-5 border border-border shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-28 w-28 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutritionDonut, {
									calories: totalCaloriesConsumed > 0 ? totalCaloriesConsumed : 1840,
									goal: calorieGoal,
									macros: nutritionData
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground font-bold",
										children: "Calories"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-bold text-foreground",
										children: [
											totalCaloriesConsumed > 0 ? totalCaloriesConsumed.toLocaleString() : "1,840",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-muted-foreground font-normal",
												children: [
													"(",
													calorieGoal.toLocaleString(),
													" kcal)"
												]
											})
										]
									})]
								}), nutritionData.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-2 w-2 rounded-full shrink-0",
											style: { background: m.color }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground font-semibold w-14",
											children: m.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex-1 h-1.5 rounded-full bg-muted overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full",
												style: {
													width: `${Math.min(100, m.value / m.max * 100)}%`,
													background: m.color
												}
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-foreground font-semibold w-16 text-right",
											children: [
												m.value,
												"g / ",
												m.max,
												"g"
											]
										})
									]
								}, m.label))]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "AI Insight" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl glass p-4 border border-border shadow-card flex gap-3.5 relative overflow-hidden h-[calc(100%-2rem)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--brand)]/10 blur-xl pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shrink-0 text-white shadow-glow mt-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4.5 w-4.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
									children: insight.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1 leading-relaxed font-semibold",
									children: insight.desc
								})] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Hydration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							whileHover: { y: -2 },
							className: "relative overflow-hidden rounded-2xl p-4 glass border border-border shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-5 w-5 text-sky-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: subWater,
											className: "grid place-items-center h-7 w-7 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border active:scale-95 transition-all text-xs cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: addWater,
											className: "grid place-items-center h-7 w-7 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 active:scale-95 text-sky-500 border border-sky-500/20 transition-all text-xs cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl font-semibold text-foreground",
										children: water
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground font-semibold",
										children: "L / 3.0L"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-sky-400 rounded-full",
										style: { width: `${Math.min(100, water / 3 * 100)}%` }
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Streak" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl glass p-4 border border-border shadow-card text-center relative overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-brand opacity-15 blur-2xl pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl",
										children: "🔥"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-[Instrument_Serif] text-3xl text-foreground mt-1 font-bold",
										children: [profile?.streak || 7, " Days Streak"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground font-semibold mt-1",
										children: "Keep it going!"
									})
								]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl glass p-4 mb-6 border border-[var(--brand)]/20 shadow-card flex items-center justify-between relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 h-16 w-16 bg-[var(--brand)]/5 blur-xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4.5 w-4.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-foreground",
							children: "Your Weekly Vitality Wrap is ready"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground mt-0.5 font-semibold",
							children: "Explore sleep and workout consistency reports."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setWrapOpen(true),
						className: "text-[10px] bg-gradient-brand text-white font-bold px-3 py-1.5 rounded-full hover:opacity-95 transition-all cursor-pointer",
						children: "View Report"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Goals & Streaks" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: [
					{
						icon: Target,
						label: "Workouts streak",
						value: profile?.streak || 0,
						max: 7,
						unit: "days"
					},
					{
						icon: Activity,
						label: "Total workouts",
						value: profile?.workoutsCount || 0,
						max: 30,
						unit: "completed"
					},
					{
						icon: TrendingUp,
						label: "Daily Protein Progress",
						value: totalProteinConsumed,
						max: proteinGoal,
						unit: "g"
					}
				].map((g) => {
					const pct = Math.min(100, Math.round(g.value / g.max * 100));
					const Icon = g.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl glass p-4 border border-border shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5 text-[var(--brand)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-foreground font-bold",
									children: g.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-muted-foreground font-semibold",
								children: [
									g.value,
									" / ",
									g.max,
									" ",
									g.unit
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 rounded-full bg-muted overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-gradient-brand",
								style: { width: `${pct}%` }
							})
						})]
					}, g.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthWrap, {
				isOpen: wrapOpen,
				onClose: () => setWrapOpen(false)
			})
		]
	});
}
function ScoreRing({ value }) {
	const r = 38;
	const c = 2 * Math.PI * r;
	const [offset, setOffset] = (0, import_react.useState)(c);
	(0, import_react.useEffect)(() => {
		const animatedOffset = c - value / 100 * c;
		const t = setTimeout(() => {
			setOffset(animatedOffset);
		}, 200);
		return () => clearTimeout(t);
	}, [value, c]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-24 w-24 shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "h-24 w-24 -rotate-90",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r,
					fill: "none",
					stroke: "var(--border)",
					strokeWidth: "7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: "50",
					cy: "50",
					r,
					fill: "none",
					stroke: "url(#g)",
					strokeWidth: "7",
					strokeLinecap: "round",
					strokeDasharray: c,
					initial: { strokeDashoffset: c },
					animate: { strokeDashoffset: offset },
					transition: {
						duration: 1,
						ease: "easeOut"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "g",
					x1: "0",
					x2: "1",
					y1: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#ff7a3d"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#e85d2f"
					})]
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					opacity: 0,
					scale: .5
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .5,
					delay: .2
				},
				className: "font-[Instrument_Serif] text-4xl text-foreground font-bold",
				children: value
			})
		})]
	});
}
/** Nutrition Donut Chart Component */
function NutritionDonut({ calories, goal, macros }) {
	const r = 42;
	const c = 2 * Math.PI * r;
	const pct = Math.min(100, calories / goal * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-28 w-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "h-28 w-28 -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r,
				fill: "none",
				stroke: "var(--border)",
				strokeWidth: "8"
			}), macros.map((m, i) => {
				const segPct = m.max > 0 ? m.value / goal * 100 : 0;
				const prevPcts = macros.slice(0, i).reduce((sum, pm) => sum + (pm.max > 0 ? pm.value / goal * 100 : 0), 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: "50",
					cy: "50",
					r,
					fill: "none",
					stroke: m.color,
					strokeWidth: "8",
					strokeLinecap: "round",
					strokeDasharray: c,
					initial: { strokeDashoffset: c },
					animate: { strokeDashoffset: c - segPct / 100 * c },
					transition: {
						duration: 1,
						ease: "easeOut",
						delay: i * .15
					},
					style: {
						transform: `rotate(${prevPcts / 100 * 360}deg)`,
						transformOrigin: "50% 50%"
					}
				}, m.label);
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-[Instrument_Serif] text-lg text-foreground font-bold leading-none",
					children: [Math.round(pct), "%"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[8px] text-muted-foreground mt-0.5",
					children: "of goal"
				})]
			})
		})]
	});
}
//#endregion
export { HomePage as component };
