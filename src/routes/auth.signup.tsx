import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { auth } from "@/lib/supabase";
import { Mail, Lock, User, ChevronRight, ChevronLeft, AlertCircle, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/auth/signup")({
  component: SignupComponent,
});

function SignupComponent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState("Female");
  const [height, setHeight] = useState<number>(170); // cm
  const [weight, setWeight] = useState<number>(70); // kg
  const [activityLevel, setActivityLevel] = useState<
    "sedentary" | "light" | "moderate" | "active" | "very_active"
  >("moderate");
  const [fitnessGoal, setFitnessGoal] = useState<
    "lose_weight" | "maintain" | "build_muscle" | "improve_fitness"
  >("improve_fitness");

  const nextStep = () => {
    if (step === 1 && (!name || !email || !password)) {
      setError("Please fill out all credentials");
      return;
    }
    setError("");
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error: signupError } = await auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            age,
            gender,
            height,
            weight,
            activityLevel,
            fitnessGoal,
          },
        },
      });

      if (signupError) throw signupError;

      // Force route invalidation and redirect to dashboard
      router.invalidate();
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Step Indicators */}
      <div className="flex justify-between items-center mb-6 px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <span
              className={`h-7 w-7 rounded-full text-xs font-semibold grid place-items-center transition-all ${
                step >= s
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "bg-white/5 border border-white/10 text-muted-foreground"
              }`}
            >
              {s}
            </span>
            {s < 3 && (
              <span
                className={`h-0.5 w-16 md:w-20 transition-all ${
                  step > s ? "bg-[var(--brand)]" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-6 text-white text-center">
        {step === 1 && "Create account"}
        {step === 2 && "Personal metrics"}
        {step === 3 && "Goals & Activity"}
      </h2>

      {error && (
        <div className="mb-4 rounded-xl bg-destructive/15 border border-destructive/25 p-3 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all [&>option]:bg-[#181818]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    required
                    min="50"
                    max="250"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    required
                    min="20"
                    max="300"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Activity Level
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as any)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all [&>option]:bg-[#181818]"
                >
                  <option value="sedentary">Sedentary (Little to no exercise)</option>
                  <option value="light">Lightly Active (1-3 days/week)</option>
                  <option value="moderate">Moderately Active (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very Active (Athletic/Physical job)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                  Fitness Goal
                </label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value as any)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all [&>option]:bg-[#181818]"
                >
                  <option value="improve_fitness">Improve General Fitness</option>
                  <option value="lose_weight">Weight Loss</option>
                  <option value="build_muscle">Build Muscle</option>
                  <option value="maintain">Maintain Health</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 rounded-2xl border border-white/10 py-3.5 font-medium text-white flex items-center justify-center gap-1 hover:bg-white/5 active:scale-[0.98] transition-all"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex-[2] rounded-2xl bg-gradient-brand py-3.5 font-medium text-white flex items-center justify-center gap-1.5 shadow-glow hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {step < 3 ? (
              <>
                Next <ChevronRight className="h-4 w-4" />
              </>
            ) : loading ? (
              "Creating Account..."
            ) : (
              <>
                Complete <Dumbbell className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <p className="mt-8 text-xs text-center text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-[var(--brand)] hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}
