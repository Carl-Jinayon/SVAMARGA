const fs = require('fs');

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

const cs306_307 = `      {
        id: 'CS306',
        name: 'Production Engineering & Incident Response',
        hours: 50,
        duration: '4 weeks',
        difficulty: 'Intermediate',
        description: 'You can build a perfect system in isolation. Production breaks it in 10 minutes. Real engineers spend 40% of their time responding to incidents, debugging, and maintaining systems. This module teaches you how.',
        topics: ['Part 1: Observability', 'Part 2: Debugging Under Pressure', 'Part 3: Incident Response & Postmortems', 'Part 4: On-Call Practices', 'Part 5: Monitoring & Alerting'],
        subtopics: {
          'Part 1: Observability': [
            'Logs: Log levels, Structured logging, What (not) to log, Log retention',
            'Metrics: The Four Golden Signals (Latency, Traffic, Errors, Saturation)',
            'Tracing: End-to-end request flow, Distributed tracing, Sampling'
          ],
          'Part 2: Debugging Under Pressure': [
            'The SPOT method: Scope, Point of failure, Eliminate unknowns, Test & Fix',
            'Performance degradation without errors',
            'Intermittent failures, Data corruption',
            'Memory leaks and race conditions'
          ],
          'Part 3: Incident Response & Postmortems': [
            'Detection and Initial Response',
            'Triage and Mitigation',
            'Recovery & All-Clear',
            'Blameless postmortems'
          ],
          'Part 4: On-Call Practices': [
            'On-call rotation and SLA',
            'Runbooks and escalation paths',
            'On-call burnout prevention'
          ],
          'Part 5: Monitoring & Alerting': [
            'What to monitor (and what not to)',
            'Good vs bad alert criteria'
          ]
        },
        projects: [
          { name: 'Instrument a Production Service', description: 'Instrument your CS301 API', level: 'Adv', outcome: 'Add structured logging, metrics, distributed tracing, and Grafana dashboards' },
          { name: 'Simulate and Debug an Incident', description: 'With a friend, create and debug a bug', level: 'Adv', outcome: 'Use only production logs, metrics, and tracing to debug an issue in a timebox' },
          { name: 'Write a Postmortem', description: 'Write a blameless postmortem for a real or fictional incident', level: 'Int', outcome: 'Timeline, root cause, action items' }
        ],
        resources: [
          { name: 'Google SRE Book', type: 'Book', cost: 'Free', stars: 5, url: 'https://sre.google/sre-book/table-of-contents/', notes: 'Chapters on monitoring, incidents, postmortems' },
          { name: 'Release It!', type: 'Book', cost: 'Paid', stars: 5, notes: 'Anti-patterns that break systems' }
        ],
        commonMistakes: [
          'Logging too much (noise drowns signal) or too little (no audit trail)',
          'Setting noisy alerts that get ignored',
          'Blaming people instead of systems in postmortems',
          'Not having runbooks for common incidents'
        ],
        selfCheck: [
          'What are the four golden signals and why is p99 latency more important than average?',
          'You are paged at 2 AM. Error rate spiked. Walk me through your first 15 minutes.',
          'Write a blameless postmortem for user signup being slow for 2 hours.'
        ],
        whenStuck: 'If you cannot reproduce the bug locally, rely on logs and metrics. Reproduce -> Understand -> Fix -> Verify.'
      },
      {
        id: 'CS307',
        name: 'Legacy Code Mastery & Refactoring',
        hours: 40,
        duration: '3 weeks',
        difficulty: 'Intermediate',
        description: 'Real jobs consist of maintaining code you didn\\'t write, that was written in a rush, by people who left 2 years ago. This module teaches you how to read, understand, and safely refactor legacy code.',
        topics: ['Part 1: Reading Legacy Code', 'Part 2: Safe Refactoring Techniques', 'Part 3: Technical Debt', 'Part 4: Patterns in Legacy Code', 'Part 5: Team Workflow'],
        subtopics: {
          'Part 1: Reading Legacy Code': [
            'Draw a big picture diagram first',
            'Find the entry point and hotspots',
            'Write characterization tests'
          ],
          'Part 2: Safe Refactoring Techniques': [
            'Test before refactoring',
            'Rename, Extract Function, Extract Class',
            'Replace Conditional with Polymorphism'
          ],
          'Part 3: Technical Debt': [
            'Deliberate vs Accidental debt',
            'When to refactor vs rewrite',
            'Communicating technical debt to management'
          ],
          'Part 4: Patterns in Legacy Code': [
            'The God Object',
            'Duplicate Code and Long Functions',
            'Primitive Obsession and Magic Numbers',
            'Dead code'
          ],
          'Part 5: Team Workflow': [
            'Code review for refactoring',
            'Refactoring in large teams',
            'Measuring refactoring success'
          ]
        },
        projects: [
          { name: 'Refactor an Open-Source Project', description: 'Find a small open-source project and refactor it', level: 'Int', outcome: 'Create a PR fixing duplicate code, long functions, or dead code' },
          { name: 'Characterization Tests & Refactor', description: 'Take your messiest personal project and refactor it', level: 'Int', outcome: 'Write tests to capture behavior, refactor 3 issues, verify tests pass' }
        ],
        resources: [
          { name: 'Refactoring by Martin Fowler', type: 'Book', cost: 'Paid', stars: 5, notes: 'The definitive guide' },
          { name: 'Working Effectively with Legacy Code', type: 'Book', cost: 'Paid', stars: 5, notes: 'By Michael Feathers, strictly about this topic' }
        ],
        commonMistakes: [
          'Refactoring without tests',
          'Refactoring and adding features at the same time',
          'Trying to rewrite everything from scratch'
        ],
        selfCheck: [
          'Describe the steps you would take to understand an unfamiliar 5000-line codebase.',
          'What is a characterization test?',
          'You find duplicated validation logic in 3 places. Walk me through the refactoring.'
        ],
        whenStuck: 'If tests break while refactoring, revert immediately. Take smaller steps. Do not try to fix the test without understanding why it broke.'
      },`;

