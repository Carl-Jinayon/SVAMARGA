import { Briefcase, FileText, Globe, Linkedin, Github, Award } from 'lucide-react';

export default function CareerTools() {
  const tools = [
    {
      title: 'Portfolio Builder',
      description: 'Generate a professional portfolio site using your curriculum progress.',
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      action: 'Launch Builder',
    },
    {
      title: 'Resume Optimizer',
      description: 'Tailor your resume for PH tech companies with AI-driven suggestions.',
      icon: <FileText className="w-6 h-6 text-green-500" />,
      action: 'Optimize Resume',
    },
    {
      title: 'Mock Interview',
      description: 'Practice coding and behavioral questions with an AI interviewer.',
      icon: <Award className="w-6 h-6 text-purple-500" />,
      action: 'Start Practice',
    },
  ];

  const resources = [
    { name: 'Levels.fyi (PH Salaries)', url: 'https://www.levels.fyi/t/software-engineer/locations/philippines' },
    { name: 'Developers Connect (DevCon) PH', url: 'https://devcon.ph/' },
    { name: 'Tech Interview Handbook', url: 'https://www.techinterviewhandbook.org/' },
  ];

  return (
    <div className="animate-slide-in-up space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="backdrop-blur-md bg-white/60 dark:bg-gray-800/60 p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl"
          >
            <div className="bg-white dark:bg-gray-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
              {tool.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{tool.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{tool.description}</p>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
              {tool.action}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 p-8 rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Job Search Strategy
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">1</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Build in Public</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share your daily progress on LinkedIn and Twitter. Filipino tech recruiters love seeing active learners.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold">2</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Optimize LinkedIn</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use keywords like "TypeScript", "FastAPI", and "Machine Learning" to appear in recruiter searches.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 font-bold">3</div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Network Locally</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join DevCon PH and other local communities. Referrals are the #1 way to get hired in the PH.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 p-8 rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Quick Links
          </h2>
          <div className="grid gap-3">
            {resources.map((res) => (
              <a
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
              >
                <span className="font-medium text-gray-900 dark:text-white">{res.name}</span>
                <Globe className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-6">
            <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}