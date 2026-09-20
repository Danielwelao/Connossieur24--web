"use client";

import Image from 'next/image';
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Search, ShieldAlert, ShieldCheck, Loader2, TrendingUp, Users, Calendar, BookOpen, Lock, BellRing, ArrowRight, Terminal, Activity, Crosshair } from "lucide-react";
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
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <main className="flex-grow flex flex-col bg-slate-50 relative overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-slate-200 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
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

      {/* --- STATISTICS SECTION --- */}
      <section className="bg-white py-10 md:py-16 relative z-10 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Threat Landscape</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Cyber attacks are scaling rapidly. Understanding the scope of the problem is the first step toward effective defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-8">
              <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <ShieldAlert className="text-brand-blue h-6 w-6" />
              </div>
              <h3 className="text-5xl font-extrabold text-slate-900 mb-3">
                <AnimatedNumber value={34} suffix="B+" />
              </h3>
              <p className="text-slate-800 font-semibold text-lg">Data Records Breached</p>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                Exposed in public breaches globally over the last 12 months.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-8">
              <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <TrendingUp className="text-brand-blue h-6 w-6" />
              </div>
              <h3 className="text-5xl font-extrabold text-slate-900 mb-3">
                <AnimatedNumber prefix="$" value={4} suffix="M+" />
              </h3>
              <p className="text-slate-800 font-semibold text-lg">Average Breach Cost</p>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                The financial toll of a data breach on a standard organization.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-8">
              <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <Users className="text-brand-blue h-6 w-6" />
              </div>
              <h3 className="text-5xl font-extrabold text-slate-900 mb-3">
                <AnimatedNumber value={85} suffix="%" />
              </h3>
              <p className="text-slate-800 font-semibold text-lg">Human Element</p>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                Percentage of security breaches caused by human error or social engineering.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- 31 DAYS OF CYBER SECTION --- */}
      <section className="bg-slate-50 py-10 md:py-16 relative z-10 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Story */}
            <div className="flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-blue text-sm font-semibold w-max border border-brand-cyan/20">
                <Calendar size={16} />
                October Awareness Month
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Transform your security habits in <span className="text-brand-blue">31 days.</span>
              </h2>
              
              <p className="text-lg text-slate-600">
                Cybersecurity isn't about complex code; it's about daily habits. Our flagship October campaign breaks down enterprise-grade security protocols into bite-sized, actionable daily missions for everyone.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Daily 5-minute security briefings",
                  "Actionable device hardening checklists",
                  "Zero-jargon explanations of complex threats",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 rounded-full p-1">
                      <ShieldCheck className="w-4 h-4 text-brand-blue" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link 
                  href="/october" 
                  className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-navy transition-colors group"
                >
                  Explore the curriculum 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Feature Grid (Bento Box Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Bite-Sized Modules</h3>
                <p className="text-sm text-slate-500">Learn one critical concept per day without feeling overwhelmed by technical jargon.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow sm:translate-y-8">
                <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                  <Lock size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Practical Hardening</h3>
                <p className="text-sm text-slate-500">Immediate, actionable steps to lock down your accounts, networks, and physical devices.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="h-10 w-10 bg-rose-50 rounded-lg flex items-center justify-center mb-4 text-rose-600">
                  <ShieldAlert size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Threat Recognition</h3>
                <p className="text-sm text-slate-500">Train your eye to spot sophisticated phishing, social engineering, and rogue networks.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow sm:translate-y-8">
                <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                  <BellRing size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Daily Reminders</h3>
                <p className="text-sm text-slate-500">Opt-in to our newsletter to get your daily mission delivered straight to your inbox.</p>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* --- END 31 DAYS OF CYBER SECTION --- */}


      {/* --- THREAT SIMULATOR SECTION --- */}
      <section className="bg-slate-950 py-20 md:py-32 relative z-10 overflow-hidden border-b border-slate-900">
        
        {/* Subtle glowing background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Terminal Mockup */}
            <div className="relative group">
              {/* Outer glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-blue rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
              
              <div className="relative bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                {/* Mac-style Window Header */}
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <div className="ml-4 text-xs text-slate-500 font-mono">root@connoisseur24:~</div>
                </div>
                
                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm md:text-base">
                  <p className="text-emerald-400 mb-2">$ ./run_simulator --module phishing</p>
                  <p className="text-slate-400 mb-1">&gt; Initializing target environment...</p>
                  <p className="text-slate-400 mb-1">&gt; Deploying payload simulator...</p>
                  <p className="text-slate-400 mb-4">&gt; Awaiting user interaction...</p>
                  
                  <div className="border border-red-500/30 bg-red-500/10 p-4 rounded text-red-400 mb-4">
                    [!] ALERT: User clicked malicious link.<br/>
                    [!] Credential harvest successful.<br/>
                    &gt; Simulation Complete. Assessment: FAILED.
                  </div>
                  
                  <p className="text-emerald-400 flex items-center gap-1">
                    root@connoisseur24:~ <span className="w-2 h-5 bg-emerald-400 animate-pulse inline-block"></span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Copywriting */}
            <div className="flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/50 text-brand-cyan text-sm font-semibold w-max border border-brand-blue/30">
                <Terminal size={16} />
                Interactive Learning
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Experience attacks in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">safe sandbox.</span>
              </h2>
              
              <p className="text-lg text-slate-400">
                Reading about cyber threats is one thing. Experiencing them firsthand is another. Our Threat Simulator lets you safely interact with live-fire exercises simulating phishing, malware, and social engineering attacks.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-2">
                  <Activity className="text-brand-cyan w-6 h-6" />
                  <h4 className="text-white font-semibold">Real-World Scenarios</h4>
                  <p className="text-sm text-slate-500">Train against the exact techniques currently used by advanced persistent threats.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Crosshair className="text-brand-blue w-6 h-6" />
                  <h4 className="text-white font-semibold">Immediate Feedback</h4>
                  <p className="text-sm text-slate-500">Understand exactly where you failed and how to prevent it in the real world.</p>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href="/simulator" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-cyan hover:text-slate-900 text-white rounded-lg font-medium text-center transition-colors shadow-lg w-max"
                >
                  Launch Simulator
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* --- END THREAT SIMULATOR SECTION --- */}

      {/* --- FINAL CTA SECTION --- */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-navy relative py-16 md:py-24 overflow-hidden z-10">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Don't wait until you're compromised.
          </h2>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join the Connoisseur24 community of individuals and organizations taking proactive steps to secure their digital footprint today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link 
              href="/october" 
              className="px-8 py-4 bg-white hover:bg-slate-50 text-brand-blue font-bold rounded-lg transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Start Your 31-Day Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <p className="text-sm text-blue-200 mt-6 font-medium">
            Or subscribe to our newsletter in the footer below for weekly intelligence.
          </p>
        </div>
      </section>
      {/* --- END FINAL CTA SECTION --- */}
      
    </main>
  );
}

// Framer Motion Animated Counter Component
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="flex items-center justify-center">
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}