

export default function CurriculumGuide() {
  return (
    <div className="glass rounded-3xl p-8 sm:p-12 space-y-12">
      <div>
        <h2 className="text-2xl font-black tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
          How to Use This Curriculum
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          This is a complete, self-directed CS degree — structured like the best university programs but rebuilt around what actually makes you hireable. Version 3 adds 7 new subjects, estimated hours per subject, star-rated resources, common mistakes callouts, phase capstone projects, and salary negotiation scripts specific to the Philippines.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-black mb-4" style={{ color: 'var(--text-primary)' }}>
          Curriculum Overview
        </h3>
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border-subtle)' }}>
          <table className="w-full text-xs text-left">
            <thead>
              <tr style={{ background: 'var(--border-subtle)' }}>
                {['Ph', 'Name', 'Covers', 'Hours', 'Outcome'].map(h => (
                  <th key={h} className="px-4 py-3 font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'Foundations', 'Python, Math, Linux, Git, TypeScript', '520 hrs', 'Think like a programmer'],
                ['2', 'Core CS Mastery', 'DSA, OOP, Databases, Networks, App Security', '720 hrs', 'Think like a CS graduate'],
                ['3', 'Full-Stack Eng.', 'Backend, Frontend, Cloud, System Design, DevOps', '580 hrs', 'Build & ship products'],
                ['4', 'ML & AI Eng.', 'ML, Deep Learning, MLOps, LLMs, Data Viz, Data Eng.', '820 hrs', 'Become an ML Engineer'],
                ['5', 'Career Prep', 'Interviews, Portfolio, Negotiation', '200 hrs', 'Get hired at target salary'],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent', borderTop: '1px solid var(--border-subtle)' }}>
                  <td className="px-4 py-3 font-black" style={{ color: 'var(--accent-cyan)' }}>{row[0]}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-primary)' }}>{row[1]}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>{row[2]}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: 'var(--accent-violet)' }}>{row[3]}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          Visual Learning Roadmap
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
          Each phase depends on the previous. Never start Phase N+1 before Phase N is 80% complete.
        </p>
        
        <div className="space-y-3">
          {[
            { phase: '1 — Foundations (~520 hrs)', bg: 'rgba(0,229,255,0.05)', border: 'rgba(0,229,255,0.2)', color: 'var(--accent-cyan)', desc: 'CS101 Python → CS105 TypeScript → CS102 Math (parallel) → CS103 OS/Linux → CS104 Git & Tooling' },
            { phase: '2 — Core CS (~720 hrs)', bg: 'rgba(127,119,221,0.05)', border: 'rgba(127,119,221,0.2)', color: 'var(--accent-violet)', desc: 'CS201 DSA (ongoing) → CS202 OOP & Patterns → CS203 Databases → CS204 Networks → CS205 App Security' },
            { phase: '3 — Full-Stack (~580 hrs)', bg: 'rgba(236,72,153,0.05)', border: 'rgba(236,72,153,0.2)', color: '#EC4899', desc: 'CS301 Backend (FastAPI) → CS302 Frontend (React+TS) → CS305 Cloud (AWS/GCP) → CS303 System Design → CS304 DevOps' },
            { phase: '4 — ML & AI (~820 hrs)', bg: 'rgba(245,158,11,0.05)', border: 'rgba(245,158,11,0.2)', color: '#F59E0B', desc: 'CS401 ML Foundations → CS402 Deep Learning → CS403 MLOps+LLM → CS404 Specialization → CS405 Data Viz → CS406 Data Eng.' },
            { phase: '5 — Career (~200 hrs)', bg: 'rgba(29,158,117,0.05)', border: 'rgba(29,158,117,0.2)', color: 'var(--accent-teal)', desc: 'CS501 Technical Interviews (DSA + System Design) → CS502 Portfolio + Brand + Job Search + Negotiation' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl transition-all" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <h4 className="font-bold text-xs mb-1" style={{ color: item.color }}>Phase {item.phase}</h4>
              <p className="text-[11px] font-mono leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl mt-4" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
          <h4 className="text-sm font-black mb-2 flex items-center gap-2" style={{ color: '#F59E0B' }}>
            💡 Pro Tip
          </h4>
          <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            Parallel tracks you CAN run simultaneously: CS102 Math with CS101 Python. CS104 Git from week 1 of everything. CS105 TypeScript after Week 4 of CS101. CS205 Security after CS203 and CS204 are 50% done. CS303 System Design while finishing CS301 Backend. CS405 Data Viz while doing CS401 ML. Never skip dependencies.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          Daily & Weekly Schedule
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
          Protect these blocks like your most important meeting.
        </p>
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border-subtle)' }}>
          <table className="w-full text-xs text-left">
            <thead>
              <tr style={{ background: 'var(--border-subtle)' }}>
                {['Day', 'Block 1 (1–1.5 hr)', 'Block 2 (1.5–2 hr)', 'Block 3 (1–2 hr)'].map(h => (
                  <th key={h} className="px-4 py-3 font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Mon', 'DSA Practice', 'Subject Theory', 'Build / Project'],
                ['Tue', 'DSA Practice', 'Subject Theory', 'Build / Project'],
                ['Wed', 'DSA Practice', 'Review Notes', 'Mini project'],
                ['Thu', 'DSA Practice', 'Subject Theory', 'Build / Project'],
                ['Fri', 'DSA Practice', 'Subject Theory', 'Build / Project'],
                ['Sat', '2 LeetCode (harder)', 'Deep work', 'Write blog/README'],
                ['Sun', 'Rest', 'Plan next week', 'GitHub push'],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent', borderTop: '1px solid var(--border-subtle)' }}>
                  <td className="px-4 py-3 font-black" style={{ color: row[0] === 'Sun' ? '#EF4444' : 'var(--text-primary)' }}>{row[0]}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>{row[1]}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>{row[2]}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-5 rounded-xl mt-4" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <h3 className="text-sm font-black mb-2" style={{ color: '#EF4444' }}>Must Do</h3>
          <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Target: 4–6 focused hours per day. 'Focused' means: phone in another room, website blocker on, Pomodoro timer running. Track hours. Aim for 150+ hours per month.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}>
          <h3 className="text-sm font-black mb-4" style={{ color: 'var(--text-primary)' }}>Study Principles</h3>
          <ul className="space-y-3 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {[
              "Build something every week — passive reading does not wire your brain. Code does.",
              "Struggle is the signal. If it feels easy, you are not at the edge of your growth.",
              "Solve 1 DSA problem every single day from Week 1.",
              "Finish one resource completely before starting another.",
              "Teach what you learn — explain concepts out loud."
            ].map((p, i) => (
              <li key={i} className="flex gap-3">
                <span style={{ color: 'var(--accent-cyan)' }}>•</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(127,119,221,0.06)', border: '1px solid rgba(127,119,221,0.15)' }}>
            <h3 className="text-sm font-black mb-2" style={{ color: 'var(--accent-violet)' }}>When Stuck</h3>
            <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              When stuck for &gt;30 mins? (1) Re-read error. (2) Rubber-duck debug. (3) Search exact error. (4) Ask for help with minimal example. (5) Walk away for 20 mins.
            </p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'rgba(29,158,117,0.06)', border: '1px solid rgba(29,158,117,0.15)' }}>
            <h3 className="text-sm font-black mb-2" style={{ color: 'var(--accent-teal)' }}>PH Context</h3>
            <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Cost P0 to P5,000. Total investment: your time. No excuse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
