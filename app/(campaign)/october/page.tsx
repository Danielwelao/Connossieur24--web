import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Lock, Unlock, Calendar as CalendarIcon } from 'lucide-react';
import { isPast, isToday, startOfDay } from 'date-fns';

function getCampaignDays() {
  const contentDir = path.join(process.cwd(), 'content/october');
  
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(contentDir);
  
  const days = files
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(contentDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      const releaseDate = new Date(data.date);
      releaseDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isAvailable = today.getTime() >= releaseDate.getTime();
      const dayNum = parseInt(data.day);

      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || 'Classified Intel',
        dayNumber: data.day || 0,
        date: data.date,
        isAvailable,
      };
    });

  return days.sort((a, b) => a.dayNumber - b.dayNumber);
}

export default function OctoberCampaignHub() {
  const days = getCampaignDays();
  const unlockedCount = days.filter(d => d.isAvailable).length;
  const progressPercentage = days.length > 0 ? Math.round((unlockedCount / 30) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#020617] px-4 md:px-8 py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-[#0F172A] border border-slate-800 text-brand-cyan text-sm font-bold rounded-full mb-6 tracking-wide uppercase">
            Commencing October 2nd
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            30 Days of <span className="text-blue-500">Cyber</span>
          </h1>
          <p className="text-xl text-slate-400">
            Small actions compound. Every day, unlock a new practical habit to harden your digital footprint and secure your organization.
          </p>
        </div>

        {/* Campaign Progress Bar */}
        {days.length > 0 && (
          <div className="max-w-3xl mx-auto mb-16 bg-[#0F172A] p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
              <span>Campaign Progress</span>
              <span className="text-brand-cyan">{unlockedCount} / 30 Unlocked</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {days.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-slate-800 rounded-xl bg-[#0F172A] text-slate-500">
            Secure channels open on October 2nd. Awaiting first intelligence drop...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {days.map((day) => (
              <div key={day.slug} className="relative h-full">
                {day.isAvailable ? (
                  <Link href={`/october/${day.slug}`} className="block h-full">
                    <div className="h-full p-6 bg-[#0F172A] border border-slate-800 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4 text-blue-400">
                          <span className="font-bold text-xs bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded">DAY {day.dayNumber}</span>
                          <Unlock size={16} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                          {day.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="h-full p-6 bg-[#0F172A]/40 border border-slate-800/50 rounded-xl flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-center mb-4 text-slate-600">
                        <span className="font-bold text-xs bg-slate-800 px-2 py-1 rounded">DAY {day.dayNumber}</span>
                        <Lock size={16} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-600">
                        Classified Intel
                      </h3>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
                      <CalendarIcon size={14} className="mr-2" />
                      Unlocks {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}