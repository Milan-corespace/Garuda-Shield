import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, Check, X, Shield, Plus, ArrowRight, Trash2, Smartphone, Sparkles, WifiOff, Phone, HelpCircle, Eye, Filter, Globe, Wallet, CreditCard, Clock, RotateCcw, BellOff } from 'lucide-react';
import { Transaction, Language, Bank, Subscription } from '../types';
import { getTransactions, TRANSLATIONS, getBanks, ERROR_CODES, getSubscriptions } from '../constants';
import { explainTransaction, analyzeNewTransaction } from '../services/Service';

interface Props {
  lang: Language;
  linkedBankId: string | null;
  isLiteMode: boolean;
}

export const GlassBoxLedger: React.FC<Props> = ({ lang, linkedBankId, isLiteMode }) => {
  const t = TRANSLATIONS[lang].ledger;
  const banks = getBanks(lang);
  const linkedBank: Bank | undefined = banks.find(b => b.id === linkedBankId);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'ledger' | 'watchdog'>('ledger');

  // Add Transaction State
  const [isAdding, setIsAdding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newTxn, setNewTxn] = useState({ merchant: '', amount: '', category: '' });
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  // Filter State
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'blocked' | 'flagged'>('all');
  
  // Error Translator State
  const [errorCodeInput, setErrorCodeInput] = useState('');
  const [decodedError, setDecodedError] = useState<{human: string, action: string} | null>(null);

  // Subscriptions
  const [subs, setSubs] = useState<Subscription[]>([]);

  useEffect(() => {
      setTransactions(getTransactions(lang));
      setSubs(getSubscriptions(lang));
  }, [lang]);

  // Cooling Off Effect
  useEffect(() => {
      const interval = setInterval(() => {
          setTransactions(prev => prev.map(txn => {
              if (txn.isCoolingOff) {
                  // Just simulation: Remove cooling off status after 10 seconds for demo
                   // In real app, this would check timestamp
                   return { ...txn, isCoolingOff: false, status: 'approved' }; 
              }
              return txn;
          }));
      }, 10000); 
      return () => clearInterval(interval);
  }, []);

  // Safe To Spend Calculation
  const totalBalance = linkedBank?.mockBalance || 45000;
  const upcomingBills = subs.reduce((acc, curr) => acc + curr.amount, 0) + 15000; // + Rent mock
  const safeToSpend = totalBalance - upcomingBills;

  const handleExplain = async (txn: Transaction) => {
    setLoadingId(txn.id);
    const result = await explainTransaction(txn, lang);
    setTransactions(prev => prev.map(item => 
      item.id === txn.id ? { 
        ...item, 
        humanExplanation: result.explanation,
        safetyAdvice: result.safetyAdvice,
        recommendedApp: result.recommendedApp
      } : item
    ));
    setLoadingId(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTransactions(prev => prev.filter(t => t.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setTransactions([]);
    }
  };

  const handleSimulateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const amount = parseFloat(newTxn.amount);
    const analysis = await analyzeNewTransaction(newTxn.merchant, amount, newTxn.category);
    const newTransactionObj: Transaction = {
      id: `TXN-${Math.floor(Math.random() * 10000)}-US`,
      date: new Date().toISOString().split('T')[0],
      description: `Payment to ${newTxn.merchant}`,
      amount: -amount,
      status: 'pending', // Start as pending
      isCoolingOff: true, // Activate timer
      aiReason: analysis.aiReason,
      garudaView: 'Transaction in cooling-off period. Click Undo to cancel.',
      category: newTxn.category,
      merchant: newTxn.merchant
    };
    setTransactions(prev => [newTransactionObj, ...prev]);
    setIsProcessing(false);
    setIsAdding(false);
    setNewTxn({ merchant: '', amount: '', category: '' });
    setSelectedId(newTransactionObj.id);
  };

  const handleUndoTransaction = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleCancelSub = (id: string) => {
      if(confirm("Proceed to cancel subscription? We will block future auto-debits.")) {
          setSubs(prev => prev.filter(s => s.id !== id));
      }
  };

  const handleTranslateError = () => {
      const found = ERROR_CODES.find(e => errorCodeInput.includes(e.code));
      if (found) {
          setDecodedError({ human: found.human, action: found.action });
      } else {
          setDecodedError({ human: "Unknown Code. It might be a bank-specific network issue.", action: "Wait 15 minutes and retry." });
      }
  };

  const getStatusLabel = (status: string) => {
      switch(status) {
          case 'approved': return t.status_approved;
          case 'blocked': return t.status_blocked;
          case 'flagged': return t.status_flagged;
          case 'pending': return t.status_pending;
          default: return status;
      }
  };

  const filteredTransactions = transactions.filter(t => filterStatus === 'all' || t.status === filterStatus);

  return (
    <div className="max-w-5xl mx-auto p-6">
      
      {/* Safe-to-Spend Dashboard */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-garuda-800 to-garuda-900 rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-full bg-garuda-500/5 -skew-x-12"></div>
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Wallet className="w-4 h-4" /> {t.safeToSpend}
              </h3>
              <div className="flex items-baseline gap-4 mb-4">
                 <h2 className="text-5xl font-mono font-bold text-white">
                    ₹{safeToSpend.toLocaleString()}
                 </h2>
                 <span className="text-slate-500 text-sm">Free to use</span>
              </div>
              
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                  <div className="h-full bg-garuda-500" style={{ width: `${(safeToSpend / totalBalance) * 100}%` }}></div>
                  <div className="h-full bg-red-500/50" style={{ width: `${(upcomingBills / totalBalance) * 100}%` }}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                  <span className="text-garuda-400">Available</span>
                  <span className="text-red-400">Reserved for Bills (₹{upcomingBills})</span>
              </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">
               <button 
                 onClick={() => setActiveView(activeView === 'ledger' ? 'watchdog' : 'ledger')}
                 className={`w-full py-4 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${activeView === 'watchdog' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
               >
                   {activeView === 'ledger' ? <BellOff className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                   {activeView === 'ledger' ? 'Open Watchdog' : 'Back to Ledger'}
               </button>
               {activeView === 'ledger' && <p className="text-center text-xs text-slate-500 mt-3">3 Auto-Payments scheduled soon.</p>}
          </div>
      </div>

      {activeView === 'ledger' ? (
      <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">{t.title}</h2>
          <p className="text-slate-400">{t.desc}</p>
        </div>
        <div className="flex gap-2">
          {transactions.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-3 bg-garuda-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 border border-white/10 rounded-xl font-medium transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden md:inline">{t.clearAll}</span>
            </button>
          )}
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl font-bold transition-all shadow-lg ${
              isAdding 
                ? 'bg-slate-700 hover:bg-slate-600' 
                : 'bg-gradient-to-r from-garuda-500 to-garuda-400 hover:shadow-garuda-500/40'
            }`}
          >
            {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isAdding ? 'Close' : t.addBtn}
          </button>
        </div>
      </div>

      {/* Transaction Translator Section */}
      <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6">
         <div className="flex-1">
             <h3 className="text-white font-bold flex items-center gap-2 mb-2">
                 <Globe className="w-5 h-5 text-garuda-400" /> {t.translatorTitle}
             </h3>
             <p className="text-sm text-slate-400 mb-4">{t.translatorDesc}</p>
             <div className="flex gap-2">
                 <input 
                    value={errorCodeInput} 
                    onChange={e => setErrorCodeInput(e.target.value)}
                    placeholder={t.translatorPlaceholder}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                 />
                 <button onClick={handleTranslateError} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold">
                     {t.translateBtn}
                 </button>
             </div>
         </div>
         {decodedError && (
             <div className="flex-1 bg-garuda-500/10 border border-garuda-500/30 rounded-lg p-4 animate-in fade-in">
                 <p className="text-white font-bold mb-1">Translation:</p>
                 <p className="text-slate-200 mb-2">"{decodedError.human}"</p>
                 <p className="text-garuda-400 text-xs uppercase font-bold">Action:</p>
                 <p className="text-slate-400 text-sm">{decodedError.action}</p>
             </div>
         )}
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <span className="text-slate-500 text-sm flex items-center gap-1 px-2"><Filter className="w-3 h-3" /> Filter:</span>
          {(['all', 'approved', 'blocked', 'flagged'] as const).map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                    filterStatus === status 
                    ? 'bg-white text-garuda-900 border-white' 
                    : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-500'
                }`}
              >
                  {status}
              </button>
          ))}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={isLiteMode ? {} : { height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 32 }}
            exit={isLiteMode ? {} : { height: 0, opacity: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-garuda-800/80 border border-garuda-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl shadow-black/50 relative">
              
              <button 
                onClick={() => setIsOfflineMode(!isOfflineMode)}
                className={`absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                   isOfflineMode ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-white/5 text-slate-500 border border-white/10 hover:text-slate-300'
                }`}
              >
                {isOfflineMode ? <WifiOff className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                {isOfflineMode ? 'Offline Mode Active' : 'Network: Stable'}
              </button>

              <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-garuda-400" />
                {t.addTitle}
              </h3>
              <p className="text-slate-400 text-sm mb-8">{t.addDesc}</p>
              
              {!isOfflineMode ? (
                <form onSubmit={handleSimulateTransaction} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t.inputMerchant}</label>
                    <input 
                      required
                      type="text"
                      value={newTxn.merchant}
                      onChange={e => setNewTxn({...newTxn, merchant: e.target.value})}
                      placeholder="e.g. Amazon, Starbucks, Friend"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-garuda-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t.inputAmount}</label>
                    <input 
                      required
                      type="number"
                      value={newTxn.amount}
                      onChange={e => setNewTxn({...newTxn, amount: e.target.value})}
                      placeholder="e.g. 5000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-garuda-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{t.inputCategory}</label>
                    <select 
                      required
                      value={newTxn.category}
                      onChange={e => setNewTxn({...newTxn, category: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-garuda-500 transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="Dining">Dining</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Travel">Travel</option>
                      <option value="Transfer">Transfer</option>
                      <option value="Investment">Investment</option>
                      <option value="Shopping">Shopping</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-3 flex justify-end mt-4">
                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-8 py-4 bg-white text-garuda-900 font-bold rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <>
                          <Activity className="w-5 h-5 animate-spin" />
                          {t.processing}
                        </>
                      ) : (
                        <>
                          Pay Now <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-yellow-900/20 border border-yellow-500/20 p-6 rounded-xl animate-in fade-in">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500">
                            <WifiOff className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-yellow-400 mb-2">{t.offlineMode}</h4>
                            <p className="text-yellow-100/80 mb-6">{t.offlineDesc}</p>
                            <div className="bg-black/40 p-4 rounded-lg flex items-center justify-between border border-white/10">
                                <span className="text-2xl font-mono text-white tracking-widest">
                                  {linkedBank ? linkedBank.ussdCode : '*99#'}
                                </span>
                                <a href={`tel:${linkedBank ? linkedBank.ussdCode : '*99#'}`} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                                    <Phone className="w-4 h-4" /> {t.dial}
                                </a>
                            </div>
                            <p className="mt-4 text-xs text-slate-500">
                                *Standard USSD charges may apply. Works on any mobile phone.
                            </p>
                        </div>
                    </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-white/5 rounded-xl border border-white/5 border-dashed">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No transactions found.</p>
          </div>
        )}
        {filteredTransactions.map((txn, index) => (
          <motion.div
            key={txn.id}
            initial={isLiteMode ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setHoverId(txn.id)}
            onMouseLeave={() => setHoverId(null)}
            className={`relative overflow-hidden rounded-xl border transition-all duration-300 group ${
              selectedId === txn.id 
                ? 'bg-garuda-800 border-garuda-500 shadow-2xl shadow-garuda-500/20' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            {/* Pending / Cooling Off State Overlay */}
            {txn.isCoolingOff && (
                <div className="absolute inset-0 z-30 bg-slate-900/90 backdrop-blur-sm flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <Clock className="w-8 h-8 text-yellow-400 animate-pulse" />
                        <div>
                            <p className="text-white font-bold text-lg">{t.coolingOff}</p>
                            <p className="text-slate-400 text-sm">Transaction held for 5s buffer</p>
                        </div>
                    </div>
                    <button 
                        onClick={(e) => handleUndoTransaction(txn.id, e)}
                        className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" /> {t.undoBtn}
                    </button>
                </div>
            )}

            <div 
              className="p-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer gap-4 relative z-10"
              onClick={() => setSelectedId(selectedId === txn.id ? null : txn.id)}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-3 rounded-full shrink-0 ${
                  txn.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                  txn.status === 'flagged' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {txn.status === 'blocked' ? <X className="w-6 h-6" /> :
                   txn.status === 'flagged' ? <AlertTriangle className="w-6 h-6" /> :
                   <Check className="w-6 h-6" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-medium text-lg truncate pr-4">{txn.description}</h3>
                  <p className="text-slate-400 text-sm flex items-center gap-2">
                      {txn.date} • {txn.category}
                      <span className="group/tooltip relative">
                         <HelpCircle className="w-3 h-3 text-slate-600 hover:text-slate-400 cursor-help" />
                         <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                             Category: Grouping for budget tracking
                         </span>
                      </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                 <div className="text-right">
                    <p className="text-white font-mono font-bold text-lg">
                      {txn.amount < 0 ? '-' : '+'}{Math.abs(txn.amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </p>
                    <p className={`text-xs font-bold uppercase tracking-wider ${
                      txn.status === 'blocked' ? 'text-red-400' :
                      txn.status === 'flagged' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>{getStatusLabel(txn.status)}</p>
                 </div>
                 <button 
                    onClick={(e) => handleDelete(txn.id, e)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
              </div>
            </div>

            {hoverId === txn.id && selectedId !== txn.id && txn.garudaView && !isLiteMode && !txn.isCoolingOff && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-0 bottom-0 bg-garuda-900/90 backdrop-blur p-3 border-t border-garuda-500/30 flex items-center gap-3 z-20"
                >
                    <div className="p-1.5 bg-garuda-500 rounded-lg text-white">
                        <Eye className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-garuda-100">
                        <span className="font-bold text-garuda-400">Garuda View:</span> {txn.garudaView}
                    </p>
                </motion.div>
            )}

            <AnimatePresence>
              {selectedId === txn.id && (
                <motion.div
                  initial={isLiteMode ? {} : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={isLiteMode ? {} : { height: 0, opacity: 0 }}
                  className="border-t border-white/10 bg-black/20 relative z-0"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                      <div className="flex-1 w-full space-y-6">
                        <div>
                          <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Activity className="w-3 h-3" /> System Logic
                          </h4>
                          <p className="text-white/80 font-mono text-sm bg-black/40 p-3 rounded border border-white/5">
                            {`> ${txn.aiReason}`}
                          </p>
                        </div>

                        {!txn.humanExplanation ? (
                           <button
                           onClick={(e) => {
                             e.stopPropagation();
                             handleExplain(txn);
                           }}
                           disabled={loadingId === txn.id}
                           className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-garuda-500 hover:bg-garuda-400 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 shadow-lg shadow-garuda-500/20"
                         >
                           {loadingId === txn.id ? (
                             <Activity className="w-4 h-4 animate-spin" />
                           ) : (
                             <Sparkles className="w-4 h-4" />
                           )}
                           {loadingId === txn.id ? t.loading : t.explainBtn}
                         </button>
                        ) : (
                          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-gradient-to-br from-garuda-900 to-garuda-800 border border-garuda-500/30 rounded-xl p-5 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-garuda-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                              <div className="flex items-center gap-2 mb-3 text-garuda-400">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Garuda Explanation</span>
                              </div>
                              <p className="text-slate-200 leading-relaxed text-lg relative z-10">
                                {txn.humanExplanation}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {txn.safetyAdvice && (
                                <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                                    <Shield className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">{t.safetyHeader}</span>
                                  </div>
                                  <p className="text-emerald-100/80 text-sm">
                                    {txn.safetyAdvice}
                                  </p>
                                </div>
                              )}
                              {txn.recommendedApp && (
                                <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                                    <Smartphone className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">{t.appHeader}</span>
                                  </div>
                                  <p className="text-blue-100/80 text-sm font-medium">
                                    {txn.recommendedApp}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {txn.status !== 'approved' && (
                        <div className="w-full lg:w-1/3">
                           <div className={`rounded-xl p-5 border ${
                             txn.status === 'blocked' 
                              ? 'bg-red-900/10 border-red-500/30' 
                              : 'bg-yellow-900/10 border-yellow-500/30'
                           }`}>
                              <h5 className={`font-bold mb-3 flex items-center gap-2 ${
                                txn.status === 'blocked' ? 'text-red-400' : 'text-yellow-400'
                              }`}>
                                <Shield className="w-5 h-5" /> 
                                {txn.status === 'blocked' ? t.fraud : 'Verification Needed'}
                              </h5>
                              <p className="text-sm opacity-80 leading-relaxed">
                                {txn.status === 'blocked' 
                                  ? "This transaction was stopped by the neural engine due to high risk indicators. No funds left your account."
                                  : "We flagged this for review. If you initiated this, please approve via biometric notification."}
                              </p>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      </>
      ) : (
      <div className="animate-in fade-in">
          <div className="mb-8">
              <h2 className="text-3xl font-bold text-purple-400 mb-2 flex items-center gap-2"><BellOff className="w-8 h-8" /> {t.watchdogTitle}</h2>
              <p className="text-slate-400">{t.watchdogDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subs.map(sub => (
                  <div key={sub.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors relative group">
                      {sub.isTrial && (
                          <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded">TRIAL ENDING SOON</div>
                      )}
                      <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-slate-900">
                              {sub.logo}
                          </div>
                          <div>
                              <h3 className="font-bold text-white text-lg">{sub.serviceName}</h3>
                              <p className="text-slate-400 text-sm">Next: {sub.nextDueDate}</p>
                          </div>
                      </div>
                      <div className="flex justify-between items-end mb-6">
                          <div>
                              <span className="text-2xl font-bold text-white">₹{sub.amount}</span>
                              <span className="text-slate-500 text-xs ml-1">/ {sub.frequency}</span>
                          </div>
                      </div>
                      <button 
                        onClick={() => handleCancelSub(sub.id)}
                        className="w-full py-2 bg-white/10 hover:bg-red-600 hover:text-white text-slate-300 rounded-lg font-bold transition-colors"
                      >
                          Cancel Subscription
                      </button>
                  </div>
              ))}
              {subs.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-slate-500">
                      <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <p>No active subscriptions found. You are saving money!</p>
                  </div>
              )}
          </div>
      </div>
      )}
    </div>
  );
};