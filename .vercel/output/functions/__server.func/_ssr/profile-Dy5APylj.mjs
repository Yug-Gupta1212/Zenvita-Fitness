import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { B as HeartPulse, J as Download, N as LogOut, V as Globe, at as Award, et as ChevronRight, g as Shield, it as Bell, l as Trash2, n as X, nt as Check, v as Settings } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Dy5APylj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const navigate = useNavigate();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [userId, setUserId] = (0, import_react.useState)("");
	const [activeModal, setActiveModal] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [age, setAge] = (0, import_react.useState)(25);
	const [height, setHeight] = (0, import_react.useState)(170);
	const [weight, setWeight] = (0, import_react.useState)(70);
	const [activityLevel, setActivityLevel] = (0, import_react.useState)("moderate");
	const [fitnessGoal, setFitnessGoal] = (0, import_react.useState)("improve_fitness");
	const [pushWorkouts, setPushWorkouts] = (0, import_react.useState)(true);
	const [pushSleep, setPushSleep] = (0, import_react.useState)(true);
	const [pushAI, setPushAI] = (0, import_react.useState)(true);
	const [emailWeekly, setEmailWeekly] = (0, import_react.useState)(true);
	const [darkMode, setDarkMode] = (0, import_react.useState)(true);
	const [units, setUnits] = (0, import_react.useState)("Metric");
	const [language, setLanguage] = (0, import_react.useState)("English");
	(0, import_react.useEffect)(() => {
		const loadProfile = async () => {
			const { data } = await auth.getSession();
			if (data.session) {
				const prof = data.session.profile;
				setProfile(prof);
				setUserId(data.session.user.id);
				setName(prof.name || "");
				setAge(prof.age || 25);
				setHeight(prof.height || 170);
				setWeight(prof.weight || 70);
				setActivityLevel(prof.activityLevel || "moderate");
				setFitnessGoal(prof.fitnessGoal || "improve_fitness");
			}
		};
		loadProfile();
	}, []);
	const handleSignOut = async () => {
		await auth.signOut();
		navigate({ to: "/auth/login" });
	};
	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		if (!name || !userId) return;
		const updated = await db.updateProfile(userId, {
			name,
			age,
			height,
			weight,
			activityLevel,
			fitnessGoal
		});
		if (updated) {
			setProfile(updated);
			setActiveModal(null);
		}
	};
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
		a.download = `zenvita_health_data_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
		a.click();
	};
	const handleDownloadReport = () => {
		const reportText = `
=========================================
ZENVITA HEALTH & WELLNESS SUMMARY REPORT
Generated on: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}
=========================================

User Profile:
- Name: ${profile?.name}
- Age: ${profile?.age}
- Height: ${profile?.height} cm
- Weight: ${profile?.weight} kg
- Fitness Goal: ${profile?.fitnessGoal?.replace("_", " ")}
- Activity Level: ${profile?.activityLevel}

Streaks & Achievements:
- Current Active Streak: ${profile?.streak} days
- Workouts Logged: ${profile?.workoutsCount} sessions
- Membership Status: Premium Member

