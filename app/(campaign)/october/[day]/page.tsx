import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Lock } from 'lucide-react';
import { isPast, isToday, startOfDay } from 'date-fns';

// 1. Next.js generates these routes at build time for instant loading
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

// 2. Fetch the specific file content
function getPost(slug: string) {
  const contentDir = path.join(process.cwd(), 'content/october');
  const filePath = path.join(contentDir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
}

// 3. The actual Page Component
export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params; // Unwrapping the promise here!
  const post = getPost(day);
  
  if (!post) {
    notFound();
  }

  // Security Check: Prevent URL guessing for locked days
  const releaseDate = new Date(post.data.date);
  const isAvailable = isPast(startOfDay(releaseDate)) || isToday(releaseDate);

  if (!isAvailable) {
    return (
      <main className="container mx-auto px-4 py-24 text-center max-w-2xl">
        <div className="bg-slate-100 rounded-xl p-12 border border-slate-200">
          <Lock className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Content Locked</h1>
          <p className="text-slate-600 mb-6">
            This module will be unlocked on {releaseDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
          </p>
          <Link href="/october" className="text-blue-600 hover:underline font-medium">
            Return to Calendar
          </Link>
        </div>
      </main>
    );
  }

  // Render the unlocked content
  return (
    <main className="container mx-auto px-4 md:px-8 py-12 md:py-24 max-w-4xl">
      <Link 
        href="/october" 
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to 31 Days of Cyber
      </Link>

      <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-8 py-12 text-center border-b border-slate-200">
          <div className="inline-block px-3 py-1 bg-blue-900 text-blue-100 text-sm font-bold rounded-full mb-4">
            Day {post.data.day}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {post.data.title}
          </h1>
          <div className="flex items-center justify-center text-slate-400 text-sm font-medium">
            <Calendar size={16} className="mr-2" />
            {releaseDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* MDX Content body */}
        <div className="px-8 py-12">
          {/* 
            The 'prose' class comes from the Typography plugin we just installed.
            It automatically formats standard markdown into beautiful web typography.
          */}
          <div className="prose prose-slate prose-lg prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-between items-center border-t border-slate-200 pt-8">
        <p className="text-slate-500 text-sm">
          Part of the Connoisseur24 October Campaign
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Mark as Completed
        </button>
      </div>
    </main>
  );
}