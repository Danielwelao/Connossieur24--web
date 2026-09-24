"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage("");

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');

      setStatus('success');
      setMessage('Subscribed successfully!');
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);

    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <footer className="bg-brand-dark text-slate-300 py-12 md:py-16">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="mb-6 block">
            <Image 
              src="/branding/logo-dark.png" 
              alt="Connossieur24 Logo" 
              width={400} 
              height={80} 
              className="h-10 md:h-12 w-auto object-contain mb-2" 
            />
          </Link>
          <p className="text-sm text-slate-400 mb-4">
            Building a digitally secure society where individuals and organizations have the knowledge to navigate the digital world safely.
          </p>
          <p className="text-sm font-medium text-slate-200">
            hello@connossieur24.com
          </p>
        </div>

        {/* Column 2: Platform */}
        <div>
          <h3 className="text-white font-semibold mb-4">Platform</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/october" className="hover:text-brand-cyan transition-colors">30 Days of Cyber</Link></li>
            <li><Link href="/simulator" className="hover:text-brand-cyan transition-colors">Threat Simulator</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan transition-colors">Glossary</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal & Compliance */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal & Compliance</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan transition-colors">Cookie Policy</Link></li>
            <li><Link href="#" className="text-brand-cyan hover:text-blue-300 transition-colors font-medium">Security Policy</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan transition-colors">Responsible Disclosure</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter / Lead Magnet */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Informed</h3>
          <p className="text-slate-400 text-sm mb-4">Get practical security tips delivered to your inbox.</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-brand-blue disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-2 bg-brand-blue hover:bg-brand-cyan hover:text-slate-900 text-white font-medium rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {status === 'loading' && (
                <svg className="w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
            
            {/* Feedback Message (Success or Error) */}
            {message && (
              <p className={`text-xs mt-1 font-medium ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Connossieur24. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Nigeria • Global</p>
      </div>
    </footer>
  );
}