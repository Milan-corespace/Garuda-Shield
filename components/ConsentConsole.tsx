import React, { useState } from 'react';
import { Shield, Smartphone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { getConsent } from '../constants';
import { Language } from '../types';

interface ConsentConsoleProps {
  lang: Language;
}

export const ConsentConsole: React.FC<ConsentConsoleProps> = ({ lang }) => {
  const [consents, setConsents] = useState(getConsent(lang));

  const toggleConsent = (id: string) => {
    setConsents(consents.map(c => 
      c.id === id ? { ...c, isGranted: !c.isGranted } : c
    ));
  };

  return (
    <div className="bg-garuda-800 rounded-2xl p-6 border border-white/5 shadow-xl">
      <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-garuda-400" />
        Privacy & Consent Controls
      </h2>
      <div className="space-y-4">
        {consents.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:border-garuda-500/30 transition-colors">
            <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-lg ${item.isGranted ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.category === 'security' ? <Shield className="w-5 h-5" /> : 
                     item.category === 'marketing' ? <Smartphone className="w-5 h-5" /> : 
                     <MapPin className="w-5 h-5" />}
                </div>
                <div>
                    <h3 className="text-white font-medium text-lg">{item.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                    <p className="text-xs text-slate-500 mt-2">Last updated: {item.lastUpdated}</p>
                </div>
            </div>
            
            <button 
                onClick={() => toggleConsent(item.id)}
                className={`w-14 h-8 rounded-full transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-garuda-400 ${item.isGranted ? 'bg-garuda-500' : 'bg-slate-700'}`}
            >
                <motion.div 
                    initial={false}
                    animate={{ x: item.isGranted ? 28 : 4 }}
                    className="w-6 h-6 bg-white rounded-full shadow-sm"
                />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};