import { Phase } from '../types/index';

export const curriculum: Phase[] = [
  {
    id: 1,
    name: 'Foundations',
    duration: '4-6 months',
    hours: 520,
    color: '#3b82f6',
    description: 'Build the bedrock. Every concept in this curriculum depends on what you learn here.',
    mustComplete: ['CS101 Python (all 8 weeks)', 'CS102 Math Part 1 & 3', 'CS104 Git & Tooling', 'CS105 TypeScript basics'],
    niceToHave: ['CS102 Calculus (delay to Phase 4)', 'CS103 deep OS internals'],
    interviewHabit: 'From Week 1: solve 1 easy LeetCode problem every day. Don\'t skip. Even if you only understand the solution after — that\'s fine. Log it.',
    capstone: {
      name: 'Type-Safe Study Tracker',
      description: 'Build a fully type-safe Python + TypeScript CLI productivity app: a personal study tracker that logs your daily study sessions, LeetCode problems solved, and generates a weekly report.',
      requirements: [
        'Backend: Python with type hints and Pydantic.',
        'CLI: TypeScript with strict mode.',
        'Data: JSON files with versioned schema.',
        'Push to GitHub with professional README and commit history.'
      ]
    },
    subjects: [
      {
        id: 'CS101',
        name: 'Programming Fundamentals with Python',
        hours: 160,
        duration: '8 weeks',
        difficulty: 'Beginner',
        description: 'Python is your first real weapon. Don\'t rush this. Most self-taught developers skip fundamentals and spend the next 2 years patching holes. Every exercise matters.',
        topics: ['Weeks 1-2: Python Basics', 'Week 3: Control Flow', 'Week 4: Functions', 'Week 5: Data Structures', 'Week 6: OOP', 'Week 7: File I/O & Error Handling', 'Week 8: Modules & Standard Library'],
        subtopics: {
          'Weeks 1-2: Python Basics': [
            'Variables, data types: int, float, str, bool, None',
            'Arithmetic, comparison, logical, bitwise operators',
            'print(), input(), f-strings, format()',
            'Type casting and type checking',
            'PEP 8 style guide — write clean code from day one'
          ],
          'Week 3: Control Flow': [
            'if/elif/else — conditionals',
            'while loops — condition-based iteration',
            'for loops — iterating over sequences',
            'break, continue, pass',
            'range() and loop patterns — very common in interviews'
          ],
          'Week 4: Functions': [
            'Defining and calling functions',
            'Parameters, default arguments, *args, **kwargs',
            'Return values',
            'Scope: local vs global',
            'Recursion: base case + recursive case',
            'Lambda, map(), filter()'
          ],
          'Week 5: Data Structures': [
            'Lists: indexing, slicing, list comprehensions',
            'Tuples: immutability, packing/unpacking',
            'Dictionaries: key-value, nested, dict comprehensions',
            'Sets: union, intersection, difference',
            'When to use which — this question comes up in interviews'
          ],
          'Week 6: OOP': [
            'Classes and objects',
            'Instance attributes, class attributes, methods',
            '__init__, __str__, __repr__',
            'Encapsulation, Inheritance (super()), Polymorphism',
            'Abstract base classes (abc module)'
          ],
          'Week 7: File I/O & Error Handling': [
            'Reading/writing text files',
            'CSV, JSON handling',
            'try/except/else/finally — never let programs crash silently',
            'Raising custom exceptions',
            'Context managers: with statement'
          ],
          'Week 8: Modules & Standard Library': [
            'import, from, as',
            'os, sys, pathlib',
            'math, random, datetime',
            'collections: Counter, defaultdict, deque',
            'Creating your own modules and packages'
          ],
        },
        projects: [
          { name: 'CLI Calculator', description: 'Terminal calculator with full error handling', level: 'Beg', outcome: 'Handles divide-by-zero, invalid input, history of last 10 calculations saved to file' },
          { name: 'Contact Book', description: 'Add/search/delete contacts saved to JSON', level: 'Beg', outcome: 'Search by partial name, validates phone format, handles missing file gracefully' },
          { name: 'Grade Tracker', description: 'Store student grades, compute averages, letter grades', level: 'Beg', outcome: 'Multiple subjects, GWA computation, export to CSV, full CLI menu' },
          { name: 'Number Guessing Game', description: 'Binary-search-style guessing with score history', level: 'Beg', outcome: 'Tracks best/worst score, average guesses per session, difficulty levels' },
        ],
        resources: [
          { name: 'Automate the Boring Stuff', type: 'Book', cost: 'Free', stars: 5, url: 'https://automatetheboringstuff.com', notes: 'Best free Python intro, do every exercise' },
          { name: 'CS50P Harvard', type: 'Course', cost: 'Free', stars: 5, url: 'https://cs50.harvard.edu/python', notes: 'Best produced free Python course, high quality video + exercises' },
          { name: 'Python Crash Course', type: 'Book', cost: 'Paid', stars: 4, notes: 'Eric Matthes — most beginner-friendly printed Python book' },
          { name: 'HackerRank Python', type: 'Platform', cost: 'Free', stars: 4, url: 'https://hackerrank.com', notes: 'Complete all Easy problems in the Python domain — good drill' },
        ],
        commonMistakes: [
          'Skipping exercises and just reading — reading is not learning, building is',
          'Not using a virtual environment from day one',
          'Ignoring PEP 8 — bad habits formed here are hard to break later',
          'Copy-pasting solutions without understanding them line by line'
        ],
        selfCheck: [
          'Can you write a class with inheritance without looking it up?',
          'Can you read a JSON file, modify it, and write it back?',
          'Can you explain the difference between a list and a tuple?',
          'Can you write a recursive function with a base case and test it?',
          'Can you explain what a decorator does before you\'ve studied them formally?'
        ],
        whenStuck: 'Stuck on OOP: forget classes for a day. Write 10 small functions that work together. Then ask: how do I group this data and behavior? That group is a class.'
      },
      {
        id: 'CS102',
        name: 'Mathematics for Computer Science',
        hours: 120,
        duration: '10 weeks',
        difficulty: 'Intermediate',
        description: 'You said you have good logic. This is where it proves itself. Math is not memorization — it is precise reasoning. Focus on intuition first, formulas second.',
        topics: ['Part 1: Discrete Math', 'Part 2: Combinatorics & Probability', 'Part 3: Linear Algebra (Critical for ML)', 'Part 4: Calculus for ML', 'Part 5: Graph Theory'],
        subtopics: {
          'Part 1: Discrete Math': [
            'Logic: propositions, truth tables, logical equivalence',
            'Proof techniques: direct, contradiction, mathematical induction',
            'Set theory: sets, subsets, power sets, Cartesian products',
            'Relations and functions: injective, surjective, bijective',
            'Sequences, summations, Big-O notation intro'
          ],
          'Part 2: Combinatorics & Probability': [
            'Counting: rule of sum, rule of product',
            'Permutations and combinations',
            'Pigeonhole principle — surprisingly useful in interviews',
            'Basic probability, conditional probability',
            'Bayes\' theorem — essential for ML',
            'Expected value and variance'
          ],
          'Part 3: Linear Algebra (Critical for ML)': [
            'Vectors: dot product, magnitude, unit vectors, projections',
            'Matrices: add, multiply, transpose, inverse',
            'Determinants and geometric meaning',
            'Linear transformations',
            'Eigenvalues and eigenvectors — core to PCA, PageRank',
            'Systems of equations: Gaussian elimination'
          ],
          'Part 4: Calculus for ML': [
            'Derivatives: rules, chain rule',
            'Partial derivatives — functions of multiple variables',
            'Gradient: direction of steepest ascent',
            'Gradient descent — the optimizer behind every neural network',
            'Integration basics, probability distributions (normal, uniform, Bernoulli)'
          ],
          'Part 5: Graph Theory': [
            'Graphs: vertices, edges, directed vs undirected',
            'Adjacency matrix and adjacency list',
            'BFS and DFS (preview of DSA)',
            'Trees, spanning trees, minimum spanning trees',
            'Applications: maps, compilers, social networks, dependency resolution'
          ],
        },
        projects: [
          { name: 'Gaussian Elimination', description: 'Implement from scratch in Python', level: 'Int', outcome: 'Handles any n x n matrix, detects no-solution and infinite-solutions cases' },
          { name: 'Gradient Descent Visualizer', description: 'Plot gradient descent on a 2D function', level: 'Int', outcome: 'Shows learning rate effects, convergence, animation with matplotlib' },
          { name: 'Truth Table Generator', description: 'Generate truth tables for any logical formula', level: 'Int', outcome: 'Parses expression string, handles AND/OR/NOT/XOR/IMPLIES operators' },
          { name: 'Probability Simulator', description: 'Monte Carlo simulation of dice/coin/card problems', level: 'Beg', outcome: 'Compares simulated vs theoretical probability across 1M trials' },
        ],
        resources: [
          { name: 'MIT 6.042J', type: 'Course', cost: 'Free', stars: 5, url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010', notes: 'Math for CS on MIT OCW — includes problem sets, best free resource' },
          { name: '3Blue1Brown Linear Algebra', type: 'Video', cost: 'Free', stars: 5, url: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', notes: 'Essence of Linear Algebra — best visual intuition available anywhere' },
          { name: 'Math for ML (Deisenroth)', type: 'Book', cost: 'Free', stars: 5, notes: 'Free PDF, directly tied to ML — use as your reference' },
          { name: 'Khan Academy Calculus', type: 'Course', cost: 'Free', stars: 4, url: 'https://khanacademy.org', notes: 'Multivariable calculus — go at your own pace, good for Part 4' },
        ],
        commonMistakes: [
          'Treating math as memorization — understand WHY each formula is true',
          'Skipping proofs — proofs train the exact logical thinking CS needs',
          'Not connecting math to code — always implement what you learn in numpy',
          'Doing Part 4 (Calculus) before the ML phase — delay it until you need it'
        ],
        selfCheck: [
          'Can you explain what an eigenvector is geometrically — no formula?',
          'Can you derive gradient descent from first principles on paper?',
          'Can you prove by induction that sum 1..n = n(n+1)/2?',
          'Can you explain Bayes\' theorem with a spam filter example?',
          'Can you compute a matrix inverse by hand for a 2x2 matrix?'
        ],
        whenStuck: 'If linear algebra feels abstract: open numpy and experiment. np.dot(), np.linalg.eig(). Seeing real numbers transform makes the theory click immediately.'
      },
      {
        id: 'CS103',
        name: 'Computer Architecture & Operating Systems',
        hours: 80,
        duration: '6 weeks',
        difficulty: 'Intermediate',
        description: 'To write fast code, you must understand the machine it runs on. This answers: why is Python slow? What actually happens when you type python script.py? Why does RAM size matter?',
        topics: ['Part 1: How Computers Work', 'Part 2: OS Fundamentals', 'Part 3: Linux Mastery'],
        subtopics: {
          'Part 1: How Computers Work': [
            'Binary, hexadecimal, two\'s complement arithmetic',
            'Boolean logic: AND, OR, NOT, XOR — these ARE the computer',
            'CPU: ALU, control unit, registers, clock cycles',
            'Memory hierarchy: registers > L1/L2 cache > RAM > disk — speeds matter',
            'Von Neumann architecture',
            'Instruction cycle: fetch, decode, execute'
          ],
          'Part 2: OS Fundamentals': [
            'What an OS does: abstraction and resource management',
            'Processes vs threads — critical for ML serving and backend',
            'Process lifecycle and scheduling: FCFS, SJF, Round Robin',
            'Concurrency: race conditions, deadlocks — how to spot them',
            'Synchronization: mutex, semaphores, condition variables',
            'Memory management: paging, virtual memory, page faults',
            'File systems: inodes, directories, FAT vs ext4 vs APFS'
          ],
          'Part 3: Linux Mastery': [
            'Navigation: ls, cd, pwd, find, locate, tree',
            'File ops: cp, mv, rm, mkdir, touch, ln, chmod, chown',
            'Process control: ps, top, htop, kill, jobs, &, nohup',
            'Text processing: grep, awk, sed, cut, sort, uniq, wc, tr',
            'Pipes and redirection: |, >, >>, <, 2>&1, tee',
            'Shell scripting: variables, loops, if/elif, functions, $?, set -e',
            'SSH, SCP, rsync, tmux, screen — essential for cloud server work',
            'cron: scheduling automated tasks'
          ],
        },
        projects: [
          { name: 'Backup Shell Script', description: 'Auto-backup a folder with timestamp and log', level: 'Int', outcome: 'Handles errors, sends desktop notification, runs via cron, rotates old backups' },
          { name: 'Process Scheduler Sim', description: 'Simulate Round Robin + SJF in Python', level: 'Int', outcome: 'Visual Gantt chart output, compare wait times across algorithms' },
          { name: '/proc Explorer', description: 'Python system monitor reading from /proc', level: 'Int', outcome: 'Displays CPU, memory, top processes — refreshes every second' },
        ],
        resources: [
          { name: 'The Linux Command Line', type: 'Book', cost: 'Free', stars: 5, url: 'https://linuxcommand.org', notes: 'shotts.us — free online, the definitive guide, do every exercise' },
          { name: 'OSTep', type: 'Book', cost: 'Free', stars: 5, url: 'https://ostep.org', notes: 'Operating Systems: Three Easy Pieces — free PDF, best OS textbook' },
          { name: 'Nand2Tetris Part 1', type: 'Course', cost: 'Free', stars: 5, url: 'https://nand2tetris.org', notes: 'Build a computer from NAND gates — mindblowing, fully free' },
          { name: 'CS:APP (Bryant)', type: 'Book', cost: 'Paid', stars: 4, notes: 'CMU\'s Computer Systems — most thorough resource, use as reference' },
        ],
        commonMistakes: [
          'Reading about Linux without actually using it — you must practice in a real terminal',
          'Not setting up WSL2 or a VM — there is no substitute for a real Linux environment',
          'Memorizing commands without understanding what they do',
          'Skipping the shell scripting section — every DevOps and MLOps role needs this'
        ],
        selfCheck: [
          'Can you explain what happens between typing a URL and seeing a webpage (OS layer only)?',
          'Can you write a shell script with a loop, conditional, and function from memory?',
          'Can you explain virtual memory to a 10-year-old?',
          'Can you describe a deadlock with a real-world analogy?',
          'Can you find the PID of a process and kill it from the command line?'
        ],
        whenStuck: 'Install Ubuntu on VirtualBox or enable WSL2 on Windows. Every Linux topic must be practiced in a real terminal. Reading commands without typing them is useless.'
      },
      {
        id: 'CS104',
        name: 'Version Control & Developer Tooling',
        hours: 30,
        duration: '2 weeks',
        difficulty: 'Beginner',
        description: 'Git is used every single day in every software job on the planet. Start using it on every project you build from this moment forward. Your GitHub commit history is part of your resume.',
        topics: ['Git Essentials', 'GitHub & Professional Workflow', 'Dev Environment Setup'],
        subtopics: {
          'Git Essentials': [
            'init, clone, status, add, commit, push, pull, fetch',
            'Branches: create, switch, merge, delete, rename',
            'Merge conflicts: understanding, resolving, preventing — don\'t fear them',
            'git log, diff, stash, reset --soft/--hard, revert, clean',
            'git reflog — your time machine for recovering anything',
            'Rebase vs merge: interactive rebase, squash commits',
            'Tags and semantic releases'
          ],
          'GitHub & Professional Workflow': [
            '.gitignore — create this before your first commit, always',
            'Pull requests: writing good PR descriptions, requesting reviews',
            'Code review: giving and receiving feedback professionally',
            'GitHub Actions intro: CI/CD preview, running tests on push',
            'Conventional commits: feat:, fix:, docs:, chore:, refactor:, test:',
            'Semantic versioning: MAJOR.MINOR.PATCH and why it matters',
            'GitHub Projects: basic kanban for solo and team work'
          ],
          'Dev Environment Setup': [
            'VS Code: Pylance, GitLens, Prettier, ESLint, Docker, REST Client',
            'Python: venv, pip, requirements.txt, pip freeze, pip-tools',
            'pyproject.toml and modern Python packaging',
            'Linters: flake8, pylint, ruff (fastest)',
            'Formatters: black (Python), prettier (JS/TS)',
            'Pre-commit hooks: auto-format and lint before every commit',
            'Debugging: breakpoints, watch expressions, call stack, conditional breakpoints'
          ],
        },
        projects: [
          { name: 'GitHub Portfolio Setup', description: 'Push all Phase 1 projects to GitHub with proper READMEs', level: 'Beg', outcome: 'Each repo: clear README with screenshots, .gitignore, descriptive commits, live demo link' },
          { name: 'Conflict Resolution', description: 'Simulate and fully resolve a 3-way merge conflict', level: 'Beg', outcome: 'Two branches with conflicting changes, resolved cleanly, documented in README' },
        ],
        resources: [
          { name: 'Learn Git Branching', type: 'Interactive', cost: 'Free', stars: 5, url: 'https://learngitbranching.js.org', notes: 'Gamified Git — complete every level, best interactive Git learning' },
          { name: 'Pro Git Book', type: 'Book', cost: 'Free', stars: 5, url: 'https://git-scm.com/book', notes: 'git-scm.com/book — official, comprehensive, free, read chapters 1-5' },
          { name: 'Oh My Git!', type: 'Game', cost: 'Free', stars: 4, url: 'https://ohmygit.org', notes: 'Visual card game for Git — fun way to reinforce concepts' },
          { name: 'Conventional Commits', type: 'Docs', cost: 'Free', stars: 4, url: 'https://conventionalcommits.org', notes: 'conventionalcommits.org — the spec, short and worth reading fully' },
        ],
        commonMistakes: [
          'Committing directly to main — use branches for everything from day one',
          'Writing vague commit messages like \'fix stuff\' or \'update\'',
          'Not using .gitignore — committing secrets, venv folders, __pycache__',
          'Treating GitHub as a backup service rather than a collaboration tool'
        ],
        selfCheck: [
          'Can you recover a deleted commit using git reflog?',
          'Can you explain the difference between git rebase and git merge and when to use each?',
          'Can you set up a Python virtual environment, install packages, and freeze dependencies?',
          'Can you write a pre-commit hook that runs black before every commit?'
        ],
        whenStuck: 'If you break a git repo: search the EXACT error message. Almost every git problem has a Stack Overflow answer. git reflog shows every action — you can always recover.'
      },
      {
        id: 'CS105',
        name: 'TypeScript & Type-Safe Development',
        hours: 45,
        duration: '3 weeks',
        difficulty: 'Beginner',
        description: 'TypeScript is no longer optional. Every serious frontend and backend role in 2025 expects it. Learning it now — before JavaScript habits are set — is far easier than retrofitting it later. Think of it as Python\'s type hints but for JavaScript.',
        topics: ['TypeScript Fundamentals', 'Intermediate TypeScript', 'TypeScript in Practice'],
        subtopics: {
          'TypeScript Fundamentals': [
            'Why TypeScript: catches entire categories of bugs before runtime',
            'Installing TypeScript: tsc, ts-node, tsconfig.json basics',
            'Primitive types: string, number, boolean, null, undefined, symbol',
            'Type annotations: explicit vs inferred — TypeScript is smart',
            'Arrays and tuples: string[], [string, number]',
            'Objects and type aliases: type User = { name: string; age: number }',
            'Union types: string | number — a value can be one of several types',
            'Intersection types: combining types with &',
            'Literal types: type Direction = \'left\' | \'right\' | \'up\' | \'down\''
          ],
          'Intermediate TypeScript': [
            'Interfaces vs type aliases — when to use each',
            'Optional properties: name?: string',
            'Readonly: readonly id: number — prevents mutation',
            'Generics: function identity(x: T): T — write once, use for any type',
            'Generic constraints: extending interfaces',
            'Utility types: Partial, Required, Pick, Omit, Record',
            'Enums: const enums for performance',
            'Type narrowing: typeof, instanceof, in operator, discriminated unions',
            'Never type: exhaustive type checking'
          ],
          'TypeScript in Practice': [
            'Strict mode: always enable it — \'strict\': true in tsconfig',
            'Type assertions: as Type — use sparingly',
            'Type guards: custom is Type functions',
            'Module system: import/export with types',
            'Declaration files: .d.ts — how to type third-party libraries',
            'tsconfig.json: target, lib, paths, baseUrl',
            'ESLint with TypeScript: @typescript-eslint/recommended',
            'Migrating JS to TS: --allowJs, gradual migration strategy'
          ],
        },
        projects: [
          { name: 'Type-Safe CLI Tool', description: 'Rewrite CS101 grade tracker in TypeScript', level: 'Beg', outcome: 'Full strict mode, no any types, proper interfaces for all data shapes' },
          { name: 'TS Utility Library', description: 'Build a typed utility library with generics', level: 'Int', outcome: '10+ generic functions, 100% type coverage, published as npm package' },
        ],
        resources: [
          { name: 'TypeScript Handbook', type: 'Docs', cost: 'Free', stars: 5, url: 'https://typescriptlang.org/docs', notes: 'typescriptlang.org/docs — official, comprehensive, read the whole thing' },
          { name: 'Total TypeScript', type: 'Course', cost: 'Mixed', stars: 5, url: 'https://totaltypescript.com', notes: 'Best TypeScript course — free beginner section is excellent' },
          { name: 'TypeScript Deep Dive', type: 'Book', cost: 'Free', stars: 4, url: 'https://basarat.gitbook.io', notes: 'basarat.gitbook.io — free, thorough, practical examples' },
          { name: 'Execute Program TS', type: 'Interactive', cost: 'Paid', stars: 4, notes: 'Spaced repetition TypeScript exercises — very effective learning' },
        ],
        commonMistakes: [
          'Using any everywhere — it defeats the entire purpose of TypeScript',
          'Ignoring TypeScript errors with @ts-ignore instead of fixing them',
          'Not enabling strict mode — it catches the bugs that matter most',
          'Learning TS without learning JS first — understand the runtime first'
        ],
        selfCheck: [
          'Can you explain the difference between an interface and a type alias?',
          'Can you write a generic function that works on any array type?',
          'Can you use discriminated unions to handle different response shapes?',
          'Can you configure tsconfig.json strict mode and explain what each option does?',
          'Can you narrow a union type using a custom type guard?'
        ],
        whenStuck: 'If a TypeScript error confuses you: copy the exact error into the TypeScript playground (typescriptlang.org/play) and simplify until you understand it. The playground shows types live.'
      },
    ],
  },
  {
    id: 2,
    name: 'Core CS Mastery',
    duration: '7-9 months',
    hours: 720,
    color: '#8b5cf6',
    description: 'This is where real engineers are forged. Difficulty spikes here. Embrace the struggle.',
    mustComplete: ['CS201 DSA (all modules — no shortcuts)', 'CS203 SQL & databases', 'CS202 OOP Design Patterns', 'CS205 Application Security basics'],
    niceToHave: ['CS204 full network stack — understand TCP/HTTP, skip deep theory initially'],
    interviewHabit: 'From Phase 2: do 1 Codeforces contest per week. Start with Div 3. Track your rating. Also: do one 30-min mock interview with a friend each month — just talking through a problem out loud.',
    capstone: {
      name: 'Secure Financial API',
      description: 'Build a secure, production-quality REST API for a personal finance tracker: users, transactions, categories, monthly reports.',
      requirements: [
        'Parameterized queries only, bcrypt passwords, JWT with refresh tokens.',
        'Rate limiting, CSRF protection, secure headers, input validation.',
        'Dependency scan in CI, EXPLAIN ANALYZE on every query.',
        'Redis caching, full OWASP audit documented.'
      ]
    },
    subjects: [
      {
        id: 'CS201',
        name: 'Data Structures & Algorithms',
        hours: 320,
        duration: '16 weeks',
        difficulty: 'Hard',
        description: 'DSA is the most important subject in this entire curriculum. Every major tech company interviews on this. Pattern recognition is the secret.',
        topics: ['Module 1: Complexity Analysis', 'Module 2: Arrays & Strings', 'Module 3: Linked Lists', 'Module 4: Stacks & Queues', 'Module 5: Trees', 'Module 6: Hash Tables', 'Module 7: Graphs', 'Module 8: Sorting & Searching', 'Module 9: Dynamic Programming'],
        subtopics: {
          'Module 1: Complexity Analysis': [
            'Big-O: O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n)',
            'Big-Omega and Big-Theta — lower and tight bounds',
            'Time complexity vs space complexity — always analyze both',
            'Best / average / worst case — interviewers ask this',
            'Analyzing loops, nested loops, recursion trees',
            'Amortized analysis: dynamic array resizing example'
          ],
          'Module 2: Arrays & Strings': [
            'Static vs dynamic arrays, memory layout in RAM',
            'Two-pointer technique — one of the 10 patterns you must master',
            'Sliding window — fixed size and variable size variants',
            'Prefix sums and difference arrays — O(n) range queries',
            'Kadane\'s algorithm — max subarray in O(n)',
            'String matching: naive O(nm), KMP O(n+m)',
            'Rabin-Karp rolling hash for pattern matching'
          ],
          'Module 3: Linked Lists': [
            'Singly, doubly, circular — implement all from scratch',
            'Fast/slow pointer — Floyd\'s cycle detection algorithm',
            'Reversing iteratively and recursively — both ways',
            'Merging two sorted linked lists — classic interview problem',
            'Finding middle node, kth from end in one pass'
          ],
          'Module 4: Stacks & Queues': [
            'Stack LIFO: push/pop/peek — array and linked list implementations',
            'Queue FIFO: enqueue/dequeue — circular array implementation',
            'Deque: double-ended queue — used in sliding window maximum',
            'Monotonic stack — CRUCIAL: next greater element, histogram',
            'Priority Queue / Heap: insert O(log n), extract-min O(log n)',
            'Applications: expression evaluation, BFS, undo/redo, task scheduling'
          ],
          'Module 5: Trees': [
            'Binary trees: height, diameter, balance, complete vs full vs perfect',
            'Traversals: inorder, preorder, postorder, level-order (BFS)',
            'Binary Search Tree: insert O(h), search O(h), delete O(h)',
            'BST balancing concepts: AVL rotations, Red-Black tree properties',
            'Heaps: max-heap, min-heap, heapify O(n), heap sort O(n log n)',
            'Trie: prefix tree — autocomplete, word search, IP routing',
            'Segment tree: range sum/min/max queries O(log n)'
          ],
          'Module 6: Hash Tables': [
            'Hash functions: uniform distribution, avalanche effect',
            'Collision resolution: chaining (linked lists) vs open addressing (probing)',
            'Load factor: when to resize, why 0.75 is common threshold',
            'HashMap vs HashSet: when each is appropriate',
            'Two-sum pattern: the most common interview question family',
            'Rolling hash: Rabin-Karp, substring matching'
          ],
          'Module 7: Graphs': [
            'Representations: adjacency matrix O(V^2) vs adjacency list O(V+E)',
            'BFS: shortest path in unweighted graph, level-order traversal',
            'DFS: connected components, cycle detection, topological sort',
            'Dijkstra: shortest path weighted graph, priority queue, O((V+E) log V)',
            'Bellman-Ford: handles negative weights, detects negative cycles O(VE)',
            'Floyd-Warshall: all-pairs shortest path O(V^3)',
            'Kruskal\'s MST: sort edges + union-find O(E log E)',
            'Prim\'s MST: greedy + priority queue O((V+E) log V)',
            'Union-Find (DSU): path compression + union by rank — nearly O(1)'
          ],
          'Module 8: Sorting & Searching': [
            'Bubble, selection, insertion: O(n^2) — know when each is actually useful',
            'Merge sort: stable, O(n log n), extra space — the divide-and-conquer archetype',
            'Quick sort: in-place, O(n log n) average, O(n^2) worst — how to avoid worst case',
            'Heap sort: in-place, O(n log n), not stable',
            'Counting sort: O(n+k), non-comparison, integers only',
            'Radix sort: O(nk), stable, faster than comparison sort for integers',
            'Binary search: 6 variants — find first/last occurrence, rotated array, answer-search'
          ],
          'Module 9: Dynamic Programming': [
            'DP definition: overlapping subproblems + optimal substructure',
            'Step 1: identify the decision at each step',
            'Step 2: define state — what information do you need to make the decision?',
            'Step 3: write recurrence relation — how does current state depend on previous?',
            'Step 4: memoization (top-down) or tabulation (bottom-up)',
            'Classic 1D DP: Fibonacci, climbing stairs, house robber, coin change',
            'Classic 2D DP: grid paths, LCS, LIS, edit distance, knapsack',
            'DP on trees: diameter, path sum, subtree problems',
            'Interval DP: matrix chain multiplication, burst balloons',
            'Backtracking: N-Queens, subsets, permutations, combination sum, sudoku'
          ],
        },
        projects: [
          { name: 'DSA Library', description: 'Implement every data structure from scratch', level: 'Adv', outcome: 'Clean API, docstrings, time/space complexity in docs, full pytest test suite' },
          { name: 'NeetCode 150', description: 'Complete problem set', level: 'Adv', outcome: 'All solved, patterns labeled, time/space complexity documented for each' },
          { name: 'Codeforces 100+', description: 'Solve 100+ problems rated 800-1300', level: 'Adv', outcome: 'At least 30 at 1200+ rating, participate in 10+ Div 3 contests' },
          { name: 'DP Visualizer', description: 'Terminal visualization', level: 'Adv', outcome: 'Supports knapsack, LCS, edit distance — shows table step by step with colors' },
        ],
        resources: [
          { name: 'neetcode.io', type: 'Platform', cost: 'Free', stars: 5, url: 'https://neetcode.io', notes: 'Best organized roadmap + video explanations — use as your primary resource' },
          { name: 'MIT 6.006', type: 'Course', cost: 'Free', stars: 5, url: 'https://youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb', notes: 'Best algorithmic thinking course — watch lectures, do problem sets' },
          { name: 'CP Handbook', type: 'Book', cost: 'Free', stars: 5, url: 'https://cses.fi/book/book.pdf', notes: 'Competitive Programmer\'s Handbook — free PDF, best CP reference' },
          { name: 'CLRS (Algorithms)', type: 'Book', cost: 'Paid', stars: 4, notes: 'The bible of DSA — use as reference, not cover to cover' },
          { name: 'Abdul Bari Algorithms', type: 'Video', cost: 'Free', stars: 4, url: 'https://youtube.com/@abdul_bari', notes: 'Excellent intuitive explanations, good supplement' },
        ],
        commonMistakes: [
          'Solving the same type of problem 50 times instead of 50 different patterns',
          'Looking at the solution after 5 minutes instead of struggling for 30',
          'Not analyzing time/space complexity after every problem — this is mandatory',
          'Grinding LeetCode without understanding patterns — patterns are the whole point',
          'Not doing timed practice — speed matters in real interviews'
        ],
        selfCheck: [
          'Can you implement a heap from scratch, including heapify, in under 20 minutes?',
          'Can you solve an unseen DP problem by deriving the recurrence relation from scratch?',
          'Can you explain Dijkstra vs Bellman-Ford — when each fails and why?',
          'Can you trace BFS and DFS on a graph with 8 nodes by hand in under 3 minutes?',
          'Can you solve a sliding window problem you\'ve never seen before in under 15 minutes?',
          'Can you explain union-find with path compression and why it\'s nearly O(1)?'
        ],
        whenStuck: 'Stuck on DP? Step back entirely. Ask: what decision am I making at each step? What information do I need to remember to make that decision? That information IS your state. Write the recurrence before writing any code.'
      },
      {
        id: 'CS202',
        name: 'Object-Oriented Design & Design Patterns',
        hours: 70,
        duration: '6 weeks',
        difficulty: 'Intermediate',
        description: 'Knowing how to code is not enough. Knowing how to DESIGN code is what separates junior from senior engineers.',
        topics: ['SOLID Principles', 'Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'UML & Code Modeling'],
        subtopics: {
          'SOLID Principles': [
            'S: Single Responsibility — one class, one reason to change',
            'O: Open/Closed — open for extension, closed for modification',
            'L: Liskov Substitution — subclasses must be substitutable',
            'I: Interface Segregation — don\'t force methods they don\'t need',
            'D: Dependency Inversion — depend on abstractions, not concretions'
          ],
          'Creational Patterns': [
            'Singleton: only one instance — use sparingly',
            'Factory Method: delegate object creation to subclasses',
            'Abstract Factory: create families of related objects',
            'Builder: construct complex objects step by step',
            'Prototype: clone an existing object'
          ],
          'Structural Patterns': [
            'Adapter: make incompatible interfaces work together',
            'Decorator: add behavior dynamically without inheritance',
            'Facade: simplified interface to a complex subsystem',
            'Proxy: control access to an object',
            'Composite: treat individual objects and compositions uniformly'
          ],
          'Behavioral Patterns': [
            'Observer: event system — subscribe and notify',
            'Strategy: swap algorithms at runtime',
            'Command: encapsulate a request as an object',
            'Iterator: sequential access without exposing internals',
            'State: change behavior when internal state changes',
            'Template Method: define skeleton, subclasses fill details'
          ],
          'UML & Code Modeling': [
            'Class diagrams: attributes, methods, relationships',
            'Sequence diagrams: object interaction over time',
            'When to draw diagrams vs when to just code'
          ]
        },
        projects: [
          { name: 'Refactor Grade Tracker', description: 'Apply SOLID principles', level: 'Int', outcome: 'Can add new grade types and export formats without touching existing classes' },
          { name: 'Plugin System', description: 'Extensible system using Strategy + Factory', level: 'Int', outcome: 'New plugins drop in as files — no core code modified, demonstrates OCP' },
          { name: 'Event System', description: 'Full pub/sub notification system', level: 'Int', outcome: 'Multiple listeners, event filtering, async support, dead letter queue for failures' },
        ],
        resources: [
          { name: 'refactoring.guru', type: 'Website', cost: 'Free', stars: 5, url: 'https://refactoring.guru', notes: 'Best visual pattern explanations with interactive examples — start here' },
          { name: 'Head First Design Patterns', type: 'Book', cost: 'Paid', stars: 5, notes: 'Most beginner-friendly treatment of patterns — highly recommended' },
          { name: 'Gang of Four (GoF)', type: 'Book', cost: 'Paid', stars: 3, notes: 'The original — dense but authoritative, use as reference after Head First' },
          { name: 'ArjanCodes YouTube', type: 'Video', cost: 'Free', stars: 4, url: 'https://youtube.com/@arjancodes', notes: 'Excellent Python-specific OOP and patterns — clean, modern code' },
        ],
        commonMistakes: [
          'Applying patterns everywhere — patterns solve specific problems, not all problems',
          'Learning pattern names without understanding the problem they solve',
          'Using inheritance when composition is more appropriate — prefer composition',
          'Thinking SOLID is rules to memorize rather than principles to internalize'
        ],
        selfCheck: [
          'Can you identify which SOLID principle a piece of code violates and explain why?',
          'Can you implement the Observer pattern from memory in under 15 minutes?',
          'Can you explain why Singleton is often called an anti-pattern in testable code?',
          'Can you draw a class diagram for a simple ride-sharing system from scratch?',
          'Can you explain the difference between Decorator and Inheritance with a concrete example?'
        ],
        whenStuck: 'Patterns are vocabulary for discussing solutions — not rules to impose. If applying a pattern makes your code more complex and harder to understand, don\'t use it. Simplicity beats cleverness.'
      },
      {
        id: 'CS203',
        name: 'Databases & SQL',
        hours: 80,
        duration: '6 weeks',
        difficulty: 'Intermediate',
        description: 'SQL is 50 years old and used in every company on the planet. Understanding databases deeply makes full-stack engineers truly effective.',
        topics: ['SQL Fundamentals', 'Database Design', 'NoSQL Databases', 'ORM & Database Integration'],
        subtopics: {
          'SQL Fundamentals': [
            'JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF',
            'GROUP BY, HAVING, aggregate functions (COUNT, SUM, etc.)',
            'Subqueries and correlated subqueries',
            'CTEs (Common Table Expressions) and Recursive CTEs',
            'Window functions: RANK, LAG, LEAD, PARTITION BY',
            'Transactions: BEGIN, COMMIT, ROLLBACK, ACID properties'
          ],
          'Database Design': [
            'Entity-Relationship (ER) diagrams — design first',
            'Normalization: 1NF → 2NF → 3NF → BCNF',
            'Denormalization: tradeoffs for performance',
            'Indexing: B-tree, Hash, when to add vs not',
            'EXPLAIN / EXPLAIN ANALYZE: reading query plans'
          ],
          'NoSQL Databases': [
            'Why NoSQL: document, key-value, column-family, graph',
            'MongoDB: BSON, collections, aggregation pipeline',
            'Redis: strings, hashes, lists, sets, sorted sets',
            'Redis as cache: cache-aside, TTL, invalidation',
            'CAP theorem and BASE vs ACID'
          ],
          'ORM & Database Integration': [
            'SQLAlchemy 2.0: models, relationships, sessions',
            'Alembic: schema migrations',
            'N+1 query problem and eager loading',
            'Async database: asyncpg, SQLAlchemy async'
          ]
        },
        projects: [
          { name: 'E-Commerce Schema', description: 'Design full schema', level: 'Int', outcome: '3NF normalized, ER diagram first, indexes on all FKs, sample queries documented' },
          { name: 'SQL 30 Challenge', description: 'Write 30 SQL queries', level: 'Int', outcome: 'Must include: window functions, CTEs, correlated subqueries, recursive CTE' },
          { name: 'Dual-DB App', description: 'Python app using Postgres and MongoDB', level: 'Int', outcome: 'SQLAlchemy for relational data, PyMongo for document data, Redis for caching' },
        ],
        resources: [
          { name: 'sqlzoo.net', type: 'Interactive', cost: 'Free', stars: 5, url: 'https://sqlzoo.net', notes: 'Best interactive SQL practice — complete every tutorial and quiz' },
          { name: 'CMU 15-445', type: 'Course', cost: 'Free', stars: 5, url: 'https://15445.courses.cs.cmu.edu', notes: 'World-class database course by Andy Pavlo, free on YouTube' },
          { name: 'PostgreSQL Official Docs', type: 'Docs', cost: 'Free', stars: 5, url: 'https://postgresql.org/docs', notes: 'Best SQL reference available — bookmark and use constantly' },
          { name: 'DDIA (Kleppmann)', type: 'Book', cost: 'Paid', stars: 5, notes: 'Designing Data-Intensive Applications — most important tech book' },
        ],
        commonMistakes: [
          'Not drawing an ER diagram before writing code — always design first',
          'Adding indexes to every column — indexes slow down writes',
          'Using ORM for complex queries — raw SQL is sometimes cleaner',
          'Not understanding transactions — causes data corruption bugs',
          'Treating NoSQL as "easier SQL" — they solve different problems'
        ],
        selfCheck: [
          'Can you write a query with 3 JOINs and a window function without looking it up?',
          'Can you explain the difference between 2NF and 3NF with a concrete example?',
          'Can you describe when you would choose MongoDB over PostgreSQL and why?',
          'Can you write an Alembic migration that adds a column and backfills data?',
          'Can you read an EXPLAIN ANALYZE output and identify the performance bottleneck?'
        ],
        whenStuck: 'If a query is slow: run EXPLAIN ANALYZE before changing anything. If you see \'Seq Scan\' on a large table, you need an index. Measure before optimizing.'
      },
      {
        id: 'CS204',
        name: 'Computer Networks',
        hours: 65,
        duration: '5 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['CS103'],
        description: 'The internet is the backbone of every application you will ever build. Understanding how data moves from a browser to a server and back will save you hours of debugging connection issues, CORS errors, and performance problems.',
        topics: ['Network Fundamentals', 'Transport Layer', 'Application Layer', 'Security Fundamentals'],
        subtopics: {
          'Network Fundamentals': [
            'OSI model: 7 layers — know what each handles and which protocols live there',
            'TCP/IP model: 4 layers in practice (Link, Internet, Transport, Application)',
            'IP addressing: IPv4/IPv6, subnets, CIDR notation, private vs public ranges',
            'DNS: how domain names resolve — trace with dig or nslookup step by step',
            'DHCP: how your device gets an IP address automatically',
            'NAT: how your router shares one public IP across many devices',
            'ARP: how IP addresses map to MAC addresses on local networks',
            'Routing: how packets find their path across the internet'
          ],
          'Transport Layer': [
            'TCP: three-way handshake (SYN, SYN-ACK, ACK) — draw it from memory',
            'TCP: reliability (sequence numbers, acknowledgments, retransmission)',
            'TCP: flow control (receive window) and congestion control (slow start, AIMD)',
            'TCP connection teardown: FIN, FIN-ACK, ACK — four-way handshake',
            'UDP: stateless, connectionless, no guarantee — use cases: DNS, video, gaming',
            'Ports: 0-1023 well-known, 1024-49151 registered, 49152-65535 ephemeral',
            'Sockets: the API that programs use to communicate over a network'
          ],
          'Application Layer': [
            'HTTP/1.1: request/response cycle, methods (GET POST PUT DELETE PATCH HEAD OPTIONS), status codes, headers',
            'HTTP/2: multiplexing (multiple requests over one TCP connection), header compression, server push',
            'HTTP/3 and QUIC: UDP-based, reduces latency, built-in encryption',
            'HTTPS and TLS: TLS handshake, certificates, certificate authorities, certificate pinning',
            'WebSockets: bidirectional persistent connection — how real-time apps work',
            'REST principles: stateless, uniform interface, resource-based URIs',
            'gRPC: Protocol Buffers, strongly typed, faster than REST — when to use it',
            'SMTP, FTP, SSH, DNS (application layer): know what each does'
          ],
          'Security Fundamentals': [
            'Symmetric encryption: AES — same key for encrypt/decrypt, fast, used for bulk data',
            'Asymmetric encryption: RSA — public/private key pair, used for key exchange',
            'TLS certificate chain: root CA, intermediate CA, leaf certificate',
            'Hashing: SHA-256, bcrypt for passwords — never store plaintext or MD5',
            'Common attacks: MITM, DDoS, DNS spoofing, replay attacks, SSL stripping',
            'CORS: why browsers enforce it, preflight requests, how to configure correctly',
            'JWT: header.payload.signature, where to store (httpOnly cookie vs localStorage)',
            'OAuth 2.0 and OIDC: authorization vs authentication — the difference matters'
          ]
        },
        projects: [
          { name: 'HTTP Server', description: 'Build minimal HTTP/1.1 server from raw Python sockets', level: 'Adv', outcome: 'Handles GET/POST, serves static files, parses headers, returns correct status codes' },
          { name: 'TCP Chat Server', description: 'Multi-client chat using sockets and threading', level: 'Int', outcome: 'Handles disconnections gracefully, broadcasts to all clients, rooms support' },
          { name: 'Packet Capture Analysis', description: 'Wireshark: capture and document real traffic', level: 'Int', outcome: 'Document: HTTP request, DNS resolution, TCP handshake, TLS handshake with screenshots' },
        ],
        resources: [
          { name: 'Stanford CS144', type: 'Course', cost: 'Free', stars: 5, url: 'https://cs144.github.io', notes: 'Best university networking course — free on YouTube, assignments included' },
          { name: 'Wireshark', type: 'Tool', cost: 'Free', stars: 5, url: 'https://wireshark.org', notes: 'Install and capture your own traffic — hands-on is essential' },
          { name: 'Julia Evans zines', type: 'Zines', cost: 'Free', stars: 5, url: 'https://jvns.ca/zines', notes: 'Networking for programmers — approachable, accurate, beautifully done' },
          { name: 'Kurose & Ross', type: 'Book', cost: 'Paid', stars: 5, notes: 'Computer Networking: A Top-Down Approach — standard university textbook' },
        ],
        commonMistakes: [
          'Memorizing OSI layers without understanding what they actually do',
          'Not using Wireshark to see real traffic — theory without observation is weak',
          'Confusing authentication (who are you?) with authorization (what can you do?)',
          'Not understanding HTTPS — many developers don\'t know what TLS actually does'
        ],
        selfCheck: [
          'Can you draw the TCP three-way handshake from memory?',
          'Can you describe what happens at each OSI layer when you visit google.com?',
          'Can you explain why HTTPS prevents MITM attacks — what specifically does TLS prevent?',
          'Can you explain CORS: what it is, why browsers enforce it, and how to fix a CORS error?',
          'Can you explain the difference between authentication and authorization?'
        ],
        whenStuck: 'If network concepts feel abstract: open Wireshark and browse the internet. Watch the TCP handshake happen live. Watch DNS resolve in real time. Theory becomes obvious when you see it.'
      },
      {
        id: 'CS205',
        name: 'Application Security',
        hours: 45,
        duration: '3 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['CS203', 'CS204'],
        description: 'Security is not a feature you add at the end — it is a mindset you build into every line of code. Filipino fintech companies (GCash, Paymaya, UnionDigital) explicitly test security knowledge. This subject makes you dangerous in the best way.',
        topics: ['OWASP Top 10 (The Must-Knows)', 'Secure Coding Practices', 'Security in Practice'],
        subtopics: {
          'OWASP Top 10 (The Must-Knows)': [
            'A01 Broken Access Control: insecure direct object reference, missing authorization checks',
            'A02 Cryptographic Failures: weak algorithms, unencrypted sensitive data, hardcoded keys',
            'A03 Injection: SQL injection — understand and prevent with parameterized queries',
            'A03 XSS (Cross-Site Scripting): reflected, stored, DOM-based — escape output always',
            'A04 Insecure Design: threat modeling, fail securely by default, principle of least privilege',
            'A05 Security Misconfiguration: default credentials, verbose errors, open S3 buckets',
            'A07 Authentication Failures: brute force, credential stuffing, session fixation',
            'A08 Software Supply Chain: vulnerable dependencies, lock files, dependency scanning',
            'A09 Logging Failures: no audit trail, logging sensitive data, insufficient monitoring',
            'A10 SSRF: making the server request internal resources — cloud metadata endpoint attacks'
          ],
          'Secure Coding Practices': [
            'Never trust user input — validate and sanitize everything on the server side',
            'Parameterized queries: NEVER use string formatting for SQL — ever',
            'Password storage: bcrypt with cost factor 12+, never MD5 or SHA1 for passwords',
            'Secrets management: environment variables, .env files, never commit to git',
            'Rate limiting: per-IP, per-user, per-endpoint — prevent brute force',
            'CSRF protection: SameSite cookies, CSRF tokens for state-changing requests',
            'Secure headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options',
            'Input validation: allowlist not denylist, validate type/length/format/range'
          ],
          'Security in Practice': [
            'Dependency scanning: pip-audit, Safety, Snyk — run in CI pipeline',
            'HTTPS everywhere: redirect HTTP to HTTPS, HSTS preloading',
            'JWT security: short expiry, httpOnly cookies, refresh token rotation, token revocation',
            'OAuth 2.0 security: state parameter (CSRF prevention), PKCE for public clients',
            'Error handling: never expose stack traces in production responses',
            'Logging: log security events (failed logins, permission denials) without logging PII',
            'Penetration testing basics: OWASP ZAP, Burp Suite Community — scan your own apps',
            'Bug bounty mindset: think like an attacker to defend like a defender'
          ]
        },
        projects: [
          { name: 'Vulnerable App Audit', description: 'Find and fix all OWASP Top 10 issues in a deliberately vulnerable app', level: 'Int', outcome: 'Use DVWA or WebGoat, document each vulnerability found and the fix applied' },
          { name: 'Secure API', description: 'Build a FastAPI endpoint following all security best practices', level: 'Int', outcome: 'Rate limiting, CSRF, parameterized queries, secure headers, dependency scan, secrets in env' },
        ],
        resources: [
          { name: 'OWASP Top 10', type: 'Docs', cost: 'Free', stars: 5, url: 'https://owasp.org', notes: 'Read the official descriptions and prevention guides' },
          { name: 'PortSwigger Web Academy', type: 'Interactive', cost: 'Free', stars: 5, url: 'https://portswigger.net/web-security', notes: 'Hands-on labs, best free security training' },
          { name: 'DVWA', type: 'Tool', cost: 'Free', stars: 4, url: 'https://dvwa.co.uk', notes: 'Damn Vulnerable Web App — practice finding vulnerabilities' },
          { name: 'Hacking: The Art of Exploitation', type: 'Book', cost: 'Paid', stars: 5, notes: 'Low-level security — read after OWASP basics are solid' },
        ],
        commonMistakes: [
          'Thinking security is someone else\'s job — every engineer writes security-relevant code',
          'Storing secrets in code or environment variables tracked by git',
          'Using string formatting to build SQL queries — this is still the #1 SQL injection cause',
          'Logging too much (PII, passwords) or too little (no audit trail)',
          'Not scanning dependencies — the next Log4Shell could be in your requirements.txt'
        ],
        selfCheck: [
          'Can you explain SQL injection and write a parameterized query that prevents it?',
          'Can you explain the difference between XSS and CSRF?',
          'Can you explain why MD5 is unsafe for password storage?',
          'Can you describe 5 secure HTTP headers and what each one does?',
          'Can you explain what SSRF is and give a real attack example?'
        ],
        whenStuck: "If you're confused about whether something is a vulnerability: ask 'what happens if a malicious user controls this input?' If the answer is anything bad, it's a vulnerability. Always assume the attacker knows your code."
      },
    ],
  },
  {
    id: 3,
    name: 'Full-Stack Engineering',
    duration: '5-7 months',
    hours: 580,
    color: '#ec4899',
    description: 'Build real things. Ship real products. This is your job-readiness phase.',
    mustComplete: ['CS301 Backend (FastAPI + REST + Security)', 'CS302 Frontend (JS + React + TypeScript)', 'CS305 Cloud Fundamentals (AWS/GCP)', 'CS304 CI/CD basics'],
    niceToHave: ['CS303 System Design (vocabulary now, mastery on the job)', 'Advanced React patterns'],
    interviewHabit: 'From Phase 3: do one full system design mock per month. Set a 45-minute timer. Draw on paper. No notes. Also: start applying to junior roles.',
    capstone: {
      name: 'Real-Time SaaS Platform',
      description: 'Build a production-quality SaaS: task manager or team chat with real-time features.',
      requirements: [
        'React + TS Frontend with optimistic updates and custom hooks.',
        'FastAPI Backend with JWT rotation and background Celery jobs.',
        'Postgres for data, Redis for caching/websockets, S3 for files.',
        'GitHub Actions CI/CD deploying to AWS/GCP or Render/Railway.'
      ]
    },
    subjects: [
      {
        id: 'CS301',
        name: 'Backend Development',
        hours: 150,
        duration: '10 weeks',
        difficulty: 'Hard',
        description: 'FastAPI, REST APIs, security, databases. Every endpoint you build applies security mandatory.',
        topics: ['Advanced Python for Backend', 'FastAPI Deep Dive', 'RESTful API Design Excellence', 'Database Integration & Performance', 'Testing, Quality & Observability', 'Docker & Deployment'],
        subtopics: {
          'Advanced Python for Backend': [
            'Decorators: @cache, @retry, @require_auth',
            'async/await and event loop internals',
            'Pydantic v2: validation and serialization',
            'Concurrency: threading vs multiprocessing vs asyncio'
          ],
          'FastAPI Deep Dive': [
            'Dependency Injection for shared DB/Auth',
            'OAuth2 password flow and JWT implementation',
            'Middleware for CORS and Rate Limiting',
            'Background tasks and Celery integration',
            'WebSockets and connection managers'
          ],
          'RESTful API Design Excellence': [
            'Resource naming and semantic HTTP methods',
            'Pagination: cursor-based vs offset',
            'Versioning strategies and RFC 7807 error format',
            'OpenAPI customization and auto-docs'
          ],
          'Database Integration & Performance': [
            'SQLAlchemy 2.0 Async with asyncpg',
            'N+1 query detection and joinedload/selectinload',
            'Repository pattern and optimistic locking',
            'Database seeding and test fixtures'
          ],
          'Testing, Quality & Observability': [
            'pytest and async test clients',
            'Mocking and TDD: red-green-refactor',
            'Structured logging and Sentry integration',
            'Health checks and ready endpoints'
          ],
          'Docker & Deployment': [
            'Multi-stage Dockerfiles for slim images',
            'docker-compose for full-stack local dev',
            'GitHub Actions: test, lint, build, deploy'
          ]
        },
        projects: [
          { name: 'Blog API', description: 'Full REST API', level: 'Adv', outcome: 'JWT + refresh tokens, cursor pagination, Redis cache, full test suite, deployed with CI/CD' },
          { name: 'Task Manager API', description: 'Team task system', level: 'Adv', outcome: 'RBAC, file attachments to S3, WebSocket notifications, Celery background jobs, Sentry' },
          { name: 'Production Deployment', description: 'Full production config', level: 'Adv', outcome: 'HTTPS, env vars, health checks, structured logging, CI/CD pipeline' },
        ],
        resources: [
          { name: 'FastAPI Docs', type: 'Docs', cost: 'Free', stars: 5, url: 'https://fastapi.tiangolo.com', notes: 'Best framework documentation ever written, read everything' },
          { name: 'ArjanCodes YouTube', type: 'Video', cost: 'Free', stars: 5, url: 'https://youtube.com/@arjancodes', notes: 'Python architecture and clean backend code — excellent' },
          { name: 'TestDriven.io FastAPI', type: 'Course', cost: 'Paid', stars: 5, url: 'https://testdriven.io', notes: 'FastAPI TDD — best paid course for backend testing in Python' },
          { name: 'Real Python', type: 'Website', cost: 'Free', stars: 4, url: 'https://realpython.com', notes: 'Deep-dive Python backend articles' },
        ],
        commonMistakes: [
          'Not using async properly — causes performance bugs',
          'Returning 200 for everything — use correct status codes',
          'Not testing error paths — most bugs live there',
          'Storing secrets in code — use environment variables',
          'Not writing the OpenAPI spec'
        ],
        selfCheck: [
          'Can you build a JWT + refresh token auth system from scratch in under 2 hours?',
          'Can you explain the difference between PUT and PATCH semantically?',
          'Can you write a complete pytest suite including error cases?',
          'Can you write a multi-stage Dockerfile for a slim image?',
          'Can you set up GitHub Actions for full CI/CD?'
        ],
        whenStuck: 'If your API is slow: profile with py-spy. 80% of slowness is an N+1 query. Use SQLAlchemy echo=True to spot it.'
      },
      {
        id: 'CS302',
        name: 'Frontend Development',
        hours: 140,
        duration: '10 weeks',
        difficulty: 'Intermediate',
        description: 'Frontend engineering is building interfaces that are correct, fast, and accessible. React + TypeScript + Tailwind.',
        topics: ['HTML5 & CSS Mastery', 'JavaScript Deep Dive', 'TypeScript in React', 'React Architecture', 'Frontend Tooling & Architecture'],
        subtopics: {
          'HTML5 & CSS Mastery': [
            'Semantic HTML5 and accessibility (ARIA)',
            'Flexbox and CSS Grid for layouts',
            'Responsive design: mobile-first and container queries',
            'CSS Custom Properties and animations'
          ],
          'JavaScript Deep Dive': [
            'Event Loop, Closures, and Prototypal Inheritance',
            'Promises and async/await internals',
            'DOM API and Event Delegation',
            'ES2020+ features'
          ],
          'TypeScript in React': [
            'Typing FCs, Props, State, and Refs',
            'Generic components and Discrimination Unions',
            'Typing Context and Custom Hooks',
            'Zod for runtime schema validation'
          ],
          'React Architecture': [
            'JSX transforms and unidirectional data flow',
            'Hooks: useEffect dependencies and custom hooks',
            'useReducer + Context for state management',
            'React Router v6 and Code Splitting'
          ],
          'Frontend Tooling & Architecture': [
            'Vite, Zustand, and TanStack Query',
            'Axios interceptors and cancellation',
            'Vitest and React Testing Library',
            'Storybook for component documentation'
          ]
        },
        projects: [
          { name: 'Portfolio Site', description: 'Zero templates, custom responsive site', level: 'Int', outcome: 'Mobile-first, dark mode, animations, WCAG AA, Vercel, Lighthouse 90+' },
          { name: 'Weather Dashboard', description: 'React Query + OpenWeather API', level: 'Int', outcome: 'Charts with Recharts, geolocation, skeleton loading, error states' },
          { name: 'Full-Stack Task App', description: 'React + TS consuming CS301 API', level: 'Adv', outcome: 'Auth flow, optimistic updates, real-time via WebSocket, PWA support' },
        ],
        resources: [
          { name: 'javascript.info', type: 'Website', cost: 'Free', stars: 5, url: 'https://javascript.info', notes: 'Most thorough JS resource ever written — read every chapter' },
          { name: 'react.dev', type: 'Docs', cost: 'Free', stars: 5, url: 'https://react.dev', notes: 'Official React docs, completely rewritten, excellent' },
          { name: 'Total TypeScript (React)', type: 'Course', cost: 'Paid', stars: 5, url: 'https://totaltypescript.com', notes: 'Best typed React patterns' },
          { name: 'The Odin Project', type: 'Course', cost: 'Free', stars: 4, url: 'https://theodinproject.com', notes: 'Project-based full curriculum for fundamentals' },
        ],
        commonMistakes: [
          'Not using TypeScript strictly',
          'Putting all state in Context — keep it local',
          'Not testing from the user\'s perspective',
          'Ignoring accessibility keyboard navigation',
          'Over-using useEffect'
        ],
        selfCheck: [
          'Can you explain the JS event loop with a surprising example?',
          'Can you build a fully typed form with Zod and React Hook Form?',
          'Can you explain all three forms of useEffect dependencies?',
          'Can you implement optimistic updates in TanStack Query?',
          'Can you score 90+ on Lighthouse?'
        ],
        whenStuck: 'If React re-renders are confusing: install React DevTools, enable \'Highlight updates\'. Only add React.memo after you see a problem.'
      },
      {
        id: 'CS303',
        name: 'System Design',
        hours: 90,
        duration: '8 weeks',
        difficulty: 'Hard',
        description: 'Designing systems for millions of users. Build the vocabulary now, mastery comes on the job.',
        topics: ['Scalability Foundations', 'Core Infrastructure Components', 'Design Case Studies', 'Reliability & Operations'],
        subtopics: {
          'Scalability Foundations': [
            'Vertical vs Horizontal scaling',
            'Load Balancers and Caching strategies',
            'CDNs and Database scaling (sharding)',
            'Consistent Hashing'
          ],
          'Core Infrastructure Components': [
            'Message Queues: Kafka vs RabbitMQ',
            'Microservices vs Monolith tradeoffs',
            'API Gateway and Service Discovery',
            'Circuit Breaker pattern'
          ],
          'Design Case Studies': [
            'URL Shortener and Social Feed (fan-out)',
            'Video Streaming (chunking, adaptive bitrate)',
            'Ride-Sharing (geospatial indexing)',
            'Chat App (WebSockets, message ordering)'
          ],
          'Reliability & Operations': [
            'CAP Theorem and PACELC',
            'Fault tolerance and Replication factor',
            'Monitoring, Alerting, and SLOs'
          ]
        },
        projects: [
          { name: 'URL Shortener', description: 'Design doc and implementation', level: 'Adv', outcome: 'Hash collision handling, custom aliases, analytics, TTL' },
          { name: 'System Design Primer', description: 'Complete the primer roadmap', level: 'Adv', outcome: 'Documentation of all major patterns and case studies' },
        ],
        resources: [
          { name: 'System Design Primer', type: 'GitHub', cost: 'Free', stars: 5, url: 'https://github.com/donnemartin/system-design-primer', notes: 'The definitive free resource for interview prep' },
          { name: 'ByteByteGo', type: 'Course', cost: 'Mixed', stars: 5, url: 'https://bytebytego.com', notes: 'Alex Xu\'s visual system design — excellent for intuition' },
          { name: 'Designing Data-Intensive Apps', type: 'Book', cost: 'Paid', stars: 5, notes: 'The "bible" of system design — read it slowly' },
        ],
        commonMistakes: [
          'Jumping into microservices too early',
          'Ignoring database consistency tradeoffs',
          'Not quantifying requirements before designing',
          'Applying "cool" tech without a reason'
        ],
        selfCheck: [
          'Can you design a URL shortener that handles 1M requests/sec?',
          'Can you explain the CAP theorem with a real-world example?',
          'Can you explain the fan-out problem in social media feeds?',
          'Can you describe how consistent hashing works?',
          'Can you explain when to use a message queue?'
        ],
        whenStuck: 'Start with the simplest monolith. Only add complexity when you can explain exactly what bottleneck it solves. "Scale" is a number, not a feeling.'
      },
      {
        id: 'CS304',
        name: 'DevOps',
        hours: 50,
        duration: '4 weeks',
        difficulty: 'Intermediate',
        description: 'CI/CD and workflows. Learn to ship code safely and automatically.',
        topics: ['Agile Workflows', 'CI/CD Pipelines', 'Containerization', 'Infrastructure as Code'],
        subtopics: {
          'Agile Workflows': ['GitFlow vs Trunk-based development', 'Code Review best practices'],
          'CI/CD Pipelines': ['GitHub Actions, GitLab CI', 'Automated testing and linting'],
          'Containerization': ['Docker, Kubernetes basics', 'Registry management'],
          'Infrastructure as Code': ['Terraform/CloudFormation concepts', 'Deployment strategies (Blue/Green, Canary)']
        },
        projects: [{ name: 'CI/CD Pipeline', description: 'Automated pipeline for Blog API', level: 'Int', outcome: 'Lints, tests, builds Docker, and deploys on merge' }],
        resources: [{ name: 'GitHub Actions Docs', type: 'Docs', cost: 'Free', stars: 5, url: 'https://docs.github.com/actions' }],
        commonMistakes: ['Manual deployments', 'No staging environment', 'Ignoring pipeline failures'],
        selfCheck: ['Can you set up a pipeline from scratch?', 'Difference between CI and CD?'],
        whenStuck: 'Read the logs from top to bottom. Most CI failures are just environment variable issues.'
      },
      {
        id: 'CS305',
        name: 'Cloud Fundamentals (AWS/GCP)',
        hours: 70,
        duration: '4 weeks',
        difficulty: 'Intermediate',
        description: 'AWS/GCP are listed in the majority of PH mid-level job postings.',
        topics: ['Compute', 'Storage', 'Networking', 'Serverless'],
        subtopics: {
          'Compute': ['EC2/Compute Engine, ECS/Cloud Run', 'Auto-scaling groups'],
          'Storage': ['S3/Cloud Storage, RDS/Cloud SQL'],
          'Networking': ['VPCs, Subnets, Security Groups, IAM'],
          'Serverless': ['Lambda/Cloud Functions', 'Event-driven architecture']
        },
        projects: [{ name: 'Cloud Deployment', description: 'Deploy app to AWS/GCP', level: 'Int', outcome: 'Fully hosted app with DB, S3 storage, and custom domain' }],
        resources: [{ name: 'AWS Cloud Practitioner', type: 'Course', cost: 'Mixed', stars: 5, url: 'https://explore.skillbuilder.aws' }],
        commonMistakes: ['Leaving resources running (cost)', 'Using root user', 'Public S3 buckets'],
        selfCheck: ['Security Group vs NACL?', 'Lambda vs EC2?'],
        whenStuck: 'Check IAM permissions first. 90% of cloud issues are permissions.'
      }
    ],
  },
  {
    id: 4,
    name: 'Machine Learning & AI',
    duration: '9-12 months',
    hours: 820,
    color: '#f59e0b',
    description: 'Become an ML Engineer. Your ultimate destination.',
    mustComplete: ['CS401 ML Foundations', 'CS402 Deep Learning', 'CS403 MLOps + LLMs'],
    niceToHave: ['CS404 Specialization', 'CS405 Data Viz', 'CS406 Data Eng.'],
    interviewHabit: 'Participate in 1 Kaggle competition per month. Focus on the discussion and top solutions.',
    capstone: {
      name: 'End-to-End ML Product',
      description: 'Build and deploy a full ML application (e.g., Recommendation System, RAG Chatbot).',
      requirements: [
        'Data pipeline for ingestion and preprocessing.',
        'Model training with experiment tracking (MLflow/WandB).',
        'Model serving via FastAPI with monitoring for data drift.',
        'Frontend to interact with the model.'
      ]
    },
    subjects: [
      {
        id: 'CS401',
        name: 'ML Foundations',
        hours: 200,
        duration: '14 weeks',
        difficulty: 'Hard',
        description: 'Mathematics, stats, and classic ML. Feature engineering is the key.',
        topics: ['Math for ML', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
        subtopics: {
          'Math for ML': ['Linear Algebra and Calculus for ML', 'Probability and Stats'],
          'Supervised Learning': ['Linear/Logistic Regression', 'Trees and Forests', 'SVMs and KNN'],
          'Unsupervised Learning': ['Clustering (K-Means)', 'Dimensionality Reduction (PCA)'],
          'Model Evaluation': ['Bias-Variance tradeoff', 'Cross-validation', 'Metrics (F1, AUC, MSE)']
        },
        projects: [{ name: 'Kaggle Titanic/House Prices', description: 'Classic ML competitions', level: 'Int', outcome: 'Top 20% submission, documented EDA' }],
        resources: [{ name: 'Andrew Ng ML Specialization', type: 'Course', cost: 'Mixed', stars: 5, url: 'https://coursera.org' }],
        commonMistakes: ['Skipping EDA', 'Data leakage', 'Overfitting to test set'],
        selfCheck: ['Explain Bias vs Variance?', 'How does Gradient Descent work?'],
        whenStuck: 'Plot the data. Visualization always reveals why the model is failing.'
      },
      {
        id: 'CS402',
        name: 'Deep Learning',
        hours: 230,
        duration: '14 weeks',
        difficulty: 'Very Hard',
        description: 'Hardest subject. Neural networks from first principles.',
        topics: ['Neural Networks', 'Computer Vision (CNNs)', 'Natural Language Processing (RNNs/Transformers)'],
        subtopics: {
          'Neural Networks': ['Backpropagation from scratch', 'Activation functions, Optimizers'],
          'Computer Vision (CNNs)': ['Convolutions, Pooling, ResNet', 'Object Detection'],
          'Natural Language Processing': ['Word Embeddings, Attention mechanism', 'Transformers (BERT, GPT)']
        },
        projects: [{ name: 'Neural Net from Scratch', description: 'Implement NumPy-only NN', level: 'Adv', outcome: 'Trained on MNIST with 98%+ accuracy' }],
        resources: [{ name: 'fast.ai', type: 'Course', cost: 'Free', stars: 5, url: 'https://fast.ai' }],
        commonMistakes: ['Not doing backprop by hand', 'Ignoring learning rate tuning'],
        selfCheck: ['Derive backprop?', 'How do transformers work?'],
        whenStuck: 'Overfit a single batch of data first. If you can\'t, your model or data is broken.'
      },
      {
        id: 'CS403',
        name: 'MLOps & LLM Engineering',
        hours: 130,
        duration: '10 weeks',
        difficulty: 'Hard',
        description: 'Productionizing ML and working with LLMs.',
        topics: ['ML Pipelines', 'Model Serving', 'LLM Engineering (RAG)'],
        subtopics: {
          'ML Pipelines': ['Experiment tracking (MLflow)', 'Data versioning (DVC)'],
          'Model Serving': ['Docker for ML, Model monitoring'],
          'LLM Engineering': ['Prompt Engineering, Vector DBs, RAG architecture']
        },
        projects: [{ name: 'RAG Chatbot', description: 'Chat with your documents', level: 'Adv', outcome: 'Deployed chatbot using LangChain and a Vector DB' }],
        resources: [{ name: 'Made With ML', type: 'Course', cost: 'Free', stars: 5, url: 'https://madewithml.com' }],
        commonMistakes: ['Fine-tuning unnecessarily', 'No evaluation pipeline for LLM'],
        selfCheck: ['What is RAG?', 'How to detect data drift?'],
        whenStuck: 'Check your chunking strategy and retrieval quality first for RAG.'
      },
      {
        id: 'CS404',
        name: 'ML Specialization',
        hours: 120,
        duration: '8 weeks',
        difficulty: 'Hard',
        description: 'Go deep into NLP, CV, or RL.',
        topics: ['Advanced NLP', 'Advanced CV', 'Reinforcement Learning'],
        subtopics: {},
        projects: [{ name: 'Specialization Project', description: 'Deep dive project', level: 'Adv', outcome: 'State-of-the-art implementation' }],
        resources: [{ name: 'HuggingFace Course', type: 'Course', cost: 'Free', stars: 5, url: 'https://huggingface.co/learn' }],
        commonMistakes: ['Trying to master all tracks at once'],
        selfCheck: ['Explain PPO?', 'Fine-tune a Llama model?'],
        whenStuck: 'Start with a pre-trained model on HuggingFace.'
      },
      {
        id: 'CS405',
        name: 'Data Visualization & Communication',
        hours: 40,
        duration: '3 weeks',
        difficulty: 'Intermediate',
        description: 'Half the ML job is communicating results — SHAP, Streamlit, Plotly.',
        topics: ['Exploratory Data Analysis', 'Interactive Dashboards', 'Storytelling with Data'],
        subtopics: {},
        projects: [{ name: 'ML Insights Dashboard', description: 'Streamlit app', level: 'Int', outcome: 'Deployed dashboard explaining model predictions with SHAP' }],
        resources: [{ name: 'Storytelling with Data', type: 'Book', cost: 'Paid', stars: 5 }],
        commonMistakes: ['Over-complicated charts', 'No context for metrics'],
        selfCheck: ['What is a SHAP value?', 'Create a Streamlit app?'],
        whenStuck: 'Ask: what is the one insight I want the user to take away?'
      },
      {
        id: 'CS406',
        name: 'Data Engineering Foundations',
        hours: 80,
        duration: '6 weeks',
        difficulty: 'Hard',
        description: 'Many \'ML Engineer\' PH roles are data engineering — know both.',
        topics: ['ETL Pipelines', 'Big Data (Spark)', 'Data Warehousing'],
        subtopics: {},
        projects: [{ name: 'ETL Pipeline', description: 'Airflow pipeline', level: 'Int', outcome: 'Daily automated data load to BigQuery/Snowflake' }],
        resources: [{ name: 'Data Engineering Zoomcamp', type: 'Course', cost: 'Free', stars: 5, url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp' }],
        commonMistakes: ['Using pandas for big data', 'No data quality checks'],
        selfCheck: ['ETL vs ELT?', 'Star schema?'],
        whenStuck: 'Optimize your shuffles and partitions in Spark.'
      }
    ],
  },
  {
    id: 5,
    name: 'Career & Prep',
    duration: '3+ months',
    hours: 200,
    color: '#10b981',
    description: 'Get hired at your target salary.',
    mustComplete: ['CS501 Technical Interviews', 'CS502 Portfolio + Job Search'],
    niceToHave: ['Open source contributions'],
    interviewHabit: 'Do 3 mock interviews per week on Pramp or with friends. Record yourself.',
    capstone: {
      name: 'The Job Offer',
      description: 'Sign your offer at or above your target salary.',
      requirements: [
        '3 production-quality portfolio pieces.',
        'Optimized LinkedIn and GitHub.',
        'Mastery of negotiation scripts.'
      ]
    },
    subjects: [
      {
        id: 'CS501',
        name: 'Interview Mastery',
        hours: 120,
        duration: 'Ongoing',
        difficulty: 'Hard',
        description: 'Technical and behavioral interview prep.',
        topics: ['DSA Framework', 'System Design Framework', 'Behavioral (STAR)'],
        subtopics: {},
        projects: [{ name: 'Interview Log', description: 'Track 50+ mock interviews', level: 'Adv', outcome: 'Documented feedback and improvement' }],
        resources: [{ name: 'Cracking the Coding Interview', type: 'Book', cost: 'Paid', stars: 5 }],
        commonMistakes: ['Coding in silence', 'Not clarifying requirements'],
        selfCheck: ['Can you solve a Medium DP in 20 mins?', 'Explain your projects clearly?'],
        whenStuck: 'Think out loud. The interviewer wants to see your process, not just the code.'
      },
      {
        id: 'CS502',
        name: 'Portfolio & Brand',
        hours: 80,
        duration: 'Ongoing',
        difficulty: 'Intermediate',
        description: 'Personal branding and PH-specific negotiation.',
        topics: ['Portfolio Site', 'LinkedIn/Resume Optimization', 'Salary Negotiation'],
        subtopics: {},
        projects: [{ name: 'Final Portfolio', description: 'The grand showcase', level: 'Adv', outcome: '3+ capstone projects with deep-dive case studies' }],
        resources: [{ name: 'levels.fyi', type: 'Website', cost: 'Free', stars: 5, url: 'https://levels.fyi' }],
        commonMistakes: ['Generic resume', 'Passive job search'],
        selfCheck: ['Resume passes ATS?', 'Negotiation script ready?'],
        whenStuck: 'Get brutal feedback from senior engineers on LinkedIn.'
      },
    ],
  },
];
