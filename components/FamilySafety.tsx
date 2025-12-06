import React from 'react';
import { getFamilyMembers, TRANSLATIONS } from '../constants';
import { ShieldAlert, ShieldCheck, Phone, Activity, Bell } from 'lucide-react';
import { Language } from '../types';

interface Props {
  lang: Language;
}

export const FamilySafety: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].family;
  const members = getFamilyMembers(lang);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member) => (
              <div key={member.id} className={`p-6 rounded-2xl border ${member.safetyStatus === 'risk' ? 'bg-red-900/20 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${member.safetyStatus === 'risk' ? 'bg-red-500' : 'bg-green-500'}`}>
                              {member.name.charAt(0)}
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-white">{member.name}</h3>
                              <span className="text-sm text-slate-400">{member.relation}</span>
                          </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${member.safetyStatus === 'risk' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {member.safetyStatus === 'risk' ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                          {member.safetyStatus === 'risk' ? t.actionNeeded : t.safe}
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/20 p-3 rounded-lg">
                          <span className="text-xs text-slate-500 block mb-1">{t.lastActivity}</span>
                          <span className="text-white font-mono text-sm flex items-center gap-2">
                              <Activity className="w-3 h-3 text-garuda-400" /> {member.lastActivity}
                          </span>
                      </div>
                      <div className="bg-black/20 p-3 rounded-lg">
                          <span className="text-xs text-slate-500 block mb-1">{t.alertsToday}</span>
                          <span className={`font-mono text-sm font-bold ${member.alerts > 0 ? 'text-red-400' : 'text-slate-300'}`}>
                              {member.alerts}
                          </span>
                      </div>
                  </div>

                  {member.safetyStatus === 'risk' && (
                      <div className="bg-red-500/10 p-4 rounded-xl mb-4 border border-red-500/20">
                          <h4 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                              <Bell className="w-4 h-4" /> {t.suspiciousBlock}
                          </h4>
                          <p className="text-red-200/80 text-xs mb-3">
                              An attempt to transfer ₹10,000 to "Unknown Crypto Wallet" was blocked 10 mins ago.
                          </p>
                          <button className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                              <Phone className="w-4 h-4" /> {t.call} {member.name}
                          </button>
                      </div>
                  )}
              </div>
          ))}
      </div>
    </div>
  );
};
