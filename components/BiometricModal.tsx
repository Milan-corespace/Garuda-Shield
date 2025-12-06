import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScanFace, Fingerprint, CheckCircle, XCircle } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  actionName: string;
}

export const BiometricModal: React.FC<Props> = ({ onSuccess, onCancel, actionName }) => {
  const [status, setStatus] = useState<'scanning' | 'success' | 'error'>('scanning');

  useEffect(() => {
    // Simulate scanning process
    const timer = setTimeout(() => {
      setStatus('success');
      setTimeout(onSuccess, 800);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-white/10 p-8 rounded-2xl max-w-sm w-full text-center relative"
      >
        <h3 className="text-white font-bold text-lg mb-6">Verifying for {actionName}</h3>
        
        <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
           {status === 'scanning' && (
               <>
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-garuda-500/20 rounded-full blur-xl"
                />
                <ScanFace className="w-16 h-16 text-garuda-400 relative z-10" />
                <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-garuda-400 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                />
               </>
           )}
           {status === 'success' && (
               <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                   <CheckCircle className="w-20 h-20 text-green-500" />
               </motion.div>
           )}
           {status === 'error' && <XCircle className="w-20 h-20 text-red-500" />}
        </div>

        <p className="text-slate-400 text-sm mb-6">
            {status === 'scanning' ? 'Look at the camera...' : status === 'success' ? 'Identity Verified' : 'Verification Failed'}
        </p>

        <button 
            onClick={onCancel}
            className="text-slate-500 hover:text-white text-sm font-medium"
        >
            Cancel
        </button>
      </motion.div>
    </div>
  );
};
