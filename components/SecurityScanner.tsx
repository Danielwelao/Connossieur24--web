"use client";

import { useState } from "react";
import { Search, ShieldCheck, AlertOctagon, Loader2, Database } from "lucide-react";

type ScanResult = {
  status: "safe" | "exposed";
  breachCount: number;
  breaches?: { name: string; domain: string }[];
} | null;

export default function SecurityScanner() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult>(null);
  const [error, setError] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to run scan");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Search className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-900">Are You Exposed?</h2>
      </div>
      <p className="text-slate-500 mb-6">
        Enter your email to check if your data has been compromised in public breaches.
      </p>

      {/* Form */}
      <form onSubmit={handleScan} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
        />
        
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Scanning Databases...
            </>
          ) : (
            "Run Security Scan"
          )}
        </button>
      </form>

      {/* 
        THE GAP FILLER: 
        This min-h-[160px] block perfectly fills the empty space from your screenshot.
        It transitions from an idle placeholder, to errors, to actual results.
      */}
      <div className="mt-6 min-h-[160px] flex flex-col justify-center border-t border-slate-100 pt-6">
        
        {/* State 1: Idle (Fills the blank space before scanning) */}
        {!isLoading && !result && !error && (
          <div className="flex flex-col items-center justify-center text-center space-y-3 opacity-60">
            <Database className="w-8 h-8 text-slate-400" />
            <p className="text-sm text-slate-500">
              Cross-referencing 12+ billion breached records.<br/>
              Results will appear here securely.
            </p>
          </div>
        )}

        {/* State 2: Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* State 3: Safe */}
        {result?.status === "safe" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mb-2" />
            <h3 className="font-bold text-emerald-700 text-lg">No Breaches Found</h3>
            <p className="text-emerald-600 text-sm mt-1">
              Your email is secure and has not been found in any known public data leaks.
            </p>
          </div>
        )}

        {/* State 4: Exposed */}
        {result?.status === "exposed" && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 mb-3 border-b border-rose-200/60 pb-3">
              <AlertOctagon className="w-8 h-8 text-rose-600 shrink-0" />
              <div>
                <h3 className="font-bold text-rose-700">Action Required</h3>
                <p className="text-rose-600 text-sm">
                  Found in <strong>{result.breachCount}</strong> known data breach{result.breachCount > 1 ? 'es' : ''}.
                </p>
              </div>
            </div>
            
            {result.breaches && result.breaches.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Top Sources:</p>
                <ul className="text-sm text-rose-700 space-y-1">
                  {result.breaches.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      {b.name} <span className="opacity-60 text-xs">({b.domain || 'Unknown'})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Scans are private and not stored in our database.
        </p>
      </div>
    </div>
  );
}