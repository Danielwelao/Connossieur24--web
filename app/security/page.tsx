import Link from "next/link";

export default function SecurityPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8 md:p-12">
        <article className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg prose-a:text-blue-600">
          <h1>Security Policy</h1>
          <p className="text-sm text-slate-500 font-medium">Last updated September 29, 2026</p>

          <p>
            At Connossieur24, we take the security of our systems, our data, and our users very seriously. As a platform dedicated to cybersecurity education and awareness, we deeply value the role that independent security researchers play in the broader internet ecosystem. 
          </p>
          <p>
            If you believe you have discovered a vulnerability in our application, infrastructure, or services, we ask that you disclose it to us responsibly.
          </p>

          <h2>Safe Harbor</h2>
          <p>
            We consider activities conducted consistent with this policy to constitute &quot;authorized&quot; conduct. We will not initiate legal action or law enforcement investigation against you for identifying or reporting a security vulnerability, provided that you comply with this Responsible Disclosure Policy.
          </p>

          <h2>Rules of Engagement</h2>
          <p>When conducting vulnerability research against Connossieur24, you must adhere to the following rules:</p>
          <ul>
            <li><strong>Do no harm:</strong> Do not exploit any vulnerability beyond what is strictly necessary to prove its existence.</li>
            <li><strong>Protect user data:</strong> You must not access, modify, delete, or exfiltrate any data that does not belong to you. If you encounter user data, stop testing immediately and report the issue.</li>
            <li><strong>No disruptions:</strong> Do not perform Denial of Service (DoS/DDoS) attacks, spamming, or any activity that degrades the reliability of our platform.</li>
            <li><strong>No social engineering:</strong> Phishing, vishing, spam, and physical attacks against our employees, users, or infrastructure providers are strictly prohibited.</li>
            <li><strong>Keep it confidential:</strong> Do not publicly disclose the vulnerability or share it with third parties until we have confirmed it is patched and given you explicit permission to do so.</li>
          </ul>

          <h2>Scope</h2>
          <h3>In-Scope</h3>
          <ul>
            <li>The main web application hosted at <code>connossieur24.com</code> and its subdomains.</li>
            <li>Platform authentication and authorization mechanisms.</li>
            <li>Data isolation and tenant-level security controls.</li>
          </ul>

          <h3>Out-of-Scope</h3>
          <p>The following targets and vulnerability types are explicitly out of scope:</p>
          <ul>
            <li>Third-party services and infrastructure (e.g., Vercel, Neon Database, HaveIBeenPwned API). Please report vulnerabilities in these services directly to their respective vendors.</li>
            <li>Clickjacking on pages with no sensitive actions.</li>
            <li>Cross-Site Request Forgery (CSRF) on unauthenticated forms or forms with no sensitive actions.</li>
            <li>Attacks requiring MITM or physical access to a user&apos;s device.</li>
            <li>Missing HTTP security headers that do not directly lead to a vulnerability.</li>
          </ul>

          <h2>How to Report a Vulnerability</h2>
          <p>
            If you have found a qualifying vulnerability, please send an email to <strong><a href="mailto:connossieur24@yahoo.com" className="text-blue-600 hover:underline mt-2 inline-block">connossieur24@yahoo.com</a></strong>.
          </p>
          <p>To help us triage and resolve the issue quickly, please include the following in your report:</p>
          <ul>
            <li>A clear description of the vulnerability and its potential impact.</li>
            <li>Detailed, step-by-step instructions to reproduce the issue.</li>
            <li>Proof of Concept (PoC) scripts, screenshots, or video recordings if applicable.</li>
            <li>Your name or handle (for our internal records and potential future acknowledgments).</li>
          </ul>

          <h2>Our Commitment</h2>
          <p>If you choose to share your findings with us under this policy, we commit to:</p>
          <ul>
            <li>Acknowledging the receipt of your vulnerability report within 3 business days.</li>
            <li>Providing an estimated timeline for triage and remediation.</li>
            <li>Notifying you when the vulnerability has been patched.</li>
            <li>Maintaining an open and respectful dialogue with you throughout the process.</li>
          </ul>
          
          <p className="mt-8 text-sm text-slate-500 italic">
            Note: As Connossieur24 is currently in its closed-beta MVP phase, we do not currently operate a paid bug bounty program. However, we are immensely grateful for valid reports and are happy to provide recommendations or acknowledgments for impactful discoveries.
          </p>
        </article>
      </div>
    </div>
  );
}