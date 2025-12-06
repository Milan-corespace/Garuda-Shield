import React, { useState } from 'react';
import { Lock, ShieldAlert, PhoneCall, FileText, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  onExit: () => void;
  lang: Language;
}

export const PanicOverlay: React.FC<Props> = ({ onExit, lang }) => {
  const t = TRANSLATIONS[lang].panic;
  const [frozen, setFrozen] = useState(false);

  return (
    <div className="w-full h-full bg-red-950 flex flex-col items-center justify-center p-6 text-center relative animate-in fade-in duration-300">
       <button onClick={onExit} className="absolute top-6 right-6 text-red-300 hover:text-white">
           <X className="w-8 h-8" />
       </button>

       <div className="max-w-2xl w-full">
           <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" />
           <h1 className="text-5xl font-bold text-white mb-4 uppercase tracking-wider">{t.title}</h1>
           <p className="text-red-200 text-xl mb-12">
               {t.subtitle}
           </p>

           {!frozen ? (
               <button 
                  onClick={() => setFrozen(true)}
                  className="w-full py-8 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-3xl font-bold shadow-2xl shadow-red-900/50 mb-8 flex items-center justify-center gap-4 transform hover:scale-105 transition-all"
               >
                   <Lock className="w-10 h-10" /> {t.freeze}
               </button>
           ) : (
               <div className="w-full py-8 bg-green-600 text-white rounded-2xl text-3xl font-bold shadow-2xl mb-8 flex items-center justify-center gap-4 animate-in zoom-in">
                   <Lock className="w-10 h-10" /> {t.locked}
               </div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <button className="py-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3">
                   <PhoneCall className="w-6 h-6" /> {t.helpline}
               </button>
               <button className="py-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3">
                   <FileText className="w-6 h-6" /> {t.police}
               </button>
           </div>
           
           {frozen && (
               <p className="mt-8 text-red-300/80 text-sm">
                   {t.disclaimer}
               </p>
           )}
       </div>
    </div>
  );
};
