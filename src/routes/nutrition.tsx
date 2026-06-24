import { createFileRoute } from "@tanstack/react-router";
import { 
  Plus, Coffee, UtensilsCrossed, Salad, Cookie, X, Edit2, 
  Sparkles, Trash2, Check, Mic, Image as ImageIcon, Loader2, Info
} from "lucide-react";
import { AppShell, SectionHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db, MealLog, FoodItem } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/nutrition")({
  head: () => ({
    meta: [
      { title: "Zenvita — AI Nutrition Tracker" },
    ],
  }),
  component: NutritionPage,
});

function NutritionPage() {
  const [userId, setUserId] = useState("");
  const [meals, setMeals] = useState<MealLog[]>([]);
  
  // Goals (Customizable)
  const [calorieGoal, setCalorieGoal] = useState(2400);
  const [proteinGoal, setProteinGoal] = useState(140);
  const [carbGoal, setCarbGoal] = useState(260);
  const [fatGoal, setFatGoal] = useState(70);

  // Modal controls
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<"Breakfast" | "Lunch" | "Snack" | "Dinner">("Breakfast");

  // AI-first Log Flow State
  const [mealDescription, setMealDescription] = useState("");
  const [selectedImageName, setSelectedImageName] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  // Loading state
  const [aiLoading, setAiLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");

  // Review Screen State
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewedFoods, setReviewedFoods] = useState<FoodItem[]>([]);

  // Goal Form State
  const [tempCalories, setTempCalories] = useState(calorieGoal);
  const [tempProtein, setTempProtein] = useState(proteinGoal);
  const [tempCarbs, setTempCarbs] = useState(carbGoal);
  const [tempFats, setTempFats] = useState(fatGoal);

  useEffect(() => {
    const loadSessionAndData = async () => {
      const { data } = await auth.getSession();
      if (data.session) {
        setUserId(data.session.user.id);
        
        // Fetch goals from profile config if customized
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

        // Fetch logs
        const loggedMeals = await db.getMeals(data.session.user.id);
        setMeals(loggedMeals);
      }
    };

    loadSessionAndData();

    const openMealHandler = () => openLogModal("Breakfast");
    window.addEventListener('zenvita:open-meal-log', openMealHandler as EventListener);

    return () => {
      window.removeEventListener('zenvita:open-meal-log', openMealHandler as EventListener);
    };
  }, []);

  const openLogModal = (type: "Breakfast" | "Lunch" | "Snack" | "Dinner") => {
    setSelectedMealType(type);
    setMealDescription("");
    setSelectedImageName("");
    setIsListening(false);
    setAiLoading(false);
    setIsReviewMode(false);
    setReviewedFoods([]);
    setLogModalOpen(true);
  };

  // Mock Voice input activation
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech-to-text
      setTimeout(() => {
        setMealDescription("2 scrambled eggs, avocado toast, and black coffee");
        setIsListening(false);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  // Mock Photo upload activation
  const handlePhotoUpload = () => {
    setSelectedImageName("meal_photo_captured.jpg");
    setMealDescription("Grilled salmon fillet with broccoli and sweet potato mash");
  };

  // Triggers the AI Loading & analysis flow
  const handleAnalyzeMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealDescription.trim() && !selectedImageName) return;

    setAiLoading(true);
    
    // Stage 1
    setLoadingStage("Analyzing meal...");
    
    setTimeout(() => {
      // Stage 2
      setLoadingStage("Calculating nutrition...");
      
      setTimeout(() => {
        // Stage 3
        setLoadingStage("Estimating portions...");
        
        setTimeout(() => {
          // Parse description into mock detected foods
          const desc = mealDescription.toLowerCase();
          let mockDetected: FoodItem[] = [];

          if (desc.includes("egg")) {
            mockDetected.push({ name: "Scrambled Eggs", quantity: "2 large", calories: 140, protein: 12, carbs: 1, fats: 10 });
          }
          if (desc.includes("toast") || desc.includes("chapati")) {
            mockDetected.push({ name: "Whole Wheat Toast", quantity: "2 slices", calories: 160, protein: 6, carbs: 30, fats: 2 });
          }
          if (desc.includes("avocado")) {
            mockDetected.push({ name: "Avocado", quantity: "0.5 fruit", calories: 120, protein: 1, carbs: 6, fats: 11 });
          }
          if (desc.includes("salmon")) {
            mockDetected.push({ name: "Grilled Salmon", quantity: "150g", calories: 280, protein: 32, carbs: 0, fats: 16 });
          }
          if (desc.includes("broccoli")) {
            mockDetected.push({ name: "Steamed Broccoli", quantity: "1 cup", calories: 35, protein: 2, carbs: 7, fats: 0 });
          }
          if (desc.includes("potato")) {
            mockDetected.push({ name: "Mashed Sweet Potato", quantity: "100g", calories: 90, protein: 2, carbs: 21, fats: 0 });
          }
          if (desc.includes("coffee") || desc.includes("tea")) {
            mockDetected.push({ name: "Black Coffee", quantity: "1 mug", calories: 5, protein: 0, carbs: 0, fats: 0 });
          }

          // Fallback if nothing recognized
          if (mockDetected.length === 0) {
            mockDetected = [
              { name: mealDescription || "Healthy Salad Plate", quantity: "1 serving", calories: 380, protein: 18, carbs: 40, fats: 12 }
            ];
          }

          setReviewedFoods(mockDetected);
          setAiLoading(false);
          setIsReviewMode(true);
        }, 1200);
      }, 1000);
    }, 800);
  };

  // Add a blank row in the review screen
  const handleAddReviewRow = () => {
    const newItem: FoodItem = {
      name: "New food item",
      quantity: "1 serving",
      calories: 120,
      protein: 8,
      carbs: 15,
      fats: 4
    };
    setReviewedFoods((prev) => [...prev, newItem]);
  };

  // Remove a row in the review screen
  const handleRemoveReviewRow = (idx: number) => {
    setReviewedFoods((prev) => prev.filter((_, i) => i !== idx));
  };

  // Update fields of review rows
  const handleUpdateReviewRow = (idx: number, key: keyof FoodItem, val: string | number) => {
    setReviewedFoods((prev) => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        [key]: val
      };
      
      // Auto-recalculate macros if quantity changes (mock scaling factor)
      if (key === "quantity") {
        const qtyStr = String(val).toLowerCase();
        let scale = 1.0;
        if (qtyStr.includes("double") || qtyStr.includes("2")) scale = 2.0;
        else if (qtyStr.includes("half") || qtyStr.includes("0.5")) scale = 0.5;

        // Scale calories and macros roughly
        updated[idx].calories = Math.round(updated[idx].calories * scale);
        updated[idx].protein = Math.round(updated[idx].protein * scale);
        updated[idx].carbs = Math.round(updated[idx].carbs * scale);
        updated[idx].fats = Math.round(updated[idx].fats * scale);
      }
      return updated;
    });
  };

  // Commit reviewed list to database
  const handleSaveReviewedMeal = async () => {
    if (reviewedFoods.length === 0) return;

    // Sum reviewed metrics
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

    // Trigger confirmation notification
    db.addNotification({
      userId,
      title: "AI Logged Meal Success",
      message: `AI detected and saved: ${descSummary} (${totalCal} kcal).`,
      type: "ai"
    });
  };

  const handleUpdateGoals = (e: React.FormEvent) => {
    e.preventDefault();
    setCalorieGoal(tempCalories);
    setProteinGoal(tempProtein);
    setCarbGoal(tempCarbs);
    setFatGoal(tempFats);
    setGoalModalOpen(false);
  };

  // Compute daily totals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);

  const macros = [
    { label: "Protein", value: totalProtein, max: proteinGoal, color: "#f97316" },
    { label: "Carbs", value: totalCarbs, max: carbGoal, color: "#ff8b3d" },
    { label: "Fats", value: totalFats, max: fatGoal, color: "#ea580c" },
  ];

  const mealCategories = [
    { type: "Breakfast" as const, icon: Coffee, defaultDesc: "Eggs, toast, oatmeal" },
    { type: "Lunch" as const, icon: Salad, defaultDesc: "Salad, lean meats, rice" },
    { type: "Snack" as const, icon: Cookie, defaultDesc: "Protein shake, nuts, fruit" },
    { type: "Dinner" as const, icon: UtensilsCrossed, defaultDesc: "Fish, sweet potato, green salad" },
  ];

  return (
    <AppShell subtitle="Fuel your body" title="Nutrition">
      
      {/* Summary Card — matches page background */}
      <div className="rounded-3xl bg-background border border-border/60 p-6 mb-6">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Calories today</p>
            <p className="font-[Instrument_Serif] text-4xl mt-1 text-foreground">
              {totalCalories.toLocaleString()}{" "}
              <span className="text-xs text-muted-foreground font-normal font-sans">/ {calorieGoal} kcal</span>
            </p>
          </div>
          <button 
            onClick={() => {
              setTempCalories(calorieGoal);
              setTempProtein(proteinGoal);
              setTempCarbs(carbGoal);
              setTempFats(fatGoal);
              setGoalModalOpen(true);
            }}
            className="p-2.5 rounded-full border border-border bg-muted hover:bg-muted/80 text-foreground transition-all cursor-pointer"
            aria-label="Edit Goals"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>

        {/* Macros Progress Bars */}
        <div className="mt-6 space-y-4">
          {macros.map((m) => {
            const pct = Math.min(100, (m.value / m.max) * 100);
            return (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1.5 font-bold">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="text-foreground">{m.value}g / {m.max}g</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-brand" 
                    style={{ background: m.color }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meals sections */}
      <SectionHeader title="Log Meals (AI-First)" />
      <div className="space-y-4">
        {mealCategories.map((cat) => {
          const categoryLogs = meals.filter((m) => m.mealType === cat.type);
          const totalCatKcal = categoryLogs.reduce((sum, m) => sum + m.calories, 0);
          const Icon = cat.icon;

          return (
            <div key={cat.type} className="rounded-2xl bg-card border border-border p-5 shadow-card transition-all text-left">
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-[var(--brand)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{cat.type}</h3>
                    <p className="text-[9px] text-muted-foreground font-bold">{categoryLogs.length} items logged</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {totalCatKcal > 0 && (
                    <span className="text-xs text-foreground font-bold">{totalCatKcal} kcal</span>
                  )}
                  <button 
                    onClick={() => openLogModal(cat.type)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand hover:opacity-95 active:scale-90 text-white shadow-glow transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Logged item rows with AI subitem lists */}
              <div className="space-y-3.5">
                {categoryLogs.length > 0 ? (
                  categoryLogs.map((item) => (
                    <div key={item.id} className="text-xs py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-foreground">{item.foodsList ? `${item.foodsList.length} items detected` : item.foodName}</p>
                          <p className="text-[9px] text-muted-foreground mt-0.5">P: {item.protein}g · C: {item.carbs}g · F: {item.fats}g</p>
                        </div>
                        <span className="text-foreground font-bold">{item.calories} kcal</span>
                      </div>

                      {/* Display AI detected foods checklist */}
                      {item.foodsList && (
                        <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-[var(--brand)]/20">
                          {item.foodsList.map((food, fidx) => (
                            <div key={fidx} className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold">
                              <span className="text-emerald-500 font-bold">✔</span>
                              <span className="text-foreground/80">{food.name}</span>
                              <span className="text-muted-foreground/60">({food.quantity})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-muted-foreground italic pl-1">{cat.defaultDesc}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI-FIRST MEAL LOGGING MODAL */}
      <AnimatePresence>
        {logModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLogModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[480px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left max-h-[85vh] overflow-y-auto text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-[var(--brand)]" />
                  AI Meal Logger — {selectedMealType}
                </h3>
                <button 
                  onClick={() => setLogModalOpen(false)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!isReviewMode ? (
                // INPUT SCREEN
                <form onSubmit={handleAnalyzeMeal} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Describe your meal in natural language</label>
                    <textarea
                      required
                      rows={3}
                      disabled={aiLoading}
                      placeholder="e.g. 2 boiled eggs, a cup of oatmeal with honey, and a sliced banana"
                      value={mealDescription}
                      onChange={(e) => setMealDescription(e.target.value)}
                      className="w-full bg-muted border border-border rounded-xl p-3 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] resize-none"
                    />
                  </div>

                  {/* Upload photo and voice buttons */}
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={aiLoading}
                      onClick={handlePhotoUpload}
                      className="flex-1 py-2.5 rounded-xl border border-border bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="h-4 w-4 text-[var(--brand)]" />
                      <span>{selectedImageName ? "Photo added ✔" : "Add Food Photo"}</span>
                    </button>
                    <button
                      type="button"
                      disabled={aiLoading}
                      onClick={toggleListening}
                      className={`flex-1 py-2.5 rounded-xl border border-border font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                        isListening ? "bg-red-500/10 text-red-500 border-red-500/35 animate-pulse" : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      <Mic className="h-4 w-4 text-[var(--brand)]" />
                      <span>{isListening ? "Listening..." : "Voice input"}</span>
                    </button>
                  </div>

                  {selectedImageName && (
                    <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1"><Check className="h-3 w-3" /> Image "{selectedImageName}" attached successfully.</p>
                  )}

                  {/* AI Loaders state */}
                  {aiLoading ? (
                    <div className="rounded-2xl bg-muted border border-border p-5 text-center flex flex-col items-center justify-center space-y-3 mt-4">
                      <Loader2 className="h-6 w-6 text-[var(--brand)] animate-spin" />
                      <p className="text-xs font-semibold text-foreground">{loadingStage}</p>
                      <p className="text-[10px] text-muted-foreground">Extracting nutritional profile using AI...</p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-glow cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" /> Analyze with AI
                    </button>
                  )}
                </form>
              ) : (
                // EDITABLE REVIEW SCREEN
                <div className="space-y-4">
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-[11px] text-emerald-500 flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>AI successfully generated nutritional metrics! Review below.</span>
                  </div>

                  <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                    {reviewedFoods.map((food, idx) => (
                      <div key={idx} className="rounded-xl bg-muted border border-border p-3.5 space-y-2.5 relative">
                        <button 
                          onClick={() => handleRemoveReviewRow(idx)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                          aria-label="Delete item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        <div className="grid grid-cols-2 gap-2 pr-6">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Food Name</label>
                            <input
                              type="text"
                              value={food.name}
                              onChange={(e) => handleUpdateReviewRow(idx, "name", e.target.value)}
                              className="w-full bg-muted border border-border rounded-lg py-1 px-2 text-[11px] text-foreground focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Portion / Quantity</label>
                            <input
                              type="text"
                              value={food.quantity}
                              onChange={(e) => handleUpdateReviewRow(idx, "quantity", e.target.value)}
                              placeholder="e.g. 2 pieces"
                              className="w-full bg-muted border border-border rounded-lg py-1 px-2 text-[11px] text-foreground focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-1.5">
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Cals (kcal)</label>
                            <input
                              type="number"
                              value={food.calories}
                              onChange={(e) => handleUpdateReviewRow(idx, "calories", Number(e.target.value))}
                              className="w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Protein (g)</label>
                            <input
                              type="number"
                              value={food.protein}
                              onChange={(e) => handleUpdateReviewRow(idx, "protein", Number(e.target.value))}
                              className="w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Carbs (g)</label>
                            <input
                              type="number"
                              value={food.carbs}
                              onChange={(e) => handleUpdateReviewRow(idx, "carbs", Number(e.target.value))}
                              className="w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Fats (g)</label>
                            <input
                              type="number"
                              value={food.fats}
                              onChange={(e) => handleUpdateReviewRow(idx, "fats", Number(e.target.value))}
                              className="w-full bg-muted border border-border rounded-lg py-1 px-1.5 text-[11px] text-foreground text-center focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddReviewRow}
                      className="flex-1 py-2.5 rounded-xl border border-border bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" /> Add Food
                    </button>
                    <button
                      onClick={() => setIsReviewMode(false)}
                      className="flex-1 py-2.5 rounded-xl border border-border bg-muted hover:bg-muted/80 text-muted-foreground font-semibold text-xs cursor-pointer"
                    >
                      Back / Re-analyze
                    </button>
                  </div>

                  <div className="border-t border-border pt-4 mt-2 space-y-2.5 text-[11px] font-semibold text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Total Calculated Calories</span>
                      <span className="text-foreground">{reviewedFoods.reduce((sum, f) => sum + f.calories, 0)} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Macros (P / C / F)</span>
                      <span className="text-foreground">
                        {reviewedFoods.reduce((sum, f) => sum + f.protein, 0)}g / {reviewedFoods.reduce((sum, f) => sum + f.carbs, 0)}g / {reviewedFoods.reduce((sum, f) => sum + f.fats, 0)}g
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveReviewedMeal}
                    className="w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-glow cursor-pointer"
                  >
                    <Check className="h-4.5 w-4.5" /> Save Meal Log
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GOAL CONFIGURATION MODAL */}
      <AnimatePresence>
        {goalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGoalModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[420px] bg-card border border-border rounded-3xl p-6 shadow-2xl z-10 text-left text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm font-semibold text-foreground">Edit Nutrition Goals</h3>
                <button 
                  onClick={() => setGoalModalOpen(false)}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateGoals} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Calorie Target (kcal)</label>
                  <input
                    type="number"
                    required
                    value={tempCalories}
                    onChange={(e) => setTempCalories(Number(e.target.value))}
                    className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Protein Target (g)</label>
                  <input
                    type="number"
                    required
                    value={tempProtein}
                    onChange={(e) => setTempProtein(Number(e.target.value))}
                    className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Carbs Target (g)</label>
                    <input
                      type="number"
                      required
                      value={tempCarbs}
                      onChange={(e) => setTempCarbs(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Fats Target (g)</label>
                    <input
                      type="number"
                      required
                      value={tempFats}
                      onChange={(e) => setTempFats(Number(e.target.value))}
                      className="w-full bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 rounded-xl bg-gradient-brand py-3 text-xs font-semibold text-white flex items-center justify-center gap-1 shadow-glow cursor-pointer"
                >
                  Save Goals
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}