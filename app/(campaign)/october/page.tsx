import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Lock, Unlock, Calendar as CalendarIcon } from 'lucide-react';
import { isPast, isToday, startOfDay } from 'date-fns';

// 1. Helper function to read all MDX files
function getCampaignDays() {
  const contentDir = path.join(process.cwd(), 'content/october');
  
  // Create folder if it doesn't exist yet so it doesn't crash on dev
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
      
      // We expect the markdown file to have a 'date' like "2026-10-01"
      const releaseDate = new Date(data.date);
      const isAvailable = isPast(startOfDay(releaseDate)) || isToday(releaseDate);

      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || 'Upcoming Topic',
        dayNumber: data.day || 0,
        date: data.date,
        isAvailable,
      };
    });

  // Sort sequentially by day number
  return days.sort((a, b) => a.dayNumber - b.dayNumber);
}

export default function OctoberCampaignHub() {
  const days = getCampaignDays();

  return (
    <main className="container mx-auto px-4 md:px-8 py-12 md:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          31 Days of <span className="text-blue-600">Cyber</span>
        </h1>
        <p className="text-xl text-slate-600">
          Small actions compound. Every day in October, unlock a new practical habit to secure your digital life.
        </p>
      </div>

      {days.length === 0 ? (
        <div className="text-center p-12 border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-500">
          Waiting for the team to drop the first MDX files...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {days.map((day) => (
            <div key={day.slug} className="relative h-full">
              {day.isAvailable ? (
                // Unlocked State
                <Link href={`/october/${day.slug}`} className="block h-full">
                  <div className="h-full p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4 text-blue-600">
                        <span className="font-bold text-sm bg-blue-50 px-2 py-1 rounded">Day {day.dayNumber}</span>
                        <Unlock size={18} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {day.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ) : (
                // Locked State
                <div className="h-full p-6 bg-slate-50 border border-slate-200 rounded-xl opacity-75 flex flex-col justify-between">
                  <div>
                     <div className="flex justify-between items-center mb-4 text-slate-400">
                      <span className="font-bold text-sm bg-slate-200 px-2 py-1 rounded">Day {day.dayNumber}</span>
                      <Lock size={18} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-500">
                      Locked
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
                    <CalendarIcon size={14} className="mr-1" />
                    Unlocks {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}