import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Language, Persona } from '../types';
import { getPersonas, TRANSLATIONS } from '../constants';
import { User, AlertCircle, Check, MessageSquare } from 'lucide-react';

interface Props {
  lang: Language;
}

export const ProfileExplainer: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].profile;
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [correctionMode, setCorrectionMode] = useState(false);
  const [correctionText, setCorrectionText] = useState('');
  const [correctionSent, setCorrectionSent] = useState(false);

  useEffect(() => {
    const p = getPersonas(lang);
    setPersonas(p);
    // Keep the currently selected persona ID but update data, or fallback to first
    setSelectedPersona(prev => p.find(i => i.id === prev?.id) || p[0]);
  }, [lang]);

  const handleCorrect = (e: React.FormEvent) => {
    e.preventDefault();
    setCorrectionSent(true);
    setTimeout(() => {
        setCorrectionMode(false);
        setCorrectionSent(false);
        setCorrectionText('');
    }, 2000);
  };

  if (!selectedPersona) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">{t.title}</h2>
          <p className="text-slate-400">{t.desc}</p>
        </div>
        {/* Persona Selector */}
        <div className="flex gap-2">
            {personas.map(p => (
                <button 
                    key={p.id}
                    onClick={() => setSelectedPersona(p)}
                    className={`px-4 py-2 rounded-lg border text-sm flex items-center gap-2 transition-colors ${
                        selectedPersona.id === p.id 
                        ? 'bg-garuda-500 border-garuda-400 text-white' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                >
                    <span className="text-xl">{p.avatar}</span>
                    <div className="text-left leading-tight">
                        <div className="font-bold">{p.name}</div>
                        <div className="text-[10px] opacity-80">{p.role}</div>
                    </div>
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedPersona.factors}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/20 p-3 rounded">
                  <span className="text-slate-500 block">Income Stability</span>
                  <span className={`font-bold ${selectedPersona.incomeStability === 'High' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {selectedPersona.incomeStability}
                  </span>
              </div>
              <div className="bg-black/20 p-3 rounded">
                  <span className="text-slate-500 block">Spending Risk</span>
                  <span className={`font-bold ${selectedPersona.spendingRisk === 'Low' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {selectedPersona.spendingRisk}
                  </span>
              </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
           <div className="bg-garuda-900/60 border border-garuda-500/30 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-garuda-500 rounded-full text-white">
                   <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider">{t.score}</p>
                  <h3 className="text-4xl font-display font-bold text-white">{selectedPersona.trustScore}<span className="text-lg text-slate-500 font-normal">/900</span></h3>
                </div>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-garuda-500 to-garuda-accent transition-all duration-1000" 
                    style={{ width: `${(selectedPersona.trustScore / 900) * 100}%` }}
                ></div>
              </div>
              <div className="mt-6 bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">{t.aiNote}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    "{selectedPersona.aiNote}"
                  </p>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              {!correctionMode ? (
                <>
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                        {t.correctionTitle}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4">
                        {t.correctionDesc}
                    </p>
                    <button 
                        onClick={() => setCorrectionMode(true)}
                        className="text-garuda-400 text-sm font-medium hover:text-garuda-300 transition-colors border border-garuda-500/50 px-4 py-2 rounded-lg"
                    >
                        {t.correctionBtn} &rarr;
                    </button>
                </>
              ) : correctionSent ? (
                 <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in">
                     <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-3">
                         <Check className="w-6 h-6" />
                     </div>
                     <h4 className="text-white font-bold">{t.submitted}</h4>
                     <p className="text-slate-400 text-sm">{t.underReview}</p>
                 </div>
              ) : (
                 <form onSubmit={handleCorrect} className="animate-in slide-in-from-bottom-2">
                     <h4 className="text-white font-bold mb-2">{t.correctionTitle}</h4>
                     <textarea 
                        value={correctionText}
                        onChange={(e) => setCorrectionText(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-garuda-500 outline-none mb-3 h-24"
                        placeholder={t.placeholder}
                        required
                     />
                     <div className="flex gap-2">
                         <button type="submit" className="flex-1 bg-garuda-500 hover:bg-garuda-400 text-white py-2 rounded-lg text-sm font-bold">{t.submit}</button>
                         <button type="button" onClick={() => setCorrectionMode(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-2 rounded-lg text-sm">{t.cancel}</button>
                     </div>
                 </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};