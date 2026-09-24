import Link from 'next/link';
import { MailWarning, Terminal, Network, ArrowRight, Lock } from 'lucide-react';

export default function SimulatorHub() {
  return (
    <main className="min-h-screen bg-[#020617] px-4 md:px-8 py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold rounded-full mb-6 tracking-wide uppercase">
            Live Fire Environment
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Threat <span className="text-blue-500">Simulator</span>
          </h1>
          <p className="text-xl text-slate-400">
            Test your defensive instincts in a safe, controlled sandbox. Experience real-world cyber attacks from the perspective of the target—and the attacker.
          </p>
        </div>

        {/* Simulators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Module 1: Phishing Inspector (MVP) */}
          <Link href="/simulator/phishing" className="block h-full group">
            <div className="h-full p-8 bg-[#0F172A] border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MailWarning className="w-7 h-7 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Phishing Inspector</h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Step into the inbox. Analyze highly realistic social engineering attempts and spot the hidden red flags before the payload deploys.
                </p>
              </div>
              <div className="inline-flex items-center font-semibold text-blue-400 group-hover:text-blue-300">
                Initialize Sandbox <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Module 2: Password Cracker (The Showstopper) */}
          <Link href="/simulator/password" className="block h-full group">
            <div className="h-full p-8 bg-[#0F172A] border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Terminal className="w-7 h-7 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Brute Force Engine</h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Type a password and watch in real-time as our algorithm calculates exact entropy, cryptographic strength, and brute-force crack times.
                </p>
              </div>
              <div className="inline-flex items-center font-semibold text-emerald-400 group-hover:text-emerald-300">
                Initialize Engine <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Module 3: Network Intrusion (V2 Teaser - Not Clickable) */}
          <div className="h-full p-8 bg-[#0F172A]/40 border border-slate-800/50 rounded-2xl flex flex-col justify-between lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center justify-center shrink-0">
                  <Network className="w-7 h-7 text-slate-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-300 mb-1">Network Traffic Interceptor</h2>
                  <p className="text-slate-500 text-sm md:text-base">
                    Analyze PCAP packets in real-time to detect man-in-the-middle (MitM) attacks.
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-500 text-sm font-bold uppercase tracking-wider shrink-0">
                <div className="w-2 h-2 rounded-full bg-slate-600 mr-2 animate-pulse"></div> Node Offline
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}