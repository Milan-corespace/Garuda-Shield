import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Building2, CheckCircle, Globe } from 'lucide-react';
import { getBanks, TRANSLATIONS, LANG_OPTIONS } from '../constants';
import { Bank, Language } from '../types';

interface Props {
  onLogin: (bankId: string | null, accountName?: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Login: React.FC<Props> = ({ onLogin, lang, setLang }) => {
  const t = TRANSLATIONS[lang].login;
  const banks = getBanks(lang);
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountDetails, setAccountDetails] = useState({ name: '', accNumber: '' });
  const [showLang, setShowLang] = useState(false);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setStep(2);
  };

  const handleSkip = () => {
    onLogin(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBank) {
      onLogin(selectedBank.id, accountDetails.name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-garuda-900 p-6 relative">
      
      {/* Language Switcher on Login */}
      <div className="absolute top-6 right-6 z-20">
         <button 
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-2 text-slate-400 hover:text-white bg-white/5 px-4 py-2 rounded-full transition-colors"
         >
             <Globe className="w-4 h-4" />
             <span className="uppercase text-sm font-bold">{lang}</span>
         </button>
         {showLang && (
             <div className="absolute right-0 mt-2 w-48 bg-garuda-800 border border-white/10 rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                 {LANG_OPTIONS.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => {
                            setLang(opt.id);
                            setShowLang(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 last:border-0 ${
                        lang === opt.id ? 'text-garuda-400 font-bold' : 'text-slate-300'
                        }`}
                    >
                        {opt.label}
                    </button>
                 ))}
             </div>
         )}
      </div>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center mb-6"
          >
            <Shield className="w-20 h-20 text-garuda-500" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">{t.welcome}</h1>
          <p className="text-slate-400 text-lg">{t.subtitle}</p>
        </div>

        {step === 1 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 text-center">{t.selectBank}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => handleBankSelect(bank)}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl p-6 flex flex-col items-center gap-4 transition-all group"
                  style={{ borderTop: `4px solid ${bank.color}` }}
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold text-xs shadow-lg">
                    {bank.logo}
                  </div>
                  <span className="text-white font-medium text-center group-hover:text-garuda-400 transition-colors">{bank.name}</span>
                </button>
              ))}
            </div>
            <div className="text-center mt-8">
              <button 
                onClick={handleSkip}
                className="text-slate-500 hover:text-white text-sm transition-colors"
              >
                {t.skip} &rarr;
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && selectedBank && (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="max-w-md mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold text-xs">
                 {selectedBank.logo}
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">{selectedBank.name}</h3>
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {t.verified}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t.nameLabel}</label>
                <input 
                  type="text"
                  required
                  value={accountDetails.name}
                  onChange={e => setAccountDetails({...accountDetails, name: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-garuda-500 transition-colors"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t.accLabel}</label>
                <input 
                  type="password"
                  required
                  value={accountDetails.accNumber}
                  onChange={e => setAccountDetails({...accountDetails, accNumber: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-garuda-500 transition-colors"
                  placeholder="•••• •••• •••• 1234"
                />
              </div>
              
              <div className="pt-4 space-y-3">
                <button 
                  type="submit"
                  className="w-full py-3 bg-garuda-500 hover:bg-garuda-400 text-white font-bold rounded-lg shadow-lg shadow-garuda-500/20 transition-all"
                >
                  {t.secureLink}
                </button>
                <button 
                  type="button"
                  onClick={handleSkip}
                  className="w-full py-3 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {t.skipForNow}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};
