"use client";

import { useState } from "react";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function WaitlistPage() {
  const [status, setStatus] = useState<{ error?: string; success?: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const source = formData.get("source");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ error: data.error || "Transmission failed." });
      } else {
        setStatus({ success: data.success || "Access Request Logged." });
      }
    } catch (error) {
      setStatus({ error: "Network error. Please try again later." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 bg-slate-50/50">
      <div className="w-full max-w-md">
        
        {/* Soft SaaS Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Get early access
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            We're putting the finishing touches on our interactive dashboard. Join the waitlist to be the first to know when we open the doors.
          </p>
        </div>

        {/* The Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Secretly flags this submission as a beta waitlist request */}
            <input type="hidden" name="source" value="waitlist" />

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <input 
                type="email" 
                name="email" 
                id="email"
                required
                placeholder="you@company.com" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-navy disabled:opacity-70 text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              {isPending ? "Joining..." : (
                <>
                  Join the waitlist
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Feedback Messages */}
          {status?.error && (
            <div className="mt-5 flex items-start text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 px-4 py-3 rounded-xl">
              <AlertCircle size={18} className="mr-2 shrink-0 mt-0.5" />
              {status.error}
            </div>
          )}

          {status?.success && (
            <div className="mt-5 flex flex-col items-center text-center text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-6 rounded-xl animate-in zoom-in duration-300">
              <CheckCircle2 size={28} className="text-emerald-500 mb-3" />
              {/* This now directly renders the friendly message you set in route.ts */}
              {status.success} 
            </div>
          )}
        </div>
        
        {/* Standard SaaS Trust Element */}
        <p className="text-center text-sm text-slate-500 mt-8">
          No spam. Unsubscribe at any time.
        </p>

      </div>
    </div>
  );
}