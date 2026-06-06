import CurriculumGuide from './CurriculumGuide';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function About() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-8"
    >
      <motion.div variants={itemVariants}>
        <CurriculumGuide />
      </motion.div>

      <motion.div variants={itemVariants} className="glass rounded-2xl p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            Philippines Tech Career Guide 2025
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            This section is specific to your context. Use the global curriculum above as your foundation. Use this as your local execution strategy.
          </p>
        </div>

        {/* Salary Table */}
        <div>
          <h3 className="text-base font-black mb-4" style={{ color: 'var(--text-primary)' }}>
            Salary Benchmarks — Metro Manila, 2025 Estimates
          </h3>
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-xs text-left">
              <thead>
                <tr style={{ background: 'var(--border-subtle)' }}>
                  {['Role', 'Local Company', 'Multinational PH', 'Remote USD/mo', 'Remote PHP equiv.'].map(h => (
                    <th key={h} className="px-4 py-3 font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Junior Dev (0–2 yrs)',    'P40–65K',   'P60–90K',   '$1,000–2,000', 'P57K–114K'],
                  ['Mid Dev (2–4 yrs)',        'P80–120K',  'P110–160K', '$2,500–4,500', 'P143K–257K'],
                  ['Senior Dev (4+ yrs)',      'P140–220K', 'P200–300K', '$5,000–9,000', 'P286K–514K'],
                  ['ML Engineer (entry)',      'P65–95K',   'P95–150K',  '$2,000–4,000', 'P114K–228K'],
                  ['ML Engineer (mid)',        'P120–180K', 'P170–250K', '$4,500–8,000', 'P257K–457K'],
                  ['Data Engineer (mid)',      'P110–160K', 'P150–220K', '$4,000–7,000', 'P228K–400K'],
                  ['Cloud/DevOps Eng. (mid)', 'P100–150K', 'P140–200K', '$3,500–7,000', 'P200K–400K'],
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0
                        ? 'rgba(0,0,0,0.02)'
                        : 'transparent',
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 font-medium" style={{ color: j === 3 ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PH Context */}
        <div className="rounded-xl p-5" style={{ background: 'rgba(127,119,221,0.06)', border: '1px solid rgba(127,119,221,0.15)' }}>
          <h3 className="text-sm font-black mb-2" style={{ color: 'var(--accent-violet)' }}>PH Context</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The fastest path to financial freedom in the Philippines tech industry: build strong fundamentals (Phases 1–3), then target remote international companies. A mid-level remote role at $3,500/month = P200,000+ — that is 2–3× the local rate for identical skills. Platforms: Toptal (highest bar, highest pay — apply after Phase 3), Andela, X-Team, Deel network, Remote.com, Upwork (freelancing to build remote track record). The certification that unlocks remote roles fastest: AWS Solutions Architect Associate.
          </p>
        </div>

        {/* Final Words */}
        <div className="space-y-5">
          <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Final Words</h3>
          {[
            "You started this journey saying you regret not going to a prestigious university. Here is the truth no one tells you: the school on your diploma matters far less than what you have built and what you can demonstrate under pressure. The engineers who change the world — and the ones who earn the most — got there by building obsessively, not by attending the right lectures.",
            "This curriculum is the equivalent of — and in several areas exceeds — what is taught in the top CS programs in the Philippines and the world. The only difference is that no one will push you. No grades, no deadlines imposed from outside, no classmates to keep pace with. Only you and the editor and the compiler and the error message.",
            "You mentioned you can solve 800-rated problems on Codeforces. That is a real foundation — not nothing. By the time you finish Phase 2 of this curriculum, 1400 will feel like 800 feels today. By Phase 5, you will solve problems in interviews that you currently cannot imagine solving.",
            "The gap between where you are and where you want to be is not talent. It is not school prestige. It is not connections. It is hours of focused work — accumulated, compounding, irreversible. Start Phase 1 today. Code every day. Build every week. Ship every month. Write about what you learn. In two years, you will not recognize your own capabilities.",
          ].map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Must Do */}
        <div className="rounded-xl p-5" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
          <h3 className="text-sm font-black mb-2" style={{ color: '#F59E0B' }}>Must Do</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The most important habit in this entire curriculum: open your code editor before you open any other application every morning. Even for 15 minutes. Even if nothing works. The discipline of showing up is the skill that compounds the fastest.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
