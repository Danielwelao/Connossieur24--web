import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Lock, ChevronRight, ChevronLeft } from 'lucide-react';
import { isPast, isToday, startOfDay } from 'date-fns';
import MarkCompleteButton from '@/components/MarkCompleteButton';

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/october');
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir);
  return files
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      day: filename.replace('.mdx', ''),
    }));
}

function getPost(slug: string) {
  const contentDir = path.join(process.cwd(), 'content/october');
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const post = getPost(day);
  
  if (!post) notFound();

  const releaseDate = new Date(post.data.date);
  const isAvailable = isPast(startOfDay(releaseDate)) || isToday(releaseDate);

  // Calculate Next/Prev routes
  const currentDayNum = parseInt(post.data.day);
  const prevDaySlug = currentDayNum > 1 ? `day-${currentDayNum - 1}` : null;
  const nextDaySlug = currentDayNum < 30 ? `day-${currentDayNum + 1}` : null;

  if (!isAvailable) {
    return (
      <main className="min-h-screen bg-[#020617] px-4 py-24 flex items-center justify-center">
        <div className="bg-[#0F172A] rounded-2xl p-12 border border-slate-800 text-center max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-slate-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Clearance Required</h1>
          <p className="text-slate-400 mb-8">
            This module remains classified until {releaseDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
          </p>
          <Link href="/october" className="inline-block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
            Return to Command Center
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] px-4 md:px-8 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/october" 
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to 30 Days of Cyber
        </Link>

        <article className="bg-[#0F172A] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-slate-900/50 px-6 md:px-12 py-12 border-b border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold rounded-full">
                DAY {post.data.day}
              </div>
              <div className="flex items-center text-slate-500 text-sm font-medium">
                <Calendar size={14} className="mr-2" />
                {releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.data.title}
            </h1>
          </div>

          {/* MDX Content body */}
          <div className="px-6 md:px-12 py-12">
            <div className="prose prose-invert prose-lg prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-img:rounded-xl">
              <MDXRemote source={post.content} />
            </div>
          </div>

          {/* Module Navigation */}
          <div className="bg-slate-900/30 px-6 md:px-12 py-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            {prevDaySlug ? (
              <Link href={`/october/${prevDaySlug}`} className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                <ChevronLeft size={16} className="mr-1" /> Previous Module
              </Link>
            ) : <div />}

            {/* Use the component entirely on its own, no surrounding <button> tags! */}
            <MarkCompleteButton day={post.data.day.toString()} />

            {nextDaySlug ? (
              <Link href={`/october/${nextDaySlug}`} className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Next Module <ChevronRight size={16} className="ml-1" />
              </Link>
            ) : <div />}
          </div>
        </article>
      </div>
    </main>
  );
}