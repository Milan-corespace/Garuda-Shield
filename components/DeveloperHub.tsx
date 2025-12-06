import React from 'react';
import { Terminal, Code, Copy, Play } from 'lucide-react';

export const DeveloperHub: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
       <div className="mb-12">
        <h2 className="text-4xl font-display font-bold text-white mb-4">Developer Sandbox & API Hub</h2>
        <p className="text-slate-400 text-lg">Integrate Garuda-Shield's trust engine into your existing banking stack.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Code Window */}
          <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-slate-400">POST /api/v1/transaction/verify</span>
              </div>
              <div className="p-6 text-slate-300">
                  <div className="mb-4">
                      <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> garuda.<span className="text-blue-400">verify</span>({'{'}
                      <br/>&nbsp;&nbsp;merchant: <span className="text-green-400">"Unknown Vendor"</span>,
                      <br/>&nbsp;&nbsp;amount: <span className="text-yellow-400">50000</span>,
                      <br/>&nbsp;&nbsp;user_context: {'{'} 
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;location: <span className="text-green-400">"Mumbai"</span>,
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;device_id: <span className="text-green-400">"uid_882"</span>
                      <br/>&nbsp;&nbsp;{'}'}
                      <br/>{'}'});
                  </div>
                  <div className="text-slate-500">// Expected Response</div>
                  <div className="text-green-400">
                      {'{'}
                      <br/>&nbsp;&nbsp;"status": "flagged",
                      <br/>&nbsp;&nbsp;"risk_score": 0.85,
                      <br/>&nbsp;&nbsp;"reason": "High value, new vendor",
                      <br/>&nbsp;&nbsp;"explanation": "Large transfer to unknown..."
                      <br/>{'}'}
                  </div>
              </div>
              <div className="bg-slate-800/50 p-4 border-t border-white/5 flex justify-end gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-xs text-white font-bold transition-colors">
                      <Copy className="w-3 h-3" /> Copy
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-garuda-600 hover:bg-garuda-500 rounded text-xs text-white font-bold transition-colors">
                      <Play className="w-3 h-3" /> Run in Sandbox
                  </button>
              </div>
          </div>

          {/* Features List */}
          <div className="space-y-8">
              <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-garuda-400" /> SDK Support
                  </h3>
                  <p className="text-slate-400 mb-4">
                      Native SDKs available for Node.js, Python, Java, and Go. Drop-in React components for the "Why?" button available on npm.
                  </p>
                  <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300 font-mono">npm install @garuda/core</span>
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300 font-mono">pip install garuda-shield</span>
                  </div>
              </div>

              <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <Code className="w-5 h-5 text-garuda-400" /> Webhooks
                  </h3>
                  <p className="text-slate-400">
                      Subscribe to real-time events like `fraud.detected`, `consent.revoked`, or `audit.log_created` to trigger workflows in your own CRM.
                  </p>
              </div>

              <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-xl">
                  <h4 className="font-bold text-white mb-2">Request API Key</h4>
                  <p className="text-sm text-slate-400 mb-4">
                      Access our sandbox environment for free. Production keys require business verification.
                  </p>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm transition-colors">
                      Get Sandbox Key
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};