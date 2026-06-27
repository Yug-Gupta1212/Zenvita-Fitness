import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { D as Moon, K as Dumbbell, R as House, b as Search, c as TrendingUp, ct as Activity, et as ChevronRight, h as Sparkles, i as Users, it as Bell, n as X, p as Sun, st as Apple, tt as ChevronLeft, v as Settings, z as Heart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-oSNVi1Cx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThemeSwitcher({ theme, setTheme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex items-center p-0.5 bg-white/5 border border-white/10 dark:bg-white/5 dark:border-white/10 bg-black/5 border-black/10 rounded-full h-9 w-18 shrink-0 transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				layout: true,
				transition: {
					type: "spring",
					stiffness: 450,
					damping: 30
				},
				className: "absolute top-0.5 bottom-0.5 left-0.5 rounded-full bg-gradient-brand shadow-glow pointer-events-none",
				style: {
					width: "calc(50% - 2px)",
					x: theme === "light" ? 0 : "100%"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTheme("light"),
				className: `relative z-10 flex-1 grid place-items-center h-full transition-colors duration-200 ${theme === "light" ? "text-white" : "text-muted-foreground hover:text-foreground"}`,
				"aria-label": "Light Mode",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTheme("dark"),
				className: `relative z-10 flex-1 grid place-items-center h-full transition-colors duration-200 ${theme === "dark" ? "text-white" : "text-muted-foreground hover:text-foreground"}`,
				"aria-label": "Dark Mode",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
			})
		]
	});
}
var tabs = [
	{
		to: "/",
		label: "Dashboard",
		icon: House
	},
	{
		to: "/workouts",
		label: "Workouts",
		icon: Dumbbell
	},
	{
		to: "/nutrition",
		label: "Fuel",
		icon: Apple
	},
	{
		to: "/sleep",
		label: "Sleep",
		icon: Moon
	},
	{
		to: "/health",
		label: "Health",
		icon: Heart
	},
	{
		to: "/progress",
		label: "Progress",
		icon: TrendingUp
	},
	{
		to: "/community",
		label: "Community",
		icon: Users
	},
	{
		to: "/coach",
		label: "AI Coach",
		icon: Sparkles
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ title, subtitle, children, hideHeader = false }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const applyTheme = (nextTheme) => {
		if (typeof document === "undefined") return;
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(nextTheme);
	};
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const initialTheme = window.localStorage.getItem("zenvita-theme") || "dark";
		setThemeState(initialTheme);
		applyTheme(initialTheme);
	}, []);
	const setTheme = (newTheme) => {
		setThemeState(newTheme);
		if (typeof window !== "undefined") window.localStorage.setItem("zenvita-theme", newTheme);
		applyTheme(newTheme);
	};
	const [loadingSession, setLoadingSession] = (0, import_react.useState)(true);
	const [session, setSession] = (0, import_react.useState)(null);
	const [sidebarCollapsed, setSidebarCollapsed] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [notificationsOpen, setNotificationsOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [searchResults, setSearchResults] = (0, import_react.useState)({
		workouts: [],
		meals: [],
		settings: [],
		meds: []
	});
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const unreadCount = notifications.filter((n) => !n.read).length;
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const checkSession = async () => {
			const { data } = await auth.getSession();
			if (mounted) {
				if (!data.session) navigate({ to: "/auth/login" });
				else {
					setSession(data.session);
					loadNotifications(data.session.user.id);
				}
				setLoadingSession(false);
			}
		};
		checkSession();
		const { data: authListener } = auth.onAuthStateChange((event, sessionData) => {
			if (mounted) if (!sessionData) navigate({ to: "/auth/login" });
			else {
				setSession(sessionData);
				loadNotifications(sessionData.user.id);
			}
		});
		return () => {
			mounted = false;
			authListener?.subscription?.unsubscribe();
		};
	}, [navigate]);
	const loadNotifications = async (userId) => {
		setNotifications(await db.getNotifications(userId));
	};
	const handleMarkAsRead = async (notifId) => {
		await db.markNotificationRead(notifId);
		if (session?.user?.id) loadNotifications(session.user.id);
	};
	(0, import_react.useEffect)(() => {
		if (!searchQuery.trim()) {
			setSearchResults({
				workouts: [],
				meals: [],
				settings: [],
				meds: []
			});
			return;
		}
		const q = searchQuery.toLowerCase();
		setSearchResults({
			workouts: [
				{
					id: "upper-body-burn",
					name: "Upper Body Burn",
					type: "Strength",
					minutes: 32
				},
				{
					id: "hiit-inferno",
					name: "HIIT Inferno",
					type: "Cardio",
					minutes: 20
				},
				{
					id: "morning-mobility",
					name: "Morning Mobility",
					type: "Flexibility",
					minutes: 15
				},
				{
					id: "leg-day-power",
					name: "Leg Day Power",
					type: "Strength",
					minutes: 45
				},
				{
					id: "core-crusher",
					name: "Core Crusher",
					type: "Core",
					minutes: 18
				},
				{
					id: "zen-yoga-flow",
					name: "Zen Yoga Flow",
					type: "Yoga",
					minutes: 28
				}
			].filter((w) => w.name.toLowerCase().includes(q) || w.type.toLowerCase().includes(q)),
			meals: [
				{
					name: "Oatmeal with berries",
					type: "Breakfast",
					kcal: 420
				},
				{
					name: "Grilled chicken bowl",
					type: "Lunch",
					kcal: 580
				},
				{
					name: "Greek yogurt",
					type: "Snack",
					kcal: 220
				},
				{
					name: "Salmon & quinoa",
					type: "Dinner",
					kcal: 620
				}
			].filter((m) => m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q)),
			settings: [
				{
					name: "Health Profile",
					label: "Edit height, weight, goals"
				},
				{
					name: "Notifications Settings",
					label: "Configure push & email logs"
				},
				{
					name: "Privacy Export",
					label: "Export data to JSON"
				},
				{
					name: "Dark Mode Toggles",
					label: "Light / Dark switch"
				}
			].filter((s) => s.name.toLowerCase().includes(q) || s.label.toLowerCase().includes(q)),
			meds: [
				{
					name: "Magnesium",
					time: "9:30 PM",
					purpose: "Muscle & Sleep Recovery"
				},
				{
					name: "Multivitamin",
					time: "8:00 AM",
					purpose: "General Wellness"
				},
				{
					name: "Vitamin D3",
					time: "8:00 AM",
					purpose: "Bone & Immune Support"
				}
			].filter((m) => m.name.toLowerCase().includes(q) || m.purpose.toLowerCase().includes(q))
		});
	}, [searchQuery]);
	if (loadingSession) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: {
				scale: [
					.9,
					1.1,
					.9
				],
				opacity: [
					.5,
					1,
					.5
				]
			},
			transition: {
				duration: 1.5,
				repeat: Infinity
			},
			className: "font-[Instrument_Serif] text-3xl text-white tracking-widest",
			children: "Zenvita"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1 w-24 bg-white/10 rounded-full mt-4 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full bg-gradient-brand w-1/2 rounded-full animate-pulse-glow",
				style: { animationDuration: "1.5s" }
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[var(--ink)] text-foreground flex transition-colors duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 top-0 h-[450px] -z-0 transition-opacity duration-300 dark:opacity-100 opacity-0",
				style: { background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,93,47,0.2), transparent 70%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 bottom-0 h-[300px] -z-0 transition-opacity duration-300 dark:opacity-100 opacity-0",
				style: { background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(232,93,47,0.08), transparent 70%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `hidden lg:flex flex-col border-r border-[var(--glass-border)] bg-[var(--sidebar-bg)] backdrop-blur-xl transition-all duration-300 z-30 sticky top-0 h-screen ${sidebarCollapsed ? "w-20" : "w-64"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 flex items-center justify-between",
						children: [sidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-6 w-6 text-[var(--brand)] mx-auto animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-6 w-6 text-[var(--brand)] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-[Instrument_Serif] text-2xl text-[var(--brand)] tracking-wider font-bold",
								children: "Zenvita"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSidebarCollapsed(!sidebarCollapsed),
							className: "p-1.5 rounded-lg glass text-muted-foreground hover:text-white mx-auto transition-colors",
							children: sidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 px-4 space-y-1.5 mt-4",
						children: tabs.map((t) => {
							const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
							const Icon = t.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: t.to,
								className: `flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all relative ${active ? "text-white font-medium bg-gradient-brand shadow-glow" : "text-muted-foreground hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 shrink-0" }), !sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: t.label
								})]
							}, t.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 border-t border-[var(--glass-border)] transition-colors duration-300",
						children: !sidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 p-2 bg-[var(--glass-bg)] rounded-2xl border border-[var(--glass-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-white text-sm font-semibold",
								children: session?.profile?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-foreground truncate",
									children: session?.profile?.name || "User"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground truncate",
									children: session?.user?.email
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-white text-sm font-semibold",
							children: session?.profile?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "hidden md:flex lg:hidden sticky top-0 z-30 border-b border-[var(--glass-border)] bg-[var(--sidebar-bg)] backdrop-blur-xl px-6 py-4 items-center justify-between transition-colors duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-[var(--brand)] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-[Instrument_Serif] text-2xl text-[var(--brand)] font-bold",
							children: "Zenvita"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex items-center gap-2",
						children: tabs.map((t) => {
							const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
							const Icon = t.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: t.to,
								className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active ? "text-white bg-gradient-brand shadow-glow" : "text-muted-foreground hover:text-foreground hover:bg-[var(--glass-bg)]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.label })]
							}, t.to);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex-1 relative z-10 w-full mx-auto max-w-[520px] md:max-w-[760px] lg:max-w-[1000px] px-4 md:px-8 pb-28 lg:pb-10 pt-6",
					children: [!hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-0.5",
							children: subtitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-[Instrument_Serif] text-4xl text-foreground leading-none",
							children: title
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcher, {
									theme,
									setTheme
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchOpen(true),
									"aria-label": "Search",
									className: "grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5 active:scale-95 transition-all text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4.5 w-4.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setNotificationsOpen(true),
									"aria-label": "Notifications",
									className: "relative grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5 active:scale-95 transition-all text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4.5 w-4.5" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--brand)] shadow-glow animate-pulse" })]
								})
							]
						})]
					}), children]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 px-4 md:hidden bg-gradient-to-t from-black via-black/80 to-transparent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[480px] glass-strong rounded-2xl px-2 py-2 flex items-center justify-between relative shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]",
					children: tabs.map((t) => {
						const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
						const Icon = t.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: t.to,
							className: "relative flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-xl flex-1 transition-all",
							children: [
								active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									layoutId: "activeTabGlow",
									className: "absolute inset-0 rounded-xl bg-gradient-brand shadow-glow",
									transition: {
										type: "spring",
										stiffness: 380,
										damping: 30
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `relative h-5 w-5 transition-colors duration-200 ${active ? "text-white" : "text-muted-foreground"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `relative text-[9px] uppercase tracking-wider font-semibold ${active ? "text-white" : "text-muted-foreground"}`,
									children: t.label
								})
							]
						}, t.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-start justify-center pt-24 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setSearchOpen(false),
					className: "fixed inset-0 bg-black/60 backdrop-blur-md"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: -20,
						scale: .95
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						y: -20,
						scale: .95
					},
					transition: { duration: .2 },
					className: "relative w-full max-w-[550px] bg-[var(--modal-bg)] border border-[var(--glass-border)] rounded-3xl p-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] transition-colors duration-300 z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-[var(--glass-border)] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								autoFocus: true,
								placeholder: "Search workouts, meals, sleep logs, medications...",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								className: "w-full bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none py-1.5"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearchOpen(false),
							className: "p-1 rounded-full hover:bg-[var(--glass-bg-hover)] text-muted-foreground hover:text-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[350px] overflow-y-auto mt-4 pr-1 space-y-4",
						children: searchQuery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							searchResults.workouts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
								children: "Workouts"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1.5",
								children: searchResults.workouts.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/workouts/$id",
									params: { id: w.id },
									onClick: () => setSearchOpen(false),
									className: "flex items-center justify-between p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] transition-all text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: w.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: [
											w.type,
											" · ",
											w.minutes,
											" mins"
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
								}, w.id))
							})] }),
							searchResults.meals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
								children: "Meals Logged"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1.5",
								children: searchResults.meals.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/nutrition",
									onClick: () => setSearchOpen(false),
									className: "flex items-center justify-between p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] transition-all text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: [
											m.type,
											" · ",
											m.kcal,
											" kcal"
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
								}, i))
							})] }),
							searchResults.meds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
								children: "Medications & Reminders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1.5",
								children: searchResults.meds.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] flex items-center justify-between border border-[var(--glass-border)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: [
											m.purpose,
											" · scheduled ",
											m.time
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase font-semibold text-[var(--brand)] bg-[var(--brand)]/10 px-2 py-0.5 rounded-full",
										children: "active"
									})]
								}, i))
							})] }),
							searchResults.settings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
								children: "Settings & Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1.5",
								children: searchResults.settings.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/profile",
									onClick: () => setSearchOpen(false),
									className: "flex items-center justify-between p-3 rounded-2xl glass hover:bg-[var(--glass-bg-hover)] transition-all text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: s.label
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
								}, i))
							})] }),
							searchResults.workouts.length === 0 && searchResults.meals.length === 0 && searchResults.settings.length === 0 && searchResults.meds.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"No results found for \"",
										searchQuery,
										"\""
									]
								})
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mb-1.5",
								children: "Try searching for:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"Yoga",
									"HIIT",
									"Oats",
									"Magnesium",
									"Reset password",
									"Streak"
								].map((kw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchQuery(kw),
									className: "text-xs px-3.5 py-2 rounded-full border border-[var(--glass-border)] glass hover:bg-[var(--glass-bg-hover)] text-foreground transition-all",
									children: kw
								}, kw))
							})]
						})
					})]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: notificationsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setNotificationsOpen(false),
					className: "fixed inset-0 bg-black/60 backdrop-blur-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: 50,
						scale: .98
					},
					animate: {
						opacity: 1,
						x: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						x: 50,
						scale: .98
					},
					transition: {
						type: "spring",
						damping: 25,
						stiffness: 220
					},
					className: "relative w-full max-w-[380px] h-[calc(100vh-32px)] md:h-[calc(100vh-48px)] bg-[var(--modal-bg)] border border-[var(--glass-border)] rounded-3xl p-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col transition-colors duration-300 z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-[var(--glass-border)] pb-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-[var(--brand)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground",
									children: "Notifications"
								}),
								unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-semibold text-white bg-[var(--brand)] rounded-full px-2 py-0.5",
									children: [unreadCount, " new"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setNotificationsOpen(false),
							className: "p-1 rounded-full hover:bg-[var(--glass-bg-hover)] text-muted-foreground hover:text-foreground transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto pr-1 py-4 space-y-3",
						children: notifications.length > 0 ? notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => !n.read && handleMarkAsRead(n.id),
							className: `p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${n.read ? "bg-[var(--glass-bg)] border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)]" : "bg-[var(--brand)]/[0.04] border-[var(--brand)]/15 hover:bg-[var(--brand)]/[0.06] relative"}`,
							children: [
								!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-3.5 right-3.5 h-1.5 w-1.5 rounded-full bg-[var(--brand)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] uppercase tracking-widest text-muted-foreground font-semibold",
											children: n.type
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-[var(--glass-border)]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-muted-foreground",
											children: new Date(n.createdAt).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-foreground",
									children: n.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground mt-1 leading-normal",
									children: n.message
								})
							]
						}, n.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-full flex flex-col items-center justify-center text-center text-muted-foreground py-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-muted-foreground/20 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs",
								children: "All caught up!"
							})]
						})
					})]
				})]
			}) })
		]
	});
}
function StatCard({ label, value, unit, icon: Icon, accent = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: {
			y: -4,
			scale: 1.01
		},
		className: `relative overflow-hidden rounded-2xl p-4 border transition-all ${accent ? "bg-gradient-brand text-white border-transparent shadow-glow" : "glass border-border shadow-card"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-xs ${accent ? "text-white/80" : "text-muted-foreground"}`,
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4.5 w-4.5 ${accent ? "text-white" : "text-[var(--brand)]"}` })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-baseline gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-2xl font-semibold",
				children: value
			}), unit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-xs ${accent ? "text-white/80" : "text-muted-foreground"}`,
				children: unit
			})]
		})]
	});
}
function SectionHeader({ title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between mb-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xs font-semibold tracking-wider uppercase text-muted-foreground",
			children: title
		}), action]
	});
}
//#endregion
export { SectionHeader as n, StatCard as r, AppShell as t };
