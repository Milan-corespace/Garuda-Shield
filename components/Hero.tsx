import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, Lock, AlertTriangle, Search, Activity, MapPin, Users, QrCode, Camera, X, Zap, AlertOctagon, Scan, Loader2 } from 'lucide-react';
import { Language, ScamAlert } from '../types';
import { TRANSLATIONS, getScams } from '../constants';

interface HeroProps {
  lang: Language;
  onGetStarted: () => void;
  isLiteMode: boolean;
  triggerPanic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onGetStarted, isLiteMode, triggerPanic }) => {
  const t = TRANSLATIONS[lang].hero;
  const scams = getScams(lang);
  const [verifierInput, setVerifierInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<'idle' | 'scanning' | 'safe' | 'fraud'>('idle');
  const [showScanner, setShowScanner] = useState(false);
  const [selectedScam, setSelectedScam] = useState<ScamAlert | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifierInput) return;
    setVerificationResult('scanning');
    
    // Simulate API analysis time
    setTimeout(() => {
        const input = verifierInput.toLowerCase();
        // Enhanced simple logic for demo
        const isFraud = input.includes('lottery') || 
                        input.includes('winner') || 
                        input.includes('http') || 
                        input.includes('kyc') ||
                        input.includes('expire') ||
                        input.includes('block') ||
                        input.includes('urgent') ||
                        input.includes('otp');

        setVerificationResult(isFraud ? 'fraud' : 'safe');
    }, 1500);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col overflow-hidden">
      
      {/* Live Threat Pulse - Header */}
      <div className="bg-black/40 backdrop-blur border-b border-white/5 py-2">
         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-mono">
             <div className="flex items-center gap-4">
                 <span className="flex items-center gap-2 text-green-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    System Health: 99.9%
                 </span>
                 <span className="hidden md:flex items-center gap-2 text-blue-400">
                    <Activity className="w-3 h-3" />
                    Bias Deviation: 0.01% (Stable)
                 </span>
             </div>
             <div className="flex items-center gap-2 text-garuda-400 animate-pulse">
                 <Shield className="w-3 h-3" />
                 <span>Just Blocked: AI Voice Phishing (Mumbai)</span>
             </div>
         </div>
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 pt-10 pb-20">
        {!isLiteMode && (
            <div className="absolute inset-0 bg-garuda-900 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-garuda-500/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-garuda-accent/5 rounded-full blur-[128px]" />
            </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            
          <motion.div
            initial={isLiteMode ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 3D Shield Visualization */}
            <div className="flex justify-center mb-8 perspective-1000">
              <div className={`relative w-40 h-40 ${!isLiteMode && 'animate-float'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br from-garuda-400/30 to-transparent rounded-full blur-xl ${isLiteMode ? 'hidden' : ''}`}></div>
                <div className="relative w-full h-full flex items-center justify-center">
                    <Shield className="w-32 h-32 text-garuda-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                         <Lock className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
              {t.title}
            </h1>
            
            <h2 className="text-xl md:text-2xl font-light text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
                <button
                    onClick={onGetStarted}
                    className="px-8 py-4 bg-gradient-to-r from-garuda-500 to-garuda-400 text-white font-bold rounded-full shadow-lg shadow-garuda-500/30 text-lg flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    <Lock className="w-5 h-5" />
                    {t.cta}
                </button>

                <button
                    onClick={triggerPanic}
                    className="px-8 py-4 bg-red-900/30 border border-red-500/50 text-red-400 font-bold rounded-full hover:bg-red-900/50 transition-colors flex items-center gap-2"
                >
                    <AlertTriangle className="w-5 h-5" />
                    {t.panicBtn}
                </button>
                
                <button
                    onClick={() => setShowScanner(true)}
                    className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                    <QrCode className="w-5 h-5" />
                    {t.scanQR}
                </button>
            </div>

            {/* Instant Verifier Tool - Enhanced */}
            <div className="max-w-3xl mx-auto bg-garuda-800/50 border border-garuda-500/30 rounded-2xl p-2 backdrop-blur-md shadow-2xl">
                <div className="bg-garuda-900/80 rounded-xl p-4">
                   <h3 className="text-left text-white font-bold mb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-garuda-400" /> {t.verifierTitle}
                   </h3>
                   <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-2">
                      <input 
                          type="text" 
                          placeholder={t.verifierPlaceholder}
                          value={verifierInput}
                          onChange={(e) => {
                              setVerifierInput(e.target.value);
                              setVerificationResult('idle');
                          }}
                          className="flex-1 bg-black/40 border border-white/10 text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-garuda-500 focus:outline-none placeholder-slate-500"
                      />
                      <button 
                        type="submit" 
                        disabled={!verifierInput || verificationResult === 'scanning'}
                        className="bg-white text-garuda-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                      >
                          {verificationResult === 'scanning' ? <Loader2 className="w-5 h-5 animate-spin" /> : t.verifyBtn}
                      </button>
                   </form>
                </div>
                
                <AnimatePresence>
                    {verificationResult !== 'idle' && verificationResult !== 'scanning' && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={`mt-2 p-6 rounded-xl flex items-center gap-4 ${verificationResult === 'safe' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                        >
                            {verificationResult === 'safe' ? <CheckCircle className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
                            <div className="text-left">
                                <p className="text-2xl font-bold">{verificationResult === 'safe' ? 'VERIFIED SAFE' : 'SCAM DETECTED'}</p>
                                <p className="opacity-90">{verificationResult === 'safe' ? 'This message structure matches known safe banking patterns.' : 'This message contains known phishing keywords or suspicious links. Do not click.'}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Visual Scam Gallery */}
      <div className="py-12 bg-gradient-to-b from-black/40 to-garuda-900">
          <div className="max-w-6xl mx-auto px-6">
             <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <AlertOctagon className="w-6 h-6 text-red-500" /> {t.scamTitle}
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {scams.map(scam => (
                     <div 
                        key={scam.id} 
                        onClick={() => setSelectedScam(scam)}
                        className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all cursor-pointer group"
                     >
                         <div className="h-48 bg-black relative overflow-hidden">
                             <img src={scam.image} alt={scam.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                             <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> {scam.severity}
                             </div>
                         </div>
                         <div className="p-6">
                             <h4 className="text-lg font-bold text-white mb-2">{scam.title}</h4>
                             <p className="text-slate-400 text-sm">{scam.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
      </div>
      
      {/* Scam Details Modal */}
      <AnimatePresence>
        {selectedScam && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedScam(null)}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={e => e.stopPropagation()}
                    className="bg-garuda-900 border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
                >
                    <div className="h-64 relative">
                        <img src={selectedScam.image} alt={selectedScam.title} className="w-full h-full object-cover" />
                        <button onClick={() => setSelectedScam(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm uppercase flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> {selectedScam.severity} Severity
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">{selectedScam.title}</h3>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">{selectedScam.description}</p>
                        
                        <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                            <h4 className="text-red-400 font-bold mb-2 uppercase text-sm">How to identify</h4>
                            <ul className="list-disc list-inside text-red-200/80 space-y-1">
                                <li>Urgent action required (e.g. "Account blocked within 24h")</li>
                                <li>Unofficial links (e.g. bit.ly, ngrok.io)</li>
                                <li>Grammar or spelling mistakes</li>
                                <li>Request for OTP or PIN</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* QR Scanner Overlay */}
      <AnimatePresence>
        {showScanner && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center"
            >
                <button onClick={() => setShowScanner(false)} className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20"><X className="w-8 h-8" /></button>
                <div className="relative w-72 h-72 border-2 border-garuda-500 rounded-2xl overflow-hidden mb-8 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-garuda-400 animate-scan shadow-[0_0_15px_rgba(96,165,250,0.8)]"></div>
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <Scan className="w-16 h-16 text-slate-500 opacity-50" />
                    </div>
                    {/* Scanner Corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-garuda-500 rounded-tl-lg"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-garuda-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-garuda-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-garuda-500 rounded-br-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Scanning...</h3>
                <p className="text-slate-400 text-center max-w-sm px-6">Align the QR code within the frame to verify payment details.</p>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Saved by Garuda Stories */}
      <div className="bg-black/20 py-12 border-t border-white/5">
         <div className="max-w-6xl mx-auto px-6">
             <h3 className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-8 text-center">{t.savedTitle}</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                     <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><MapPin className="w-5 h-5" /></div>
                         <div className="text-sm">
                             <p className="font-bold text-white">Saved ₹45,000</p>
                             <p className="text-slate-500">Anjali, Pune</p>
                         </div>
                     </div>
                     <p className="text-slate-300 text-sm italic">"A cloned card was used in Bali while I was sleeping in Pune. Garuda blocked it instantly because my GPS showed I was home."</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                     <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Users className="w-5 h-5" /></div>
                         <div className="text-sm">
                             <p className="font-bold text-white">Identity Restored</p>
                             <p className="text-slate-500">Rajesh, Farmer</p>
                         </div>
                     </div>
                     <p className="text-slate-300 text-sm italic">"Someone opened a loan in my name. The Consent Console notified me immediately, and I blocked it with one tap."</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                     <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-garuda-500/20 rounded-lg text-garuda-400"><Zap className="w-5 h-5" /></div>
                         <div className="text-sm">
                             <p className="font-bold text-white">Crisis Averted</p>
                             <p className="text-slate-500">Tech Startup</p>
                         </div>
                     </div>
                     <p className="text-slate-300 text-sm italic">"A deepfake CEO voice call asked for a transfer. Garuda's audio analysis flagged the voice biometric mismatch."</p>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};
