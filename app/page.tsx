"use client";

import Image from 'next/image';
import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Search, ShieldAlert, ShieldCheck, TrendingUp, Users, Calendar, BookOpen, Lock, BellRing, ArrowRight, Terminal, Activity, Crosshair } from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------
// Upgraded Dynamic Scroll Reveal Wrapper
// ----------------------------------------------------------------------
interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}

const ScrollReveal = ({ children, width = "100%", delay = 0, direction = "up" }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const getVariants = () => {
    switch (direction) {
      case "up": return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case "down": return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case "left": return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
      case "scale": return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
      default: return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <div ref={ref} style={{ width, position: "relative" }}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
// ----------------------------------------------------------------------

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
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 min-h-[85vh]">
        
        {/* Left Column: Copywriting */}
        <div className="flex flex-col space-y-6">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              October Campaign Live
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Cybersecurity shouldn&apos;t be a <span className="text-blue-600">mystery.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={0.3}>
            <p className="text-lg md:text-xl text-slate-600 max-w-lg">
              No boring slide decks or complex jargon. Just practical security habits and realistic simulations to keep your accounts safe.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/october" 
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-center transition-colors shadow-lg"
              >
                Start the 30-Day Guide
              </Link>
              <Link 
                href="/simulator" 
                className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-center transition-colors shadow-sm"
              >
                Try the Simulator
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: The Scanner */}
        <ScrollReveal direction="right" delay={0.3}>
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
                  className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
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
                          className="h-[18px] w-[18px] object-contain invert"
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
                          We didn&apos;t find this email in our database. Stay vigilant and review our <Link href="/october" className="underline font-medium hover:text-emerald-900">daily security habits.</Link>
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
        </ScrollReveal>
      </div>

      {/* --- STATISTICS SECTION --- */}
      <section className="bg-white py-16 md:py-24 relative z-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          
          <div className="text-center mb-16">
            <ScrollReveal direction="down">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Threat Landscape</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Most security breaches don't start with high-tech hacking, they start with a single clicked link.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            {/* Stat 1 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-8">
                <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                  <ShieldAlert className="text-blue-600 h-6 w-6" />
                </div>
                <h3 className="text-5xl font-extrabold text-slate-900 mb-3">
                  <AnimatedNumber value={34} suffix="B+" />
                </h3>
                <p className="text-slate-800 font-semibold text-lg">Data Records Breached</p>
                <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                  Exposed in public breaches globally over the last 12 months.
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 2 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-8">
                <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                  <TrendingUp className="text-blue-600 h-6 w-6" />
                </div>
                <h3 className="text-5xl font-extrabold text-slate-900 mb-3">
                  <AnimatedNumber prefix="$" value={4} suffix="M+" />
                </h3>
                <p className="text-slate-800 font-semibold text-lg">Average Breach Cost</p>
                <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                  Average total cost of a data breach for a business.
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 3 */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-8">
                <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                  <Users className="text-blue-600 h-6 w-6" />
                </div>
                <h3 className="text-5xl font-extrabold text-slate-900 mb-3">
                  <AnimatedNumber value={85} suffix="%" />
                </h3>
                <p className="text-slate-800 font-semibold text-lg">Human Error</p>
                <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                  Breaches that start with a missed detail, or trick email.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* --- 30 DAYS OF CYBER SECTION --- */}
      <section className="bg-slate-50 py-16 md:py-24 relative z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Story */}
            <div className="flex flex-col space-y-6">
              <ScrollReveal direction="left" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold w-max border border-blue-200">
                  <Calendar size={16} />
                  October Awareness Month
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.2}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Transform your security habits in <span className="text-blue-600">30 days.</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.3}>
                <p className="text-lg text-slate-600">
                  Security shouldn't require a computer science degree. Our October guide breaks down essential cyber defense into quick 5-minute daily reads.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.4}>
                <ul className="space-y-4 pt-4">
                  {[
                    "Daily 5-minute security briefings",
                    "Actionable device hardening checklists",
                    "Plain English guides with zero technical fluff",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 rounded-full p-1">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.5}>
                <div className="pt-6">
                  <Link 
                    href="/october" 
                    className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    Explore the curriculum 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Feature Grid (Bento Box Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <ScrollReveal direction="scale" delay={0.2}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Bite-Sized Modules</h3>
                  <p className="text-sm text-slate-500">Master one simple concept a day without getting bogged down in tech terms.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="scale" delay={0.3}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow sm:translate-y-8">
                  <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                    <Lock size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Account Lockdown</h3>
                  <p className="text-sm text-slate-500">Quick steps you can take right away to secure your email, passwords, and devices.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="scale" delay={0.4}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow mt-4 sm:mt-0">
                  <div className="h-10 w-10 bg-rose-50 rounded-lg flex items-center justify-center mb-4 text-rose-600">
                    <ShieldAlert size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Threat Recognition</h3>
                  <p className="text-sm text-slate-500">Train your eye to spot sophisticated phishing, social engineering, and rogue networks.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="scale" delay={0.5}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow sm:translate-y-8">
                  <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                    <BellRing size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Daily Reminders</h3>
                  <p className="text-sm text-slate-500">Opt-in to our newsletter to get each daily lesson emailed to you every morning.</p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>

      {/* --- THREAT SIMULATOR SECTION --- */}
      <section className="bg-slate-950 py-20 md:py-32 relative z-10 overflow-hidden border-b border-slate-900">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Terminal Mockup */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                
                <div className="relative bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <div className="ml-4 text-xs text-slate-500 font-mono">root@connossieur24:~</div>
                  </div>
                  
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
                      root@connossieur24:~ <span className="w-2 h-5 bg-emerald-400 animate-pulse inline-block"></span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Copywriting */}
            <div className="flex flex-col space-y-6">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 text-blue-400 text-sm font-semibold w-max border border-blue-500/30">
                  <Terminal size={16} />
                  Interactive Learning
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.2}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Experience attacks in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">safe sandbox.</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.3}>
                <p className="text-lg text-slate-400">
                  Reading about scams is easy, spotting a real one in your inbox is hard. Practice identifying fake login pages and malicious emails in a controlled sandbox
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.4}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex flex-col gap-2">
                    <Activity className="text-blue-400 w-6 h-6" />
                    <h4 className="text-white font-semibold">Real-World Scenarios</h4>
                    <p className="text-sm text-slate-500">Test yourself against real scams floating around the internet right now.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Crosshair className="text-indigo-400 w-6 h-6" />
                    <h4 className="text-white font-semibold">Immediate Feedback</h4>
                    <p className="text-sm text-slate-500">See immediate breakdowns of what went wrong and how to spot the red flags next time.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.5}>
                <div className="pt-6">
                  <Link 
                    href="/simulator" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-center transition-colors shadow-lg w-max"
                  >
                    Launch Simulator
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="bg-gradient-to-br from-blue-600 to-slate-900 relative py-16 md:py-24 overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Don&apos;t wait until you&apos;re compromised.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="scale" delay={0.2}>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Start building better online habits today. Free, practical, and designed for everyone.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Link 
                href="/october" 
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-lg transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                Start Your 30-Day Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-sm text-blue-200 mt-6 font-medium">
              Or sign up in the footer below to get our weekly security breakdowns sent to your inbox.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
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