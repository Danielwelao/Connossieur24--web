"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal, ShieldAlert, ShieldCheck, Zap, Lock, Eye, EyeOff, Info, Cpu } from 'lucide-react';

// A tiny sample dictionary to prove the concept of Dictionary Attacks
const COMMON_PASSWORDS = new Set([
  "password", "123456", "123456789", "qwerty", "admin", 
  "iloveyou", "welcome", "12345", "password123", "letmein"
]);

export default function BruteForceSimulator() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Real-time Engine Calculations
  const stats = useMemo(() => {
    const length = password.length;
    let poolSize = 0;
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 32;

    // Entropy = L * log2(R)
    const entropy = poolSize === 0 ? 0 : length * Math.log2(poolSize);
    
    // Total possible combinations (R^L)
    const combinations = Math.pow(poolSize, length);
    
    // Assume an offline attack using an RTX 4090 cluster doing ~100 Billion MD4/MD5 hashes per second
    const HASHES_PER_SECOND = 100_000_000_000; 
    let secondsToCrack = combinations / HASHES_PER_SECOND;

    const isDictionary = COMMON_PASSWORDS.has(password.toLowerCase());
    if (isDictionary) secondsToCrack = 0; // Dictionary attacks bypass brute force math

    // Format the time output
    let timeString = "";
    let strength = "weak";
    let color = "text-red-500";
    let bg = "bg-red-500";
    let barWidth = "w-1/12";

    if (length === 0) {
      timeString = "Awaiting input...";
      strength = "none";
      color = "text-slate-500";
      bg = "bg-slate-800";
      barWidth = "w-0";
    } else if (isDictionary) {
      timeString = "Instantly (Dictionary Match)";
      strength = "compromised";
      color = "text-red-500";
      bg = "bg-red-500";
      barWidth = "w-full";
    } else if (secondsToCrack < 1) {
      timeString = "Instantly";
      barWidth = "w-2/12";
    } else if (secondsToCrack < 60) {
      timeString = `${Math.round(secondsToCrack)} seconds`;
      barWidth = "w-3/12";
    } else if (secondsToCrack < 3600) {
      timeString = `${Math.round(secondsToCrack / 60)} minutes`;
      strength = "fair";
      color = "text-amber-500";
      bg = "bg-amber-500";
      barWidth = "w-5/12";
    } else if (secondsToCrack < 86400) {
      timeString = `${Math.round(secondsToCrack / 3600)} hours`;
      strength = "fair";
      color = "text-amber-500";
      bg = "bg-amber-500";
      barWidth = "w-6/12";
    } else if (secondsToCrack < 31536000) {
      timeString = `${Math.round(secondsToCrack / 86400)} days`;
      strength = "strong";
      color = "text-emerald-500";
      bg = "bg-emerald-500";
      barWidth = "w-9/12";
    } else if (secondsToCrack < 31536000000) {
      timeString = `${Math.round(secondsToCrack / 31536000)} years`;
      strength = "very strong";
      color = "text-blue-500";
      bg = "bg-blue-500";
      barWidth = "w-11/12";
    } else {
      timeString = "Millions of years (Uncrackable)";
      strength = "military grade";
      color = "text-purple-500";
      bg = "bg-purple-500";
      barWidth = "w-full";
    }

    return { 
      hasLower, hasUpper, hasNumber, hasSymbol, length, 
      poolSize, entropy, combinations, timeString, strength, color, bg, barWidth, isDictionary
    };
  }, [password]);

  return (
    <main className="min-h-screen bg-[#020617] px-4 md:px-8 py-12 text-slate-300 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Warning */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <Link href="/simulator" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Command Center
          </Link>
          
          <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-lg flex items-center gap-3 text-sm text-amber-400">
            <Info size={16} className="shrink-0" />
            <p><strong>Privacy Sandbox:</strong> Calculations run locally in your browser. Do not enter real passwords.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Input Engine (Left Side - 2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* The Terminal Input */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-50"></div>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Terminal className="w-6 h-6 mr-3 text-emerald-400" />
                Target Input Payload
              </h2>
              
              <div className="relative mb-8">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter test password..."
                  className="w-full bg-[#020617] border border-slate-700 text-white text-2xl md:text-3xl font-mono px-6 py-5 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>

              {/* Real-Time Crack Time Readout */}
              <div className="bg-[#020617] rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Estimated Time to Crack</p>
                <p className={`text-4xl md:text-5xl font-black font-mono tracking-tight ${stats.color} drop-shadow-lg`}>
                  {stats.timeString}
                </p>
                {stats.isDictionary && (
                  <p className="text-red-400 text-sm mt-3 font-bold bg-red-500/10 px-3 py-1 rounded-full animate-pulse">
                    CRITICAL: Found in top compromised password dictionary!
                  </p>
                )}
              </div>
            </div>

            {/* Cryptographic Checkmarks */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8">
              <h3 className="text-white font-bold mb-6 text-lg">Composition Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <CheckItem label="Lowercase (a-z)" active={stats.hasLower} />
                <CheckItem label="Uppercase (A-Z)" active={stats.hasUpper} />
                <CheckItem label="Numbers (0-9)" active={stats.hasNumber} />
                <CheckItem label="Symbols (!@#)" active={stats.hasSymbol} />
                <CheckItem label="Length > 8" active={stats.length > 8} />
                <CheckItem label="Length > 12" active={stats.length > 12} />
              </div>
            </div>

          </div>

          {/* Telemetry Dashboard (Right Side - 1 Col) */}
          <div className="flex flex-col gap-6">
            
            {/* Entropy Score */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                Information Entropy
              </h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black text-white font-mono">{Math.round(stats.entropy)}</span>
                <span className="text-slate-500 font-mono mb-1">bits</span>
              </div>
              
              {/* Strength Bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 mb-2 overflow-hidden">
                <div 
                  className={`h-full ${stats.bg} transition-all duration-500 ease-out`}
                  style={{ width: stats.barWidth.replace('w-', '') === 'full' ? '100%' : `${(parseInt(stats.barWidth.split('/')[0]) / parseInt(stats.barWidth.split('/')[1])) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-xs font-bold uppercase tracking-widest" style={{ color: stats.bg.replace('bg-', '') }}>
                {stats.strength}
              </div>
            </div>

            {/* Hardware Specs */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
                <Cpu className="w-4 h-4 mr-2 text-purple-400" />
                Attacker Hardware
              </h3>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Node</span>
                  <span className="text-white">8x RTX 4090</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Algorithm</span>
                  <span className="text-white">MD5 / Fast Hash</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Hash Rate</span>
                  <span className="text-emerald-400">100 Billion / sec</span>
                </li>
              </ul>
            </div>

            {/* Search Space Math */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-slate-400" />
                Search Space
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Character Pool (R):</span>
                  <span className="text-white">{stats.poolSize}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>String Length (L):</span>
                  <span className="text-white">{stats.length}</span>
                </div>
                <div className="h-px bg-slate-800 w-full my-2"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500">Total Combinations (R^L):</span>
                  <span className="text-blue-400 break-all">
                    {stats.combinations === 0 ? "0" : stats.combinations > 1e21 ? stats.combinations.toExponential(2) : stats.combinations.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Component for the Checklist
function CheckItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
      active 
        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
        : 'bg-[#020617] border-slate-800 text-slate-600'
    }`}>
      {active ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}