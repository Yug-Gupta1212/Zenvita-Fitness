import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Cinematic timeline
    // 0s: Particle drift (Step 0)
    // 0.8s: Pulse expands, logo animates in (Step 1)
    // 1.8s: Slogan appears (Step 2)
    // 2.6s: Heartbeat waveform animates (Step 3)
    // 3.8s: Fade out (onComplete called)
    
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2600),
      setTimeout(() => onComplete(), 3800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Generate random coordinates for floating background particles
  const particles = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100 + 50,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 1,
  })), []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/running.mp4" type="video/mp4" />
      </video>

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[var(--brand)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -250],
              x: [0, Math.sin(p.id) * 30],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ambient center glow */}
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-[var(--brand)] opacity-10 blur-3xl"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cinematic Logo and Pulse Container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Step 1: Glowing Expanding Orange Pulse */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              className="absolute h-32 w-32 rounded-full border-2 border-[var(--brand)] opacity-50"
              initial={{ scale: 0.1, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Step 1: Zenvita Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1 
            className="font-[Instrument_Serif] text-6xl tracking-tight text-white drop-shadow-[0_0_30px_rgba(232,93,47,0.6)]"
            animate={step >= 2 ? { y: -15 } : {}}
            transition={{ duration: 0.5 }}
          >
            Zenvita
          </motion.h1>
        </motion.div>

        {/* Step 2: Slogan */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-2 text-sm tracking-[0.2em] uppercase text-muted-foreground font-light text-center px-4"
            >
              Your Health. Understood. Predicted. Improved.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Step 3: ECG/Heartbeat Waveform Animation */}
        <div className="h-10 mt-6 flex items-center justify-center w-64">
          <AnimatePresence>
            {step >= 3 && (
              <svg width="240" height="40" viewBox="0 0 240 40" className="w-full">
                {/* Background line */}
                <path
                  d="M0,20 L80,20 L90,10 L100,30 L110,20 L115,20 L120,5 L128,35 L135,20 L145,20 L150,15 L155,25 L160,20 L240,20"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                />
                {/* Glowing animated line */}
                <motion.path
                  d="M0,20 L80,20 L90,10 L100,30 L110,20 L115,20 L120,5 L128,35 L135,20 L145,20 L150,15 L155,25 L160,20 L240,20"
                  fill="none"
                  stroke="url(#ecg-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="ecg-grad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#ff7a3d" />
                    <stop offset="50%" stopColor="#e85d2f" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
