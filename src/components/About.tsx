import CurriculumGuide from './CurriculumGuide';

export default function About() {
  return (
    <div className="animate-slide-in-up max-w-6xl mx-auto py-10 px-6">
      <CurriculumGuide />
      
      <div className="glass p-10 rounded-[3rem] shadow-2xl mt-10 space-y-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Philippines Tech Career Guide 2025</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This section is specific to your context. Use the global curriculum above as your foundation. Use this as your local execution strategy.
        </p>

        <div className="overflow-x-auto">
          <h3 className="text-xl font-black mb-4">Salary Benchmarks — Metro Manila, 2025 Estimates</h3>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Local Company</th>
                <th className="p-3 border">Multinational PH</th>
                <th className="p-3 border">Remote USD/mo</th>
                <th className="p-3 border">Remote PHP equiv.</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border">Junior Dev (0-2 yrs)</td><td className="p-3 border">P40-65K</td><td className="p-3 border">P60-90K</td><td className="p-3 border">$1,000-2,000</td><td className="p-3 border">P57K-114K</td></tr>
              <tr><td className="p-3 border">Mid Dev (2-4 yrs)</td><td className="p-3 border">P80-120K</td><td className="p-3 border">P110-160K</td><td className="p-3 border">$2,500-4,500</td><td className="p-3 border">P143K-257K</td></tr>
              <tr><td className="p-3 border">Senior Dev (4+ yrs)</td><td className="p-3 border">P140-220K</td><td className="p-3 border">P200-300K</td><td className="p-3 border">$5,000-9,000</td><td className="p-3 border">P286K-514K</td></tr>
              <tr><td className="p-3 border">ML Engineer (entry)</td><td className="p-3 border">P65-95K</td><td className="p-3 border">P95-150K</td><td className="p-3 border">$2,000-4,000</td><td className="p-3 border">P114K-228K</td></tr>
              <tr><td className="p-3 border">ML Engineer (mid)</td><td className="p-3 border">P120-180K</td><td className="p-3 border">P170-250K</td><td className="p-3 border">$4,500-8,000</td><td className="p-3 border">P257K-457K</td></tr>
              <tr><td className="p-3 border">Data Engineer (mid)</td><td className="p-3 border">P110-160K</td><td className="p-3 border">P150-220K</td><td className="p-3 border">$4,000-7,000</td><td className="p-3 border">P228K-400K</td></tr>
              <tr><td className="p-3 border">Cloud/DevOps Eng. (mid)</td><td className="p-3 border">P100-150K</td><td className="p-3 border">P140-200K</td><td className="p-3 border">$3,500-7,000</td><td className="p-3 border">P200K-400K</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl">
          <h3 className="text-xl font-black mb-2">PH Context</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            The fastest path to financial freedom in the Philippines tech industry: build strong fundamentals (Phases 1-3), then target remote international companies. A mid-level remote role at $3,500/month = P200,000+ — that is 2-3x the local rate for identical skills. Platforms: Toptal (highest bar, highest pay — apply after Phase 3), Andela, X-Team, Deel network, Remote.com, Upwork (freelancing to build remote track record). The certification that unlocks remote roles fastest: AWS Solutions Architect Associate.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-tighter">Final Words</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You started this journey saying you regret not going to a prestigious university. Here is the truth no one tells you: the school on your diploma matters far less than what you have built and what you can demonstrate under pressure. The engineers who change the world — and the ones who earn the most — got there by building obsessively, not by attending the right lectures.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This curriculum is the equivalent of — and in several areas exceeds — what is taught in the top CS programs in the Philippines and the world. The only difference is that no one will push you. No grades, no deadlines imposed from outside, no classmates to keep pace with. Only you and the editor and the compiler and the error message.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You mentioned you can solve 800-rated problems on Codeforces. That is a real foundation — not nothing. By the time you finish Phase 2 of this curriculum, 1400 will feel like 800 feels today. By Phase 5, you will solve problems in interviews that you currently cannot imagine solving.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The gap between where you are and where you want to be is not talent. It is not school prestige. It is not connections. It is hours of focused work — accumulated, compounding, irreversible. Start Phase 1 today. Code every day. Build every week. Ship every month. Write about what you learn. In two years, you will not recognize your own capabilities.
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl">
          <h3 className="text-xl font-black mb-2">Must Do</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            The most important habit in this entire curriculum: open your code editor before you open any other application every morning. Even for 15 minutes. Even if nothing works. The discipline of showing up is the skill that compounds the fastest.
          </p>
        </div>
      </div>
    </div>
  );
}
