import React, { useState } from 'react';
import { Language, Tab, UserState } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlassBoxLedger } from './components/GlassBoxLedger';
import { ConsentConsole } from './components/ConsentConsole';
import { ProfileExplainer } from './components/ProfileExplainer';
import { BankAdvisory } from './components/BankAdvisory';
import { UserGuide } from './components/UserGuide';
import { B2BSection } from './components/B2BSection';
import { ImpactDashboard } from './components/ImpactDashboard';
import { EthicsCenter } from './components/EthicsCenter';
import { Login } from './components/Login';
import { PanicOverlay } from './components/PanicOverlay';
import { BiometricModal } from './components/BiometricModal';
import { FamilySafety } from './components/FamilySafety';
import { ChatWidget } from './components/ChatWidget';
import { getBanks } from './constants';
import { Mic, MicOff, Check, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [biometricAction, setBiometricAction] = useState('');
  
  // Voice State
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceStatus, setVoiceStatus] = useState<'listening' | 'processing' | 'success' | 'error'>('listening');
  const [voiceFeedback, setVoiceFeedback] = useState('');
  
  const [userState, setUserState] = useState<UserState>({
    isLoggedIn: false,
    linkedBankId: null,
    accountName: null,
    accountNumber: null
  });

  const handleLogin = (bankId: string | null, accountName?: string) => {
    // Trigger Biometric for Login if bank selected
    if (bankId) {
        setBiometricAction('Login');
        setShowBiometric(true);
        // Store pending login logic to execute after success
        const completeLogin = () => {
            setUserState({
                isLoggedIn: true,
                linkedBankId: bankId,
                accountName: accountName || 'Guest',
                accountNumber: '•••• 1234'
            });
            setActiveTab(Tab.HOME);
            setShowBiometric(false);
        };
        // Override the normal biometric success for this case
        (window as any).tempBiometricSuccess = completeLogin;
    } else {
        setUserState({
            isLoggedIn: true,
            linkedBankId: null,
            accountName: 'Guest',
            accountNumber: null
        });
        setActiveTab(Tab.HOME);
    }
  };

  const handleLinkBank = (bankId: string) => {
    setUserState(prev => ({
        ...prev,
        linkedBankId: bankId,
        accountName: prev.accountName || 'User',
        accountNumber: '•••• 1234'
    }));
  };

  const handlePanicTrigger = () => {
      setBiometricAction('Emergency Mode');
      setShowBiometric(true);
      (window as any).tempBiometricSuccess = () => {
          setIsPanicMode(true);
          setShowBiometric(false);
      };
  };

  const processVoiceCommand = (transcript: string) => {
    const text = transcript.toLowerCase();
    let matched = false;
    let feedback = "Navigating...";

    // Language Switching
    if (text.includes('hindi') || text.includes('हिंदी')) { setLang(Language.HI); matched = true; feedback="Switched to Hindi"; }
    else if (text.includes('english')) { setLang(Language.EN); matched = true; feedback="Switched to English"; }
    else if (text.includes('bengali') || text.includes('bangla')) { setLang(Language.BN); matched = true; feedback="Switched to Bengali"; }
    else if (text.includes('tamil')) { setLang(Language.TA); matched = true; feedback="Switched to Tamil"; }
    else if (text.includes('telugu')) { setLang(Language.TE); matched = true; feedback="Switched to Telugu"; }
    else if (text.includes('marathi')) { setLang(Language.MR); matched = true; feedback="Switched to Marathi"; }
    else if (text.includes('kannada')) { setLang(Language.KN); matched = true; feedback="Switched to Kannada"; }
    else if (text.includes('gujarati')) { setLang(Language.GU); matched = true; feedback="Switched to Gujarati"; }
    else if (text.includes('malayalam')) { setLang(Language.ML); matched = true; feedback="Switched to Malayalam"; }
    else if (text.includes('punjabi')) { setLang(Language.PA); matched = true; feedback="Switched to Punjabi"; }
    else if (text.includes('odia')) { setLang(Language.OR); matched = true; feedback="Switched to Odia"; }

    // Navigation
    if (text.includes('home') || text.includes('main')) { setActiveTab(Tab.HOME); matched = true; feedback="Go to Home"; }
    else if (text.includes('ledger') || text.includes('transaction') || text.includes('history') || text.includes('money')) { setActiveTab(Tab.LEDGER); matched = true; feedback="Opening Ledger"; }
    else if (text.includes('bank') || text.includes('loan')) { setActiveTab(Tab.BANKS); matched = true; feedback="Opening Bank Advisor"; }
    else if (text.includes('profile') || text.includes('score') || text.includes('trust')) { setActiveTab(Tab.PROFILE); matched = true; feedback="Opening Profile"; }
    else if (text.includes('privacy') || text.includes('consent') || text.includes('setting')) { setActiveTab(Tab.CONSENT); matched = true; feedback="Opening Privacy Settings"; }
    else if (text.includes('family') || text.includes('parent')) { setActiveTab(Tab.FAMILY); matched = true; feedback="Opening Family Safety"; }
    else if (text.includes('guide') || text.includes('help')) { setActiveTab(Tab.GUIDE); matched = true; feedback="Opening User Guide"; }
    else if (text.includes('ethics') || text.includes('team')) { setActiveTab(Tab.ETHICS); matched = true; feedback="Opening Ethics Center"; }
    
    // Specific Deep Links
    if (text.includes('password') || text.includes('reset')) {
        setActiveTab(Tab.PROFILE);
        matched = true;
        feedback = "Navigating to Password Reset";
        if (text.includes('mera') || text.includes('badalna') || text.includes('change')) setLang(Language.HI);
    }
    
    // Panic
    if (text.includes('stop') || text.includes('panic') || text.includes('emergency') || text.includes('scam')) {
        handlePanicTrigger();
        matched = true;
        feedback = "Activating Emergency Mode";
    }

    if (matched) {
        setVoiceStatus('success');
        setVoiceFeedback(feedback);
        setTimeout(() => setIsVoiceListening(false), 1500);
    } else {
        setVoiceStatus('error');
        setVoiceFeedback("Command not recognized. Try 'Show Ledger' or 'Switch to Hindi'.");
        setTimeout(() => {
             setVoiceStatus('listening'); // Reset to listening
             setVoiceFeedback('');
        }, 2000);
    }
  };

  const handleVoiceNav = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US'; // Default base, works for Hinglish too usually
            recognition.interimResults = true; // CRITICAL: Allows seeing text as you speak
            recognition.continuous = false; // Stop after one command

            recognition.onstart = () => {
                setIsVoiceListening(true);
                setVoiceStatus('listening');
                setVoiceTranscript('');
                setVoiceFeedback('');
            };

            recognition.onresult = (event: any) => {
                const result = event.results[0];
                const transcript = result[0].transcript;
                setVoiceTranscript(transcript);
                
                if (result.isFinal) {
                    setVoiceStatus('processing');
                    processVoiceCommand(transcript);
                }
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setVoiceStatus('error');
                if (event.error === 'not-allowed') {
                    setVoiceFeedback("Microphone blocked. Please allow access.");
                } else {
                    setVoiceFeedback("Could not hear you. Please try again.");
                }
                setTimeout(() => setIsVoiceListening(false), 2000);
            };
            
            recognition.onend = () => {
                // If we stopped but didn't succeed or error explicitly, just close
                if (voiceStatus === 'listening') {
                    setIsVoiceListening(false);
                }
            };

            recognition.start();
        } catch (e) {
            console.error(e);
            alert("Voice navigation failed to start.");
        }
    } else {
        alert("Voice navigation is not supported in this browser. Please use Chrome.");
    }
  };

  const onBiometricSuccess = () => {
      if ((window as any).tempBiometricSuccess) {
          (window as any).tempBiometricSuccess();
          (window as any).tempBiometricSuccess = null;
      } else {
          setShowBiometric(false);
      }
  };

  if (!userState.isLoggedIn) {
    return (
        <>
            {showBiometric && (
                <BiometricModal 
                    actionName={biometricAction} 
                    onSuccess={onBiometricSuccess} 
                    onCancel={() => setShowBiometric(false)} 
                />
            )}
            <Login onLogin={handleLogin} lang={lang} setLang={setLang} />
        </>
    );
  }

  const banks = getBanks(lang);
  const linkedBank = banks.find(b => b.id === userState.linkedBankId);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Hero lang={lang} onGetStarted={() => setActiveTab(Tab.LEDGER)} isLiteMode={isLiteMode} triggerPanic={handlePanicTrigger} />;
      case Tab.LEDGER:
        return <GlassBoxLedger lang={lang} linkedBankId={userState.linkedBankId} isLiteMode={isLiteMode} />;
      case Tab.CONSENT:
        return <ConsentConsole lang={lang} />;
      case Tab.PROFILE:
        return <ProfileExplainer lang={lang} />;
      case Tab.BANKS:
        return <BankAdvisory lang={lang} linkedBankId={userState.linkedBankId} onLinkBank={handleLinkBank} />;
      case Tab.FAMILY:
        return <FamilySafety lang={lang} />;
      case Tab.GUIDE:
        return <UserGuide lang={lang} />;
      case Tab.B2B:
        return <B2BSection lang={lang} />;
      case Tab.IMPACT:
        return <ImpactDashboard lang={lang} />;
      case Tab.ETHICS:
        return <EthicsCenter lang={lang} />;
      default:
        return <Hero lang={lang} onGetStarted={() => setActiveTab(Tab.LEDGER)} isLiteMode={isLiteMode} triggerPanic={handlePanicTrigger} />;
    }
  };

  return (
    <div className={`min-h-screen bg-garuda-900 text-slate-200 font-sans selection:bg-garuda-500/30 ${isPanicMode ? 'grayscale blur-sm pointer-events-none' : ''}`}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
        linkedBankName={linkedBank?.name}
        isLiteMode={isLiteMode}
        toggleLiteMode={() => setIsLiteMode(!isLiteMode)}
        toggleVoiceNav={handleVoiceNav}
        triggerPanic={handlePanicTrigger}
      />
      
      <main className={`pt-4 pb-20 ${!isLiteMode && 'animate-in fade-in duration-500'}`}>
        {renderContent()}
      </main>

      <ChatWidget />

      <footer className="border-t border-white/10 bg-garuda-900 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; 2024 Garuda-Shield Banking Initiative.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
             <span>RBI Compliant</span>
             <span>•</span>
             <span>GDPR Ready</span>
             <span>•</span>
             <span>AI Ethics Certified</span>
          </div>
        </div>
      </footer>

      {showBiometric && (
          <BiometricModal 
              actionName={biometricAction} 
              onSuccess={onBiometricSuccess} 
              onCancel={() => setShowBiometric(false)} 
          />
      )}

      {/* Enhanced Voice Overlay */}
      <AnimatePresence>
          {isVoiceListening && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-garuda-900/90 backdrop-blur-md flex items-center justify-center cursor-pointer"
                onClick={() => setIsVoiceListening(false)} // Click anywhere to close
              >
                  <div className="text-center max-w-lg px-6">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 ${
                          voiceStatus === 'success' ? 'bg-green-500 shadow-[0_0_50px_rgba(34,197,94,0.6)]' : 
                          voiceStatus === 'error' ? 'bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)]' :
                          'bg-garuda-500 animate-pulse shadow-[0_0_50px_rgba(59,130,246,0.5)]'
                      }`}>
                          {voiceStatus === 'success' ? <Check className="w-10 h-10 text-white" /> : 
                           voiceStatus === 'error' ? <MicOff className="w-10 h-10 text-white" /> :
                           <Mic className="w-10 h-10 text-white" />}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-4">
                          {voiceStatus === 'listening' ? 'Listening...' : 
                           voiceStatus === 'processing' ? 'Processing...' :
                           voiceStatus === 'success' ? 'Understood' : 'Error'}
                      </h3>
                      
                      {/* Real-time Transcript Display */}
                      <div className="min-h-[3rem] mb-4">
                          <p className="text-2xl text-garuda-200 font-light leading-relaxed">
                              "{voiceTranscript}"
                          </p>
                      </div>

                      {/* Feedback / Error Message */}
                      {voiceFeedback && (
                          <p className={`text-lg font-medium ${voiceStatus === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                              {voiceFeedback}
                          </p>
                      )}
                      
                      <p className="mt-8 text-slate-500 text-sm">
                          Try saying <span className="text-slate-300">"Show Ledger"</span>, <span className="text-slate-300">"Switch to Hindi"</span>, or <span className="text-slate-300">"Emergency"</span>
                      </p>
                      <p className="mt-2 text-slate-600 text-xs">Tap anywhere to cancel</p>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      {isPanicMode && (
          <div className="fixed inset-0 z-[100] pointer-events-auto grayscale-0 blur-0">
              <PanicOverlay onExit={() => setIsPanicMode(false)} lang={lang} />
          </div>
      )}
    </div>
  );
};

export default App;
