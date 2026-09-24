"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center relative z-50">
          <Link href="/" onClick={handleLinkClick} className="flex items-center">
            <Image 
              src="/branding/logo-light.png" 
              alt="Connossieur24 Logo" 
              width={400} 
              height={80} 
              className="h-8 md:h-10 w-auto object-contain" 
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/october" className="hover:text-blue-600 transition-colors">30 Days of Cyber</Link>
          <Link href="/simulator" className="hover:text-blue-600 transition-colors">Threat Simulator</Link>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 relative z-50">
          <button className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-md hover:bg-brand-navy transition-colors">
            Get Protected
          </button>
          
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden"
          >
            <nav className="flex flex-col px-4 py-6 space-y-4">
              <Link 
                href="/" 
                onClick={handleLinkClick}
                className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors py-2 border-b border-slate-100"
              >
                Home
              </Link>
              <Link 
                href="/october" 
                onClick={handleLinkClick}
                className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors py-2 border-b border-slate-100"
              >
                30 Days of Cyber
              </Link>
              <Link 
                href="/simulator" 
                onClick={handleLinkClick}
                className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors py-2 border-b border-slate-100"
              >
                Threat Simulator
              </Link>
              <button className="w-full mt-4 px-4 py-3 text-base font-medium text-white bg-brand-blue rounded-md hover:bg-brand-navy transition-colors">
                Get Protected
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}