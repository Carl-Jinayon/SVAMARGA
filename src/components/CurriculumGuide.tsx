export default function CurriculumGuide() {
  return (
    <div className="glass p-10 rounded-[3rem] shadow-2xl mb-10 space-y-12">
      <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">How to Use This Curriculum</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        This is a complete, self-directed CS degree — structured like the best university programs but rebuilt around what actually makes you hireable. Version 3 adds 7 new subjects, estimated hours per subject, star-rated resources, common mistakes callouts, phase capstone projects, and salary negotiation scripts specific to the Philippines.
      </p>

      <div className="overflow-x-auto">
        <h3 className="text-xl font-black mb-4">Curriculum Overview</h3>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 border">Ph</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Covers</th>
              <th className="p-3 border">Hours</th>
              <th className="p-3 border">Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border">1</td><td className="p-3 border">Foundations</td><td className="p-3 border">Python, Math, Linux, Git, TypeScript</td><td className="p-3 border">520 hrs</td><td className="p-3 border">Think like a programmer</td></tr>
            <tr><td className="p-3 border">2</td><td className="p-3 border">Core CS Mastery</td><td className="p-3 border">DSA, OOP, Databases, Networks, App Security</td><td className="p-3 border">720 hrs</td><td className="p-3 border">Think like a CS graduate</td></tr>
            <tr><td className="p-3 border">3</td><td className="p-3 border">Full-Stack Eng.</td><td className="p-3 border">Backend, Frontend, Cloud, System Design, DevOps</td><td className="p-3 border">580 hrs</td><td className="p-3 border">Build & ship products</td></tr>
            <tr><td className="p-3 border">4</td><td className="p-3 border">ML & AI Eng.</td><td className="p-3 border">ML, Deep Learning, MLOps, LLMs, Data Viz, Data Eng.</td><td className="p-3 border">820 hrs</td><td className="p-3 border">Become an ML Engineer</td></tr>
            <tr><td className="p-3 border">5</td><td className="p-3 border">Career Prep</td><td className="p-3 border">Interviews, Portfolio, Negotiation</td><td className="p-3 border">200 hrs</td><td className="p-3 border">Get hired at your target salary</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-black mb-4">Visual Learning Roadmap & Dependency Map</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 italic">Each phase depends on the previous. Subjects within a phase can partially overlap. Never start Phase N+1 before Phase N is 80% complete.</p>
        
        <div className="space-y-4">
          <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-600/20">
            <h4 className="font-bold text-blue-800 dark:text-blue-300">Phase 1 — Foundations (~520 hrs)</h4>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">CS101 Python → CS105 TypeScript → CS102 Math (parallel) → CS103 OS/Linux → CS104 Git & Tooling</p>
          </div>
          <div className="bg-purple-600/10 p-4 rounded-xl border border-purple-600/20">
            <h4 className="font-bold text-purple-800 dark:text-purple-300">Phase 2 — Core CS (~720 hrs)</h4>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">CS201 DSA (ongoing) → CS202 OOP & Patterns → CS203 Databases → CS204 Networks → CS205 App Security</p>
          </div>
          <div className="bg-pink-600/10 p-4 rounded-xl border border-pink-600/20">
            <h4 className="font-bold text-pink-800 dark:text-pink-300">Phase 3 — Full-Stack (~580 hrs)</h4>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">CS301 Backend (FastAPI) → CS302 Frontend (React+TS) → CS305 Cloud (AWS/GCP) → CS303 System Design → CS304 DevOps</p>
          </div>
          <div className="bg-orange-600/10 p-4 rounded-xl border border-orange-600/20">
            <h4 className="font-bold text-orange-700">Phase 4 — ML & AI (~820 hrs)</h4>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">CS401 ML Foundations → CS402 Deep Learning → CS403 MLOps+LLM → CS404 Specialization → CS405 Data Viz → CS406 Data Eng.</p>
          </div>
          <div className="bg-green-600/10 p-4 rounded-xl border border-green-600/20">
            <h4 className="font-bold text-green-700">Phase 5 — Career (~200 hrs)</h4>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">CS501 Technical Interviews (DSA + System Design) → CS502 Portfolio + Brand + Job Search + Negotiation</p>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl mt-6">
          <h4 className="font-black text-lg mb-2">Pro Tip</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Parallel tracks you CAN run simultaneously: CS102 Math with CS101 Python. CS104 Git from week 1 of everything. CS105 TypeScript after Week 4 of CS101. CS205 Security after CS203 and CS204 are 50% done. CS303 System Design while finishing CS301 Backend. CS405 Data Viz while doing CS401 ML. Never skip dependencies.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto mt-8">
        <h3 className="text-xl font-black mb-4">Daily & Weekly Study Schedule</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Use this as your non-negotiable daily structure. Protect these blocks like your most important meeting.</p>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-3 border">Day</th>
              <th className="p-3 border">Block 1 (1-1.5 hr)</th>
              <th className="p-3 border">Block 2 (1.5-2 hr)</th>
              <th className="p-3 border">Block 3 (1-2 hr)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border">Mon</td><td className="p-3 border">DSA Practice</td><td className="p-3 border">Subject Theory</td><td className="p-3 border">Build / Project</td></tr>
            <tr><td className="p-3 border">Tue</td><td className="p-3 border">DSA Practice</td><td className="p-3 border">Subject Theory</td><td className="p-3 border">Build / Project</td></tr>
            <tr><td className="p-3 border">Wed</td><td className="p-3 border">DSA Practice</td><td className="p-3 border">Review Notes</td><td className="p-3 border">Mini project</td></tr>
            <tr><td className="p-3 border">Thu</td><td className="p-3 border">DSA Practice</td><td className="p-3 border">Subject Theory</td><td className="p-3 border">Build / Project</td></tr>
            <tr><td className="p-3 border">Fri</td><td className="p-3 border">DSA Practice</td><td className="p-3 border">Subject Theory</td><td className="p-3 border">Build / Project</td></tr>
            <tr><td className="p-3 border">Sat</td><td className="p-3 border">2 LeetCode (harder)</td><td className="p-3 border">Deep work</td><td className="p-3 border">Write blog/README</td></tr>
            <tr><td className="p-3 border">Sun</td><td className="p-3 border">Rest</td><td className="p-3 border">Plan next week</td><td className="p-3 border">GitHub push</td></tr>
          </tbody>
        </table>
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl mt-6">
          <h3 className="text-xl font-black mb-2">Must Do</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Target: 4-6 focused hours per day. 'Focused' means: phone in another room, website blocker on, Pomodoro timer running. Track hours. Aim for 150+ hours per month.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-black mb-4">Study Principles</h3>
          <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Build something every week — passive reading does not wire your brain. Code does.</li>
            <li>Struggle is the signal. If it feels easy, you are not at the edge of your growth.</li>
            <li>Solve 1 DSA problem every single day from Week 1.</li>
            <li>Finish one resource completely before starting another.</li>
            <li>Teach what you learn — explain concepts out loud.</li>
          </ul>
        </div>
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
            <h3 className="text-xl font-black mb-2">When Stuck</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              When stuck for &gt;30 mins? (1) Re-read error. (2) Rubber-duck debug. (3) Search exact error. (4) Ask for help with minimal example. (5) Walk away for 20 mins.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
            <h3 className="text-xl font-black mb-2">PH Context</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Cost P0 to P5,000. Total investment: your time. No excuse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
