import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, User, UserCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user'|'bot'}[]>([
      { text: "Hi! I'm Garuda-Bot. Ask me about loans, fraud checks, or your balance.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [failCount, setFailCount] = useState(0);
  const [humanConnected, setHumanConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if(!input.trim()) return;
    
    const userText = input;
    const newMessages = [...messages, { text: userText, sender: 'user' as const }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    if (humanConnected) {
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { text: "I'm checking that for you right now.", sender: 'bot' }]);
        }, 1500);
        return;
    }

    // Keyword matching logic
    setTimeout(() => {
        setIsTyping(false);
        const lowerInput = userText.toLowerCase();
        let response = "";

        if (lowerInput.includes('loan') || lowerInput.includes('credit')) {
             response = "You can view customized ethical loan offers in the 'My Bank' tab. We analyze interest rates to ensure they are safe.";
        } else if (lowerInput.includes('fraud') || lowerInput.includes('scam')) {
             response = "If you suspect fraud, use the 'Emergency Stop' button in the top menu immediately to freeze all accounts.";
        } else if (lowerInput.includes('balance') || lowerInput.includes('money')) {
             response = "To check your balance securely, please visit the 'My Bank' section and verify your identity.";
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
             response = "Hello! How can I help you protect your finances today?";
        }

        if (response) {
            setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
            setFailCount(0); // Reset fail count on success
        } else {
            const count = failCount + 1;
            setFailCount(count);
            if (count >= 2) {
                setMessages(prev => [...prev, { text: "I'm having trouble understanding. Would you like to speak to a human agent?", sender: 'bot' }]);
            } else {
                 setMessages(prev => [...prev, { text: "I didn't quite get that. Could you try asking about 'loans', 'fraud', or 'balance'?", sender: 'bot' }]);
            }
        }
    }, 1500);
  };

  const connectHuman = () => {
      setMessages(prev => [...prev, { text: "Connecting you to Senior Agent Priya...", sender: 'bot' }]);
      setIsTyping(true);
      setTimeout(() => {
          setIsTyping(false);
          setHumanConnected(true);
          setMessages(prev => [...prev, { text: "Hi, this is Priya. I see you're having trouble. How can I assist you with your account today?", sender: 'bot' }]);
      }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
       <AnimatePresence>
           {isOpen && (
               <motion.div 
                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 20, scale: 0.95 }}
                 className="mb-4 w-80 bg-garuda-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
               >
                   <div className="bg-garuda-800 p-4 flex items-center justify-between border-b border-white/5">
                       <div className="flex items-center gap-2">
                           {humanConnected ? <UserCheck className="w-5 h-5 text-green-400" /> : <MessageCircle className="w-5 h-5 text-garuda-400" />}
                           <span className="font-bold text-white">{humanConnected ? 'Agent Priya (Human)' : 'Garuda Assistant'}</span>
                       </div>
                       <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                   </div>
                   
                   <div className="h-72 overflow-y-auto p-4 space-y-3 bg-black/20">
                       {messages.map((m, i) => (
                           <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                               <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${m.sender === 'user' ? 'bg-garuda-600 text-white rounded-tr-none' : 'bg-white/10 text-slate-200 rounded-tl-none'}`}>
                                   {m.text}
                               </div>
                           </div>
                       ))}
                       {isTyping && (
                           <div className="flex justify-start">
                               <div className="bg-white/10 p-3 rounded-xl rounded-tl-none flex gap-1">
                                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                               </div>
                           </div>
                       )}
                       
                       {failCount >= 2 && !humanConnected && !isTyping && (
                           <div className="flex justify-center mt-2">
                               <button 
                                onClick={connectHuman}
                                className="px-4 py-2 bg-white text-garuda-900 text-xs font-bold rounded-full shadow-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                               >
                                   <User className="w-3 h-3" /> Talk to Human
                               </button>
                           </div>
                       )}
                       <div ref={messagesEndRef} />
                   </div>

                   <form onSubmit={handleSend} className="p-3 border-t border-white/5 flex gap-2 bg-garuda-800">
                       <input 
                         value={input}
                         onChange={e => setInput(e.target.value)}
                         className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-garuda-500 placeholder-slate-500"
                         placeholder="Type your question..."
                       />
                       <button type="submit" disabled={!input.trim()} className="bg-garuda-500 p-2 rounded-lg text-white hover:bg-garuda-400 disabled:opacity-50 disabled:cursor-not-allowed">
                           <MessageCircle className="w-4 h-4" />
                       </button>
                   </form>
               </motion.div>
           )}
       </AnimatePresence>

       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-14 h-14 bg-garuda-500 hover:bg-garuda-400 text-white rounded-full shadow-lg shadow-garuda-500/40 flex items-center justify-center transition-transform hover:scale-110"
       >
           {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
       </button>
    </div>
  );
};
