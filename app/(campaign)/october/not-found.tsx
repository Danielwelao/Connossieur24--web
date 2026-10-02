import Link from 'next/link';
import { Lock, ArrowLeft, Calendar, ShieldCheck } from 'lucide-react';

export default function OctoberCampaignNotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden min-h-[80vh] px-4">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 md:p-12 text-center">
        
        {/* Lock Icon Container */}
        <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
          <Lock className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-semibold w-max mx-auto mb-4 border border-slate-200 dark:border-slate-700">
          <Calendar size={14} />
          Upcoming Module
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          Hold tight, you&apos;re a bit ahead of schedule.
        </h1>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
          We publish one module per day throughout October so you can actually absorb and apply what you learn without getting overwhelmed. Check back tomorrow for the next breakdown!
        </p>

        <div className="flex flex-col space-y-3">
          <Link 
            href="/october" 
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <ArrowLeft size={16} />
            Back to October Hub
          </Link>
          
          <Link 
            href="/simulator" 
            className="w-full py-3 px-4 bg-white dark:bg-transparent border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center"
          >
            Try the Threat Simulator
          </Link>
        </div>
        
      </div>
      
      {/* Bottom Subtext */}
      <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 z-10">
        <ShieldCheck size={14} className="text-blue-500" />
        <p>One habit a day builds lasting security.</p>
      </div>
    </main>
  );
}