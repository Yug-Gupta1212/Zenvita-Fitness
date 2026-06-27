import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { D as Moon, K as Dumbbell, h as Sparkles, rt as BrainCircuit, st as Apple, y as Send } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-DpB103cd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoachPage() {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [meals, setMeals] = (0, import_react.useState)([]);
	const [sleeps, setSleeps] = (0, import_react.useState)([]);
	const [userId, setUserId] = (0, import_react.useState)("");
	const [chatHistory, setChatHistory] = (0, import_react.useState)([]);
	const [typedInput, setTypedInput] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const loadSessionAndData = async () => {
			const { data } = await auth.getSession();
			if (data.session) {
				setProfile(data.session.profile);
				setUserId(data.session.user.id);
				setMeals(await db.getMeals(data.session.user.id));
				setSleeps(await db.getSleepLogs(data.session.user.id));
				setChatHistory([{
					id: "w1",
					sender: "ai",
					text: `Hello ${data.session.profile.name?.split(" ")?.[0] || "there"}! I am your Zenvita AI Coach. I have analyzed your health files, streak status, and recovery logs. How can I guide you today?`,
					timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})
				}]);
			}
		};
		loadSessionAndData();
	}, []);
	const handleSendMessage = (textToSend) => {
		if (!textToSend.trim()) return;
		const userMsg = {
			id: "u-" + Math.random().toString(36).substring(2, 11),
			sender: "user",
			text: textToSend,
			timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})
		};
		setChatHistory((prev) => [...prev, userMsg]);
		setTypedInput("");
		setIsTyping(true);
		setTimeout(() => {
			let aiText = "";
			const textLower = textToSend.toLowerCase();
			if (textLower.includes("sleep") || textLower.includes("recovery")) {
				const avgQuality = sleeps.length > 0 ? Math.round(sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length) : 80;
				const lastSleep = sleeps[sleeps.length - 1];
				aiText = `Analyzing your sleep history... Your average sleep quality is ${avgQuality}% over ${sleeps.length} logged sessions. `;
				if (lastSleep && lastSleep.quality < 80) aiText += `Your last log on ${lastSleep.date} had a quality of ${lastSleep.quality}% (${lastSleep.duration}h). Since you went to bed at ${lastSleep.bedtime}, I suggest shifting bedtime 30 mins earlier tonight to stabilize REM phases.`;
				else aiText += `Your recovery looks excellent! Resting Heart Rate is stable at ${lastSleep?.restingHeartRate || 60} bpm, which represents high recovery potential for a strength routine today.`;
			} else if (textLower.includes("nutrition") || textLower.includes("calories") || textLower.includes("recipe") || textLower.includes("food") || textLower.includes("protein")) {
				const totalCals = meals.reduce((sum, m) => sum + m.calories, 0);
				const totalProt = meals.reduce((sum, m) => sum + m.protein, 0);
				const goalProt = profile?.fitnessGoal === "build_muscle" ? 150 : 120;
				aiText = `Reviewing today's meals: You have logged ${meals.length} meals totaling ${totalCals} kcal. `;
				if (totalProt < goalProt * .5) aiText += `Your protein is currently low at ${totalProt}g / ${goalProt}g goal. I recommend adding a post-workout snack with 30g of protein, such as grilled chicken breast, 3 boiled eggs, or a high-quality whey isolate shake.`;
				else aiText += `Excellent macro control! Protein is at ${totalProt}g, which fully supports muscle synthesis and lean mass maintenance. Keep hydrating!`;
			} else if (textLower.includes("workout") || textLower.includes("exercise") || textLower.includes("routine") || textLower.includes("train")) aiText = `Based on your goal to *${profile?.fitnessGoal?.replace("_", " ") || "improve fitness"}* and your completed count of **${profile?.workoutsCount || 0} workouts**: I recommend executing the **HIIT Inferno** (cardio-focused, 20 mins, 360 kcal) or **Upper Body Burn** (strength-focused, 32 mins, 420 kcal) today. Focus on controlled eccentric movements for hypertrophy.`;
			else aiText = `I hear you! To give you the best advice, we can look at your stats: You are currently on a ${profile?.streak || 1}-day wellness streak. Your BMI is ${profile ? (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1) : "22.5"}. Would you like me to help you configure a custom workout plan, calculate a protein recipe, or analyze your sleep cycles?`;
			const aiMsg = {
				id: "ai-" + Math.random().toString(36).substring(2, 11),
				sender: "ai",
				text: aiText,
				timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				})
			};
			setChatHistory((prev) => [...prev, aiMsg]);
			setIsTyping(false);
		}, 1500);
	};
	const suggestionChips = [
		{
			label: "Analyze my sleep logs",
			icon: Moon,
			text: "Can you analyze my sleep logs and recovery trends?"
		},
		{
			label: "Recommend a workout",
			icon: Dumbbell,
			text: "Recommend a workout routine based on my fitness goals."
		},
		{
			label: "Protein recipe suggestions",
			icon: Apple,
			text: "Give me some high-protein recipe suggestions for dinner."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		subtitle: "AI Companion",
		title: "Zenvita AI Coach",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-4 space-y-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "AI Coach Context" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl glass p-4 border border-border space-y-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "h-5 w-5 text-[var(--brand)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-semibold text-foreground",
								children: "Active Bio-metrics Sync"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground leading-normal",
							children: "The AI Coach uses your real-time tracking dashboard parameters to customize recovery scores, food targets, and cardiovascular thresholds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-3.5 space-y-2.5 text-[10px] font-semibold text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Goal Target" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground capitalize",
										children: profile?.fitnessGoal?.replace("_", " ")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Completed Workouts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-foreground",
										children: [profile?.workoutsCount || 0, " sessions"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Avg Sleep Quality" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: sleeps.length > 0 ? `${Math.round(sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length)}%` : "85%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hydration today" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: "2.5 L"
									})]
								})
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass-strong border border-border shadow-card flex flex-col h-[480px] relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 border-b border-border flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-8.5 w-8.5 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4.5 w-4.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-foreground",
										children: "Zenvita Coach"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] text-muted-foreground mt-0.5",
										children: "Powered by Zenvita Wellness AI"
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto p-4 space-y-4",
							children: [chatHistory.map((msg) => {
								const isAI = msg.sender === "ai";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex flex-col max-w-[80%] ${isAI ? "mr-auto items-start" : "ml-auto items-end"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `p-3 rounded-2xl text-xs leading-normal ${isAI ? "bg-muted text-muted-foreground border border-border rounded-tl-none text-left" : "bg-gradient-brand text-white shadow-glow rounded-tr-none text-right"}`,
										children: msg.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] text-muted-foreground mt-1 px-1",
										children: msg.timestamp
									})]
								}, msg.id);
							}), isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 mr-auto bg-muted border border-border rounded-2xl rounded-tl-none p-3 max-w-[50%]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
										style: { animationDelay: "0ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
										style: { animationDelay: "150ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
										style: { animationDelay: "300ms" }
									})
								]
							})]
						}),
						chatHistory.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 py-2 flex flex-wrap gap-2 justify-start border-t border-border pt-3",
							children: suggestionChips.map((chip, idx) => {
								const Icon = chip.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleSendMessage(chip.text),
									className: "flex items-center gap-1.5 text-[10px] px-3.5 py-2 rounded-full border border-border glass hover:bg-muted/50 text-foreground transition-all cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-[var(--brand)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: chip.label })]
								}, idx);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								handleSendMessage(typedInput);
							},
							className: "p-3 border-t border-border flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								placeholder: "Ask your coach anything about workouts, sleep, nutrition...",
								value: typedInput,
								onChange: (e) => setTypedInput(e.target.value),
								className: "flex-1 bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand shadow-glow text-white hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4.5 w-4.5" })
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { CoachPage as component };
