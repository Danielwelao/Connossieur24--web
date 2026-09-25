import { BookOpen } from "lucide-react";

const terms = [
  {
    term: "Brute Force Attack",
    definition: "A trial-and-error method used by attackers to decode encrypted data such as passwords by exhausting all possible combinations."
  },
  {
    term: "Phishing",
    definition: "A social engineering attack where a fraudulent message is designed to trick a person into revealing sensitive information or deploying malicious software."
  },
  {
    term: "Software Defined Networking (SDN)",
    definition: "An architecture that abstracts different, distinguishable layers of a network to make it agile and flexible, separating the control plane from the data forwarding plane."
  }
];

export default function Glossary() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-8">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cybersecurity Glossary</h1>
          <p className="text-slate-500 mt-2">Essential terminology for navigating the digital landscape.</p>
        </div>
      </div>

      <div className="space-y-6">
        {terms.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.term}</h3>
            <p className="text-slate-600 leading-relaxed">{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}