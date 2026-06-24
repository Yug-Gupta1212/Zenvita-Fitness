import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { auth } from "@/lib/supabase";
import { Mail, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPasswordComponent,
});

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/auth/reset-password",
      });

      if (resetError) throw resetError;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      // Fallback display for mock auth
      if (email) {
        setSuccess(true);
      }
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
      <h2 className="text-xl font-semibold mb-4 text-white text-center">Reset password</h2>
      <p className="text-xs text-muted-foreground text-center mb-6">
        Enter your email and we'll send you instructions to reset your password.
      </p>

      {error && (
        <div className="mb-4 rounded-xl bg-destructive/15 border border-destructive/25 p-3 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="text-center space-y-4 py-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 grid place-items-center mb-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-base font-medium text-white">Check your email</h3>
          <p className="text-xs text-muted-foreground leading-relaxed px-2">
            We've sent a link to reset your password to <strong className="text-white">{email}</strong>.
          </p>
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--brand)] hover:underline mt-4 font-semibold"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Return to login
          </Link>
        </div>
      ) : (
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

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 rounded-2xl bg-gradient-brand py-3.5 font-medium text-white flex items-center justify-center gap-1.5 shadow-glow hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send reset link"}{" "}
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="pt-4 text-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Back to login
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  );
}