Thank you for choosing Zenvita as your AI wellness companion.
=========================================
    `.trim();
		const blob = new Blob([reportText], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `zenvita_health_report_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.txt`;
		a.click();
	};
	const handleDeleteAccount = () => {
		if (confirm("Are you absolute certain you want to delete your Zenvita account? This clears all logs.")) {
			localStorage.clear();
			window.location.href = "/auth/signup";
		}
	};
	const stats = [
		{
			label: "Workouts",
			value: profile?.workoutsCount || 0
		},
		{
			label: "Streak",
			value: `${profile?.streak || 0}d`
		},
		{
			label: "PRs",
			value: "9"
		}
	];
	const items = [
		{
			id: "health",
			icon: HeartPulse,
			label: "Health profile",
			desc: "Age, weight, height & goals"
		},
		{
			id: "achievements",
			icon: Award,
			label: "Achievements",
			desc: "Earned badges & milestones"
		},
		{
			id: "notifications",
			icon: Bell,
			label: "Notifications",
			desc: "Push & email alerts settings"
		},
		{
			id: "privacy",
			icon: Shield,
			label: "Privacy & data",
			desc: "Export records & account controls"
		},
		{
			id: "preferences",
			icon: Settings,
			label: "Preferences",
			desc: "Theme, units & language options"
		}
	];
	const badgesList = [
		{
			name: "First Step",
			desc: "Log at least 1 workout session",
			achieved: (profile?.workoutsCount || 0) >= 1
		},
		{
			name: "Consistency Hero",
			desc: "Maintain a 5-day streak",
			achieved: (profile?.streak || 0) >= 5
		},
		{
			name: "Iron Master",
			desc: "Complete 10 strength/cardio routines",
			achieved: (profile?.workoutsCount || 0) >= 10
		},
		{
			name: "Macro Pioneer",
			desc: "Track calories & macros properly",
			achieved: true
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: "Account",
		title: "Profile",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl glass-strong p-6 mb-6 flex items-center gap-4 border border-border shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-16 w-16 rounded-full bg-gradient-brand grid place-items-center text-white text-2xl font-[Instrument_Serif] shadow-glow",
					children: profile?.name?.[0] || "U"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-[Instrument_Serif] text-2xl leading-none text-foreground",
						children: profile?.name || "User"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1.5 font-medium",
						children: ["Premium member · Joined ", profile?.joinDate || "2026"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-3 mb-6",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl glass p-4 text-center border border-border shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-[Instrument_Serif] text-2xl text-foreground font-bold",
						children: s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1.5 font-bold",
						children: s.label
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Settings" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl glass overflow-hidden divide-y divide-border border border-border shadow-card mb-6",
				children: items.map((it) => {
					const Icon = it.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveModal(it.id),
						className: "w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-muted text-[var(--brand)] shadow-inner",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: it.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: it.desc
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4.5 w-4.5 text-muted-foreground" })
						]
					}, it.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleSignOut,
				className: "w-full rounded-2xl glass p-4 text-xs font-semibold flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50 active:scale-98 transition-all cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setActiveModal(null),
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
					className: "relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left max-h-[85vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									activeModal === "health" && "Health Profile",
									activeModal === "achievements" && "Achievements",
									activeModal === "notifications" && "Notification Preferences",
									activeModal === "privacy" && "Privacy & Data Options",
									activeModal === "preferences" && "App Preferences"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveModal(null),
								className: "p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						activeModal === "health" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleUpdateProfile,
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
											children: "Age"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											required: true,
											value: age,
											onChange: (e) => setAge(Number(e.target.value)),
											className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
											children: "Height (cm)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											required: true,
											value: height,
											onChange: (e) => setHeight(Number(e.target.value)),
											className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
											children: "Weight (kg)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											required: true,
											value: weight,
											onChange: (e) => setWeight(Number(e.target.value)),
											className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none"
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Activity Level"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: activityLevel,
									onChange: (e) => setActivityLevel(e.target.value),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none [&>option]:bg-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sedentary",
											children: "Sedentary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "light",
											children: "Lightly Active"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "moderate",
											children: "Moderately Active"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "active",
											children: "Active"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "very_active",
											children: "Very Active"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Fitness Goal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: fitnessGoal,
									onChange: (e) => setFitnessGoal(e.target.value),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none [&>option]:bg-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "improve_fitness",
											children: "Improve Fitness"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "lose_weight",
											children: "Lose Weight"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "build_muscle",
											children: "Build Muscle"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "maintain",
											children: "Maintain Health"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow",
									children: "Save Changes"
								})
							]
						}),
						activeModal === "achievements" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3.5",
							children: badgesList.map((badge, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all ${badge.achieved ? "bg-[var(--brand)]/[0.03] border-[var(--brand)]/15" : "bg-muted/50 border-border opacity-60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-10 w-10 place-items-center rounded-xl shrink-0 ${badge.achieved ? "bg-gradient-brand text-white shadow-glow" : "bg-muted text-muted-foreground"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-xs font-bold text-foreground flex items-center gap-1.5",
									children: [badge.name, badge.achieved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-emerald-400" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mt-0.5 leading-normal",
									children: badge.desc
								})] })]
							}, idx))
						}),
						activeModal === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
											children: "Push Notifications"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-foreground font-medium",
												children: "Workouts & Streaks"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: pushWorkouts,
												onChange: (e) => setPushWorkouts(e.target.checked),
												className: "accent-[var(--brand)] h-4 w-4 rounded"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-foreground font-medium",
												children: "Sleep Goal Alerts"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: pushSleep,
												onChange: (e) => setPushSleep(e.target.checked),
												className: "accent-[var(--brand)] h-4 w-4 rounded"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-foreground font-medium",
												children: "AI Coaching Insights"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: pushAI,
												onChange: (e) => setPushAI(e.target.checked),
												className: "accent-[var(--brand)] h-4 w-4 rounded"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-3 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Email Subscriptions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-foreground font-medium",
											children: "Weekly Health Wrap"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: emailWeekly,
											onChange: (e) => setEmailWeekly(e.target.checked),
											className: "accent-[var(--brand)] h-4 w-4 rounded"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveModal(null),
									className: "w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white shadow-glow",
									children: "Confirm Preferences"
								})
							]
						}),
						activeModal === "privacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleExportData,
									className: "w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-border bg-muted/50 hover:bg-muted transition-all text-xs font-semibold text-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export Health Data (JSON)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleDownloadReport,
									className: "w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-border bg-muted/50 hover:bg-muted transition-all text-xs font-semibold text-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }), " Download Averages Report (TXT)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-4 mt-2 border-t border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleDeleteAccount,
										className: "w-full flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/15 text-xs font-semibold text-red-400 transition-all cursor-pointer justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete Account & Local Data"]
									})
								})
							]
						}),
						activeModal === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
									children: "Dark Mode"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDarkMode(true),
										className: `flex-1 py-2 rounded-xl text-xs font-semibold border ${darkMode ? "bg-gradient-brand text-white border-transparent" : "glass text-muted-foreground"}`,
										children: "Enabled"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDarkMode(false),
										className: `flex-1 py-2 rounded-xl text-xs font-semibold border ${!darkMode ? "bg-gradient-brand text-white border-transparent" : "glass text-muted-foreground"}`,
										children: "Disabled (System)"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
									children: "Unit Preference"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-4",
									children: ["Metric", "Imperial"].map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setUnits(unit),
										className: `flex-1 py-2 rounded-xl text-xs font-semibold border ${units === unit ? "bg-gradient-brand text-white border-transparent" : "glass text-muted-foreground"}`,
										children: unit
									}, unit))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
									children: "Language"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: language,
									onChange: (e) => setLanguage(e.target.value),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "English",
											children: "English (US)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Spanish",
											children: "Español (ES)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "French",
											children: "Français (FR)"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveModal(null),
									className: "w-full mt-2 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white shadow-glow",
									children: "Save Preferences"
								})
							]
						})
					]
				})]
			}) })
		]
	});
}
//#endregion
export { ProfilePage as component };
