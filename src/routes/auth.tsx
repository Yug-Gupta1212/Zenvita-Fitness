import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth } from "@/lib/supabase";

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => {
    // If user is already logged in, redirect to home
    const { data } = await auth.getSession();
    if (data.session) {
      throw redirect({ to: "/" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-foreground flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[rgba(232,93,47,0.15)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[rgba(232,93,47,0.08)] blur-3xl pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[450px]">
        {/* Animated header card */}
        <div className="text-center mb-8">
          <h1 className="font-[Instrument_Serif] text-5xl tracking-tight text-white mb-2">Zenvita</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your Health. Understood.</p>
        </div>
        
        {/* Child route content */}
        <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] border border-white/10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
