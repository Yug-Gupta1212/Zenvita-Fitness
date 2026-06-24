import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Sparkles, Download, Heart, Flame, Clock, Award } from "lucide-react";
import confetti from "canvas-confetti";

export function HealthWrap({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff7a3d", "#ffffff"]
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#e85d2f", "#ffffff"]
    });
  };

  const handleDownload = () => {
    // Generate simple text-wrap download card
    const data = `
=============================
   MY ZENVITA HEALTH WRAP
=============================
🏆 Workouts: 5 completed
🔥 Calories: 2,100 kcal burned
⚡ Best Streak: 7 Days
💤 Sleep Quality: 88% average
🥗 Nutrition consistency: 94%
=============================
"Your Health. Understood. Predicted. Improved."
    `.trim();

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zenvita_weekly_wrap.txt`;
    a.click();
    triggerConfetti();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Wrap Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[450px] bg-[var(--modal-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-colors duration-300 z-10 p-6 text-center"
          >
            {/* Header background glows */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-brand opacity-10 blur-3xl pointer-events-none" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--glass-bg-hover)] text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Cinematic Slogan header */}
            <div className="mt-4 flex flex-col items-center">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow mb-3">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--brand)] font-bold">Weekly wrap summary</p>
              <h2 className="font-[Instrument_Serif] text-4xl text-foreground mt-1">Zenvita Vitality Wrap</h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">Your activity, recovery and hydration compiled by AI.</p>
            </div>

            {/* Stats Shareable Card Canvas (Premium Styled) */}
            <div className="my-6 rounded-2xl bg-gradient-to-b from-[var(--glass-strong-bg)] to-[var(--glass-bg)] border border-[var(--glass-border)] p-5 relative overflow-hidden text-left shadow-card">
              <div className="absolute top-[-100px] right-[-100px] h-48 w-48 rounded-full bg-[var(--brand)]/10 blur-3xl" />
              
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--glass-border)]">
                <span className="font-[Instrument_Serif] text-lg text-foreground">Alex Morgan</span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">June 2026</span>
              </div>

              {/* Grid Averages */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner">
                    <Award className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Workouts</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">5 completed</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner">
                    <Flame className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Calories</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">2,100 kcal</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner">
                    <Clock className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Best Streak</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">7 Days</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--brand)] shadow-inner">
                    <Heart className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Sleep Quality</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">88% average</p>
                  </div>
                </div>
              </div>

              {/* Wrap AI Summary Tip */}
              <div className="mt-5 pt-4 border-t border-[var(--glass-border)]">
                <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                  "Outstanding nutrition consistency: 94% macro accuracy kept metabolic rate elevated throughout the week."
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleDownload}
                className="flex-1 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg-hover)] text-foreground py-3 text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Download className="h-4 w-4" /> Download Report
              </button>
              
              <button 
                onClick={() => {
                  triggerConfetti();
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Zenvita Health Wrap',
                      text: 'Logged 5 workouts and achieved 88% sleep consistency this week on Zenvita!',
                      url: window.location.origin
                    }).catch(console.error);
                  } else {
                    alert("Share link copied to clipboard!");
                  }
                }}
                className="flex-1 rounded-xl bg-gradient-brand text-white py-3 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-glow hover:opacity-95 active:scale-95 transition-all"
              >
                <Share2 className="h-4 w-4" /> Share Wrap
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
