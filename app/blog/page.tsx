import { Lock, Rss } from "lucide-react";

export default function BlogComingSoon() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
        <Rss className="w-8 h-8 text-blue-500" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Threat Intel Blog</h1>
      <p className="text-slate-500 max-w-md mb-8">
        Our security analysts are currently compiling the latest zero-day reports and defensive strategies. The intel feed is being secured for deployment.
      </p>
      <div className="inline-flex items-center px-4 py-2 bg-slate-900 text-slate-400 rounded-lg text-sm font-bold uppercase tracking-widest">
        <Lock className="w-4 h-4 mr-2" />
        Awaiting Declassification
      </div>
    </div>
  );
}