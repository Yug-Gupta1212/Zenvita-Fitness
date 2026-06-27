import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { I as Info, J as Download, N as LogOut, V as Globe, a as User, g as Shield, it as Bell, l as Trash2, nt as Check, s as UserCheck, v as Settings, z as Heart } from "../_libs/lucide-react.mjs";
import { i as getSafeWindow, n as getSafeLocalStorage, t as getSafeDocument } from "./browser-safe-DPMYmjS3.mjs";
import { t as AppShell } from "./AppShell-5p7JScr3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Dhkro8HN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const navigate = useNavigate();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [userId, setUserId] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("profile");
	const [name, setName] = (0, import_react.useState)("");
	const [age, setAge] = (0, import_react.useState)(25);
	const [height, setHeight] = (0, import_react.useState)(170);
	const [weight, setWeight] = (0, import_react.useState)(70);
	const [gender, setGender] = (0, import_react.useState)("Not specified");
	const [activityLevel, setActivityLevel] = (0, import_react.useState)("moderate");
	const [fitnessGoal, setFitnessGoal] = (0, import_react.useState)("improve_fitness");
	const [pushWorkouts, setPushWorkouts] = (0, import_react.useState)(true);
	const [pushSleep, setPushSleep] = (0, import_react.useState)(true);
	const [pushAI, setPushAI] = (0, import_react.useState)(true);
	const [emailWeekly, setEmailWeekly] = (0, import_react.useState)(true);
	const [darkMode, setDarkMode] = (0, import_react.useState)(true);
	const [units, setUnits] = (0, import_react.useState)("Metric");
	const [language, setLanguage] = (0, import_react.useState)("English");
	const [isSaved, setIsSaved] = (0, import_react.useState)(false);
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
				setGender(prof.gender || "Not specified");
				setActivityLevel(prof.activityLevel || "moderate");
				setFitnessGoal(prof.fitnessGoal || "improve_fitness");
				const storage = getSafeLocalStorage();
				setUnits(storage?.getItem("zenvita_pref_units") || "Metric");
				setLanguage(storage?.getItem("zenvita_pref_language") || "English");
				setDarkMode((storage?.getItem("zenvita-theme") || "dark") === "dark");
			}
		};
		loadProfile();
	}, []);
	const handleSignOut = async () => {
		await auth.signOut();
		navigate({ to: "/auth/login" });
	};
	const handleSave = async (e) => {
		e.preventDefault();
		if (!name || !userId) return;
		const updated = await db.updateProfile(userId, {
			name,
			age,
			height,
			weight,
			gender,
			activityLevel,
			fitnessGoal
		});
		if (updated) {
			setProfile(updated);
			setIsSaved(true);
			setTimeout(() => setIsSaved(false), 3e3);
		}
	};
	const handleUpdatePreference = (key, val) => {
		if (key === "units") {
			setUnits(val);
			getSafeLocalStorage()?.setItem("zenvita_pref_units", val);
		} else if (key === "language") {
			setLanguage(val);
			getSafeLocalStorage()?.setItem("zenvita_pref_language", val);
		}
		setIsSaved(true);
		setTimeout(() => setIsSaved(false), 3e3);
	};
	const handleToggleTheme = (isDark) => {
		setDarkMode(isDark);
		const themeName = isDark ? "dark" : "light";
		const storage = getSafeLocalStorage();
		const doc = getSafeDocument();
		storage?.setItem("zenvita-theme", themeName);
		doc?.documentElement.classList.remove("light", "dark");
		doc?.documentElement.classList.add(themeName);
		setIsSaved(true);
		setTimeout(() => setIsSaved(false), 3e3);
	};
	const handleExportData = () => {
		const storage = getSafeLocalStorage();
		const data = {};
		if (storage) for (let i = 0; i < storage.length; i++) {
			const key = storage.key(i);
			if (key && key.startsWith("zenvita_")) data[key] = storage.getItem(key);
		}
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = getSafeDocument()?.createElement("a");
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
- Email: ${profile?.email}
- Age: ${profile?.age} yrs
- Gender: ${gender}
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
		const a = getSafeDocument()?.createElement("a");
		a.href = url;
		a.download = `zenvita_health_report_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.txt`;
		a.click();
	};
	const handleDeleteAccount = () => {
		if (confirm("Are you absolutely certain you want to delete your Zenvita account? This clears all local records and cannot be undone.")) {
			getSafeLocalStorage()?.clear();
			const win = getSafeWindow();
			if (win) win.location.href = "/auth/signup";
		}
	};
	const menuItems = [
		{
			id: "profile",
			icon: User,
			label: "Profile Settings",
			desc: "Manage name, avatar, and goals"
		},
		{
			id: "health",
			icon: Heart,
			label: "Health Profile",
			desc: "Age, gender, weight, and height"
		},
		{
			id: "notifications",
			icon: Bell,
			label: "Notifications",
			desc: "Push & email alerts"
		},
		{
			id: "preferences",
			icon: Settings,
			label: "Preferences",
			desc: "Theme, units & language options"
		},
		{
			id: "privacy",
			icon: Shield,
			label: "Privacy & Data",
			desc: "Export records & account controls"
		}
	];
	const inputClass = "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)] transition-colors";
	const selectClass = `${inputClass} [&>option]:bg-card`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		subtitle: "Configure your experience",
		title: "Settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-4 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl glass p-1 border border-border flex flex-col space-y-1",
					children: menuItems.map((item) => {
						const Icon = item.icon;
						const isActive = activeTab === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab(item.id),
							className: `flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${isActive ? "text-white font-medium bg-gradient-brand shadow-glow" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[9px] truncate ${isActive ? "text-white/80" : "text-muted-foreground"}`,
									children: item.desc
								})]
							})]
						}, item.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSignOut,
					className: "w-full rounded-2xl glass p-3 text-xs font-semibold flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground border border-border hover:bg-muted active:scale-98 transition-all cursor-pointer mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass-strong p-6 border border-border shadow-card relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-brand opacity-20 blur-2xl pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-foreground border-b border-border pb-3.5 mb-5 flex items-center gap-2",
							children: [
								activeTab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4.5 w-4.5 text-[var(--brand)]" }),
								activeTab === "health" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4.5 w-4.5 text-[var(--brand)]" }),
								activeTab === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4.5 w-4.5 text-[var(--brand)]" }),
								activeTab === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4.5 w-4.5 text-[var(--brand)]" }),
								activeTab === "privacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4.5 w-4.5 text-[var(--brand)]" }),
								menuItems.find((it) => it.id === activeTab)?.label
							]
						}),
						isSaved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-[11px] text-emerald-400 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Changes auto-saved successfully!" })]
						}),
						activeTab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSave,
							className: "space-y-4.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: name,
									onChange: (e) => setName(e.target.value),
									className: inputClass
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
										children: "Email (Primary ID)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										disabled: true,
										value: profile?.email || "",
										className: "w-full bg-muted border border-border opacity-70 rounded-xl py-2.5 px-3.5 text-xs text-muted-foreground focus:outline-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground mt-1 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3 w-3" }), " Email address cannot be changed."]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
									children: "Fitness Goal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: fitnessGoal,
									onChange: (e) => setFitnessGoal(e.target.value),
									className: selectClass,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "improve_fitness",
											children: "Improve Fitness & Core strength"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "lose_weight",
											children: "Lose Weight / Burn Fat"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "build_muscle",
											children: "Build Muscle / Gain Strength"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "maintain",
											children: "Maintain General Health & Mobility"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
									children: "Activity Level"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: activityLevel,
									onChange: (e) => setActivityLevel(e.target.value),
									className: selectClass,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sedentary",
											children: "Sedentary (No physical activity)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "light",
											children: "Lightly Active (1-3 days light exercise/week)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "moderate",
											children: "Moderately Active (3-5 days active workouts/week)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "active",
											children: "Active (6-7 days heavy workouts/week)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "very_active",
											children: "Very Active (Twice daily workouts/athlete)"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full rounded-xl bg-gradient-brand py-2.5 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow hover:opacity-95 transition-all cursor-pointer mt-6",
									children: "Save Profile Settings"
								})
							]
						}),
						activeTab === "health" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSave,
							className: "space-y-4.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
										children: "Age (Years)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: age,
										onChange: (e) => setAge(Number(e.target.value)),
										className: inputClass
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
										children: "Gender"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: gender,
										onChange: (e) => setGender(e.target.value),
										className: selectClass,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Male",
												children: "Male"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Female",
												children: "Female"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Other",
												children: "Other"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Not specified",
												children: "Prefer not to say"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
										children: "Height (cm)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: height,
										onChange: (e) => setHeight(Number(e.target.value)),
										className: inputClass
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
										children: "Weight (kg)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: weight,
										onChange: (e) => setWeight(Number(e.target.value)),
										className: inputClass
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-muted border border-border p-4 mt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-4 w-4 text-[var(--brand)]" }), " Computed Insights"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground leading-normal",
										children: [
											"Based on your weight of ",
											weight,
											"kg and height of ",
											height,
											"cm, your Body Mass Index (BMI) is ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: (weight / Math.pow(height / 100, 2)).toFixed(1) }),
											". This aligns with your fitness goal of ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fitnessGoal?.replace("_", " ") }),
											"."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full rounded-xl bg-gradient-brand py-2.5 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow hover:opacity-95 transition-all cursor-pointer mt-6",
									children: "Save Health Profile"
								})
							]
						}),
						activeTab === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Push Notifications"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1 border-b border-border pb-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-foreground font-medium",
											children: "Workouts & Streaks"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground mt-0.5",
											children: "Receive reminders to complete workouts and maintain active streaks."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: pushWorkouts,
											onChange: (e) => {
												setPushWorkouts(e.target.checked);
												setIsSaved(true);
												setTimeout(() => setIsSaved(false), 3e3);
											},
											className: "accent-[var(--brand)] h-4 w-4 rounded cursor-pointer"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1 border-b border-border pb-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-foreground font-medium",
											children: "Sleep Goal Alerts"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground mt-0.5",
											children: "Get notified when it's time to wind down or when sleep target is reached."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: pushSleep,
											onChange: (e) => {
												setPushSleep(e.target.checked);
												setIsSaved(true);
												setTimeout(() => setIsSaved(false), 3e3);
											},
											className: "accent-[var(--brand)] h-4 w-4 rounded cursor-pointer"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1 border-b border-border pb-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-foreground font-medium",
											children: "AI Coaching Insights"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground mt-0.5",
											children: "Instant alerts from the AI Coach about macro status or exercise guides."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: pushAI,
											onChange: (e) => {
												setPushAI(e.target.checked);
												setIsSaved(true);
												setTimeout(() => setIsSaved(false), 3e3);
											},
											className: "accent-[var(--brand)] h-4 w-4 rounded cursor-pointer"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3.5 pt-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
									children: "Email Subscriptions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-foreground font-medium",
										children: "Weekly Health Wrap Report"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: "Complete visual performance summary sent directly to your email."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: emailWeekly,
										onChange: (e) => {
											setEmailWeekly(e.target.checked);
											setIsSaved(true);
											setTimeout(() => setIsSaved(false), 3e3);
										},
										className: "accent-[var(--brand)] h-4 w-4 rounded cursor-pointer"
									})]
								})]
							})]
						}),
						activeTab === "preferences" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
									children: "Display Theme"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleToggleTheme(true),
										className: `flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${darkMode ? "bg-gradient-brand text-white border-transparent shadow-glow" : "glass text-muted-foreground hover:text-foreground hover:bg-muted border-border"}`,
										children: "Dark Mode (Pulse)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleToggleTheme(false),
										className: `flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${!darkMode ? "bg-gradient-brand text-white border-transparent shadow-glow" : "glass text-muted-foreground hover:text-foreground hover:bg-muted border-border"}`,
										children: "Light Mode (Aura)"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2",
									children: "Unit Preference"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-3",
									children: ["Metric", "Imperial"].map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleUpdatePreference("units", unit),
										className: `flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${units === unit ? "bg-gradient-brand text-white border-transparent shadow-glow" : "glass text-muted-foreground hover:text-foreground hover:bg-muted border-border"}`,
										children: unit
									}, unit))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
									children: "Language"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: language,
									onChange: (e) => handleUpdatePreference("language", e.target.value),
									className: selectClass,
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
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "German",
											children: "Deutsch (DE)"
										})
									]
								})] })
							]
						}),
						activeTab === "privacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-normal mb-2",
									children: "Take control of your Zenvita information. Export your history or permanently clear logs down below."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleExportData,
									className: "w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-[var(--brand)]/30 bg-muted hover:bg-muted/80 transition-all text-xs font-semibold text-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 text-[var(--brand)]" }), " Export Personal Health Data (JSON)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleDownloadReport,
									className: "w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-[var(--brand)]/30 bg-muted hover:bg-muted/80 transition-all text-xs font-semibold text-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 text-[var(--brand)]" }), " Download Performance Report (TXT)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-5 mt-2 border-t border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleDeleteAccount,
										className: "w-full flex items-center gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 text-xs font-semibold text-red-400 transition-all cursor-pointer justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete Account & Local Records"]
									})
								})
							]
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { SettingsPage as component };
