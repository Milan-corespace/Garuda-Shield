
import React from 'react';
import { Server, Shield, FileText, EyeOff, Scan, Award, Download } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  lang: Language;
}

export const B2BSection: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].b2b;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-display font-bold text-white mb-4">{t.title}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t.subtitle}
        </p>
      </div>

      {/* Architecture Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
         <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
             <div className="w-12 h-12 bg-garuda-500/20 rounded-lg flex items-center justify-center text-garuda-400 mb-6">
                 <EyeOff className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4">{t.ocrTitle}</h3>
             <p className="text-slate-300 mb-6 leading-relaxed">
                 {t.ocrDesc}
             </p>
             
             {/* Visual Animation of Privacy */}
             <div className="bg-black/40 rounded-xl p-4 border border-white/5 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-scan-line animate-scan opacity-20 pointer-events-none"></div>
                 <div className="font-mono text-xs text-slate-500 space-y-2">
                     <div className="flex justify-between">
                         <span>Name: <span className="bg-slate-700 text-transparent rounded px-1">Rahul Sharma</span> <span className="text-green-500 ml-2">[REDACTED]</span></span>
                         <span>Score: <span className="text-white">780</span></span>
                     </div>
                     <div className="flex justify-between">
                         <span>ID: <span className="bg-slate-700 text-transparent rounded px-1">1234-5678</span> <span className="text-green-500 ml-2">[REDACTED]</span></span>
                         <span>Risk: <span className="text-green-400">Low</span></span>
                     </div>
                     <div className="w-full h-24 bg-slate-800/50 rounded flex items-center justify-center text-slate-600">
                         Document Image (Processed)
                     </div>
                 </div>
             </div>
         </div>

         <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
             <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 mb-6">
                 <Shield className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4">{t.testingTitle}</h3>
             <p className="text-slate-300 mb-6 leading-relaxed">
                 {t.testingDesc}
             </p>
             
             <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                 <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                     <span className="text-xs font-bold text-slate-400 uppercase">Live Attack Simulation</span>
                     <span className="text-xs text-green-400 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Defended</span>
                 </div>
                 <div className="space-y-2 font-mono text-xs">
                     <div className="text-red-400"> Injecting Generative Voice Deepfake...</div>
                     <div className="text-slate-300"> Analysis: Audio spectrograph mismatch.</div>
                     <div className="text-green-400"> ACTION: BLOCK. Trust Score Unaffected.</div>
                 </div>
             </div>
         </div>
      </div>

      {/* Regulatory Alignment */}
      <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" /> {t.regTitle}
          </h3>
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-white/10 text-slate-400 text-sm uppercase">
                          <th className="py-4 px-4">{t.mandate}</th>
                          <th className="py-4 px-4">{t.implementation}</th>
                          <th className="py-4 px-4">{t.status}</th>
                      </tr>
                  </thead>
                  <tbody className="text-slate-300">
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 font-bold text-white">RBI Cyber Security Framework (2016)</td>
                          <td className="py-4 px-4">Real-time anomaly detection & Glass Box logging.</td>
                          <td className="py-4 px-4 text-green-400 font-bold">Compliant</td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 font-bold text-white">Data Localization (2018)</td>
                          <td className="py-4 px-4">All ledger data stored on Indian servers (Mumbai/Hyd).</td>
                          <td className="py-4 px-4 text-green-400 font-bold">Compliant</td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 font-bold text-white">Fair Practices Code (Lenders)</td>
                          <td className="py-4 px-4">Anti-Bias "Correct This" Button & Human Review.</td>
                          <td className="py-4 px-4 text-green-400 font-bold">Advanced</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>

      {/* Whitepapers */}
      <div className="bg-gradient-to-r from-blue-900/20 to-garuda-900/20 rounded-2xl p-8 border border-blue-500/10">
          <h3 className="text-2xl font-bold text-white mb-6">{t.researchTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-blue-400" />
                      <div className="text-left">
                          <div className="font-bold text-white group-hover:text-blue-300 transition-colors">{t.whitepaper1}</div>
                          <div className="text-xs text-slate-500">PDF • 2.4 MB</div>
                      </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-500 group-hover:text-white" />
              </button>
              <button className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-garuda-400" />
                      <div className="text-left">
                          <div className="font-bold text-white group-hover:text-garuda-300 transition-colors">{t.whitepaper2}</div>
                          <div className="text-xs text-slate-500">PDF • 1.8 MB</div>
                      </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-500 group-hover:text-white" />
              </button>
          </div>
      </div>
    </div>
  );
};