const cs502bc = `      {
        id: 'CS502B',
        name: 'Professional Dynamics & Working in Teams',
        hours: 40,
        duration: '3 weeks',
        difficulty: 'Intermediate',
        description: 'The top 0.1% engineers get things done through people. They navigate teams, resolve conflicts, communicate uncertainty, manage up, and build trust.',
        topics: ['Part 1: Your First 30 Days', 'Part 2: Receiving Critical Feedback', 'Part 3: Asking for Help', 'Part 4: Managing Up', 'Part 5: Conflict Resolution', 'Part 6: Saying No'],
        subtopics: {
          'Part 1: Your First 30 Days': [
            'Unwritten rules: Speak up early, assume best intent',
            'Build relationships before you need them',
            'Listen more than you talk in the first month',
            'Document what you learn'
          ],
          'Part 2: Receiving Critical Feedback': [
            'Receive -> Pause -> Respond framework',
            'Separate yourself from your code',
            'What NOT to say (excuses, defensiveness)'
          ],
          'Part 3: Asking for Help': [
            'The 30-minute rule',
            'How to ask: Context, What you tried, The exact error, Your hypothesis',
            'Public vs private asking'
          ],
          'Part 4: Managing Up': [
            '1-on-1s: You own the agenda',
            'Communicating status and uncertainty',
            'Proposing solutions, not just pointing out problems'
          ],
          'Part 5: Conflict Resolution': [
            'Technical disagreements (data wins)',
            'The "disagree and commit" philosophy',
            'Addressing toxic behavior properly'
          ],
          'Part 6: Saying No': [
            'How to say no respectfully (the "Yes, and" approach)',
            'Negotiating scope instead of rejecting tasks'
          ]
        },
        projects: [
          { name: '1-on-1 Agenda', description: 'Create an agenda for a 1-on-1 with a manager/mentor', level: 'Beg', outcome: 'Status update, blockers, career discussion' },
          { name: 'Feedback Response Practice', description: 'Write scripts for how to respond to harsh feedback', level: 'Int', outcome: 'Receive -> Pause -> Respond applied to real scenarios' }
        ],
        resources: [
          { name: 'Staff Engineer', type: 'Book', cost: 'Paid', stars: 5, notes: 'By Will Larson, great for understanding high-level team dynamics' },
          { name: 'Crucial Conversations', type: 'Book', cost: 'Paid', stars: 4, notes: 'Handling high-stakes disagreements' }
        ],
        commonMistakes: [
          'Getting defensive during code reviews',
          'Suffering in silence instead of asking for help',
          'Surprising your manager with bad news at the last minute'
        ],
        selfCheck: [
          'How do you properly ask a senior engineer for help?',
          'A teammate gives you harsh feedback on a PR. How do you respond?',
          'Your manager asks you to do a task that takes 2 weeks, but you only have 3 days. What do you say?'
        ],
        whenStuck: 'When dealing with people problems, always assume best intent first. Talk to people directly before escalating.'
      },
      {
        id: 'CS502C',
        name: 'Communication Mastery',
        hours: 20,
        duration: '2 weeks',
        difficulty: 'Intermediate',
        description: 'Writing and speaking clearly are force multipliers for your technical skills. This covers RFCs, bug reports, and presenting.',
        topics: ['Part 1: Writing Bug Reports & RFCs', 'Part 2: Code Comments', 'Part 3: Presenting to Audiences', 'Part 4: Public Speaking Anxiety'],
        subtopics: {
          'Part 1: Writing Bug Reports & RFCs': [
            'Bug reports: Context, steps to reproduce, expected vs actual behavior',
            'RFCs (Request for Comments): Proposing technical changes clearly'
          ],
          'Part 2: Code Comments': [
            'Why over What: explain the reason, not the action',
            'Docstrings and API documentation'
          ],
          'Part 3: Presenting to Audiences': [
            'Engineering audiences vs Management audiences vs Non-technical audiences',
            'Structuring a technical presentation'
          ],
          'Part 4: Public Speaking Anxiety': [
            'Preparation and practice techniques',
            'Handling Q&A'
          ]
        },
        projects: [
          { name: 'Write an RFC', description: 'Propose a major architectural change for an existing project', level: 'Int', outcome: 'Clear context, alternatives considered, proposed solution' },
          { name: 'Technical Presentation', description: 'Give a 10-minute presentation on a technical topic', level: 'Adv', outcome: 'Tailored for a specific audience (e.g., non-technical stakeholders)' }
        ],
        resources: [
          { name: 'On Writing Well', type: 'Book', cost: 'Paid', stars: 5, notes: 'By William Zinsser, classic on clear writing' }
        ],
        commonMistakes: [
          'Writing comments that just repeat what the code does',
          'Using too much jargon when speaking to non-technical people',
          'Writing bug reports without steps to reproduce'
        ],
        selfCheck: [
          'What makes a good code comment vs a bad one?',
          'How do you structure an RFC?',
          'How do you explain a database migration to a product manager?'
        ],
        whenStuck: 'If you cannot explain it simply, you do not understand it well enough. Write a draft, wait an hour, then edit for clarity.'
      },`;

