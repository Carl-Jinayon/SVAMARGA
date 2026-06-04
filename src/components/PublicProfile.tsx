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
      <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="glass p-12 rounded-[3rem] max-w-md">
        <h2 className="text-3xl font-black uppercase mb-4 text-gray-900 dark:text-white">Profile Not Found</h2>
        <p className="text-gray-500 mb-8 font-medium">The link might be invalid or the profile is private.</p>
        <a href="/" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs inline-block">Return Home</a>
      </div>
    </div>
  );

  // Calculate mastery
  const allSubjects = curriculum.flatMap(p => p.subjects);
  const completedCount = allSubjects.filter(s => profile.progress?.[s.id]?.completed).length;
  const mastery = Math.round((completedCount / allSubjects.length) * 100);
  const topSkills = allSubjects.filter(s => profile.progress?.[s.id]?.completed).slice(0, 8);

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto space-y-12 bg-gray-50 dark:bg-gray-900">
      {/* Header Card */}
      <div className="glass p-12 rounded-[4rem] relative overflow-hidden border-none text-center">
        <div className="relative z-10 space-y-6">
          <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl text-4xl font-black">
            🚀
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Proof of <span className="text-blue-600">Competence</span></h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mt-2">Verified Professional Milestone Export</p>
          </div>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="relative p-1 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 rounded-[4rem] shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
        <div className="relative bg-white dark:bg-gray-900 rounded-[3.8rem] p-10 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Identity */}
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                  {id?.slice(0,1).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase">Verified Engineer</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">CS Ultimate Curriculum Graduate</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/5">
                  <Award className="w-6 h-6 text-blue-600 mb-3" />
                  <p className="text-[10px] font-black text-gray-400 uppercase">Mastery Rank</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">Top 5%</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/5">
                  <Target className="w-6 h-6 text-purple-600 mb-3" />
                  <p className="text-[10px] font-black text-gray-400 uppercase">Modules Built</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">{completedCount}</p>
                </div>
              </div>
            </div>

            {/* Right: Mastery */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Overall Specialization Mastery</p>
                  <p className="text-2xl font-black text-blue-600">{mastery}%</p>
                </div>
                <div className="h-6 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-black/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${mastery}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-shimmer" />
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-6">
                {topSkills.map(skill => (
                  <span key={skill.id} className="px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[10px] font-black uppercase border border-blue-500/20 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> {skill.name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center space-y-4 opacity-50">
        <p className="text-[10px] font-bold uppercase tracking-widest">This is a system-verified competence profile generated by CS Ultimate Tracker</p>
        <div className="flex justify-center gap-6 text-gray-900 dark:text-white">
          <a href="/" className="text-xs font-black uppercase hover:text-blue-600 transition-colors">Build your own path</a>
          <span className="text-gray-300">|</span>
          <p className="text-xs font-black uppercase">© 2026 CS Ultimate</p>
        </div>
      </div>
    </div>
  );
}
