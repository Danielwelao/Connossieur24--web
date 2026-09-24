"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, AlertTriangle, ShieldCheck, ChevronRight, RotateCcw, AlertOctagon } from 'lucide-react';

// --- The Scenario Database ---
const SCENARIOS = [
  {
    id: 1,
    senderName: "PayPal Support",
    senderEmail: "security@paypal-auth-secure.com", // Red flag: fake domain
    subject: "URGENT: Your account has been temporarily restricted",
    date: "Today, 10:42 AM",
    body: `Dear Customer, \n\nWe noticed unusual activity on your account. For your security, we have suspended all transactions. \n\nPlease verify your identity immediately to restore access. If you do not verify within 24 hours, your account will be permanently closed.\n\nClick here to verify your account: [http://paypal.auth-secure-login.com/verify]`,
    isPhishing: true,
    redFlags: [
      "The sender domain is 'paypal-auth-secure.com', not the official 'paypal.com'.",
      "Generic greeting ('Dear Customer') instead of your actual name.",
      "Creates artificial urgency ('within 24 hours') to trigger panic.",
      "The link points to a suspicious, unofficial domain."
    ]
  },
  {
    id: 2,
    senderName: "GitHub",
    senderEmail: "noreply@github.com",
    subject: "[GitHub] A new public key was added to your account",
    date: "Yesterday, 3:15 PM",
    body: `Hey,\n\nA new public key was added to your account from IP address 192.168.1.1.\n\nIf you did not do this, please secure your account immediately.\n\nTo view your SSH keys, visit: https://github.com/settings/keys`,
    isPhishing: false,
    redFlags: [
      "This is a legitimate security alert.",
      "The sender email uses the official '@github.com' domain.",
      "The email addresses you by your actual username.",
      "The URL points exactly to the official github.com settings page without redirects."
    ]
  },
  {
    id: 3,
    senderName: "HR Department",
    senderEmail: "hr@connoisseur24-update.com", // Red flag: subtle typo/wrong domain
    subject: "Updated 2026 Salary & Benefits Structure",
    date: "Oct 2, 8:00 AM",
    body: `Team,\n\nWe have updated the salary structure and health benefits for Q4 2026. All employees are required to review the changes and sign the acknowledgment form by Friday.\n\nPlease review the secure document here: [https://docs.google.com.secure-login-portal.net/document/d/1a2b3c]\n\nBest,\nHR`,
    isPhishing: true,
    redFlags: [
      "The sender email uses a fake domain ('connoisseur24-update.com') instead of your internal company domain.",
      "The link looks like a Google Doc but actually redirects to 'secure-login-portal.net'.",
      "Exploits curiosity and greed (salary changes) to trick employees into clicking."
    ]
  }
];

export default function PhishingSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'feedback' | 'finished'>('playing');
  const [userAnswer, setUserAnswer] = useState<'phishing' | 'safe' | null>(null);

  const scenario = SCENARIOS[currentIndex];

  const handleGuess = (guess: 'phishing' | 'safe') => {
    setUserAnswer(guess);
    
    const isCorrect = (guess === 'phishing' && scenario.isPhishing) || (guess === 'safe' && !scenario.isPhishing);
    if (isCorrect) setScore(score + 1);
    
    setGameState('feedback');
  };

  const handleNext = () => {
    if (currentIndex + 1 < SCENARIOS.length) {
      setCurrentIndex(currentIndex + 1);
      setGameState('playing');
      setUserAnswer(null);
    } else {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
    setUserAnswer(null);
  };

  return (
    <main className="min-h-screen bg-[#020617] px-4 md:px-8 py-12 text-slate-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/simulator" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Command Center
          </Link>
          
          <div className="bg-[#0F172A] border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-4 text-sm font-bold">
            <span className="text-slate-500">Threat Level: <span className="text-amber-500">ELEVATED</span></span>
            <div className="w-px h-4 bg-slate-800"></div>
            <span className="text-blue-400">Score: {score}/{SCENARIOS.length}</span>
          </div>
        </div>

        {gameState === 'finished' ? (
          /* Finished State */
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Simulation Complete</h1>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              You correctly identified {score} out of {SCENARIOS.length} threats. 
              {score === SCENARIOS.length 
                ? " Flawless execution. Your defensive instincts are sharp." 
                : " Review the red flags you missed and stay vigilant."}
            </p>
            <button 
              onClick={resetGame}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center mx-auto"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Run Simulation Again
            </button>
          </div>
        ) : (
          /* Playing & Feedback State */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* The Email Client (Left Side - 2 Cols) */}
            <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              
              {/* Browser/OS Header Mockup */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 text-xs font-medium text-slate-400 flex items-center">
                  <Mail className="w-3 h-3 mr-1" /> SecureMail Inbox
                </div>
              </div>

              {/* Email Metadata */}
              <div className="px-8 py-6 border-b border-slate-100 bg-white">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{scenario.subject}</h2>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {scenario.senderName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{scenario.senderName}</div>
                      <div className="text-sm text-slate-500">
                        From: <span className={`${gameState === 'feedback' && scenario.isPhishing ? 'bg-red-100 text-red-700 px-1 rounded font-mono' : ''}`}>{scenario.senderEmail}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">{scenario.date}</div>
                </div>
              </div>

              {/* Email Body */}
              <div className="px-8 py-8 text-slate-700 whitespace-pre-wrap leading-relaxed bg-white min-h-[300px]">
                {scenario.body}
              </div>
            </div>

            {/* The Control Panel (Right Side - 1 Col) */}
            <div className="flex flex-col gap-4">
              
              {gameState === 'playing' ? (
                /* Action Buttons */
                <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-white font-bold mb-4 flex items-center">
                    <AlertOctagon className="w-5 h-5 mr-2 text-blue-400" />
                    Analyze Payload
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Review the email carefully. Is this a legitimate communication or a social engineering attack?
                  </p>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleGuess('phishing')}
                      className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-xl transition-colors flex items-center justify-center"
                    >
                      <AlertTriangle className="w-5 h-5 mr-2" /> Report Phishing
                    </button>
                    <button 
                      onClick={() => handleGuess('safe')}
                      className="w-full py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold rounded-xl transition-colors flex items-center justify-center"
                    >
                      <ShieldCheck className="w-5 h-5 mr-2" /> Mark as Safe
                    </button>
                  </div>
                </div>
              ) : (
                /* Feedback Panel */
                <div className={`p-6 rounded-2xl border ${
                  (userAnswer === 'phishing' && scenario.isPhishing) || (userAnswer === 'safe' && !scenario.isPhishing)
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <h3 className={`font-bold text-xl mb-2 ${
                    (userAnswer === 'phishing' && scenario.isPhishing) || (userAnswer === 'safe' && !scenario.isPhishing)
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }`}>
                    {(userAnswer === 'phishing' && scenario.isPhishing) || (userAnswer === 'safe' && !scenario.isPhishing)
                      ? 'Target Neutralized. Good catch.'
                      : 'Security Breach. You were compromised.'}
                  </h3>
                  
                  <div className="mb-6 text-sm text-slate-300">
                    This email was <strong>{scenario.isPhishing ? 'a phishing scam' : 'legitimate'}</strong>.
                  </div>

                  <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Post-Incident Report</h4>
                  <ul className="space-y-3 mb-8">
                    {scenario.redFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-300">
                        <span className="text-blue-400 mr-2">•</span> {flag}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={handleNext}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center"
                  >
                    Next Scenario <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </main>
  );
}