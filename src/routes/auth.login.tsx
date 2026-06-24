import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { auth } from "@/lib/supabase";
import { Mail, Lock, ChevronRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/auth/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Force route reload and redirect to main application
      router.invalidate();
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-6 text-white text-center">Welcome back</h2>

      {error && (
        <div className="mb-4 rounded-xl bg-destructive/15 border border-destructive/25 p-3 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Password
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-xs text-[var(--brand)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-11 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 rounded-2xl bg-gradient-brand py-3.5 font-medium text-white flex items-center justify-center gap-1.5 shadow-glow hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? "Signing in..." : "Sign in"} <ChevronRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-8 text-xs text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-[var(--brand)] hover:underline font-semibold">
          Create account
        </Link>
      </p>
    </motion.div>
  );
}
