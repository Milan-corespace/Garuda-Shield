import React, { useState, useEffect, useRef } from 'react';
import { Shield, Globe, Menu, X, Wallet, Mic, Zap, ZapOff, AlertOctagon, Search, Wifi, WifiOff, AlertTriangle, ArrowRight } from 'lucide-react';
import { Language, Tab, SystemStatus } from '../types';
import { TRANSLATIONS, LANG_OPTIONS, SEARCH_INTENTS } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  linkedBankName?: string | null;
  isLiteMode: boolean;
  toggleLiteMode: () => void;
  toggleVoiceNav: () => void;
  triggerPanic: () => void;
}

export const Navbar: React.FC<Props> = ({ 
  activeTab, 
  setActiveTab, 
  lang, 
  setLang, 
  linkedBankName,
  isLiteMode,
  toggleLiteMode,
  toggleVoiceNav,
  triggerPanic
}) => {
  const t = TRANSLATIONS[lang].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [status, setStatus] = useState<SystemStatus>('normal');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{label: string, tab: Tab}[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      // Simulate random status changes for demo "Is It Just Me?"
      const statuses: SystemStatus[] = ['normal', 'normal', 'normal', 'slow', 'normal'];
      const interval = setInterval(() => {
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          setStatus(randomStatus);
      }, 15000);
      
      // Click outside listener for search
      const handleClickOutside = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
          setShowSearch(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          clearInterval(interval);
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      
      if (query.length > 0) {
          const lowerQuery = query.toLowerCase();
          const matches = SEARCH_INTENTS.filter(intent => 
              intent.keywords.some(k => {
                  const lowerK = k.toLowerCase();
                  // Check if keyword includes query (Autocomplete: "bal" -> "balance")
                  // OR if query includes keyword (Sentence: "check balance" -> "balance")
                  return lowerK.includes(lowerQuery) || lowerQuery.includes(lowerK);
              })
          ).map(intent => ({ label: intent.actionLabel, tab: intent.targetTab }));
          
          setSearchResults(matches);
          setShowSearch(true);
      } else {
          setSearchResults([]);
          setShowSearch(false);
      }
  };

  const executeSearch = (tab: Tab) => {
      setActiveTab(tab);
      setShowSearch(false);
      setSearchQuery('');
  };

  const tabs = [
    { id: Tab.LEDGER, label: t.transact },
    { id: Tab.BANKS, label: t.banks },
    { id: Tab.FAMILY, label: t.family },
    { id: Tab.CONSENT, label: t.consent },
    { id: Tab.PROFILE, label: t.profile },
  ];

  const enterpriseTabs = [
    { id: Tab.IMPACT, label: t.impact },
    { id: Tab.ETHICS, label: t.ethics },
  ];

  return (
    <>
        {/* Top System Status Bar "Traffic Light" */}
        <div className={`w-full py-1 text-xs font-bold text-center transition-colors relative z-40 ${
            status === 'normal' ? 'bg-green-900/50 text-green-400 border-b border-green-500/20' : 
            status === 'slow' ? 'bg-yellow-900/50 text-yellow-400 border-b border-yellow-500/20' :
            'bg-red-900/50 text-red-400 border-b border-red-500/20'
        }`}>
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
                {status === 'normal' && <Wifi className="w-3 h-3" />}
                {status === 'slow' && <WifiOff className="w-3 h-3" />}
                {status === 'down' && <AlertTriangle className="w-3 h-3" />}
                <span>
                    {status === 'normal' ? "All Systems Normal. Payments are Fast." : 
                     status === 'slow' ? "UPI Network is Slow Nationwide. Use Cash/Card if urgent." : 
                     "Bank Servers are Down for Maintenance. Back in 30m."}
                </span>
            </div>
        </div>

        <nav className={`sticky top-0 z-50 border-b border-white/10 ${isLiteMode ? 'bg-garuda-900' : 'bg-garuda-900/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            
            <div 
                className="flex items-center gap-2 cursor-pointer z-50"
                onClick={() => setActiveTab(Tab.HOME)}
            >
                <Shield className="w-8 h-8 text-garuda-500 fill-garuda-500/20" />
                <div className="flex flex-col">
                    <span className="text-xl font-display font-bold text-white tracking-tight leading-none">
                    Garuda<span className="text-garuda-400">-Shield</span>
                    </span>
                    {isLiteMode && <span className="text-[10px] text-garuda-400 font-mono uppercase tracking-wider">Lite Mode</span>}
                </div>
            </div>

            {/* Search Bar - Jargon Free */}
            <div className="hidden md:block relative mx-4 max-w-xs w-full" ref={searchContainerRef}>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="I want to..."
                        value={searchQuery}
                        onChange={handleSearch}
                        onFocus={() => {
                            if(searchQuery.length > 0) setShowSearch(true);
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-garuda-500 focus:bg-white/10 transition-all placeholder-slate-500"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <AnimatePresence>
                    {showSearch && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 w-full mt-2 bg-garuda-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100]"
                        >
                            {searchResults.length > 0 ? (
                                searchResults.map((result, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => executeSearch(result.tab)}
                                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 flex items-center justify-between group transition-colors"
                                    >
                                        {result.label}
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-garuda-400" />
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-slate-500">
                                    No actions found. Try "loan", "fraud", or "balance".
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="hidden xl:flex items-center space-x-1">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                    activeTab === tab.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {tab.label}
                </button>
                ))}
                <div className="h-6 w-px bg-white/10 mx-2"></div>
                {enterpriseTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-xs font-medium uppercase tracking-wider transition-colors px-3 py-2 rounded-lg ${
                    activeTab === tab.id ? 'text-garuda-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                    {tab.label}
                </button>
                ))}
            </div>

            <div className="flex items-center gap-3 z-50">
                
                <button 
                    onClick={triggerPanic}
                    className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold uppercase text-xs transition-colors animate-pulse"
                >
                    <AlertOctagon className="w-4 h-4" /> Emergency Stop
                </button>

                <button 
                onClick={toggleVoiceNav}
                className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
                title="Voice Navigation"
                >
                <Mic className="w-5 h-5" />
                </button>

                <button 
                onClick={toggleLiteMode}
                className={`p-2 rounded-full transition-colors ${isLiteMode ? 'bg-green-500/20 text-green-400' : 'text-slate-400 hover:text-white bg-white/5'}`}
                title="Toggle Lite Mode (Bandwidth Saver)"
                >
                {isLiteMode ? <ZapOff className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                </button>

                {linkedBankName && (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-garuda-500/20 rounded-full border border-garuda-500/30">
                        <Wallet className="w-4 h-4 text-garuda-400" />
                        <span className="text-xs font-bold text-garuda-300">{linkedBankName}</span>
                    </div>
                )}

                <div className="relative group hidden md:block">
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase">{lang}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-garuda-800 border border-white/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto overflow-hidden max-h-80 overflow-y-auto">
                    {LANG_OPTIONS.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setLang(opt.id)}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 last:border-0 ${
                        lang === opt.id ? 'text-garuda-400 font-bold' : 'text-slate-300'
                        }`}
                    >
                        {opt.label}
                    </button>
                    ))}
                </div>
                </div>

                <button 
                    className="xl:hidden text-slate-300"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            </div>
        </div>
        
        {mobileMenuOpen && (
            <div className="xl:hidden fixed inset-0 bg-garuda-900 z-40 pt-20 px-6 overflow-y-auto">
            <div className="flex flex-col space-y-4 pb-20">
                <button 
                    onClick={() => {
                        triggerPanic();
                        setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-bold uppercase"
                >
                    <AlertOctagon className="w-5 h-5" /> Emergency Stop
                </button>
                {linkedBankName && (
                    <div className="flex items-center gap-2 px-3 py-3 bg-garuda-500/20 rounded-lg border border-garuda-500/30 mb-4">
                        <Wallet className="w-5 h-5 text-garuda-400" />
                        <span className="font-bold text-garuda-300">{linkedBankName}</span>
                    </div>
                )}
                {[...tabs, ...enterpriseTabs].map((tab) => (
                    <button
                    key={tab.id}
                    onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                    }}
                    className={`text-lg font-medium py-2 border-b border-white/5 text-left ${
                        activeTab === tab.id ? 'text-white' : 'text-slate-400'
                    }`}
                    >
                    {tab.label}
                    </button>
                ))}
                
                <div className="pt-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Select Language</p>
                    <div className="grid grid-cols-2 gap-2">
                    {LANG_OPTIONS.map((opt) => (
                        <button
                        key={opt.id}
                        onClick={() => {
                            setLang(opt.id);
                            setMobileMenuOpen(false);
                        }}
                        className={`text-sm p-2 rounded border ${
                            lang === opt.id ? 'border-garuda-500 text-garuda-400 bg-garuda-500/10' : 'border-white/10 text-slate-400'
                        }`}
                        >
                        {opt.label}
                        </button>
                    ))}
                    </div>
                </div>
            </div>
            </div>
        )}
        </nav>
    </>
  );
};
