"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function MarkCompleteButton({ day }: { day: string }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    setIsMounted(true);
    const completedDays = JSON.parse(localStorage.getItem('connoisseur-progress') || '[]');
    if (completedDays.includes(day)) setIsCompleted(true);
  }, [day]);

  const toggleComplete = () => {
    const completedDays = JSON.parse(localStorage.getItem('connoisseur-progress') || '[]');
    
    if (isCompleted) {
      // Unmark it
      const updated = completedDays.filter((d: string) => d !== day);
      localStorage.setItem('connoisseur-progress', JSON.stringify(updated));
      setIsCompleted(false);
    } else {
      // Mark it
      completedDays.push(day);
      localStorage.setItem('connoisseur-progress', JSON.stringify(completedDays));
      setIsCompleted(true);
    }
  };

  // Prevent hydration mismatch by not rendering the visual state until client loads
  if (!isMounted) return <div className="w-[180px] h-[44px]"></div>;

  return (
    <button 
      onClick={toggleComplete}
      className={`px-6 py-2.5 font-medium rounded-lg transition-all w-full sm:w-auto flex items-center justify-center gap-2 ${
        isCompleted 
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
          : 'bg-blue-600/10 text-blue-400 border border-blue-600/20 hover:bg-blue-600 hover:text-white'
      }`}
    >
      {isCompleted && <CheckCircle size={18} />}
      {isCompleted ? 'Completed' : 'Mark as Completed'}
    </button>
  );
}