const replace1 = "whenStuck: 'If a cloud deployment fails: check the logs first (CloudWatch/Cloud Logging). 90% of issues are: wrong IAM permissions, misconfigured security groups, or missing environment variables.'\\n      }\\n    ]";
content = content.replace(
  "whenStuck: 'If a cloud deployment fails: check the logs first (CloudWatch/Cloud Logging). 90% of issues are: wrong IAM permissions, misconfigured security groups, or missing environment variables.'\n      }\n    ]",
  "whenStuck: 'If a cloud deployment fails: check the logs first (CloudWatch/Cloud Logging). 90% of issues are: wrong IAM permissions, misconfigured security groups, or missing environment variables.'\n      },\n" + cs306_307 + "\n    ]"
);

content = content.replace(
  "whenStuck: 'Getting no callbacks? 90% of the time the problem is your resume or portfolio — not the market. Send your resume to 3 senior engineers you trust for brutally honest feedback.'\n      },\n    ]",
  "whenStuck: 'Getting no callbacks? 90% of the time the problem is your resume or portfolio — not the market. Send your resume to 3 senior engineers you trust for brutally honest feedback.'\n      },\n" + cs502bc + "\n    ]"
);

content = content.replace(
  "id: 3,\n    name: 'Backend & Cloud Engineering',\n    duration: '6-8 months',\n    hours: 640",
  "id: 3,\n    name: 'Backend & Cloud Engineering',\n    duration: '7-9 months',\n    hours: 730"
);

content = content.replace(
  "id: 5,\n    name: 'Career Preparation & Portfolio',\n    duration: '2-3 months',\n    hours: 240",
  "id: 5,\n    name: 'Career Preparation & Portfolio',\n    duration: '3-4 months',\n    hours: 300"
);

content = content.replace(
  "'Weeks 1-2: Python Basics': [\n            'Variables, data types",
  "'Weeks 1-2: Python Basics': [\n            'Debugger Basics: Learn pdb, set breakpoints, step through code',\n            'Variables, data types"
);

content = content.replace(
  "'Week 4: Functions': [",
  "'Week 4: Functions': [\n            'Debugging: Step through loops and function calls to watch variables change',"
);

content = content.replace(
  "'Week 6: OOP': [",
  "'Week 6: OOP': [\n            'Debugging OOP: Step through code to see object state and understand self',"
);

content = content.replace(
  "'Week 1: Big-O & Basic Structures': [",
  "'Week 1: Big-O & Basic Structures': [\n            'Debugging DSA: Use debugger instead of print() for tracking state of algorithms',"
);

content = content.replace(
  "'Week 1: Relational DBs & SQL': [",
  "'Week 1: Relational DBs & SQL': [\n            'Ethics & Privacy: Understand what data to store (and what NOT to store)',"
);

content = content.replace(
  "'Week 3: Advanced SQL & Optimization': [",
  "'Week 3: Advanced SQL & Optimization': [\n            'Privacy by Design: PII handling, GDPR basics (right to deletion, data access)',"
);

content = content.replace(
  "'Week 4: NoSQL & Caching': [",
  "'Week 4: NoSQL & Caching': [\n            'Security: Password hashing (bcrypt), never log passwords or store credit cards in plain text',"
);

content = content.replace(
  "'Week 2: Application Layer (HTTP, DNS)': [",
  "'Week 2: Application Layer (HTTP, DNS)': [\n            'Ethics Context: HTTPS/encryption protects user privacy',"
);

content = content.replace(
  "'Week 1: ML Fundamentals': [",
  "'Week 1: ML Fundamentals': [\n            'Debugging ML: Model not working? Systematically debug data distributions, outliers, leakage',"
);

content = content.replace(
  "'Week 1: ML Lifecycle & Tracking': [",
  "'Week 1: ML Lifecycle & Tracking': [\n            'Debugging in Production: Monitoring model drift and data validation',"
);

fs.writeFileSync('src/data/curriculum.ts', content, 'utf8');
console.log('Done');
