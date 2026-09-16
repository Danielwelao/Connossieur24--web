"use client";

import Image from 'next/image';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'idle' | 'exposed' | 'safe'>('idle');

  // Simulated API Call
  const handleScan = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  setIsScanning(true);
  setScanResult('idle');

  try {
    const res = await fetch('/api/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error('API Error');
    }

    const data = await res.json();
    setScanResult(data.status); // Expecting 'exposed' or 'safe'

  } catch (error) {
    console.error('Failed to scan:', error);
    // You could add a toast notification here in the future
  } finally {
    setIsScanning(false);
  }
};

  return (
    <main className="flex-grow flex flex-col bg-slate-50 relative overflow-hidden">
      
      {/* Background Graphic (Placeholder for Haikei SVG later) */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-slate-200 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 flex-grow">
        
        {/* Left Column: Copywriting */}
        <div className="flex flex-col space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold w-max">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            October Campaign Live
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Cybersecurity shouldn't be a <span className="text-blue-600">mystery.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-lg">
            Practical, actionable intelligence for individuals and organizations. Learn how to navigate the digital world safely, one step at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/october" 
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-center transition-colors shadow-lg"
            >
              Start the 31-Day Guide
            </Link>
            <Link 
              href="/simulator" 
              className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-center transition-colors shadow-sm"
            >
              Try the Simulator
            </Link>
          </div>
        </div>

        {/* Right Column: The Scanner */}
        <div className="relative">
          {/* Subtle decorative glow behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-20" />
          
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 md:p-8 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Search className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Are You Exposed?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Enter your email to check if your data has been compromised in public breaches.
            </p>

            <form onSubmit={handleScan} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  disabled={isScanning}
                />
              </div>
              <button 
                type="submit" 
                disabled={isScanning || !email}
                className="w-full py-3 bg-brand-blue hover:bg-brand-navy text-white font-medium rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      className="mr-2 flex items-center justify-center"
                    >
                      <Image 
                        src="/icon-dark.png" 
                        alt="Scanning..." 
                        width={18} 
                        height={18} 
                        className="h-[18px] w-[18px] object-contain"
                      />
                    </motion.div>
                    Scanning dark web records...
                  </>
                ) : (
                  "Run Security Scan"
                )}
              </button>
            </form>

            {/* Results Display */}
            <div className="mt-6 h-[100px]"> 
              <AnimatePresence mode="wait">
                {scanResult === 'exposed' && (
                  <motion.div
                    key="exposed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <ShieldAlert className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-red-900">Exposure Detected</p>
                      <p className="text-xs text-red-700 mt-1">
                        This email was found in known data breaches. <Link href="/october" className="underline font-medium hover:text-red-900">Learn how to secure it.</Link>
                      </p>
                    </div>
                  </motion.div>
                )}

                {scanResult === 'safe' && (
                  <motion.div
                    key="safe"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3"
                  >
                    <ShieldCheck className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">No Breaches Found</p>
                      <p className="text-xs text-emerald-700 mt-1">
                        We didn't find this email in our database. Stay vigilant and review our <Link href="/october" className="underline font-medium hover:text-emerald-900">daily security habits.</Link>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-2 text-center uppercase tracking-wider">
              Scans are private and not stored in our database.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}