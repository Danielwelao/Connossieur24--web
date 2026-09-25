export default function SecurityPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <article className="prose prose-slate prose-blue max-w-none">
        <h1 className="text-4xl font-bold mb-8">Security Policy & Responsible Disclosure</h1>
        
        <p className="lead text-xl text-slate-600 mb-8">
          At Connossieur24, we take the security of our systems and our users' data very seriously. We value the role of the security research community in helping us maintain a secure platform.
        </p>

        <h2>Safe Harbor</h2>
        <p>
          If you conduct your security research in good faith and in accordance with this policy, we consider your actions to be authorized. We will not initiate legal action against you, and we will support you if third parties initiate legal action against you related to your research on our systems.
        </p>

        <h2>Rules of Engagement</h2>
        <ul>
          <li><strong>Do no harm:</strong> Do not exploit vulnerabilities to access, modify, or delete user data.</li>
          <li><strong>No disruption:</strong> Do not execute Denial of Service (DoS) attacks or degrade our platform's performance.</li>
          <li><strong>Keep it private:</strong> Please allow us a reasonable amount of time to patch the vulnerability before disclosing it publicly.</li>
        </ul>

        <h2>Reporting a Vulnerability</h2>
        <p>
          If you believe you have found a security vulnerability in Connossieur24, please submit a detailed report to <strong>hello@connossieur24.com</strong>. Include clear steps to reproduce the issue.
        </p>
      </article>
    </div>
  );
}