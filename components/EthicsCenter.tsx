import React, { useState, useEffect } from 'react';
import { getEthicsCommittee, TRANSLATIONS, getEthicsPosts } from '../constants';
import { CheckCircle, Activity, FileText } from 'lucide-react';
import { Language, CommitteeMember, BlogPost } from '../types';

interface Props {
  lang: Language;
}

export const EthicsCenter: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].ethics;
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setCommittee(getEthicsCommittee(lang));
    setPosts(getEthicsPosts(lang));
  }, [lang]);

  return (
    <div className="max-w-6xl mx-auto p-6">
       <div className="mb-12 text-center">
        <h2 className="text-4xl font-display font-bold text-white mb-4">{t.title}</h2>
        <p className="text-slate-400 text-lg">{t.subtitle}</p>
      </div>

      {/* Live Status */}
      <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
             <div className="relative">
                 <div className="absolute inset-0 bg-green-500 blur-lg opacity-40 animate-pulse"></div>
                 <Activity className="w-10 h-10 text-green-400 relative z-10" />
             </div>
             <div>
                 <h3 className="text-xl font-bold text-white">{t.integrityStatus}: {t.healthy}</h3>
                 <p className="text-green-400/80 text-sm">{t.biasDesc}</p>
             </div>
         </div>
         <div className="text-right text-xs font-mono text-slate-500">
             <p>Last Audit: 15 mins ago</p>
             <p>Hash: #8829-ACX-22</p>
         </div>
      </div>

      {/* Committee */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {committee.map((member, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-garuda-500" />
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-garuda-400 text-sm font-bold mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">"{member.bio}"</p>
              </div>
          ))}
      </div>

      {/* Ethics Blog */}
      <div>
          <h3 className="text-2xl font-bold text-white mb-6">{t.blogTitle}</h3>
          <div className="space-y-4">
              {posts.map((post) => (
                  <div key={post.id} className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-garuda-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <span>{post.date}</span> • <span>{post.category}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{post.title}</h4>
                      <p className="text-slate-400 text-sm mb-4">
                          {post.excerpt}
                      </p>
                      <span className="text-garuda-400 text-sm font-bold flex items-center gap-1">
                          {t.readFull} <FileText className="w-4 h-4" />
                      </span>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};