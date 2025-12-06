import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronRight, Percent, Calendar, TrendingUp, AlertCircle, Wallet, CreditCard, History, Link as LinkIcon } from 'lucide-react';
import { Language, Bank, LoanProduct } from '../types';
import { getBanks, TRANSLATIONS } from '../constants';
import { analyzeLoanImpact } from '../services/Service';

interface Props {
  lang: Language;
  linkedBankId: string | null;
  onLinkBank: (bankId: string) => void;
}

export const BankAdvisory: React.FC<Props> = ({ lang, linkedBankId, onLinkBank }) => {
  const t = TRANSLATIONS[lang].banks;
  const banks = getBanks(lang);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [analyzingLoan, setAnalyzingLoan] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<Record<string, string>>({});
  const [showLinkForm, setShowLinkForm] = useState(false);

  const handleAnalyze = async (loan: LoanProduct) => {
    setAnalyzingLoan(loan.id);
    const result = await analyzeLoanImpact(loan, lang);
    setAnalysisResult(prev => ({...prev, [loan.id]: result}));
    setAnalyzingLoan(null);
  };

  const handleBankClick = (bank: Bank) => {
    setSelectedBank(bank);
    setShowLinkForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">{t.desc}</p>
      </div>

      {!selectedBank ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banks.map((bank) => (
            <motion.div
              key={bank.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleBankClick(bank)}
              className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group relative overflow-hidden"
              style={{ borderTop: `4px solid ${bank.color}` }}
            >
              {linkedBankId === bank.id && (
                 <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Wallet className="w-3 h-3" /> Linked
                 </div>
              )}
              <div className="flex items-center justify-between mb-6">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold text-xs">
                    {bank.logo}
                 </div>
                 <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{bank.name}</h3>
              {linkedBankId === bank.id ? (
                 <p className="text-sm text-garuda-400 font-medium">{t.myAccount} &rarr;</p>
              ) : (
                 <p className="text-sm text-slate-400">{bank.loans.length} Ethical Loan Products</p>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <button 
                onClick={() => setSelectedBank(null)}
                className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
            >
                ← Back to Banks
            </button>
            
            <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold shadow-lg">
                    {selectedBank.logo}
                 </div>
                 <div>
                     <h3 className="text-3xl font-display font-bold text-white">{selectedBank.name}</h3>
                     <span className="text-slate-400 text-sm uppercase tracking-wider font-bold">Partner Bank</span>
                 </div>
            </div>

            {/* Account Dashboard Logic */}
            {linkedBankId === selectedBank.id ? (
                <div className="mb-12 bg-gradient-to-r from-garuda-900 to-garuda-800 border border-garuda-500/30 rounded-2xl p-8">
                   <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Wallet className="w-6 h-6 text-garuda-400" /> {t.myAccount}
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                          <p className="text-slate-400 text-sm mb-1">{t.balance}</p>
                          <h4 className="text-3xl font-mono font-bold text-white">
                            {selectedBank.mockBalance?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                          </h4>
                      </div>
                      <div>
                          <p className="text-slate-400 text-sm mb-1">{t.activePlan}</p>
                          <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-garuda-400" />
                            {selectedBank.activePlan}
                          </h4>
                      </div>
                      <div>
                          <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors flex items-center justify-center gap-2">
                             <History className="w-5 h-5" /> {t.historyBtn}
                          </button>
                      </div>
                   </div>
                </div>
            ) : (
                <div className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t.linkAccount}</h3>
                      <p className="text-slate-400">{t.linkDesc}</p>
                   </div>
                   {!showLinkForm ? (
                     <button 
                        onClick={() => setShowLinkForm(true)}
                        className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                     >
                        {t.fillDetails}
                     </button>
                   ) : (
                     <div className="w-full max-w-md bg-black/40 p-4 rounded-xl border border-white/10">
                        <input type="text" placeholder="Account Number" className="w-full mb-2 bg-white/5 border border-white/10 rounded p-2 text-white text-sm" />
                        <input type="text" placeholder="IFSC Code" className="w-full mb-2 bg-white/5 border border-white/10 rounded p-2 text-white text-sm" />
                        <div className="flex gap-2">
                            <button 
                                onClick={() => onLinkBank(selectedBank.id)}
                                className="flex-1 bg-garuda-500 text-white py-2 rounded text-sm font-bold"
                            >
                                {t.save}
                            </button>
                            <button 
                                onClick={() => setShowLinkForm(false)}
                                className="flex-1 bg-white/10 text-slate-300 py-2 rounded text-sm hover:bg-white/20"
                            >
                                {t.cancel}
                            </button>
                        </div>
                     </div>
                   )}
                </div>
            )}

            <h3 className="text-xl font-bold text-white mb-6">Loan Offerings</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedBank.loans.map((loan) => (
                    <div key={loan.id} className="bg-garuda-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-xl font-bold text-white">{loan.name}</h4>
                                <span className="text-xs text-slate-400 px-2 py-1 bg-white/5 rounded mt-2 inline-block">{loan.type} Loan</span>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-garuda-400">{loan.interestRate}%</div>
                                <div className="text-xs text-slate-500">Interest Rate</div>
                            </div>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-6 flex-grow">
                            {loan.description}
                        </p>

                        <div className="pt-4 border-t border-white/10">
                            {!analysisResult[loan.id] ? (
                                <button 
                                    onClick={() => handleAnalyze(loan)}
                                    disabled={analyzingLoan === loan.id}
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
                                >
                                    {analyzingLoan === loan.id ? <TrendingUp className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                                    {analyzingLoan === loan.id ? 'Analyzing Financial Impact...' : t.analyzeBtn}
                                </button>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-garuda-500/10 border border-garuda-500/20 rounded-lg p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-garuda-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="text-xs font-bold text-garuda-400 uppercase mb-1">AI Financial Projection</h5>
                                            <p className="text-sm text-slate-200">
                                                {analysisResult[loan.id]}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
      )}
    </div>
  );
};
