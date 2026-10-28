import React from 'react';
import { useFarm } from '../context/FarmContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useFarm();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[3000] animate-in slide-in-from-bottom-4 fade-in duration-200">
      <div className="bg-[#2E4A35] text-white px-5 py-3 rounded-xl shadow-2xl border-2 border-yellow-400 font-bold text-sm flex items-center gap-3">
        <span className="text-xl">🐓</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
