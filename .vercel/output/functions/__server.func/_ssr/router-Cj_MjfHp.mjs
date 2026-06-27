import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { r as getSafeSessionStorage } from "./browser-safe-DPMYmjS3.mjs";
import { t as Route$15 } from "./workouts-gMKnFLcC.mjs";
import { t as Route$16 } from "./workouts._id-CcXIZQcD.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cj_MjfHp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BIGlRlgJ.css";
function reportAppError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__zenvitaEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function SplashScreen({ onComplete }) {
	const [step, setStep] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timers = [
			setTimeout(() => setStep(1), 800),
			setTimeout(() => setStep(2), 1800),
			setTimeout(() => setStep(3), 2600),
			setTimeout(() => onComplete(), 3800)
		];
		return () => timers.forEach(clearTimeout);
	}, [onComplete]);
	const particles = (0, import_react.useMemo)(() => Array.from({ length: 25 }).map((_, i) => {
		const seed = (i + 1) * 37;
		return {
			id: i,
			x: seed * 7 % 100,
			y: 50 + seed * 13 % 50,
			size: 1 + seed * 3 % 4,
			duration: 2 + seed * 5 % 3,
			delay: seed % 10 / 10
		};
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,93,47,0.2),_transparent_55%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 pointer-events-none opacity-40",
				children: particles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute rounded-full bg-[var(--brand)]",
					style: {
						left: `${p.x}%`,
						top: `${p.y}%`,
						width: p.size,
						height: p.size
					},
					animate: {
						y: [0, -250],
						x: [0, Math.sin(p.id) * 30],
						opacity: [
							0,
							.8,
							0
						]
					},
					transition: {
						duration: p.duration,
						delay: p.delay,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute h-96 w-96 rounded-full bg-[var(--brand)] opacity-10 blur-3xl",
				animate: {
					scale: [
						.8,
						1.2,
						.8
					],
					opacity: [
						.08,
						.15,
						.08
					]
				},
				transition: {
					duration: 3,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: step >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute h-32 w-32 rounded-full border-2 border-[var(--brand)] opacity-50",
						initial: {
							scale: .1,
							opacity: .8
						},
						animate: {
							scale: 2.2,
							opacity: 0
						},
						exit: { opacity: 0 },
						transition: {
							duration: 1.2,
							ease: "easeOut"
						}
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							scale: .8
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: .8,
							ease: "easeOut"
						},
						className: "text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							className: "font-[Instrument_Serif] text-6xl tracking-tight text-white drop-shadow-[0_0_30px_rgba(232,93,47,0.6)]",
							animate: step >= 2 ? { y: -15 } : {},
							transition: { duration: .5 },
							children: "Zenvita"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: step >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: { opacity: 0 },
						transition: {
							duration: .6,
							ease: "easeOut"
						},
						className: "mt-2 text-sm tracking-[0.2em] uppercase text-muted-foreground font-light text-center px-4",
						children: "Your Health. Understood. Predicted. Improved."
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 mt-6 flex items-center justify-center w-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: step >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "240",
							height: "40",
							viewBox: "0 0 240 40",
							className: "w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0,20 L80,20 L90,10 L100,30 L110,20 L115,20 L120,5 L128,35 L135,20 L145,20 L150,15 L155,25 L160,20 L240,20",
									fill: "none",
									stroke: "rgba(255, 255, 255, 0.08)",
									strokeWidth: "2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
									d: "M0,20 L80,20 L90,10 L100,30 L110,20 L115,20 L120,5 L128,35 L135,20 L145,20 L150,15 L155,25 L160,20 L240,20",
									fill: "none",
									stroke: "url(#ecg-grad)",
									strokeWidth: "2.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									initial: { pathLength: 0 },
									animate: { pathLength: 1 },
									transition: {
										duration: 1.2,
										ease: "easeInOut"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "ecg-grad",
									x1: "0",
									x2: "1",
									y1: "0",
									y2: "0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#ff7a3d"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "50%",
											stopColor: "#e85d2f"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#c2410c"
										})
									]
								}) })
							]
						}) })
					})
				]
			})
		]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportAppError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "theme-color",
				content: "#0f172a"
			},
			{ title: "Zenvita Fitness" },
			{
				name: "description",
				content: "Track wellness, nutrition, sleep, and progress with Zenvita Fitness."
			},
			{
				name: "author",
				content: "Zenvita Fitness"
			},
			{
				property: "og:title",
				content: "Zenvita Fitness"
			},
			{
				property: "og:description",
				content: "Track wellness, nutrition, sleep, and progress with Zenvita Fitness."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Zenvita Fitness"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@ZenvitaFitness"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
          (function() {
            try {
              const storage = window.localStorage;
              const theme = storage.getItem('zenvita-theme') || 'dark';
              const doc = document.documentElement;
              doc.classList.add(theme);
              if (theme === 'light') {
                doc.classList.remove('dark');
              } else {
                doc.classList.remove('light');
              }
            } catch (e) {}
          })();
        ` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	const [showSplash, setShowSplash] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!getSafeSessionStorage()?.getItem("zenvita_splash_seen")) setShowSplash(true);
	}, []);
	const handleSplashComplete = () => {
		setShowSplash(false);
		getSafeSessionStorage()?.setItem("zenvita_splash_seen", "true");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: showSplash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashScreen, { onComplete: handleSplashComplete }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$13 = () => import("./sleep-COx7uSN2.mjs");
var Route$13 = createFileRoute("/sleep")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./settings-Dhkro8HN.mjs");
var Route$12 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Zenvita — Settings" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./progress-BHipT6sX.mjs");
var Route$11 = createFileRoute("/progress")({
	head: () => ({ meta: [{ title: "Zenvita — Progress & Analytics" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./profile-CrzMmrUv.mjs");
var Route$10 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Zenvita — Profile & Settings" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./nutrition-CIIilOlN.mjs");
var Route$9 = createFileRoute("/nutrition")({
	head: () => ({ meta: [{ title: "Zenvita — AI Nutrition Tracker" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./health-DgnAoA7j.mjs");
var Route$8 = createFileRoute("/health")({
	head: () => ({ meta: [{ title: "Zenvita — Health Metrics" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./community-C1hPtGS0.mjs");
var Route$7 = createFileRoute("/community")({
	head: () => ({ meta: [{ title: "Zenvita — Fitness Community" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./coach-DbB_Yvl4.mjs");
var Route$6 = createFileRoute("/coach")({
	head: () => ({ meta: [{ title: "Zenvita — AI Wellness Coach" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./auth-Dc7Q4LdQ.mjs");
var Route$5 = createFileRoute("/auth")({
	beforeLoad: async () => {
		const { data } = await auth.getSession();
		if (data.session) throw redirect({ to: "/" });
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./routes-CjJl7eTy.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Zenvita — Your Daily Health" }, {
		name: "description",
		content: "Track workouts, nutrition, sleep and recovery with AI-powered insights."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
/** Nutrition Donut Chart Component */
var $$splitComponentImporter$3 = () => import("./auth.signup-BcpPTPd_.mjs");
var Route$3 = createFileRoute("/auth/signup")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./auth.reset-password-_5oCKaLB.mjs");
var Route$2 = createFileRoute("/auth/reset-password")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./auth.login-DcCv08Ru.mjs");
var Route$1 = createFileRoute("/auth/login")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./auth.forgot-password-DC9zZIA-.mjs");
var Route = createFileRoute("/auth/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var WorkoutsRoute = Route$15.update({
	id: "/workouts",
	path: "/workouts",
	getParentRoute: () => Route$14
});
var SleepRoute = Route$13.update({
	id: "/sleep",
	path: "/sleep",
	getParentRoute: () => Route$14
});
var SettingsRoute = Route$12.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$14
});
var ProgressRoute = Route$11.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$14
});
var ProfileRoute = Route$10.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$14
});
var NutritionRoute = Route$9.update({
	id: "/nutrition",
	path: "/nutrition",
	getParentRoute: () => Route$14
});
var HealthRoute = Route$8.update({
	id: "/health",
	path: "/health",
	getParentRoute: () => Route$14
});
var CommunityRoute = Route$7.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => Route$14
});
var CoachRoute = Route$6.update({
	id: "/coach",
	path: "/coach",
	getParentRoute: () => Route$14
});
var AuthRoute = Route$5.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$14
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var WorkoutsIdRoute = Route$16.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => WorkoutsRoute
});
var AuthSignupRoute = Route$3.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => AuthRoute
});
var AuthResetPasswordRoute = Route$2.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => AuthRoute
});
var AuthLoginRoute = Route$1.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AuthRoute
});
var AuthRouteChildren = {
	AuthForgotPasswordRoute: Route.update({
		id: "/forgot-password",
		path: "/forgot-password",
		getParentRoute: () => AuthRoute
	}),
	AuthLoginRoute,
	AuthResetPasswordRoute,
	AuthSignupRoute
};
var AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
var WorkoutsRouteChildren = { WorkoutsIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthRoute: AuthRouteWithChildren,
	CoachRoute,
	CommunityRoute,
	HealthRoute,
	NutritionRoute,
	ProfileRoute,
	ProgressRoute,
	SettingsRoute,
	SleepRoute,
	WorkoutsRoute: WorkoutsRoute._addFileChildren(WorkoutsRouteChildren)
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
