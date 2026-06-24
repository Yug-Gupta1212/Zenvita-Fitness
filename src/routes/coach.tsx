import { createFileRoute } from "@tanstack/react-router";
import { 
  Sparkles, Send, BrainCircuit, ChevronRight, Check, Zap, Apple, Dumbbell, Moon
} from "lucide-react";
import { AppShell, SectionHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth, db, Profile, MealLog, SleepLog } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Zenvita — AI Wellness Coach" },
    ],
  }),
  component: CoachPage,
});

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

function CoachPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [sleeps, setSleeps] = useState<SleepLog[]>([]);
  const [userId, setUserId] = useState("");

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [typedInput, setTypedInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loadSessionAndData = async () => {
      const { data } = await auth.getSession();
      if (data.session) {
        setProfile(data.session.profile);
        setUserId(data.session.user.id);

        const mealData = await db.getMeals(data.session.user.id);
        setMeals(mealData);

        const sleepData = await db.getSleepLogs(data.session.user.id);
        setSleeps(sleepData);

        // Welcome message
        const welcomeMsg: ChatMessage = {
          id: "w1",
          sender: "ai",
          text: `Hello ${data.session.profile.name?.split(" ")?.[0] || "there"}! I am your Zenvita AI Coach. I have analyzed your health files, streak status, and recovery logs. How can I guide you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setChatHistory([welcomeMsg]);
      }
    };
    loadSessionAndData();
  }, []);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "u-" + Math.random().toString(36).substring(2, 11),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setTypedInput("");
    setIsTyping(true);

    // Compute dynamic, highly contextual response based on logged details!
    setTimeout(() => {
      let aiText = "";
      const textLower = textToSend.toLowerCase();

      if (textLower.includes("sleep") || textLower.includes("recovery")) {
        const avgQuality = sleeps.length > 0 
          ? Math.round(sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length)
          : 80;
        const lastSleep = sleeps[sleeps.length - 1];
        
        aiText = `Analyzing your sleep history... Your average sleep quality is ${avgQuality}% over ${sleeps.length} logged sessions. `;
        if (lastSleep && lastSleep.quality < 80) {
          aiText += `Your last log on ${lastSleep.date} had a quality of ${lastSleep.quality}% (${lastSleep.duration}h). Since you went to bed at ${lastSleep.bedtime}, I suggest shifting bedtime 30 mins earlier tonight to stabilize REM phases.`;
        } else {
          aiText += `Your recovery looks excellent! Resting Heart Rate is stable at ${lastSleep?.restingHeartRate || 60} bpm, which represents high recovery potential for a strength routine today.`;
        }
      } else if (textLower.includes("nutrition") || textLower.includes("calories") || textLower.includes("recipe") || textLower.includes("food") || textLower.includes("protein")) {
        const totalCals = meals.reduce((sum, m) => sum + m.calories, 0);
        const totalProt = meals.reduce((sum, m) => sum + m.protein, 0);
        const goalProt = profile?.fitnessGoal === "build_muscle" ? 150 : 120;

        aiText = `Reviewing today's meals: You have logged ${meals.length} meals totaling ${totalCals} kcal. `;
        if (totalProt < goalProt * 0.5) {
          aiText += `Your protein is currently low at ${totalProt}g / ${goalProt}g goal. I recommend adding a post-workout snack with 30g of protein, such as grilled chicken breast, 3 boiled eggs, or a high-quality whey isolate shake.`;
        } else {
          aiText += `Excellent macro control! Protein is at ${totalProt}g, which fully supports muscle synthesis and lean mass maintenance. Keep hydrating!`;
        }
      } else if (textLower.includes("workout") || textLower.includes("exercise") || textLower.includes("routine") || textLower.includes("train")) {
        const goalName = profile?.fitnessGoal?.replace("_", " ") || "improve fitness";
        aiText = `Based on your goal to *${goalName}* and your completed count of **${profile?.workoutsCount || 0} workouts**: I recommend executing the **HIIT Inferno** (cardio-focused, 20 mins, 360 kcal) or **Upper Body Burn** (strength-focused, 32 mins, 420 kcal) today. Focus on controlled eccentric movements for hypertrophy.`;
      } else {
        // General fallback
        aiText = `I hear you! To give you the best advice, we can look at your stats: You are currently on a ${profile?.streak || 1}-day wellness streak. Your BMI is ${(profile ? (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1) : "22.5")}. Would you like me to help you configure a custom workout plan, calculate a protein recipe, or analyze your sleep cycles?`;
      }

      const aiMsg: ChatMessage = {
        id: "ai-" + Math.random().toString(36).substring(2, 11),
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setChatHistory((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestionChips = [
    { label: "Analyze my sleep logs", icon: Moon, text: "Can you analyze my sleep logs and recovery trends?" },
    { label: "Recommend a workout", icon: Dumbbell, text: "Recommend a workout routine based on my fitness goals." },
    { label: "Protein recipe suggestions", icon: Apple, text: "Give me some high-protein recipe suggestions for dinner." }
  ];

  return (
    <AppShell subtitle="AI Companion" title="Zenvita AI Coach">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
        {/* Left pane: Vitals Context Info (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <SectionHeader title="AI Coach Context" />
          
          <div className="rounded-2xl glass p-4 border border-border space-y-3.5">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-[var(--brand)]" />
              <h4 className="text-xs font-semibold text-foreground">Active Bio-metrics Sync</h4>
            </div>
            
            <p className="text-[10px] text-muted-foreground leading-normal">
              The AI Coach uses your real-time tracking dashboard parameters to customize recovery scores, food targets, and cardiovascular thresholds.
            </p>

            <div className="border-t border-border pt-3.5 space-y-2.5 text-[10px] font-semibold text-muted-foreground">
              <div className="flex justify-between">
                <span>Goal Target</span>
                <span className="text-foreground capitalize">{profile?.fitnessGoal?.replace("_", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Workouts</span>
                <span className="text-foreground">{profile?.workoutsCount || 0} sessions</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Sleep Quality</span>
                <span className="text-foreground">
                  {sleeps.length > 0 ? `${Math.round(sleeps.reduce((sum, s) => sum + s.quality, 0) / sleeps.length)}%` : "85%"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hydration today</span>
                <span className="text-foreground">2.5 L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right pane: Chat Engine (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl glass-strong border border-border shadow-card flex flex-col h-[480px] relative overflow-hidden">
            {/* Header info */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8.5 w-8.5 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-bold text-foreground">Zenvita Coach</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Powered by Zenvita Wellness AI</p>
                </div>
              </div>
            </div>

            {/* Chat message feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg) => {
                const isAI = msg.sender === "ai";
                return (
                  <div 
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${isAI ? "mr-auto items-start" : "ml-auto items-end"}`}
                  >
                    <div className={`p-3 rounded-2xl text-xs leading-normal ${
                      isAI 
                        ? "bg-muted text-muted-foreground border border-border rounded-tl-none text-left" 
                        : "bg-gradient-brand text-white shadow-glow rounded-tr-none text-right"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 mr-auto bg-muted border border-border rounded-2xl rounded-tl-none p-3 max-w-[50%]">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>

            {/* Suggestion Chips */}
            {chatHistory.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 justify-start border-t border-border pt-3">
                {suggestionChips.map((chip, idx) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip.text)}
                      className="flex items-center gap-1.5 text-[10px] px-3.5 py-2 rounded-full border border-border glass hover:bg-muted/50 text-foreground transition-all cursor-pointer"
                    >
                      <Icon className="h-3.5 w-3.5 text-[var(--brand)]" />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Message send form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(typedInput); }}
              className="p-3 border-t border-border flex gap-2"
            >
              <input
                type="text"
                required
                placeholder="Ask your coach anything about workouts, sleep, nutrition..."
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                className="flex-1 bg-muted border border-border rounded-xl py-2.5 px-3.5 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
              />
              <button
                type="submit"
                className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand shadow-glow text-white hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
