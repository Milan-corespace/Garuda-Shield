import React from 'react';
import { BookOpen, Shield, Activity, Database, User } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  lang: Language;
}

export const UserGuide: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].guide;

  const steps = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Dashboard Home",
      desc: "Start here to see your overall Trust Score and system status."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Glass Box Ledger",
      desc: "Check your transactions. If you see a 'Blocked' status, click 'Why' to understand the AI's reasoning. Use the 'Simulate' button to test if a transaction would be approved before you make it."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Consent Console",
      desc: "Your data is yours. Use the toggles to Allow or Deny specific data usages. Green means access granted, Grey means your privacy is locked."
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Bank Advisory",
      desc: "Before taking a loan, visit this section. Our AI analyzes interest rates to tell you if a loan is a good investment or a debt trap."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
       <div className="text-center mb-12">
          <div className="w-16 h-16 bg-garuda-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-garuda-400" />
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-4">{t.title}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.desc}</p>
       </div>

       <div className="grid gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl border border-white/5">
               <div className="w-12 h-12 rounded-xl bg-garuda-900 flex items-center justify-center shrink-0 text-garuda-400 border border-white/10">
                  {step.icon}
               </div>
               <div>
                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs text-slate-300">
                        {index + 1}
                    </span>
                    {step.title}
                 </h3>
                 <p className="text-slate-400 leading-relaxed">
                    {step.desc}
                 </p>
               </div>
            </div>
          ))}
       </div>

       <div className="mt-12 p-8 bg-gradient-to-r from-garuda-600 to-garuda-500 rounded-2xl text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Need Human Help?</h3>
          <p className="opacity-90 mb-6">Our Ethics Committee is available 24/7 for critical disputes.</p>
          <button className="bg-white text-garuda-600 px-6 py-2 rounded-full font-bold hover:bg-slate-100 transition-colors">
             Contact Support
          </button>
       </div>
    </div>
  );
};