import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { K as Dumbbell, Q as CircleCheck, U as Flame, at as Award, h as Sparkles, ot as ArrowLeft, u as Timer, w as Play, z as Heart } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
import { t as Route } from "./workouts._id-D2PV9Vpt.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workouts._id-DzApqnpt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var exerciseDataMap = {
	Strength: [
		{
			name: "Push-ups",
			sets: 4,
			reps: "12",
			rest: "45s"
		},
		{
			name: "Barbell Bench Press",
			sets: 4,
			reps: "8-10",
			rest: "60s"
		},
		{
			name: "Overhead Shoulder Press",
			sets: 3,
			reps: "10",
			rest: "45s"
		},
		{
			name: "Incline Dumbbell Flys",
			sets: 3,
			reps: "12",
			rest: "45s"
		},
		{
			name: "Dumbbell Lateral Raises",
			sets: 3,
			reps: "15",
			rest: "30s"
		},
		{
			name: "Bodyweight Tricep Dips",
			sets: 3,
			reps: "12",
			rest: "30s"
		}
	],
	Cardio: [
		{
			name: "High Knee Runs",
			sets: 3,
			reps: "45s",
			rest: "15s"
		},
		{
			name: "Mountain Climbers",
			sets: 3,
			reps: "40s",
			rest: "20s"
		},
		{
			name: "Jumping Jacks",
			sets: 3,
			reps: "60s",
			rest: "15s"
		},
		{
			name: "Burpees",
			sets: 3,
			reps: "30s",
			rest: "30s"
		},
		{
			name: "Fast Skaters",
			sets: 3,
			reps: "45s",
			rest: "15s"
		}
	],
	Yoga: [
		{
			name: "Sun Salutation A",
			sets: 3,
			reps: "Flow",
			rest: "15s"
		},
		{
			name: "Warrior II Pose",
			sets: 2,
			reps: "Hold 30s",
			rest: "10s"
		},
		{
			name: "Downward Facing Dog",
			sets: 2,
			reps: "Hold 45s",
			rest: "15s"
		},
		{
			name: "Child's Pose Recovery",
			sets: 1,
			reps: "Hold 60s",
			rest: "0s"
		},
		{
			name: "Savasana Integration",
			sets: 1,
			reps: "Hold 3m",
			rest: "0s"
		}
	],
	Core: [
		{
			name: "Forearm Plank",
			sets: 3,
			reps: "60s",
			rest: "30s"
		},
		{
			name: "Bicycle Crunches",
			sets: 3,
			reps: "20 reps",
			rest: "15s"
		},
		{
			name: "Hollow Body Hold",
			sets: 3,
			reps: "30s",
			rest: "30s"
		},
		{
			name: "Russian Twists",
			sets: 3,
			reps: "24 reps",
			rest: "15s"
		},
		{
			name: "Superman Extension",
			sets: 3,
			reps: "15 reps",
			rest: "20s"
		}
	]
};
var recommendationsMap = {
	Strength: [
		{
			name: "Upper Body Hypertrophy Primer",
			duration: "5 min",
			type: "Warm-up"
		},
		{
			name: "Rotator Cuff Dynamic Stability",
			duration: "6 min",
			type: "Mobility"
		},
		{
			name: "Chest & Triceps Static Stretching",
			duration: "8 min",
			type: "Flexibility"
		}
	],
	Cardio: [
		{
			name: "Ankle & Calf Dynamic Release",
			duration: "4 min",
			type: "Mobility"
		},
		{
			name: "Post-HIIT Controlled Breathing",
			duration: "5 min",
			type: "Breathing"
		},
		{
			name: "Leg & Hip Flexor Static Stretch",
			duration: "8 min",
			type: "Recovery"
		}
	],
	Yoga: [
		{
			name: "Dynamic Flexibility Routine",
			duration: "10 min",
			type: "Flexibility"
		},
		{
			name: "Deep Hip & Hamstring Opening",
			duration: "8 min",
			type: "Mobility"
		},
		{
			name: "Ujjayi Breathwork Activation",
			duration: "5 min",
			type: "Breathing"
		}
	],
	Core: [
		{
			name: "Lower Back Lumbar Support Flow",
			duration: "6 min",
			type: "Mobility"
		},
		{
			name: "Cat-Cow Spine Warm-up",
			duration: "3 min",
			type: "Warm-up"
		},
		{
			name: "Cored form adjustments tutorial",
			duration: "Read",
			type: "Tip"
		}
	]
};
function WorkoutDetail() {
	const { workout } = Route.useLoaderData();
	const [userId, setUserId] = (0, import_react.useState)("");
	const [sessionState, setSessionState] = (0, import_react.useState)("idle");
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const categoryRecs = recommendationsMap[workout.type] || recommendationsMap["Strength"];
	const exercises = exerciseDataMap[workout.type] || exerciseDataMap["Strength"];
	(0, import_react.useEffect)(() => {
		auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
		let timer;
		if (sessionState === "active") timer = setInterval(() => {
			setElapsed((e) => e + 1);
		}, 1e3);
		return () => clearInterval(timer);
	}, [sessionState]);
	const handleStartWorkout = () => {
		setSessionState("active");
		setElapsed(0);
	};
	const handleCompleteWorkout = async () => {
		setSessionState("completed");
		confetti_module_default({
			particleCount: 120,
			spread: 70,
			origin: { y: .6 },
			colors: [
				"#ff7a3d",
				"#e85d2f",
				"#ffffff"
			]
		});
		if (userId) {
			await db.incrementWorkout(userId);
			await db.addNotification({
				userId,
				title: "Workout Logged! 🎉",
				message: `Outstanding job completing ${workout.name}! You burned approximately ${workout.kcal} kcal in ${Math.round(elapsed / 60) || 1} min.`,
				type: "sleep"
			});
		}
	};
	const formatTime = (secs) => {
		const mins = Math.floor(secs / 60);
		const remainingSecs = secs % 60;
		return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		hideHeader: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/workouts",
						className: "grid h-10 w-10 place-items-center rounded-full glass text-foreground hover:bg-muted transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4.5 w-4.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
						children: workout.type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-10" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
				mode: "wait",
				children: [
					sessionState === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							scale: .98
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .98
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-3xl bg-gradient-brand p-6 mb-6 border border-white/10 shadow-[0_20px_50px_-15px_rgba(232,93,47,0.4)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/15 blur-3xl pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-widest text-white/80 font-bold",
									children: workout.level
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-[Instrument_Serif] text-4xl text-white mt-1 leading-tight",
									children: workout.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4 mt-4 text-xs font-semibold text-white/95",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-4 w-4" }),
												workout.minutes,
												" min"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }),
												workout.kcal,
												" kcal"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" }), "Est. Heart Rate 135 bpm"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleStartWorkout,
									className: "mt-5.5 inline-flex items-center gap-2 rounded-full bg-white text-[var(--brand)] font-bold text-xs px-6 py-3 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "h-4.5 w-4.5",
										fill: "currentColor"
									}), " Start workout"]
								})
							]
						})
					}, "idle"),
					sessionState === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .98
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .98
						},
						className: "rounded-3xl glass-strong border border-[var(--brand)]/20 p-6 mb-6 text-center relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[var(--brand)]/10 blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.2em] text-[var(--brand)] font-bold mb-1",
								children: "Session In Progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold text-foreground truncate mb-4",
								children: workout.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-[Instrument_Serif] text-5xl text-foreground font-bold tracking-wider my-6",
								children: formatTime(elapsed)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleCompleteWorkout,
								className: "rounded-full bg-gradient-brand text-white font-bold text-xs px-8 py-3.5 cursor-pointer shadow-glow hover:opacity-95 active:scale-95 transition-all",
								children: "Finish & Log Workout"
							})
						]
					}, "active"),
					sessionState === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .95
						},
						className: "rounded-3xl glass-strong border border-emerald-500/20 p-6 mb-6 text-center relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-emerald-500/[0.02] pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 grid place-items-center mb-3 text-emerald-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-7 w-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-1",
								children: "Congratulations!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-[Instrument_Serif] text-foreground",
								children: "Workout Logged"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-2 px-6",
								children: "Fantastic consistency! Your stats, streak, and macro parameters have been updated."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "mt-6 inline-block rounded-full bg-muted border border-border hover:bg-muted/80 text-foreground font-semibold text-xs px-6 py-2.5 transition-all",
								children: "Go to Dashboard"
							})
						]
					}, "completed")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3.5",
				children: ["Exercises List · ", exercises.length]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 mb-8",
				children: exercises.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 rounded-2xl glass p-4 border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-muted text-xs text-[var(--brand)] font-bold shadow-inner",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-sm text-foreground",
								children: e.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-1 font-medium",
								children: [
									e.sets,
									" sets × ",
									e.reps,
									" · rest ",
									e.rest
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-4.5 w-4.5 text-muted-foreground" })
					]
				}, e.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3.5 flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-[var(--brand)]" }), " Zenvita AI Recommendations"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6",
				children: categoryRecs.map((rec, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl glass p-4 border border-border flex flex-col justify-between hover:border-[var(--brand)]/20 transition-all text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] uppercase font-bold tracking-widest text-[var(--brand)] bg-[var(--brand)]/10 px-2 py-0.5 rounded-full",
						children: rec.type
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-bold text-foreground mt-2 leading-relaxed",
						children: rec.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground mt-2 font-medium",
						children: ["Estimated: ", rec.duration]
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl glass p-4 border border-border flex items-center gap-3 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-[var(--brand)] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Form coaching enabled · Apple Watch sync ready"
				})]
			})
		]
	});
}
//#endregion
export { WorkoutDetail as component };
