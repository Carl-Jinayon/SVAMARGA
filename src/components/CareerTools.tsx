import { useState } from 'react';
import { Briefcase, FileText, Globe, Award, Copy, Check, Star, RefreshCcw } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';

export default function CareerTools() {
  const { progress, getOverallProgress, getCompletedSubjectsCount, getTotalSubjectsCount } = useTrackerStore();
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'none' | 'readme' | 'resume' | 'interview'>('none');

  // Tool 1: GitHub README Generator
  const generateReadme = () => {
    const overall = getOverallProgress();
    const completed = Object.values(progress).filter(p => p.completed);
    
    let md = `## 🚀 CS Learning Journey (${overall}% Complete)\n\n`;
    md += `I am currently following the **CS Ultimate Curriculum** (Full-Stack to ML Engineering).\n\n`;
    md += `### 📊 Progress Stats\n`;
    md += `- **Mastery:** ${overall}%\n`;
    md += `- **Subjects Mastered:** ${getCompletedSubjectsCount()}/${getTotalSubjectsCount()}\n\n`;
    
    if (completed.length > 0) {
      md += `### 🛠️ Key Skills Mastered\n`;
      completed.slice(0, 8).forEach(p => {
        const sub = curriculum.flatMap(ph => ph.subjects).find(s => s.id === p.subjectId);
        if (sub) md += `- **${sub.name}**: Completed projects and technical topics.\n`;
      });
    }
    
    md += `\n*Generated via [CS Ultimate Tracker](${window.location.origin})*`;
    return md;
  };

  // Tool 2: Resume Optimizer
  const [resumeSkills, setResumeSkills] = useState('');
  const getMissingKeywords = () => {
    const completedIds = Object.keys(progress).filter(id => progress[id].completed);
    const keywords = completedIds.map(id => {
      const sub = curriculum.flatMap(ph => ph.subjects).find(s => s.id === id);
      return sub?.name || '';
    });
    
    return keywords.filter(k => !resumeSkills.toLowerCase().includes(k.toLowerCase())).slice(0, 5);
  };

  // Tool 3: Mock Interview
  const questions = [
    { q: "What is the difference between an Array and a Linked List?", phase: 2 },
    { q: "Explain the Big O complexity of QuickSort vs MergeSort.", phase: 2 },
    { q: "What is a Closure in JavaScript?", phase: 3 },
    { q: "How does the Box Model work in CSS?", phase: 3 },
    { q: "Explain the difference between Supervised and Unsupervised Learning.", phase: 4 },
    { q: "What is Gradient Descent?", phase: 4 },
    { q: "Tell me about a challenging project you built.", phase: 1 },
    { q: "How do you handle conflict in a development team?", phase: 1 },
  ];
  const [currentQ, setCurrentQ] = useState(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="animate-slide-in-up space-y-8">
      {/* Tool Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setActiveTool('readme')}
          className={`glass p-6 rounded-3xl text-left transition-all border-b-4 ${activeTool === 'readme' ? 'border-blue-500 scale-105' : 'border-transparent hover:bg-white/50'}`}
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tighter">Portfolio Builder</h3>
          <p className="text-xs text-gray-500 mt-2">Generate a GitHub README snippet from your progress.</p>
        </button>

        <button 
          onClick={() => setActiveTool('resume')}
          className={`glass p-6 rounded-3xl text-left transition-all border-b-4 ${activeTool === 'resume' ? 'border-green-500 scale-105' : 'border-transparent hover:bg-white/50'}`}
        >
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tighter">Resume Optimizer</h3>
          <p className="text-xs text-gray-500 mt-2">Find missing power keywords for your CV.</p>
        </button>

        <button 
          onClick={() => setActiveTool('interview')}
          className={`glass p-6 rounded-3xl text-left transition-all border-b-4 ${activeTool === 'interview' ? 'border-purple-500 scale-105' : 'border-transparent hover:bg-white/50'}`}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tighter">Mock Interview</h3>
          <p className="text-xs text-gray-500 mt-2">Practice technical questions from your current phase.</p>
        </button>
      </div>

      {/* Active Tool Workspace */}
      <div className="glass p-10 rounded-[3rem] shadow-2xl relative overflow-hidden min-h-[400px]">
        {activeTool === 'none' && (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <Briefcase className="w-16 h-16 text-gray-300 mb-6" />
            <h2 className="text-2xl font-black text-gray-400 uppercase tracking-tighter italic">Select a Career Tool Above</h2>
          </div>
        )}

        {activeTool === 'readme' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">GitHub README Snippet</h2>
              <button 
                onClick={() => copyToClipboard(generateReadme(), 'readme')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest"
              >
                {copied === 'readme' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'readme' ? 'Copied!' : 'Copy Markdown'}
              </button>
            </div>
            <pre className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto border border-white/10 whitespace-pre-wrap">
              {generateReadme()}
            </pre>
          </div>
        )}

        {activeTool === 'resume' && (
          <div className="space-y-8">
            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Keyword Optimizer</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Paste your current "Skills" section:</label>
                <textarea 
                  value={resumeSkills}
                  onChange={(e) => setResumeSkills(e.target.value)}
                  placeholder="e.g. JavaScript, React, SQL..."
                  className="w-full h-40 bg-white/40 dark:bg-black/20 border border-white/20 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Missing Power Keywords:</h4>
                <div className="flex flex-wrap gap-3">
                  {getMissingKeywords().map(kw => (
                    <span key={kw} className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl text-xs font-bold border border-green-500/20 animate-pulse">
                      + {kw}
                    </span>
                  ))}
                  {getMissingKeywords().length === 0 && <p className="text-sm text-gray-400 italic">No missing keywords found based on your progress!</p>}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed bg-black/5 p-4 rounded-xl">
                  💡 <b>Recruiter Tip:</b> These keywords are detected from the subjects you've completed. Adding them helps you pass through ATS (Applicant Tracking Systems).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTool === 'interview' && (
          <div className="h-full flex flex-col items-center justify-center py-10 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-black bg-purple-500/10 text-purple-600 px-4 py-1.5 rounded-full uppercase tracking-widest">
                Question {currentQ + 1} of {questions.length}
              </span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white max-w-2xl leading-tight italic">
                "{questions[currentQ].q}"
              </h2>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentQ((currentQ + 1) % questions.length)}
                className="flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all"
              >
                <RefreshCcw className="w-4 h-4" />
                Next Question
              </button>
            </div>
            
            <div className="pt-10 border-t border-black/5 dark:border-white/5 w-full max-w-md text-center">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Confidence Score</p>
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}