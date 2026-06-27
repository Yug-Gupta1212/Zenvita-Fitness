import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { K as Dumbbell, U as Flame, et as ChevronRight, u as Timer, w as Play } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
import { n as workouts } from "./workouts-BgxY0U95.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workouts-DU7BqVLj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorkoutsLayout() {
	if (useRouterState({ select: (s) => s.location.pathname }) !== "/workouts") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutsIndex, {});
}
function WorkoutsIndex() {
	const categories = [
		"All",
		"Strength",
		"Cardio",
		"Yoga",
		"Core"
	];
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
	const filteredWorkouts = workouts.filter((w) => {
		if (activeCategory === "All") return true;
		return w.type === activeCategory;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: "Train smart",
		title: "Workouts",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1 no-scrollbar",
				children: categories.map((c) => {
					const isActive = activeCategory === c;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveCategory(c),
						className: `relative px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${isActive ? "text-white" : "glass text-muted-foreground hover:text-foreground"}`,
						children: [isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							layoutId: "workoutCategoryGlow",
							className: "absolute inset-0 rounded-full bg-gradient-brand shadow-glow",
							transition: {
								type: "spring",
								stiffness: 350,
								damping: 28
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10",
							children: c
						})]
					}, c);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/workouts/$id",
					params: { id: "hiit-inferno" },
					className: "relative block overflow-hidden rounded-3xl p-6 bg-gradient-brand text-white border border-white/10 shadow-[0_20px_50px_-15px_rgba(232,93,47,0.45)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-widest opacity-80 font-bold",
							children: "Featured Workout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-[Instrument_Serif] text-3xl mt-1 text-white leading-tight",
							children: "HIIT Inferno"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-90 mt-1",
							children: "High Intensity Interval Cardio · 20 min · 360 kcal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 inline-flex items-center gap-2 rounded-full bg-white text-[var(--brand)] font-semibold px-4.5 py-2 text-xs hover:scale-105 active:scale-95 transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
								className: "h-3.5 w-3.5",
								fill: "currentColor"
							}), " Start now"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: `${activeCategory} Workouts (${filteredWorkouts.length})` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				layout: true,
				className: "space-y-3",
				children: filteredWorkouts.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
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
					transition: { duration: .2 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/workouts/$id",
						params: { id: w.id },
						className: "flex items-center gap-4 rounded-2xl glass hover:bg-muted/50 border border-border p-4 transition-all",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-12 w-12 place-items-center rounded-xl bg-muted shadow-inner",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-5 w-5 text-[var(--brand)]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-sm text-foreground truncate",
									children: w.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-muted-foreground flex items-center gap-3.5 mt-1.5 font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3.5 w-3.5" }),
												w.minutes,
												"m"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5" }), w.kcal]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-muted px-2 py-0.5 rounded-full",
											children: w.level
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4.5 w-4.5 text-muted-foreground" })
						]
					})
				}, w.id))
			})
		]
	});
}
//#endregion
export { WorkoutsLayout as component };
