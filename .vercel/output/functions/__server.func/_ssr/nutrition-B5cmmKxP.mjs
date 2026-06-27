import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as db, t as auth } from "./supabase-DG2bxhYa.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { C as Plus, E as Pen, F as LoaderCircle, L as Image, S as Salad, X as Coffee, Y as Cookie, h as Sparkles, k as Mic, l as Trash2, n as X, nt as Check, r as UtensilsCrossed } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nutrition-B5cmmKxP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NutritionPage() {
	const [userId, setUserId] = (0, import_react.useState)("");
	const [meals, setMeals] = (0, import_react.useState)([]);
	const [calorieGoal, setCalorieGoal] = (0, import_react.useState)(2400);
	const [proteinGoal, setProteinGoal] = (0, import_react.useState)(140);
	const [carbGoal, setCarbGoal] = (0, import_react.useState)(260);
	const [fatGoal, setFatGoal] = (0, import_react.useState)(70);
	const [logModalOpen, setLogModalOpen] = (0, import_react.useState)(false);
	const [goalModalOpen, setGoalModalOpen] = (0, import_react.useState)(false);
	const [selectedMealType, setSelectedMealType] = (0, import_react.useState)("Breakfast");
	const [mealDescription, setMealDescription] = (0, import_react.useState)("");
	const [selectedImageName, setSelectedImageName] = (0, import_react.useState)("");
	const [isListening, setIsListening] = (0, import_react.useState)(false);
	const [aiLoading, setAiLoading] = (0, import_react.useState)(false);
	const [loadingStage, setLoadingStage] = (0, import_react.useState)("");
	const [isReviewMode, setIsReviewMode] = (0, import_react.useState)(false);
	const [reviewedFoods, setReviewedFoods] = (0, import_react.useState)([]);
	const [tempCalories, setTempCalories] = (0, import_react.useState)(calorieGoal);
	const [tempProtein, setTempProtein] = (0, import_react.useState)(proteinGoal);
	const [tempCarbs, setTempCarbs] = (0, import_react.useState)(carbGoal);
	const [tempFats, setTempFats] = (0, import_react.useState)(fatGoal);
	(0, import_react.useEffect)(() => {
		const loadSessionAndData = async () => {
			const { data } = await auth.getSession();
			if (data.session) {
				setUserId(data.session.user.id);
				const prof = data.session.profile;
				if (prof?.fitnessGoal === "build_muscle") {
					setCalorieGoal(2800);
					setProteinGoal(160);
					setCarbGoal(300);
					setFatGoal(80);
				} else if (prof?.fitnessGoal === "lose_weight") {
					setCalorieGoal(1800);
					setProteinGoal(120);
					setCarbGoal(180);
					setFatGoal(55);
				}
				setMeals(await db.getMeals(data.session.user.id));
			}
		};
		loadSessionAndData();
		const openMealHandler = () => openLogModal("Breakfast");
		window.addEventListener("zenvita:open-meal-log", openMealHandler);
		return () => {
			window.removeEventListener("zenvita:open-meal-log", openMealHandler);
		};
	}, []);
	const openLogModal = (type) => {
		setSelectedMealType(type);
		setMealDescription("");
		setSelectedImageName("");
		setIsListening(false);
		setAiLoading(false);
		setIsReviewMode(false);
		setReviewedFoods([]);
		setLogModalOpen(true);
	};
	const toggleListening = () => {
		if (!isListening) {
			setIsListening(true);
			setTimeout(() => {
				setMealDescription("2 scrambled eggs, avocado toast, and black coffee");
				setIsListening(false);
			}, 2500);
		} else setIsListening(false);
	};
	const handlePhotoUpload = () => {
		setSelectedImageName("meal_photo_captured.jpg");
		setMealDescription("Grilled salmon fillet with broccoli and sweet potato mash");
	};
	const handleAnalyzeMeal = (e) => {
		e.preventDefault();
		if (!mealDescription.trim() && !selectedImageName) return;
		setAiLoading(true);
		setLoadingStage("Analyzing meal...");
		setTimeout(() => {
			setLoadingStage("Calculating nutrition...");
			setTimeout(() => {
				setLoadingStage("Estimating portions...");
				setTimeout(() => {
					const desc = mealDescription.toLowerCase();
					let mockDetected = [];
					if (desc.includes("egg")) mockDetected.push({
						name: "Scrambled Eggs",
						quantity: "2 large",
						calories: 140,
						protein: 12,
						carbs: 1,
						fats: 10
					});
					if (desc.includes("toast") || desc.includes("chapati")) mockDetected.push({
						name: "Whole Wheat Toast",
						quantity: "2 slices",
						calories: 160,
						protein: 6,
						carbs: 30,
						fats: 2
					});
					if (desc.includes("avocado")) mockDetected.push({
						name: "Avocado",
						quantity: "0.5 fruit",
						calories: 120,
						protein: 1,
						carbs: 6,
						fats: 11
					});
					if (desc.includes("salmon")) mockDetected.push({
						name: "Grilled Salmon",
						quantity: "150g",
						calories: 280,
						protein: 32,
						carbs: 0,
						fats: 16
					});
					if (desc.includes("broccoli")) mockDetected.push({
						name: "Steamed Broccoli",
						quantity: "1 cup",
						calories: 35,
						protein: 2,
						carbs: 7,
						fats: 0
					});
					if (desc.includes("potato")) mockDetected.push({
						name: "Mashed Sweet Potato",
						quantity: "100g",
						calories: 90,
						protein: 2,
						carbs: 21,
						fats: 0
					});
					if (desc.includes("coffee") || desc.includes("tea")) mockDetected.push({
						name: "Black Coffee",
						quantity: "1 mug",
						calories: 5,
						protein: 0,
						carbs: 0,
						fats: 0
					});
					if (mockDetected.length === 0) mockDetected = [{
						name: mealDescription || "Healthy Salad Plate",
						quantity: "1 serving",
						calories: 380,
						protein: 18,
						carbs: 40,
						fats: 12
					}];
					setReviewedFoods(mockDetected);
					setAiLoading(false);
					setIsReviewMode(true);
				}, 1200);
			}, 1e3);
		}, 800);
	};
	const handleAddReviewRow = () => {
		const newItem = {
			name: "New food item",
			quantity: "1 serving",
			calories: 120,
			protein: 8,
			carbs: 15,
			fats: 4
		};
		setReviewedFoods((prev) => [...prev, newItem]);
	};
	const handleRemoveReviewRow = (idx) => {
		setReviewedFoods((prev) => prev.filter((_, i) => i !== idx));
	};
	const handleUpdateReviewRow = (idx, key, val) => {
		setReviewedFoods((prev) => {
			const updated = [...prev];
			updated[idx] = {
				...updated[idx],
				[key]: val
			};
			if (key === "quantity") {
				const qtyStr = String(val).toLowerCase();
				let scale = 1;
				if (qtyStr.includes("double") || qtyStr.includes("2")) scale = 2;
				else if (qtyStr.includes("half") || qtyStr.includes("0.5")) scale = .5;
				updated[idx].calories = Math.round(updated[idx].calories * scale);
				updated[idx].protein = Math.round(updated[idx].protein * scale);
				updated[idx].carbs = Math.round(updated[idx].carbs * scale);
				updated[idx].fats = Math.round(updated[idx].fats * scale);
			}
			return updated;
		});
	};
	const handleSaveReviewedMeal = async () => {
		if (reviewedFoods.length === 0) return;
		const totalCal = reviewedFoods.reduce((sum, f) => sum + f.calories, 0);
		const totalProt = reviewedFoods.reduce((sum, f) => sum + f.protein, 0);
		const totalCarbs = reviewedFoods.reduce((sum, f) => sum + f.carbs, 0);
		const totalFats = reviewedFoods.reduce((sum, f) => sum + f.fats, 0);
		const descSummary = reviewedFoods.map((f) => f.name).join(", ");
		const newMeal = await db.addMeal({
			userId,
			mealType: selectedMealType,
			foodName: descSummary,
			quantity: "AI Logged",
			calories: totalCal,
			protein: totalProt,
			carbs: totalCarbs,
			fats: totalFats,
			foodsList: reviewedFoods
		});
		setMeals((m) => [...m, newMeal]);
		setLogModalOpen(false);
		db.addNotification({
			userId,
			title: "AI Logged Meal Success",
			message: `AI detected and saved: ${descSummary} (${totalCal} kcal).`,
			type: "ai"
		});
	};
	const handleUpdateGoals = (e) => {
		e.preventDefault();
		setCalorieGoal(tempCalories);
		setProteinGoal(tempProtein);
		setCarbGoal(tempCarbs);
		setFatGoal(tempFats);
		setGoalModalOpen(false);
	};
	const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
	const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
	const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
	const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);
	const macros = [
		{
			label: "Protein",
			value: totalProtein,
			max: proteinGoal,
			color: "#f97316"
		},
		{
			label: "Carbs",
			value: totalCarbs,
			max: carbGoal,
			color: "#ff8b3d"
		},
		{
			label: "Fats",
			value: totalFats,
			max: fatGoal,
			color: "#ea580c"
		}
	];
	const mealCategories = [
		{
			type: "Breakfast",
			icon: Coffee,
			defaultDesc: "Eggs, toast, oatmeal"
		},
		{
			type: "Lunch",
			icon: Salad,
			defaultDesc: "Salad, lean meats, rice"
		},
		{
			type: "Snack",
			icon: Cookie,
			defaultDesc: "Protein shake, nuts, fruit"
		},
		{
			type: "Dinner",
			icon: UtensilsCrossed,
			defaultDesc: "Fish, sweet potato, green salad"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: "Fuel your body",
		title: "Nutrition",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-background border border-border/60 p-6 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground font-bold",
						children: "Calories today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-[Instrument_Serif] text-4xl mt-1 text-foreground",
						children: [
							totalCalories.toLocaleString(),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground font-normal font-sans",
								children: [
									"/ ",
									calorieGoal,
									" kcal"
								]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setTempCalories(calorieGoal);
							setTempProtein(proteinGoal);
							setTempCarbs(carbGoal);
							setTempFats(fatGoal);
							setGoalModalOpen(true);
						},
						className: "p-2.5 rounded-full border border-border bg-muted hover:bg-muted/80 text-foreground transition-all cursor-pointer",
						"aria-label": "Edit Goals",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-4",
					children: macros.map((m) => {
						const pct = Math.min(100, m.value / m.max * 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs mb-1.5 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: m.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground",
								children: [
									m.value,
									"g / ",
									m.max,
									"g"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-muted overflow-hidden shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { width: 0 },
								animate: { width: `${pct}%` },
								transition: {
									duration: .8,
									ease: "easeOut"
								},
								className: "h-full rounded-full bg-gradient-brand",
								style: { background: m.color }
							})
						})] }, m.label);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Log Meals (AI-First)" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: mealCategories.map((cat) => {
					const categoryLogs = meals.filter((m) => m.mealType === cat.type);
					const totalCatKcal = categoryLogs.reduce((sum, m) => sum + m.calories, 0);
					const Icon = cat.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card border border-border p-5 shadow-card transition-all text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3.5 pb-2.5 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-10 w-10 place-items-center rounded-xl bg-muted text-[var(--brand)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold text-foreground",
									children: cat.type
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9px] text-muted-foreground font-bold",
									children: [categoryLogs.length, " items logged"]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [totalCatKcal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-foreground font-bold",
									children: [totalCatKcal, " kcal"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => openLogModal(cat.type),
									className: "grid h-8 w-8 place-items-center rounded-full bg-gradient-brand hover:opacity-95 active:scale-90 text-white shadow-glow transition-all cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3.5",
							children: categoryLogs.length > 0 ? categoryLogs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground",
										children: item.foodsList ? `${item.foodsList.length} items detected` : item.foodName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9px] text-muted-foreground mt-0.5",
										children: [
											"P: ",
											item.protein,
											"g · C: ",
											item.carbs,
											"g · F: ",
											item.fats,
											"g"
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-foreground font-bold",
										children: [item.calories, " kcal"]
									})]
								}), item.foodsList && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 space-y-1.5 pl-3 border-l-2 border-[var(--brand)]/20",
									children: item.foodsList.map((food, fidx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-[10px] text-muted-foreground font-semibold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-emerald-500 font-bold",
												children: "✔"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground/80",
												children: food.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground/60",
												children: [
													"(",
													food.quantity,
													")"
												]
											})
										]
									}, fidx))
								})]
							}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground italic pl-1",
								children: cat.defaultDesc
							})
						})]
					}, cat.type);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: logModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setLogModalOpen(false),
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
					className: "relative w-full max-w-[480px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left max-h-[85vh] overflow-y-auto text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4.5 w-4.5 text-[var(--brand)]" }),
								"AI Meal Logger — ",
								selectedMealType
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setLogModalOpen(false),
							className: "p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), !isReviewMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAnalyzeMeal,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5",
								children: "Describe your meal in natural language"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								rows: 3,
								disabled: aiLoading,
								placeholder: "e.g. 2 boiled eggs, a cup of oatmeal with honey, and a sliced banana",
								value: mealDescription,
								onChange: (e) => setMealDescription(e.target.value),
								className: "w-full bg-muted border border-border rounded-xl p-3 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] resize-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: aiLoading,
									onClick: handlePhotoUpload,
									className: "flex-1 py-2.5 rounded-xl border border-border bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-[var(--brand)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedImageName ? "Photo added ✔" : "Add Food Photo" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: aiLoading,
									onClick: toggleListening,
									className: `flex-1 py-2.5 rounded-xl border border-border font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${isListening ? "bg-red-500/10 text-red-500 border-red-500/35 animate-pulse" : "bg-muted hover:bg-muted/80 text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4 text-[var(--brand)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isListening ? "Listening..." : "Voice input" })]
								})]
							}),
							selectedImageName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-emerald-500 font-semibold flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }),
									" Image \"",
									selectedImageName,
									"\" attached successfully."
								]
							}),
							aiLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-muted border border-border p-5 text-center flex flex-col items-center justify-center space-y-3 mt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 text-[var(--brand)] animate-spin" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: loadingStage
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Extracting nutritional profile using AI..."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-glow cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Analyze with AI"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-[11px] text-emerald-500 flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI successfully generated nutritional metrics! Review below." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3 max-h-[40vh] overflow-y-auto pr-1",
								children: reviewedFoods.map((food, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-muted border border-border p-3.5 space-y-2.5 relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleRemoveReviewRow(idx),
											className: "absolute top-2 right-2 p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10",
											"aria-label": "Delete item",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2 pr-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
												children: "Food Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: food.name,
												onChange: (e) => handleUpdateReviewRow(idx, "name", e.target.value),
												className: "w-full bg-muted border border-border rounded-lg py-1 px-2 text-[11px] text-foreground focus:outline-none"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
												children: "Portion / Quantity"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: food.quantity,
												onChange: (e) => handleUpdateReviewRow(idx, "quantity", e.target.value),
												placeholder: "e.g. 2 pieces",
												className: "w-full bg-muted border border-border rounded-lg py-1 px-2 text-[11px] text-foreground focus:outline-none"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-4 gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
													children: "Cals (kcal)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: food.calories,
													onChange: (e) => handleUpdateReviewRow(idx, "calories", Number(e.target.value)),
													className: "w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
													children: "Protein (g)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: food.protein,
													onChange: (e) => handleUpdateReviewRow(idx, "protein", Number(e.target.value)),
													className: "w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
													children: "Carbs (g)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: food.carbs,
													onChange: (e) => handleUpdateReviewRow(idx, "carbs", Number(e.target.value)),
													className: "w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
													children: "Fats (g)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: food.fats,
													onChange: (e) => handleUpdateReviewRow(idx, "fats", Number(e.target.value)),
													className: "w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
												})] })
											]
										})
									]
								}, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleAddReviewRow,
									className: "flex-1 py-2.5 rounded-xl border border-border bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Food"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIsReviewMode(false),
									className: "flex-1 py-2.5 rounded-xl border border-border bg-muted hover:bg-muted/80 text-muted-foreground font-semibold text-xs cursor-pointer",
									children: "Back / Re-analyze"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border pt-4 mt-2 space-y-2.5 text-[11px] font-semibold text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Calculated Calories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-foreground",
										children: [reviewedFoods.reduce((sum, f) => sum + f.calories, 0), " kcal"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Macros (P / C / F)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-foreground",
										children: [
											reviewedFoods.reduce((sum, f) => sum + f.protein, 0),
											"g / ",
											reviewedFoods.reduce((sum, f) => sum + f.carbs, 0),
											"g / ",
											reviewedFoods.reduce((sum, f) => sum + f.fats, 0),
											"g"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSaveReviewedMeal,
								className: "w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-glow cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4.5 w-4.5" }), " Save Meal Log"]
							})
						]
					})]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: goalModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setGoalModalOpen(false),
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
					className: "relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Edit Nutrition Goals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setGoalModalOpen(false),
							className: "p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleUpdateGoals,
						className: "mt-4 space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
								children: "Calorie Target (kcal)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: tempCalories,
								onChange: (e) => setTempCalories(Number(e.target.value)),
								className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
								children: "Protein Target (g)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: tempProtein,
								onChange: (e) => setTempProtein(Number(e.target.value)),
								className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Carbs Target (g)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: tempCarbs,
									onChange: (e) => setTempCarbs(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1",
									children: "Fats Target (g)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: tempFats,
									onChange: (e) => setTempFats(Number(e.target.value)),
									className: "w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow cursor-pointer",
								children: "Save Goals"
							})
						]
					})]
				})]
			}) })
		]
	});
}
//#endregion
export { NutritionPage as component };
