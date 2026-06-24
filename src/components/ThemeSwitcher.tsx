import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeSwitcher({ theme, setTheme }: { theme: "light" | "dark"; setTheme: (t: "light" | "dark") => void }) {
  return (
    <div className="relative flex items-center p-0.5 bg-white/5 border border-white/10 dark:bg-white/5 dark:border-white/10 bg-black/5 border-black/10 rounded-full h-9 w-18 shrink-0 transition-colors">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="absolute top-0.5 bottom-0.5 left-0.5 rounded-full bg-gradient-brand shadow-glow pointer-events-none"
        style={{
          width: "calc(50% - 2px)",
          x: theme === "light" ? 0 : "100%",
        }}
      />
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`relative z-10 flex-1 grid place-items-center h-full transition-colors duration-200 ${
          theme === "light" ? "text-white" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`relative z-10 flex-1 grid place-items-center h-full transition-colors duration-200 ${
          theme === "dark" ? "text-white" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
