import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, IndianRupee } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const CHURN_DATA = [
  { month: 'Jan', churn: 5.2, trust: 60 },
  { month: 'Feb', churn: 4.8, trust: 65 },
  { month: 'Mar', churn: 4.1, trust: 72 },
  { month: 'Apr', churn: 3.5, trust: 78 },
  { month: 'May', churn: 2.8, trust: 85 },
  { month: 'Jun', churn: 1.2, trust: 92 },
];

interface Props {
  lang: Language;
}

export const ImpactDashboard: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].impact;
  const [userCount, setUserCount] = useState(10000);
  
  // Simple GDP Multiplier Logic (Mock)
  const gdpImpact = (userCount * 0.45).toFixed(1); 

  return (
    <div className="max-w-6xl mx-auto p-6">
       <div className="mb-12 text-center">
        <h2 className="text-4xl font-display font-bold text-white mb-4">{t.title}</h2>
        <p className="text-slate-400 text-lg">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
             <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">{t.underserved}</p>
             <h3 className="text-4xl font-bold text-white">124,500+</h3>
         </div>
         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
             <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">{t.fraudBlocked}</p>
             <h3 className="text-4xl font-bold text-red-400">₹45 Cr</h3>
         </div>
         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
             <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">{t.trustScore}</p>
             <h3 className="text-4xl font-bold text-garuda-400">89/100</h3>
         </div>
      </div>

      {/* GDP Calculator */}
      <div className="bg-gradient-to-br from-garuda-900 to-slate-900 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex-1">
                 <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                     <IndianRupee className="w-6 h-6 text-green-400" /> {t.gdpTitle}
                 </h3>
                 <p className="text-slate-300 mb-6">
                     {t.gdpDesc}
                 </p>
                 
                 <div className="space-y-4">
                     <div className="flex justify-between text-sm font-medium text-slate-400">
                         <span>1,000 Users</span>
                         <span>100,000 Users</span>
                     </div>
                     <input 
                        type="range" 
                        min="1000" 
                        max="100000" 
                        step="1000"
                        value={userCount}
                        onChange={(e) => setUserCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-garuda-500"
                     />
                     <div className="text-center font-mono text-garuda-400 font-bold">
                         Simulation: {userCount.toLocaleString()} New Credit Users
                     </div>
                 </div>
             </div>

             <div className="bg-black/40 p-6 rounded-xl border border-white/10 min-w-[300px] text-center">
                 <p className="text-slate-400 text-sm uppercase mb-2">Estimated Economic Boost</p>
                 <h4 className="text-5xl font-bold text-white mb-2">₹{gdpImpact} Cr</h4>
                 <p className="text-xs text-slate-500">Based on consumption multiplier effect (RBI Research)</p>
             </div>
          </div>
      </div>

      {/* Churn Graph */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-2">{t.churnTitle}</h3>
          <p className="text-slate-400 mb-6">{t.churnDesc}</p>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHURN_DATA}>
                    <defs>
                        <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTrust" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                    <Area type="monotone" dataKey="churn" stroke="#ef4444" fillOpacity={1} fill="url(#colorChurn)" name="Churn Rate (%)" />
                    <Area type="monotone" dataKey="trust" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTrust)" name="Trust Score (Avg)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};
