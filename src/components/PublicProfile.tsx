import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { curriculum } from '../data/curriculum';
import { motion } from 'framer-motion';
import { Award, Target, BookOpen, ShieldCheck } from 'lucide-react';

export default function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-cyan)', borderTopColor: 'transparent' }} />
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="glass p-12 rounded-[3rem] max-w-md border-none shadow-2xl">
        <h2 className="text-3xl font-black uppercase mb-4" style={{ color: 'var(--text-primary)' }}>Profile Not Found</h2>
        <p className="mb-8 font-medium" style={{ color: 'var(--text-secondary)' }}>The link might be invalid or the profile is private.</p>
        <a href="/" className="px-8 py-4 text-white rounded-2xl font-black uppercase text-xs inline-block transition-all shadow-xl hover:scale-105"
          style={{ background: 'var(--accent-cyan)' }}>
          Return Home
        </a>
      </div>
    </div>
  );

  const allSubjects = curriculum.flatMap(p => p.subjects);
  const completedCount = allSubjects.filter(s => profile.progress?.[s.id]?.completed).length;
  const mastery = Math.round((completedCount / allSubjects.length) * 100);
  const topSkills = allSubjects.filter(s => profile.progress?.[s.id]?.completed).slice(0, 8);

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto space-y-12">
      <div className="glass p-12 rounded-[4rem] relative overflow-hidden border-none text-center shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />
        
        <div className="relative z-10 space-y-6">
          <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl text-4xl font-black"
            style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))' }}>
            🚀
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight italic" style={{ color: 'var(--text-primary)' }}>
              Proof of <span style={{ color: 'var(--accent-cyan)' }}>Competence</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mt-2" style={{ color: 'var(--text-muted)' }}>
              Verified Professional Milestone Export
            </p>
          </div>
        </div>
      </div>

      <div className="relative p-1 rounded-[4rem] shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-teal), var(--accent-violet))' }}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
        
        <div className="relative rounded-[3.8rem] p-10 md:p-16" style={{ background: 'var(--bg-glass)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl"
                  style={{ background: 'var(--accent-cyan)' }}>
                  {id?.slice(0,1).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase" style={{ color: 'var(--text-primary)' }}>Verified Engineer</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <ShieldCheck className="w-4 h-4" style={{ color: 'var(--accent-teal)' }} />
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--accent-teal)' }}>
                      CS Ultimate Curriculum Graduate
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-[2rem] border" style={{ background: 'rgba(127,119,221,0.05)', borderColor: 'rgba(127,119,221,0.1)' }}>
                  <Award className="w-6 h-6 mb-3" style={{ color: 'var(--accent-violet)' }} />
                  <p className="text-[10px] font-black uppercase" style={{ color: 'var(--text-muted)' }}>Mastery Rank</p>
                  <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>Top 5%</p>
                </div>
                <div className="p-6 rounded-[2rem] border" style={{ background: 'rgba(0,229,255,0.05)', borderColor: 'rgba(0,229,255,0.1)' }}>
                  <Target className="w-6 h-6 mb-3" style={{ color: 'var(--accent-cyan)' }} />
                  <p className="text-[10px] font-black uppercase" style={{ color: 'var(--text-muted)' }}>Modules Built</p>
                  <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{completedCount}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Overall Specialization Mastery</p>
                  <p className="text-2xl font-black" style={{ color: 'var(--accent-cyan)' }}>{mastery}%</p>
                </div>
                <div className="h-4 w-full rounded-full overflow-hidden border relative" style={{ background: 'rgba(0,0,0,0.1)', borderColor: 'var(--border-subtle)' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${mastery}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full relative shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                    style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-6">
                {topSkills.map(skill => (
                  <span key={skill.id} className="px-4 py-2 rounded-xl text-[10px] font-black uppercase border flex items-center gap-2"
                    style={{ background: 'rgba(0,229,255,0.05)', borderColor: 'rgba(0,229,255,0.2)', color: 'var(--accent-cyan)' }}>
                    <BookOpen className="w-3 h-3" /> {skill.name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="text-center space-y-4 opacity-50 pt-8">
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
          This is a system-verified competence profile generated by SVAMARGA
        </p>
        <div className="flex justify-center gap-6" style={{ color: 'var(--text-primary)' }}>
          <a href="/" className="text-xs font-black uppercase transition-colors" style={{ color: 'var(--text-primary)' }}>Build your own path</a>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <p className="text-xs font-black uppercase">© 2026 SVAMARGA</p>
        </div>
      </div>
    </div>
  );
}
