"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white mb-4 block">
            connoisseur24
          </Link>
          <p className="text-sm text-slate-400 mb-4">
            Building a digitally secure society where individuals and organizations have the knowledge to navigate the digital world safely.
          </p>
          <p className="text-sm font-medium text-slate-200">
            hello@connoisseur24.com
          </p>
        </div>

        {/* Column 2: Platform */}
        <div>
          <h3 className="text-white font-semibold mb-4">Platform</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/october" className="hover:text-blue-400 transition-colors">31 Days of Cyber</Link></li>
            <li><Link href="/simulator" className="hover:text-blue-400 transition-colors">Threat Simulator</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Glossary</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal & Compliance */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal & Compliance</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
            <li><Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Security Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Responsible Disclosure</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter / Lead Magnet */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Informed</h3>
          <p className="text-sm text-slate-400 mb-4">Get practical security tips delivered to your inbox.</p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md transition-colors">
              Subscribe
            </button>
          </form>
        </div>

      </div>
      
      {/* Bottom Copyright */}
      <div className="container mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Connoisseur24. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Nigeria • Global</p>
      </div>
    </footer>
  );
}