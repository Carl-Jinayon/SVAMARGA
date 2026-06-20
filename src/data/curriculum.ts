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
            'Debugger Basics: Learn pdb, set breakpoints, step through code',
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
            'Debugging: Step through loops and function calls to watch variables change',
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
            'Debugging OOP: Step through code to see object state and understand self',
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
      name: 'Team Project Management Tool (Mini-Linear/Jira)',
      description: 'Build and deploy a complete SaaS application: a team project management tool.',
      requirements: [
        'FastAPI backend with RBAC auth (Role-Based Access Control).',
        'React + TypeScript frontend with optimized state management.',
        'PostgreSQL on Cloud SQL (GCP) or RDS (AWS).',
        'Redis caching for performance and session management.',
        'File uploads to S3 (AWS) or Cloud Storage (GCP).',
        'Real-time notifications via WebSockets.',
        'Full CI/CD pipeline (test, lint, build, deploy).',
        'Monitoring with CloudWatch/Cloud Logging and Sentry error tracking.',
        'Proper system design document explaining architectural decisions.'
      ]
    },
    subjects: [
      {
        id: 'CS301',
        name: 'Backend Development',
        hours: 150,
        duration: '10 weeks',
        difficulty: 'Hard',
        prerequisites: ['CS101', 'CS203', 'CS204', 'CS205'],
        description: 'The backend is the engine of every application. It processes logic, manages data, enforces security, and powers every feature users see. Python is your language. FastAPI is your framework. Security from CS205 is mandatory here — every endpoint you build applies those lessons.',
        topics: ['Advanced Python for Backend', 'FastAPI Deep Dive', 'RESTful API Design Excellence', 'Database Integration & Performance', 'Testing, Quality & Observability', 'Docker & Deployment'],
        subtopics: {
          'Advanced Python for Backend': [
            'Decorators: write your own — @cache, @retry, @require_auth',
            'Generators and iterators: lazy evaluation, memory-efficient data processing',
            'async/await: event loop, coroutines, asyncio.gather, asyncio.TaskGroup',
            'Type hints: complete typing with mypy, no implicit Any',
            'Pydantic v2: validators, field aliases, model serialization, computed fields',
            'Context managers: __enter__ / __exit__, asynccontextmanager',
            'Concurrency: threading vs multiprocessing vs asyncio — when each applies',
            'functools: lru_cache, partial, reduce — functional patterns'
          ],
          'FastAPI Deep Dive': [
            'Routes: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS',
            'Path params, query params, request body, form data, file uploads',
            'Pydantic schemas: request validation, response models, nested models',
            'Dependency injection: shared DB sessions, current user, feature flags',
            'Authentication: JWT with python-jose, refresh token rotation, token blacklisting',
            'OAuth2 password flow and Bearer token — complete implementation',
            'Middleware: CORS (configured correctly), rate limiting (slowapi), request logging',
            'Background tasks: fire-and-forget, Celery for heavy async work',
            'WebSockets in FastAPI: real-time connections, connection manager',
            'Auto docs: Swagger UI customization, ReDoc, OpenAPI schema export'
          ],
          'RESTful API Design Excellence': [
            'REST constraints: stateless, uniform interface, HATEOAS overview',
            'Resource naming: plural nouns, nested resources, no verbs in URIs',
            'HTTP methods used semantically: PUT (replace) vs PATCH (partial update)',
            'Status codes: use the right one — 201 not 200 for creation, 204 for delete',
            'Pagination: cursor-based (preferred) vs offset, include total count, next/prev links',
            'Filtering: query params, complex filters with operators (gt, lt, contains)',
            'Sorting: multiple fields, direction, default sort documented',
            'Versioning: URI versioning (/v1/) vs header versioning — tradeoffs',
            'Error responses: RFC 7807 Problem Details format — consistent error structure',
            'API documentation: write it as if you\'ll never be available to explain it'
          ],
          'Database Integration & Performance': [
            'SQLAlchemy 2.0: declarative models, relationships, lazy vs eager loading',
            'Alembic: autogenerate migrations, upgrade/downgrade, data migrations',
            'Async SQLAlchemy with asyncpg: connection pool configuration',
            'N+1 query detection: SQLAlchemy query logging, detect and fix with joinedload/selectinload',
            'Database seeding and fixtures for testing',
            'Repository pattern: abstract database access from business logic',
            'Optimistic locking: version columns to prevent lost updates'
          ],
          'Testing, Quality & Observability': [
            'pytest: test functions, fixtures, conftest.py, parametrize',
            'FastAPI TestClient for integration tests, async test client',
            'Mocking: unittest.mock, pytest-mock, monkeypatching',
            'Test-driven development: red-green-refactor — write the test first',
            'Code coverage: pytest-cov, 80% minimum, 100% for critical paths',
            'Structured logging: JSON logs, correlation IDs, log levels',
            'Error monitoring: Sentry integration — every exception tracked in production',
            'Health check endpoints: /health, /ready — required for cloud deployment'
          ],
          'Docker & Deployment': [
            'Docker: multi-stage Dockerfile (build stage + slim runtime stage)',
            'docker-compose: app + PostgreSQL + Redis + pgAdmin',
            '.env files, python-dotenv, secret rotation strategy',
            'NGINX: reverse proxy config, SSL termination, gzip, rate limiting at proxy level',
            'Gunicorn + Uvicorn workers: how many workers, tuning for your machine',
            'Deploying to Railway/Render (free tier) and understanding the config',
            'GitHub Actions: test on PR, lint on PR, deploy on merge to main'
          ]
        },
        projects: [
          { name: 'Blog API', description: 'Full REST API: users, posts, comments, likes, tags, auth', level: 'Adv', outcome: 'JWT + refresh tokens, cursor pagination, Redis cache, full test suite, deployed with CI/CD' },
          { name: 'Task Manager API', description: 'Team tasks: workspaces, members, roles, assignments, notifications', level: 'Adv', outcome: 'RBAC, file attachments to S3, WebSocket notifications, Celery background jobs, Sentry' },
          { name: 'Live Production Deployment', description: 'Deploy Blog API with full production config', level: 'Adv', outcome: 'HTTPS, env vars in cloud, GitHub Actions CI/CD, health checks, Sentry, structured logging' },
        ],
        resources: [
          { name: 'FastAPI Docs', type: 'Docs', cost: 'Free', stars: 5, url: 'https://fastapi.tiangolo.com', notes: 'best framework documentation ever written, read everything' },
          { name: 'ArjanCodes YouTube', type: 'Video', cost: 'Free', stars: 5, url: 'https://youtube.com/@arjancodes', notes: 'Python architecture and clean backend code — excellent channel' },
          { name: 'TestDriven.io FastAPI', type: 'Course', cost: 'Paid', stars: 5, url: 'https://testdriven.io', notes: 'FastAPI TDD — best paid course for backend testing in Python' },
          { name: 'Real Python', type: 'Website', cost: 'Free', stars: 4, url: 'https://realpython.com', notes: 'deep-dive Python backend articles, well written' },
        ],
        commonMistakes: [
          'Not using async properly — mixing sync and async code causes subtle performance bugs',
          'Returning 200 for everything including errors — use the right status codes',
          'Not testing error paths — most bugs live in error handling, not the happy path',
          'Storing secrets in code — even in \'private\' repos. Use environment variables always',
          'Not writing the OpenAPI spec — document your API as you build it, not after'
        ],
        selfCheck: [
          'Can you build a JWT + refresh token auth system from scratch in under 2 hours?',
          'Can you explain the difference between PUT and PATCH semantically?',
          'Can you write a complete pytest suite for a FastAPI route including error cases?',
          'Can you write a multi-stage Dockerfile that produces a slim production image?',
          'Can you set up GitHub Actions that lints, tests, builds Docker, and deploys on merge?'
        ],
        whenStuck: 'If your API is slow: profile with py-spy or cProfile before guessing. 80% of slowness is an N+1 query to the database. Use SQLAlchemy\'s echo=True to log all SQL and spot the issue.'
      },
      {
        id: 'CS302',
        name: 'Frontend Development',
        hours: 140,
        duration: '10 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['CS101', 'CS105'],
        description: 'Frontend engineering is not graphic design — it is building interfaces that are correct, fast, and accessible. You already know TypeScript from CS105. Now you apply it to React. Use Tailwind CSS for styling so you focus on functionality, not design decisions.',
        topics: ['HTML5 & CSS Mastery', 'JavaScript Deep Dive', 'TypeScript in React', 'React Architecture', 'Frontend Tooling & Architecture'],
        subtopics: {
          'HTML5 & CSS Mastery': [
            'HTML5 semantics: header, main, section, article, nav, footer, aside, figure',
            'Forms: inputs, labels, fieldsets, validation attributes, accessibility (ARIA)',
            'CSS box model: content, padding, border, margin — draw it, know it cold',
            'Flexbox: container properties, item properties, alignment, gap — use it for 1D layouts',
            'CSS Grid: template columns/rows, areas, auto-placement, subgrid — use it for 2D layouts',
            'Responsive design: mobile-first, breakpoints, fluid typography, container queries',
            'CSS custom properties: --color-primary, cascading, theming',
            'CSS animations and transitions: transform, opacity, keyframes, will-change',
            'CSS specificity and the cascade: understand before using !important'
          ],
          'JavaScript Deep Dive': [
            'var/let/const: differences, hoisting, temporal dead zone, block scope',
            'Arrow functions vs regular functions: this binding — the source of 1000 bugs',
            'Closures: functions that remember their outer scope — iterators, private state, memoization',
            'Prototypal inheritance: prototype chain, Object.create, class as syntax sugar',
            'Event loop: call stack, microtask queue, macrotask queue — why setTimeout(fn, 0) is not instant',
            'Promises: .then(), .catch(), .finally(), Promise.all(), Promise.allSettled(), Promise.race()',
            'async/await: syntactic sugar over promises, error handling with try/catch',
            'Fetch API: GET, POST, headers, body, error handling, AbortController',
            'DOM API: querySelector, addEventListener, event delegation, MutationObserver',
            'ES2020+: optional chaining ?., nullish coalescing ??, logical assignment, structuredClone',
            'Modules: import/export, digital import(), tree-shaking implications'
          ],
          'TypeScript in React': [
            'Typing React components: FC, explicit return types',
            'Typing props: required, optional, union types, callback props',
            'Typing useState: useState(null)',
            'Typing useRef: useRef(null)',
            'Typing events: React.ChangeEvent, React.MouseEvent, React.FormEvent',
            'Generic components: List, Select',
            'Typing context with createContext and proper defaults',
            'Discriminated unions for component variants'
          ],
          'React Architecture': [
            'JSX: how Babel transforms it, JSX is just function calls',
            'Functional components: why class components are legacy',
            'Props: data flows down — unidirectional data flow',
            'useState: immutability, state batching in React 18, functional updates',
            'useEffect: effects, dependency array, cleanup — the three variants and when to use each',
            'useContext: avoid prop drilling — when context is and isn\'t appropriate',
            'useReducer: complex state, dispatch pattern, integrating with context',
            'Custom hooks: extract and reuse stateful logic — the superpower of hooks',
            'React Router v6: BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate, useLocation',
            'Performance: React.memo, useMemo, useCallback — understand when NOT to use them (premature optimization)',
            'Error boundaries: class component, react-error-boundary library, fallback UI',
            'Suspense and lazy: code splitting, dynamic imports for route-level chunks'
          ],
          'Frontend Tooling & Architecture': [
            'Vite: fast dev server with HMR, build with Rollup, environment variables',
            'npm/yarn/pnpm: package.json, package-lock.json, peer dependencies',
            'Tailwind CSS: utility-first, responsive variants, dark mode, arbitrary values',
            'Zustand: simple global state — when context isn\'t enough but Redux is overkill',
            'TanStack Query (React Query): server state, caching, background refetch, optimistic updates',
            'Axios vs Fetch: interceptors, request/response transformation, cancellation',
            'Zod: runtime schema validation — pair with TypeScript for end-to-end type safety',
            'Testing: Vitest (fast, Vite-native), React Testing Library (user-centric tests)',
            'Storybook: component documentation and visual testing — used in real teams',
            'Accessibility: WCAG AA, keyboard navigation, screen reader testing, axe DevTools'
          ]
        },
        projects: [
          { name: 'Portfolio Site', description: 'Custom responsive site, zero templates', level: 'Int', outcome: 'Mobile-first, dark mode, animations, WCAG AA accessible, deployed on Vercel, Lighthouse 90+' },
          { name: 'Weather Dashboard', description: 'OpenWeatherMap API, TypeScript, React Query', level: 'Int', outcome: '5-day forecast, charts with Recharts, geolocation, skeleton loading, error states' },
          { name: 'Full-Stack Task App', description: 'React + TypeScript consuming CS301 Task API', level: 'Adv', outcome: 'Auth flow, optimistic updates, real-time via WebSocket, PWA, offline support' },
          { name: 'Real-Time Chat UI', description: 'WebSocket chat with full TypeScript', level: 'Adv', outcome: 'Typing indicators, read receipts, message history, rooms, emoji reactions' },
        ],
        resources: [
          { name: 'javascript.info', type: 'Website', cost: 'Free', stars: 5, url: 'https://javascript.info', notes: 'Most thorough JS resource ever written — read every chapter' },
          { name: 'react.dev', type: 'Docs', cost: 'Free', stars: 5, url: 'https://react.dev', notes: 'Official React docs, completely rewritten, excellent — primary reference' },
          { name: 'Total TypeScript (React)', type: 'Course', cost: 'Paid', stars: 5, url: 'https://totaltypescript.com', notes: 'Best typed React patterns — worth the investment' },
          { name: 'The Odin Project', type: 'Course', cost: 'Free', stars: 5, url: 'https://theodinproject.com', notes: 'Project-based full curriculum for HTML/CSS/JS fundamentals' },
        ],
        commonMistakes: [
          'Not using TypeScript strictly — any and @ts-ignore defeat the purpose',
          'Putting all state in Context — most state should be local, not global',
          'Not testing from the user\'s perspective — test what the user sees, not implementation details',
          'Ignoring accessibility — broken keyboard navigation fails interviews at companies that care',
          'Over-using useEffect — most side effects belong elsewhere (event handlers, React Query)'
        ],
        selfCheck: [
          'Can you explain the JavaScript event loop with a code example that surprises most developers?',
          'Can you build a fully typed React form with validation using Zod and React Hook Form?',
          'Can you explain all three forms of useEffect dependency array and when each is appropriate?',
          'Can you implement an optimistic update in TanStack Query from scratch?',
          'Can you score 90+ on Lighthouse for your portfolio site?'
        ],
        whenStuck: 'If React re-renders are confusing: install React DevTools, enable \'Highlight updates when components render\'. You\'ll see exactly what re-renders and why. Add React.memo only after you see a problem.'
      },
      {
        id: 'CS303',
        name: 'System Design',
        hours: 90,
        duration: '8 weeks',
        difficulty: 'Hard',
        prerequisites: ['CS203', 'CS204', 'CS301'],
        description: "System design is how senior engineers think. It's about designing systems that serve millions of users without falling over. You won't master this in 8 weeks — but you must build the vocabulary now and deepen it on the job through every system you touch.",
        topics: ['Scalability Foundations', 'Core Infrastructure Components', 'Design Case Studies', 'Reliability & Operations'],
        subtopics: {
          'Scalability Foundations': [
            'Vertical vs horizontal scaling: when each applies, limits of each',
            'Load balancers: round-robin, least connections, IP hashing, sticky sessions',
            'Caching strategies: cache-aside (lazy), write-through, write-behind, read-through',
            'Cache eviction policies: LRU, LFU, FIFO — which to use when',
            'CDNs: push vs pull, edge caching, cache invalidation, geographic distribution',
            'Database scaling: read replicas (lag), sharding (horizontal partitioning), partitioning strategies',
            'Consistent hashing: how distributed systems map keys to nodes without remapping everything'
          ],
          'Core Infrastructure Components': [
            'Message queues: async processing, decoupling producers from consumers, at-least-once delivery',
            'Kafka: topics, partitions, consumer groups, offset management, exactly-once semantics',
            'RabbitMQ vs Kafka vs SQS: when each is the right tool',
            'Microservices vs monolith: the real tradeoffs, not the hype — start monolith, extract services',
            'API gateway: single entry point, routing, rate limiting, auth, request transformation',
            'Service discovery: Consul, Kubernetes service discovery — how services find each other',
            'Circuit breaker pattern: prevent cascade failures, Hystrix, resilience4j concepts'
          ],
          'Design Case Studies': [
            'URL Shortener: hash function, collision handling, custom aliases, analytics, TTL',
            'Social Feed (Twitter): fanout on write vs fanout on read — when each wins',
            'Video Streaming (YouTube): chunking, transcoding pipeline, adaptive bitrate, CDN strategy',
            'Ride-Sharing (Grab/Uber): geospatial indexing (geohash, quadtree), driver matching, surge pricing',
            'Chat Application (Slack): WebSockets, message ordering, presence, search at scale',
            'Notification System: fan-out, push vs pull, SMS/email/push at scale, delivery receipts',
            'Distributed File Storage (Google Drive): chunking, deduplication, sync protocol, conflict resolution',
            'Search Engine: inverted index, TF-IDF, ranking signals, query parsing'
          ],
          'Reliability & Operations': [
            'CAP theorem: you can only have 2 — know which 2 each major system chooses and why',
            'PACELC: extends CAP — latency vs consistency tradeoff when no partition',
            'Fault tolerance: replication factor, failover, circuit breaker, bulkhead pattern',
            'Monitoring: the four golden signals (latency, traffic, errors, saturation)',
            'SLA/SLO/SLI: definitions, how to set realistic targets, error budgets',
            'Distributed tracing: correlation IDs, Jaeger, OpenTelemetry, trace sampling',
            'Chaos engineering: deliberately break things to find weaknesses before users do'
          ]
        },
        projects: [
          { 
            name: 'URL Shortener', 
            description: 'End-to-end with Redis caching + analytics', 
            level: 'Adv', 
            outcome: 'Custom aliases, click analytics dashboard, expiry, rate limiting, deployed, load tested' 
          },
          { 
            name: 'Design Documents', 
            description: 'Architecture docs for 5 case studies', 
            level: 'Adv', 
            outcome: 'Each: requirements, capacity estimates, component diagram, data model, API design, tradeoffs' 
          },
        ],
        resources: [
          { name: 'System Design Primer', type: 'GitHub', cost: 'Free', stars: 5, url: 'https://github.com/donnemartin/system-design-primer', notes: 'Largest free system design resource' },
          { name: 'ByteByteGo (Alex Xu)', type: 'YouTube/Book', cost: 'Mixed', stars: 5, url: 'https://bytebytego.com', notes: 'Best visual explanations — watch free YouTube, buy the book if you can' },
          { name: 'DDIA (Kleppmann)', type: 'Book', cost: 'Paid', stars: 5, notes: 'Designing Data-Intensive Applications — the most important tech book' },
          { name: 'Grokking SD Interview', type: 'Course', cost: 'Paid', stars: 4, url: 'https://www.educative.io', notes: 'Structured interview format, good if budget allows' },
        ],
        commonMistakes: [
          'Starting with solutions before clarifying requirements — always clarify scale first',
          'Not making explicit tradeoffs — \'it depends\' without explanation is not an answer',
          'Over-engineering for a startup\'s scale — design for 10x your current load, not 1000x',
          'Not knowing the numbers: 1ms RAM access, 1ms network, 10ms disk — know these cold',
          'Designing everything as microservices from day one — start with a monolith'
        ],
        selfCheck: [
          'Can you design a URL shortener end-to-end in 45 minutes including tradeoffs?',
          'Can you explain CAP theorem with a concrete example of each combination?',
          'Can you describe 3 different strategies to scale a read-heavy PostgreSQL database?',
          'Can you explain what a message queue solves that a synchronous API call cannot?',
          'Can you describe the fanout problem in social feeds and both solutions?'
        ],
        whenStuck: "In a system design interview: always start by clarifying requirements and estimating scale. Jumping to solutions without scope is the #1 mistake senior engineers see. 'Let me clarify first' always impresses."
      },
      {
        id: 'CS304',
        name: 'Software Engineering Practices & DevOps',
        hours: 50,
        duration: '4 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['CS202', 'CS301'],
        description: "Real-world software is a team sport. This is how code goes from an idea in your head to a feature running in production without breaking things. Learn these practices now so your first job doesn't shock you.",
        topics: ['Agile & Team Workflow', 'CI/CD Pipeline Mastery', 'Code Quality & Professionalism', 'Engineering Soft Skills'],
        subtopics: {
          'Agile & Team Workflow': [
            "Agile manifesto: what it actually says vs how it's misused",
            'Scrum: sprints (2 weeks), daily standups (15 min max), sprint review, retrospective',
            'Kanban: visualize work, WIP limits, cycle time — good for ops and maintenance work',
            'Git workflow: Gitflow vs trunk-based development — when each works',
            'PR discipline: small PRs (< 400 lines), good descriptions, self-review before requesting review',
            'Code review culture: be kind, be specific, explain the why, distinguish blocker vs nit',
            'Conventional commits: feat, fix, docs, chore, refactor, test, perf, ci'
          ],
          'CI/CD Pipeline Mastery': [
            'CI: run tests automatically on every push — non-negotiable',
            'CD: deploy automatically on merge to main — not just possible but expected',
            'GitHub Actions: YAML syntax, jobs, steps, actions marketplace, secrets management',
            'Writing efficient workflows: caching dependencies, parallel jobs, matrix builds',
            'Docker in pipelines: build image, push to registry (Docker Hub, GHCR), tag strategy',
            'Environment management: dev, staging, production — promote through environments',
            'Feature flags: deploy code without activating features — LaunchDarkly, custom flags',
            'Rollback strategy: how to revert a bad deployment safely'
          ],
          'Code Quality & Professionalism': [
            'Code review: what to look for — correctness, security, performance, readability, tests',
            'Technical debt: categorize it (intentional vs accidental), track it, pay it down regularly',
            'Refactoring safely: rename, extract function, extract class, inline, move — with tests',
            'Documentation: docstrings (Google/NumPy style), README (what, why, how, examples)',
            'ADR (Architecture Decision Records): document why you made a decision, not just what',
            'Structured logging: JSON format, correlation IDs, log levels, what to log and what not to',
            'Error monitoring: Sentry — every unhandled exception tracked, alerted, assigned'
          ],
          'Engineering Soft Skills': [
            'Writing clear bug reports: reproduction steps, expected vs actual, environment, logs',
            'Asking for help effectively: show what you tried, share the error, share context',
            'Technical communication: explain decisions without jargon to non-technical stakeholders',
            'Estimating work: range estimates, what you know vs what you need to learn',
            'Giving and receiving critical feedback: direct, kind, specific, actionable',
            'Meeting discipline: come prepared, take notes, confirm decisions, follow up in writing'
          ]
        },
        projects: [
          { 
            name: 'Full CI/CD Pipeline', 
            description: 'GitHub Actions for Blog API: test, lint, build, deploy', 
            level: 'Int', 
            outcome: 'Tests on every PR, build Docker on merge, deploy to cloud, Sentry alerts on failure' 
          },
          { 
            name: 'Open Source Contribution', 
            description: 'Real PR merged to an open source project', 
            level: 'Int', 
            outcome: 'Fix a real bug or add a real feature — document the full process in your portfolio' 
          }
        ],
        resources: [
          { name: 'GitHub Actions Docs', type: 'Docs', cost: 'Free', stars: 5, url: 'https://docs.github.com/actions', notes: 'Official docs — comprehensive, well-structured' },
          { name: 'Google Engineering Practices', type: 'Docs', cost: 'Free', stars: 5, url: 'https://google.github.io/eng-practices', notes: 'How Google does code review, read fully' },
          { name: 'The Pragmatic Programmer', type: 'Book', cost: 'Paid', stars: 5, notes: 'Hunt & Thomas — essential reading for every professional engineer' },
          { name: 'Accelerate (Forsgren)', type: 'Book', cost: 'Paid', stars: 4, notes: 'Science of DevOps — evidence-based engineering practices' }
        ],
        commonMistakes: [
          'Writing PRs that are 2000 lines — nobody reviews them properly, they just approve',
          'Skipping the staging environment — deploying dev directly to prod causes incidents',
          'Treating CI as optional — CI is your safety net, never disable it',
          'Not writing ADRs — you will forget why you made architectural decisions without them'
        ],
        selfCheck: [
          'Can you write a complete GitHub Actions workflow from scratch including matrix builds?',
          'Can you explain the difference between CI and CD and give examples of each?',
          'Can you write a constructive, kind, and specific code review comment on a junior\'s PR?',
          'Can you write an Architecture Decision Record for a technology choice you made?'
        ],
        whenStuck: 'If a CI pipeline fails: read the log from the top, not the bottom. Every failure has a root cause clearly stated. Jumping to the bottom and guessing wastes 30 minutes. Read top to bottom, once.'
      },
      {
        id: 'CS305',
        name: 'Cloud Fundamentals (AWS & GCP)',
        hours: 70,
        duration: '4 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['CS301', 'CS304'],
        description: "Cloud is not optional in 2025 — it is where every application runs. AWS and GCP are listed in the majority of PH tech job postings for mid-level and above. Understanding cloud fundamentals makes you immediately more productive on day one of any job.",
        topics: ['AWS Core Services', 'GCP Core Services', 'Cloud Architecture Patterns', 'Cloud in Practice'],
        subtopics: {
          'AWS Core Services': [
            'IAM: users, groups, roles, policies, principle of least privilege',
            'EC2: instances, AMIs, security groups, key pairs, user data scripts',
            'VPC: subnets (public vs private), route tables, internet gateways, NAT gateways',
            'S3: buckets, objects, storage classes, versioning, lifecycle policies',
            'RDS: managed PostgreSQL/MySQL, snapshots, read replicas, Multi-AZ',
            'ElastiCache: managed Redis/Memcached — cache your database queries',
            'Lambda: serverless functions, triggers (API Gateway, S3, SQS), cold starts',
            'API Gateway: REST vs HTTP APIs, rate limiting, usage plans, Lambda integration',
            'CloudWatch: logs, metrics, alarms, dashboards — your observability layer',
            'Route 53: DNS management, health checks, routing policies'
          ],
          'GCP Core Services': [
            'IAM: service accounts, roles, bindings — different from AWS but same concepts',
            'Compute Engine: VMs, machine types, preemptible instances (equivalent to EC2)',
            'Cloud Storage: buckets, ACLs, signed URLs (equivalent to S3)',
            'Cloud SQL: managed PostgreSQL/MySQL (equivalent to RDS)',
            'Cloud Run: serverless containers — easier than Lambda for web APIs',
            'BigQuery: serverless data warehouse — SQL on petabyte-scale data',
            'Cloud Build: CI/CD pipelines — GitHub Actions alternative in GCP',
            'Vertex AI: managed ML platform — where CS403 models go in production',
            'Cloud Functions: event-driven serverless (equivalent to Lambda)'
          ],
          'Cloud Architecture Patterns': [
            'Three-tier architecture: load balancer > app servers > database',
            'Serverless architecture: API Gateway + Lambda/Cloud Run + managed DB',
            'Container architecture: Kubernetes overview — pods, services, deployments',
            'Infrastructure as Code: Terraform basics — define, version, and review infrastructure',
            'Cost management: spot/preemptible instances, right-sizing, reserved instances, billing alerts',
            'Security: security groups, NACLs, VPC flow logs, CloudTrail, GuardDuty',
            'High availability: multi-AZ deployment, health checks, auto-scaling groups'
          ],
          'Cloud in Practice': [
            'Deploying a FastAPI app to Cloud Run: Dockerfile, Cloud Build, env vars',
            'Setting up a PostgreSQL instance on Cloud SQL or RDS with connection pooling',
            'Storing user-uploaded files in S3/Cloud Storage with pre-signed URLs',
            'Setting up CloudWatch/Cloud Logging dashboards for your applications',
            'Cost estimation: AWS Pricing Calculator, GCP Pricing Calculator',
            'AWS/GCP Free Tier: what\'s actually free, usage limits, how to avoid surprise bills',
            'Certification roadmap: AWS Solutions Architect Associate or GCP Associate Cloud Engineer'
          ]
        },
        projects: [
          { 
            name: 'Cloud-Deployed API', 
            description: 'Deploy CS301 Blog API on Cloud Run or EC2', 
            level: 'Int', 
            outcome: 'VPC with private subnet for DB, S3 for files, Redis on ElastiCache, CloudWatch alerts' 
          },
          { 
            name: 'Serverless Image Processor', 
            description: 'Lambda/Cloud Function that resizes uploaded images', 
            level: 'Int', 
            outcome: 'Triggered by S3 upload, stores resized versions, no server to manage, pay per invocation' 
          }
        ],
        resources: [
          { name: 'AWS Free Tier', type: 'Platform', cost: 'Free', stars: 5, url: 'https://aws.amazon.com/free', notes: 'Create an account and build with free tier services' },
          { name: 'Cloud Run Documentation', type: 'Docs', cost: 'Free', stars: 5, url: 'https://cloud.google.com/run', notes: 'Simplest way to deploy containers, excellent docs' },
          { name: 'AWS Solutions Architect Study', type: 'Course', cost: 'Mixed', stars: 4, notes: 'Adrian Cantrill or Stephane Maarek — both excellent for SAA-C03' },
          { name: 'Terraform Getting Started', type: 'Docs', cost: 'Free', stars: 4, url: 'https://developer.hashicorp.com/terraform/tutorials', notes: 'Official, hands-on' }
        ],
        commonMistakes: [
          'Using the root AWS account for everything — always use IAM with least privilege',
          'Not setting billing alerts — surprise cloud bills happen to experienced engineers too',
          'Not understanding the free tier limits — some services are free up to a limit, then expensive',
          'Treating cloud as just \'someone else\'s computer\' — understanding the primitives matters',
          'Not using IaC (Terraform) — clicking in the console doesn\'t scale'
        ],
        selfCheck: [
          'Can you explain the difference between a security group and a NACL in AWS?',
          'Can you deploy a containerized FastAPI app to Cloud Run using Cloud Build?',
          'Can you explain what IAM roles are and why they are more secure than IAM users?',
          'Can you estimate the monthly cost of running a small web app on AWS?',
          'Can you explain the difference between Lambda and Cloud Run and when to use each?'
        ],
        whenStuck: 'If a cloud deployment fails: check the logs first (CloudWatch/Cloud Logging). 90% of issues are: wrong IAM permissions, misconfigured security groups, or missing environment variables.'
      },
      {
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
        description: 'Real jobs consist of maintaining code you didn\'t write, that was written in a rush, by people who left 2 years ago. This module teaches you how to read, understand, and safely refactor legacy code.',
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
      },
    ],
  },
  {
    id: 4,
    name: 'Machine Learning & AI Engineering',
    duration: '9-12 months',
    hours: 820,
    color: '#f59e0b',
    description: 'Your ultimate destination. Math meets code. Every phase before this was preparation.',
    mustComplete: ['CS401 ML Foundations (all modules)', 'CS402 Deep Learning (Modules 1-6)', 'CS403 MLOps + LLM Engineering'],
    niceToHave: ['CS404 pick ONE specialization track', 'CS406 Data Engineering (if targeting data-heavy roles)', 'CS405 Data Visualization'],
    interviewHabit: 'From Phase 4: apply to ML roles even before Phase 4 is complete. Companies often hire ML engineers with strong Python/backend skills and train ML on the job. Your CS201-CS305 background already makes you competitive for many ML adjacent roles.',
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
        name: 'Machine Learning Foundations',
        hours: 200,
        duration: '14 weeks',
        difficulty: 'Hard',
        prerequisites: ['CS102', 'CS101', 'CS201'],
        description: "Every ML algorithm has a mathematical story behind it. Learn the story first — the code follows naturally. The most important skill in ML is not knowing which algorithm to use — it is feature engineering. Spend more time on Module 4 than on anything else.",
        topics: ['Module 1: ML Fundamentals', 'Module 2: Supervised Learning Algorithms', 'Module 3: Unsupervised Learning', 'Module 4: Feature Engineering — The Most Impactful Skill', 'Module 5: Model Optimization'],
        subtopics: {
          'Module 1: ML Fundamentals': [
            'What is ML: supervised, unsupervised, reinforcement, self-supervised — definitions and examples',
            'The ML pipeline: problem definition > data collection > EDA > preprocessing > feature engineering > modeling > evaluation > deployment > monitoring',
            'Bias-variance tradeoff: the central tension of all of ML — understand this deeply',
            'Overfitting: too complex, memorizes training data — detection via train-val gap',
            'Underfitting: too simple, misses patterns — detection via high training error',
            'Train/validation/test split: why 3 sets, never touch test until final evaluation',
            'Cross-validation: k-fold, stratified k-fold (for imbalanced), time-series split',
            'Evaluation metrics: accuracy, precision, recall, F1, AUC-ROC, PR curve',
            'Regression metrics: MSE, RMSE, MAE, MAPE, R-squared — when each is appropriate'
          ],
          'Module 2: Supervised Learning Algorithms': [
            'Linear Regression: cost function (MSE), gradient descent, normal equation, assumptions, R^2',
            'Logistic Regression: sigmoid function, log loss, decision boundary, regularization',
            'Decision Trees: information gain, Gini impurity, pruning, max_depth, min_samples_leaf',
            'Random Forest: bagging, out-of-bag error, feature importance — most reliable baseline',
            'Gradient Boosting: sequential ensembles, XGBoost, LightGBM, CatBoost',
            'SVM: hyperplane, support vectors, margin, kernel trick (RBF, polynomial)',
            'K-Nearest Neighbors: distance metrics, curse of dimensionality',
            'Naive Bayes: conditional independence, text classification, Laplace smoothing'
          ],
          'Module 3: Unsupervised Learning': [
            'K-Means: algorithm, elbow method, silhouette score, limitations',
            'Hierarchical clustering: agglomerative (bottom-up), dendrogram, linkage criteria (Ward)',
            'DBSCAN: density-based, handles arbitrary shapes, no K needed, handles noise',
            'PCA: variance explained, scree plot, when to use it',
            't-SNE: visualization only, perplexity parameter (do NOT use for features)',
            'UMAP: faster than t-SNE, preserves global structure, can be used for features',
            'Association rules: support, confidence, lift, Apriori algorithm'
          ],
          'Module 4: Feature Engineering — The Most Impactful Skill': [
            'EDA: describe(), value_counts(), hist(), pairplot(), heatmap(), distributions and outliers',
            'Missing values: understand WHY data is missing (MCAR, MAR, MNAR) before imputing',
            'Imputation: mean/median/mode, KNN impute, iterative imputer, flag missingness',
            'Categorical encoding: one-hot, label, target (high cardinality), binary',
            'Feature scaling: StandardScaler, MinMaxScaler, RobustScaler (outliers present)',
            'Outlier detection: IQR method, Z-score, Isolation Forest — cap or remove',
            'Feature selection: correlation matrix, mutual information, permutation importance, RFE',
            'Feature creation: datetime features, interaction terms, polynomial features',
            'Imbalanced datasets: SMOTE, ADASYN, class_weight=\'balanced\', threshold tuning',
            'Target leakage: the silent killer — never let future information into training'
          ],
          'Module 5: Model Optimization': [
            'Hyperparameter tuning: GridSearchCV, RandomizedSearchCV, Optuna (Bayesian)',
            'Optuna: define objective, suggest parameters, pruning, visualization',
            'sklearn Pipeline: chain preprocessing + model — prevents data leakage',
            'Regularization: L1 (Lasso), L2 (Ridge), Elastic Net',
            'Calibration: Platt scaling, isotonic regression — accurate probabilities',
            'Learning curves: diagnose whether more data or a better model is needed',
            'Ensemble methods: voting (soft/hard), stacking (meta-learner), blending'
          ]
        },
        projects: [
          { 
            name: 'Kaggle: Titanic', 
            description: 'EDA + 5 algorithms + ensemble + submission', 
            level: 'Int', 
            outcome: 'Top 10% ranking, documented feature engineering decisions, algorithm comparison table' 
          },
          { 
            name: 'Spam Classifier', 
            description: 'NLP classification with multiple algorithms', 
            level: 'Adv', 
            outcome: 'TF-IDF + 5 algorithms, precision-recall tradeoff analysis, ROC curves, confusion matrices' 
          },
          { 
            name: 'PH Customer Segmentation', 
            description: 'K-Means on Philippine e-commerce dataset', 
            level: 'Adv', 
            outcome: 'Optimal K via elbow + silhouette, cluster profiling, actionable business recommendations' 
          },
          { 
            name: 'House Price Prediction', 
            description: 'End-to-end regression with full feature engineering', 
            level: 'Adv', 
            outcome: 'Feature importance analysis, log transforms, stacking ensemble, RMSE under 0.13' 
          }
        ],
        resources: [
          { name: 'Andrew Ng ML Specialization', type: 'Course', cost: 'Free', stars: 5, url: 'https://www.coursera.org/specializations/machine-learning-introduction', notes: 'Audit free, the most important ML course ever made, do everything' },
          { name: 'Hands-On ML (Geron)', type: 'Book', cost: 'Paid', stars: 5, notes: 'Best practical ML book — Python, scikit-learn, TF, Keras — read every chapter' },
          { name: 'Kaggle Learn', type: 'Course', cost: 'Free', stars: 4, url: 'https://www.kaggle.com/learn', notes: 'Free short courses on ML, feature engineering, data viz — excellent quality' },
          { name: 'Scikit-learn User Guide', type: 'Docs', cost: 'Free', stars: 5, url: 'https://scikit-learn.org/stable/user_guide.html', notes: 'Best ML library docs — read the user guide, not just API reference' }
        ],
        commonMistakes: [
          'Using test data for any decision during development — this includes feature engineering',
          'Not doing EDA before modeling — you will miss data quality issues that ruin models',
          'Treating feature engineering as less important than algorithm selection — it\'s the opposite',
          'Optimizing for accuracy on imbalanced datasets — use F1 or AUC-ROC instead',
          'Not understanding what a model is actually doing — black-box thinking leads to bad decisions'
        ],
        selfCheck: [
          'Can you explain the bias-variance tradeoff using a diagram you drew yourself?',
          'Can you derive gradient descent for linear regression from scratch on paper?',
          'Can you explain why target leakage is dangerous and give a real example?',
          'Can you describe 5 ways to handle an imbalanced classification dataset with tradeoffs?',
          'Can you explain what a kernel does in SVM without using the word \'kernel\'?',
          'Can you explain when you would choose XGBoost over Random Forest?'
        ],
        whenStuck: 'If your model is not performing: 80% of the time the problem is the data, not the algorithm. Check: target leakage, data distribution shift between train/test, incorrect label encoding, missing value handling. Plot everything before changing the model.'
      },
      {
        id: 'CS402',
        name: 'Deep Learning & Neural Networks',
        hours: 230,
        duration: '14 weeks',
        difficulty: 'Very Hard',
        prerequisites: ['CS401', 'CS102'],
        description: "Deep learning is the hardest subject in this curriculum. The math is real, the debugging is painful, and the rewards are extraordinary. Every expert in this field struggled at backpropagation once. Be patient. The breakthrough moments are worth the struggle.",
        topics: ['Module 1: Neural Network Foundations', 'Module 2: Regularization & Training Tricks', 'Module 3: Convolutional Neural Networks', 'Module 4: Recurrent Networks & Sequence Modeling', 'Module 5: Transformers & Attention Mechanism', 'Module 6: Generative Models', 'Module 7: PyTorch in Depth'],
        subtopics: {
          'Module 1: Neural Network Foundations': [
            'Perceptron: linear classifier, XOR problem, limitations',
            'Multilayer Perceptron: hidden layers, universal approximation theorem',
            'Forward pass: matrix multiplications + activation functions — implement in numpy first',
            'Activation functions: Sigmoid, Tanh, ReLU, Leaky ReLU, GELU, Swish',
            'Loss functions: MSE, Binary CrossEntropy, Categorical CrossEntropy',
            'Backpropagation: chain rule applied to computation graphs — DERIVE THIS ON PAPER',
            'Weight initialization: Xavier/Glorot (sigmoid/tanh), He (ReLU)',
            'Gradient descent: batch, mini-batch, stochastic (SGD)',
            'Optimizers: SGD (momentum), RMSProp, Adam, AdamW (weight decay)'
          ],
          'Module 2: Regularization & Training Tricks': [
            'Dropout: randomly zero activations — ensembling effect',
            'Batch normalization: normalize layer inputs, accelerates training',
            'Layer normalization: used in Transformers and RNNs',
            'Early stopping: monitor validation loss, patience, save best weights',
            'Learning rate schedules: warmup, step decay, cosine annealing, OneCycleLR',
            'Gradient clipping: clip_grad_norm_ — essential for RNNs',
            'Weight decay: L2 regularization in optimizer (AdamW)',
            'Mixed precision training: float16 for speed, float32 for stability'
          ],
          'Module 3: Convolutional Neural Networks': [
            'Convolution operation: filter, stride, padding, output size formula',
            'Feature maps: what each filter learns, visualize with Grad-CAM',
            'Pooling: max pooling (position invariance), average pooling, global average pooling',
            'Classic architectures: LeNet, AlexNet, VGG, ResNet (skip connections), EfficientNet',
            'Why ResNet works: skip connections prevent vanishing gradient',
            'Transfer learning: freeze backbone, train head',
            'Fine-tuning: unfreeze later layers with low LR',
            'Data augmentation: RandomCrop, ColorJitter, Mixup, CutMix, AugMix'
          ],
          'Module 4: Recurrent Networks & Sequence Modeling': [
            'Why standard NNs fail on sequences: fixed input size, no temporal memory',
            'Vanilla RNN: hidden state recurrence, BPTT (backprop through time)',
            'Vanishing gradient in RNNs: why gradients die over long sequences',
            'LSTM: cell state, forget gate, input gate, output gate — draw and understand',
            'GRU: simplified LSTM — reset gate + update gate, fewer parameters',
            'Bidirectional RNN: process sequence in both directions',
            'Sequence-to-sequence: encoder encodes input, decoder generates output'
          ],
          'Module 5: Transformers & Attention Mechanism': [
            'Attention intuition: focus on relevant words',
            'Scaled dot-product attention: Q, K, V matrices, implement from scratch',
            'Why scale by sqrt(d_k): prevents softmax saturation',
            'Multi-head attention: parallel attention heads, concatenate, project',
            'Positional encoding: inject sequence position since attention is permutation-invariant',
            'Transformer encoder (BERT) and Transformer decoder (GPT)',
            'BERT: masked language modeling, NSP, bidirectional context',
            'GPT family: autoregressive (predict next token), causal masking, emergent abilities',
            'Vision Transformer (ViT): transformer encoder on image patches'
          ],
          'Module 6: Generative Models': [
            'Autoencoders: encoder compresses to latent space, decoder reconstructs',
            'Variational Autoencoder (VAE): probabilistic latent space, reparameterization trick',
            'GAN: generator fools discriminator, minimax game, Nash equilibrium',
            'GAN training instability: mode collapse, vanishing gradients, WGAN',
            'Diffusion models: forward process adds noise, reverse process denoises (Stable Diffusion)',
            'Score matching and DDPM: theoretical foundation of modern generation',
            'LLM training: pretraining (next token), SFT (instructions), RLHF (alignment)'
          ],
          'Module 7: PyTorch in Depth': [
            'Tensors: creation, indexing, broadcasting, device management (.to(\'cuda\'))',
            'Autograd: computation graph, requires_grad, .backward(), .grad',
            'nn.Module: define layers, implement forward(), state_dict()',
            'DataLoader: custom Dataset class, __getitem__, transforms, batching',
            'Training loop: zero_grad(), forward, loss, backward, step() — from scratch',
            'Evaluation loop: model.eval(), torch.no_grad(), running metrics',
            'PyTorch Lightning: LightningModule, Trainer, callbacks, logging',
            'Debugging: detect_anomaly, gradient checking, NaN detection'
          ]
        },
        projects: [
          { 
            name: 'MNIST from Scratch', 
            description: 'Digit classifier, pure PyTorch, no pretrained', 
            level: 'Adv', 
            outcome: 'Custom Dataset, DataLoader, training loop, 99%+ accuracy, confusion matrix, Grad-CAM' 
          },
          { 
            name: 'Transfer Learning', 
            description: 'Fine-tune ResNet50 on custom Philippine dataset', 
            level: 'Adv', 
            outcome: '100+ images, 90%+ accuracy, compare frozen vs fine-tuned, Grad-CAM visualization' 
          },
          { 
            name: 'BERT Sentiment Analysis', 
            description: 'Fine-tune BERT on reviews dataset', 
            level: 'Adv', 
            outcome: 'HuggingFace Transformers, 93%+ F1, deployed as FastAPI endpoint with rate limiting' 
          },
          { 
            name: 'Kaggle Deep Learning', 
            description: 'Enter one image or NLP competition', 
            level: 'Expert', 
            outcome: 'Top 30% finish, public notebook with full explanation, training curves logged to W&B' 
          }
        ],
        resources: [
          { name: 'Andrej Karpathy (YouTube)', type: 'Video', cost: 'Free', stars: 5, url: 'https://www.youtube.com/@AndrejKarpathy', notes: 'makemore, nanoGPT, micrograd — best teacher for building from scratch' },
          { name: 'fast.ai Course', type: 'Course', cost: 'Free', stars: 5, url: 'https://course.fast.ai', notes: 'Practical Deep Learning — top-down approach, best for intuition first' },
          { name: 'deeplearning.ai', type: 'Course', cost: 'Free', stars: 5, url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', notes: 'Andrew Ng 5-course specialization, audit free, foundational' },
          { name: 'PyTorch Official Tutorials', type: 'Docs', cost: 'Free', stars: 4, url: 'https://pytorch.org/tutorials', notes: 'Official, comprehensive, always up to date' }
        ],
        commonMistakes: [
          'Not implementing backprop from scratch at least once — using autograd blindly is a trap',
          'Not overfitting a single batch first — verify model and data pipeline before training fully',
          'Using the wrong loss function for the task — more common than you think',
          'Not monitoring training curves — debug immediately if loss doesn\'t decrease smoothly',
          'Not normalizing input data — neural networks are very sensitive to input scale'
        ],
        selfCheck: [
          'Can you derive backpropagation for a 2-layer network on paper without any reference?',
          'Can you explain why ResNet\'s skip connections solve the vanishing gradient problem?',
          'Can you explain scaled dot-product attention intuitively, step by step?',
          'Can you implement a complete training loop in PyTorch from scratch in under 30 minutes?',
          'Can you explain what makes BERT different from GPT architecturally?',
          'Can you explain how diffusion models generate images at a high level?'
        ],
        whenStuck: 'Loss not decreasing? Step 1: overfit a single batch (set batch_size=1). If it converges, your architecture and loss are correct. If not, your forward pass or loss has a bug.'
      },
      {
        id: 'CS403',
        name: 'MLOps & LLM Engineering',
        hours: 130,
        duration: '10 weeks',
        difficulty: 'Hard',
        prerequisites: ['CS301', 'CS401'],
        description: "A model in a Jupyter notebook is not a product. MLOps is what separates data scientists from ML engineers. LLM Engineering is the hottest skill in the PH tech market in 2025-2026. This subject covers both — because they are now inseparable.",
        topics: [
          'ML Pipelines & Experiment Tracking',
          'Model Deployment Patterns',
          'Production ML Monitoring',
          'LLM Engineering — Part 1: Foundations',
          'LLM Engineering — Part 2: RAG & Agents',
          'LLM Engineering — Part 3: Fine-Tuning & Production'
        ],
        subtopics: {
          'ML Pipelines & Experiment Tracking': [
            'Data versioning with DVC: dvc push/pull, remote storage',
            'Experiment tracking: MLflow — log params, metrics, registry',
            'Weights & Biases: sweeps for HPO, run comparison, collaboration',
            'Reproducibility: random seeds, Hydra configs, model hash',
            'Feature stores: Feast basics — centralized serving',
            'Data validation: Great Expectations, Pandera — validate data contracts'
          ],
          'Model Deployment Patterns': [
            'Model as REST API: FastAPI endpoint, request batching',
            'Model serialization: ONNX (portable), TorchScript (production)',
            'Containerizing ML: Docker with model files, multi-stage builds',
            'Cloud deployment: AWS SageMaker, GCP Vertex AI, HF Spaces',
            'Batch vs real-time inference: latency vs throughput tradeoff',
            'Model serving: BentoML, TorchServe, Triton Inference Server',
            'Quantization: int8, float16 — reduce model size by 4x'
          ],
          'Production ML Monitoring': [
            'Data drift: input distribution changes — Kolmogorov-Smirnov test, PSI',
            'Concept drift: relationship between X and y changes',
            'Model performance monitoring: log predictions and ground truth',
            'Evidently AI: open source drift detection and monitoring reports',
            'A/B testing ML models: shadow deployment, traffic split',
            'Canary deployment: route 5% of traffic, monitor, then increase',
            'Retraining triggers: scheduled, performance-based, drift-based'
          ],
          'LLM Engineering — Part 1: Foundations': [
            'Prompt engineering: zero-shot, few-shot, chain-of-thought (CoT)',
            'System prompts: persona, constraints, output format, tone',
            'Prompt chaining: break complex tasks into simpler prompts',
            'Output parsing: JSON mode, Pydantic validation of responses',
            'Token counting: tiktoken, manage context window limits',
            'Temperature and top-p: randomness and diversity control',
            'LLM APIs: OpenAI, Anthropic, Google Gemini — auth, limits, costs'
          ],
          'LLM Engineering — Part 2: RAG & Agents': [
            'RAG architecture: retrieve relevant context, augment, generate',
            'Document processing: PyPDF2, python-docx, unstructured',
            'Text chunking: fixed size, recursive, semantic chunking',
            'Embeddings: sentence-transformers (free), OpenAI embeddings',
            'Vector databases: FAISS, ChromaDB, Pinecone, Qdrant',
            'Retrieval: cosine similarity, MMR for diversity, hybrid search',
            'LangChain: chains, LCEL, retrievers, memory',
            'LlamaIndex: nodes, indexes, query engines — alternative to LangChain',
            'Agents and tools: ReAct pattern, tool calling, multi-step reasoning',
            'Evaluation: RAGAS (faithfulness, relevance), LLM-as-judge, human eval'
          ],
          'LLM Engineering — Part 3: Fine-Tuning & Production': [
            'When to fine-tune vs RAG: RAG for knowledge, fine-tuning for behavior',
            'LoRA: Low-Rank Adaptation — fine-tune with 1% of parameters',
            'QLoRA: LoRA + 4-bit quantization — fine-tune 7B models on 1 GPU',
            'PEFT library: LoRA, QLoRA, prefix tuning — HF ecosystem',
            'Training data preparation: instruction following format, quality > quantity',
            'Evaluation after fine-tuning: compare against base model',
            'Multi-agent systems: orchestrator + specialist agents, tool use',
            'Building a production LLM app: streaming, error handling, fallbacks'
          ]
        },
        projects: [
          { 
            name: 'ML Production API', 
            description: 'Trained model as FastAPI endpoint with full MLOps', 
            level: 'Adv', 
            outcome: 'MLflow tracking, Docker, versioned endpoints, drift monitoring, auto-retraining pipeline' 
          },
          { 
            name: 'RAG Document System', 
            description: 'Q&A over your own document collection', 
            level: 'Adv', 
            outcome: 'Chunking comparison, retrieval metrics, citation in answers, RAGAS evaluation, deployed' 
          },
          { 
            name: 'LLM Agent', 
            description: 'Multi-step agent that completes real tasks', 
            level: 'Adv', 
            outcome: 'Custom tools, ReAct loop, streaming, error recovery, cost tracking, deployed as web app' 
          },
          { 
            name: 'Fine-Tuned Model', 
            description: 'QLoRA fine-tune a 7B model for a specific task', 
            level: 'Expert', 
            outcome: 'Training data prep, PEFT training, evaluation vs base model, pushed to HuggingFace Hub' 
          }
        ],
        resources: [
          { name: 'Made With ML (Goku)', type: 'Course', cost: 'Free', stars: 5, url: 'https://madewithml.com', notes: 'Best free end-to-end ML engineering course' },
          { name: 'LangChain Docs', type: 'Docs', cost: 'Free', stars: 4, url: 'https://python.langchain.com', notes: 'Comprehensive but verbose, use with cookbook examples' },
          { name: 'Designing ML Systems (Huyen)', type: 'Book', cost: 'Paid', stars: 5, notes: 'The definitive guide to production ML — read every chapter' },
          { name: 'HuggingFace PEFT Docs', type: 'Docs', cost: 'Free', stars: 4, url: 'https://huggingface.co/docs/peft', notes: 'Official LoRA/QLoRA documentation' }
        ],
        commonMistakes: [
          'Jumping to fine-tuning when RAG would solve the problem better and cheaper',
          'Not chunking documents properly — bad chunking is the most common RAG failure mode',
          'Not evaluating LLM outputs systematically — vibe-checking is not evaluation',
          'Ignoring cost tracking — LLM APIs can get expensive very fast in production',
          'Not handling LLM failures (timeouts, rate limits, hallucinations) gracefully in production'
        ],
        selfCheck: [
          'Can you explain the difference between data drift and concept drift with real examples?',
          'Can you describe the RAG architecture completely — from document to answer?',
          'Can you explain when fine-tuning is better than RAG and when RAG is better than fine-tuning?',
          'Can you set up MLflow experiment tracking for a training run from scratch?',
          'Can you implement a ReAct agent with custom tools using LangChain or from scratch?',
          'Can you explain what RAGAS measures and how to interpret the scores?'
        ],
        whenStuck: 'RAG not returning relevant chunks? The problem is almost always: (1) bad chunking — try smaller chunks with overlap, (2) wrong embedding model — try a domain-specific one, (3) retrieval k too small — try k=10 then rerank.'
      },
      {
        id: 'CS404',
        name: 'ML Specialization (Pick One Track)',
        hours: 120,
        duration: '8 weeks',
        difficulty: 'Hard',
        prerequisites: ['CS402'],
        description: "After mastering foundations, go deep in one area. For the PH market in 2025-2026, NLP/LLM has the most demand followed by Computer Vision. Choose based on what genuinely excites you — you will go further in an area you love than one you tolerate.",
        topics: [
          'Track A: NLP & LLM Engineering',
          'Track B: Computer Vision',
          'Track C: Reinforcement Learning'
        ],
        subtopics: {
          'Track A: NLP & LLM Engineering': [
            'Text preprocessing: tokenization (word, character, subword), BPE, WordPiece, SentencePiece',
            'Classic embeddings: Word2Vec (CBOW, Skip-gram), GloVe, FastText',
            'HuggingFace Transformers: AutoModel, AutoTokenizer, Trainer API',
            'Text classification: fine-tune BERT/DistilBERT, multi-label, label smoothing',
            'NER: token classification, BIO tagging scheme, evaluation with seqeval',
            'Question Answering: extractive (SQuAD), abstractive (seq2seq)',
            'Summarization: extractive (TextRank), abstractive (BART, T5), ROUGE',
            'Translation: MarianMT, Helsinki-NLP models, BLEU evaluation',
            'Building LLM applications: structured output, function calling, streaming',
            'LLM evaluation: benchmark datasets, human eval, LLM-as-judge'
          ],
          'Track B: Computer Vision': [
            'Image preprocessing pipelines: torchvision transforms, albumentations',
            'Object detection: YOLOv8 (Ultralytics) — train on custom dataset',
            'Object detection metrics: mAP, IoU, precision-recall curve',
            'Image segmentation: semantic (U-Net), instance (Mask R-CNN), panoptic',
            'Segment Anything Model (SAM): zero-shot segmentation, prompts',
            'Facial recognition: face detection (MTCNN), embeddings (ArcFace)',
            'Video understanding: optical flow, temporal convolutions, slow-fast networks',
            'Deployment optimization: TensorRT, ONNX Runtime, quantization',
            'OpenCV: image processing, geometric transforms, feature detection (SIFT, ORB)'
          ],
          'Track C: Reinforcement Learning': [
            'MDP formulation: states S, actions A, rewards R, policy, value function',
            'Bellman equations: recursive definition of value — derive and understand',
            'Q-Learning: tabular, convergence, exploration-exploitation (epsilon-greedy)',
            'Deep Q-Network (DQN): experience replay, target network, double/dueling DQN',
            'Policy gradient: REINFORCE algorithm, baseline subtraction',
            'Actor-Critic: A2C (synchronous), A3C (asynchronous), advantage function',
            'PPO (Proximal Policy Optimization): clipped objective, trust region',
            'SAC (Soft Actor-Critic): entropy maximization, continuous action spaces',
            'OpenAI Gymnasium: CartPole, LunarLander, MuJoCo physics simulation',
            'Applications: game agents, robotic control, recommendation, RLHF'
          ]
        },
        projects: [
          { 
            name: 'NLP: Full Document QA', 
            description: 'Multi-document Q&A with HuggingFace + RAG', 
            level: 'Expert', 
            outcome: 'Handles 100+ documents, cites sources, deployed with React frontend, RAGAS evaluated' 
          },
          { 
            name: 'CV: YOLOv8 Detector', 
            description: 'Train on custom Philippine dataset', 
            level: 'Expert', 
            outcome: '85%+ mAP, real-time demo, deployed as mobile-friendly web app, data collection documented' 
          },
          { 
            name: 'RL: Multi-Task Agent', 
            description: 'PPO agent mastering 3 Gymnasium environments', 
            level: 'Expert', 
            outcome: 'Training curves in W&B, video recordings, reward shaping documented, hyperparameter study' 
          }
        ],
        resources: [
          { name: 'HuggingFace Course', type: 'Course', cost: 'Free', stars: 5, url: 'https://huggingface.co/learn', notes: 'Best free NLP/LLM course, very hands-on' },
          { name: 'Ultralytics YOLOv8', type: 'Docs', cost: 'Free', stars: 5, url: 'https://docs.ultralytics.com', notes: 'Excellent docs, train in 10 lines of code' },
          { name: 'Spinning Up in DRL', type: 'Course', cost: 'Free', stars: 4, url: 'https://spinningup.openai.com', notes: 'OpenAI\'s RL resource, mathematical but accessible' },
          { name: 'Papers With Code', type: 'Website', cost: 'Free', stars: 5, url: 'https://paperswithcode.com', notes: 'State-of-the-art with code, find datasets and baselines' }
        ],
        commonMistakes: [
          'Trying to do all three tracks — pick one and go deep, breadth comes later',
          'Not collecting your own dataset — a model trained on your own data is more impressive',
          'Evaluating with the wrong metrics — don\'t use accuracy for object detection',
          'Not publishing your project — push to HuggingFace Hub or GitHub with a live demo'
        ],
        selfCheck: [
          'Can you fine-tune a HuggingFace model end-to-end on a custom dataset?',
          'Can you explain the difference between BLEU and ROUGE and when each is appropriate?',
          'Can you explain why PPO is more stable than vanilla policy gradient — mathematically?',
          'Can you train a YOLOv8 model on a custom dataset and evaluate its mAP?'
        ],
        whenStuck: 'When fine-tuning feels overwhelming: start with the smallest model in the family (DistilBERT, YOLOv8n). Get it working first. Scale up only after you have a working baseline.'
      },
      {
        id: 'CS405',
        name: 'Data Visualization & Communication',
        hours: 40,
        duration: '3 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['CS401'],
        description: "Half the job of any ML or data role is communicating your findings to people who don't understand the math. A model that isn't understood won't be trusted. A finding that isn't visualized clearly won't be acted on. This subject makes your technical work land.",
        topics: [
          'Static Visualization',
          'Interactive Visualization',
          'Communicating ML Results'
        ],
        subtopics: {
          'Static Visualization': [
            'matplotlib: figure, axes, subplots, DPI, saving — the foundation',
            'Plot types: line, bar, scatter, histogram, box, violin, heatmap',
            'matplotlib styling: rcParams, stylesheets, color maps',
            'seaborn: pairplot, FacetGrid, categorical plots',
            'Pandas plotting: quick EDA plots directly from DataFrames',
            'Visualization principles: data-ink ratio, lie factor, color perception',
            'Color: accessible palettes (ColorBrewer), colorblind safety'
          ],
          'Interactive Visualization': [
            'Plotly: interactive charts, hover info, animations, export to HTML',
            'Plotly Express (high-level) vs Graph Objects (full control)',
            'Dash: full dashboards in Python — callbacks, layout, components',
            'Streamlit: fastest way to build ML demos for portfolio projects',
            'Gradio: ML model demos for HuggingFace Spaces deployment',
            'Tableau Public: learn the basics of a drag-and-drop BI tool'
          ],
          'Communicating ML Results': [
            'Executive summary: one paragraph, no jargon, improvements',
            'Model card: intended use, limitations, bias analysis',
            'Confusion matrix: visualize and explain to stakeholders',
            'Feature importance: SHAP values — explain individual predictions',
            'Learning curves: communicate model progress',
            'A/B test results: statistical significance, business impact',
            'Presentation structure: problem, data, approach, results, next steps'
          ]
        },
        projects: [
          { 
            name: 'EDA Dashboard', 
            description: 'Streamlit dashboard for a Kaggle dataset', 
            level: 'Int', 
            outcome: 'Interactive filters, multiple chart types, summary statistics, download report' 
          },
          { 
            name: 'ML Explainability Report', 
            description: 'SHAP analysis for your CS401 house price model', 
            level: 'Int', 
            outcome: 'Global feature importance, individual prediction explanation, partial dependence plots' 
          },
          { 
            name: 'Model Card', 
            description: 'Complete model card for your best CS402 model', 
            level: 'Int', 
            outcome: 'Follows HuggingFace format, includes bias analysis and limitations' 
          }
        ],
        resources: [
          { name: 'Matplotlib Documentation', type: 'Docs', cost: 'Free', stars: 4, url: 'https://matplotlib.org', notes: 'Comprehensive, use as reference' },
          { name: 'Streamlit Documentation', type: 'Docs', cost: 'Free', stars: 5, url: 'https://docs.streamlit.io', notes: 'Excellent docs, get an app running in 30 minutes' },
          { name: 'SHAP Library Docs', type: 'Docs', cost: 'Free', stars: 5, url: 'https://shap.readthedocs.io', notes: 'Explainability for any ML model, critical skill' },
          { name: 'Storytelling with Data', type: 'Book', cost: 'Paid', stars: 5, notes: 'Cole Knaflic — best book on data visualization communication' }
        ],
        commonMistakes: [
          'Using 3D pie charts or any chart that distorts perception',
          'Showing accuracy metrics to business stakeholders without explanation',
          'Not visualizing your model\'s failures — where it goes wrong is critical',
          'Ignoring colorblind accessibility (8% of men have deficiency)'
        ],
        selfCheck: [
          'Can you explain what SHAP values represent to a non-technical stakeholder?',
          'Can you build an interactive Streamlit dashboard in under 2 hours?',
          'Can you identify 3 things wrong with a poorly designed chart?',
          'Can you write a one-paragraph executive summary of model performance?'
        ],
        whenStuck: 'If your chart is confusing: remove half of it. Add a descriptive title that states the finding, not just the variables. Good charts have one clear message.'
      },
      {
        id: 'CS406',
        name: 'Data Engineering Foundations',
        hours: 80,
        duration: '6 weeks',
        difficulty: 'Hard',
        prerequisites: ['CS203', 'CS301'],
        description: "Many 'ML Engineer' job postings in the Philippines are actually Data Engineering roles in disguise. Even pure ML roles require data engineers upstream. This subject makes you T-shaped: strong ML foundations with enough data engineering to collaborate effectively — and enough to get data engineering roles as an alternative path.",
        topics: ['Data Pipeline Fundamentals', 'Modern Data Stack', 'Big Data Processing', 'Data Engineering in Practice'],
        subtopics: {
          'Data Pipeline Fundamentals': [
            'ETL vs ELT: extract-transform-load vs extract-load-transform',
            'Batch processing vs Stream processing (real-time dashboards)',
            'Orchestration: Airflow (standard), Prefect, Dagster',
            'Apache Airflow: DAGs, operators, sensors, XComs, UI',
            'Pipeline testing: unit tests, integration tests, quality checks'
          ],
          'Modern Data Stack': [
            'Data warehouses: OLAP vs OLTP, BigQuery, Snowflake',
            'dbt (data build tool): models, tests, lineage, SQL transformations',
            'dbt project structure: staging, intermediate, marts',
            'Data quality: dbt tests (unique, not_null, custom)',
            'Data catalog: metadata, column lineage, schema evolution'
          ],
          'Big Data Processing': [
            'Distributed computing: when pandas fails (> RAM size)',
            'Apache Spark: RDD, DataFrame API, SparkSQL, PySpark',
            'Spark concepts: driver, executors, partitions, shuffles',
            'Parquet format: columnar storage, compression, predicate pushdown',
            'Delta Lake: ACID transactions, time travel, schema enforcement',
            'Kafka: producers, consumers, topics, partitions'
          ],
          'Data Engineering in Practice': [
            'Data modeling: star schema (fact + dimension), snowflake schema',
            'Slowly Changing Dimensions (SCD): Type 1, 2, and 3',
            'Data lake architecture: bronze/silver/gold layers',
            'Data mesh concepts: domain ownership, data as a product',
            'Data engineering interview: SQL window functions, pipeline design'
          ]
        },
        projects: [
          { 
            name: 'Airflow ETL Pipeline', 
            description: 'Daily pipeline: API > transform > load to BigQuery', 
            level: 'Int', 
            outcome: 'Retries on failure, data quality checks, email alert, Streamlit dashboard' 
          },
          { 
            name: 'dbt Project', 
            description: 'Transform raw e-commerce data into analytics-ready models', 
            level: 'Int', 
            outcome: 'Staging, intermediate, mart layers, all tests passing, documented' 
          }
        ],
        resources: [
          { name: 'Fundamentals of Data Eng. (Reis)', type: 'Book', cost: 'Paid', stars: 5, notes: 'The definitive data engineering book — read chapters 1-6' },
          { name: 'dbt Documentation', type: 'Docs', cost: 'Free', stars: 5, url: 'https://docs.getdbt.com', notes: 'Excellent, with a free cloud version to practice' },
          { name: 'BigQuery Documentation', type: 'Docs', cost: 'Free', stars: 4, url: 'https://cloud.google.com/bigquery', notes: 'Free $300 credit to experiment' },
          { name: 'Apache Airflow Docs', type: 'Docs', cost: 'Free', stars: 4, url: 'https://airflow.apache.org', notes: 'Comprehensive, use Astronomer\'s tutorials to start' }
        ],
        commonMistakes: [
          'Using pandas for data that doesn\'t fit in RAM — use Spark instead',
          'Not testing data pipelines — silent wrong results are the worst',
          'Not handling schema evolution — upstream changes break pipelines',
          'Over-engineering small pipelines — a cron job is often sufficient'
        ],
        selfCheck: [
          'Can you explain the difference between ETL and ELT?',
          'Can you write a PySpark job that reads Parquet and writes to Cloud Storage?',
          'Can you explain the star schema and why it\'s preferred for analytics?',
          'Can you design a simple Airflow DAG for a daily pipeline?'
        ],
        whenStuck: 'If a Spark job is slow: look for shuffles. Shuffles move data across the network — they\'re expensive. Repartition before joins and use broadcast joins for small tables.'
      }
    ],
  },
  {
    id: 5,
    name: 'Career & Interview Preparation',
    duration: 'Ongoing — intensify 3 months before target start date',
    hours: 200,
    color: '#10b981',
    description: 'Skills mean nothing if you cannot demonstrate them under pressure. Get hired. Know your worth.',
    mustComplete: ['CS501 Technical interviews (DSA + system design)', 'CS502 Portfolio + job search strategy'],
    niceToHave: ['Open source contributions', 'Technical blog with 1000+ monthly readers', 'Conference talks'],
    interviewHabit: "Note: if you've been following the interview habits from each phase, you've already done 12+ mock interviews and 40+ Codeforces contests by the time you reach Phase 5. You are already prepared. This phase is refinement, not starting from zero.",
    capstone: {
      name: 'The Professional Candidate (You)',
      description: 'This phase has no technical capstone — you are the capstone. By this point, you have the full evidence of your expertise ready for the market.',
      requirements: [
        '4 deployed production projects (one per phase).',
        '10+ technical blog posts documenting your journey.',
        '20+ mock interviews completed via Pramp or peers.',
        'NeetCode 150 solved and understood.',
        '7 system design walkthroughs completed.',
        'Professional GitHub profile with consistent activity.',
        'LinkedIn profile optimized for inbound opportunities.',
        'The only thing left: Send 5 applications today.'
      ]
    },
    subjects: [
      {
        id: 'CS501',
        name: 'Technical Interview Mastery',
        hours: 120,
        duration: 'Intensify 3 months before applying',
        difficulty: 'Hard',
        prerequisites: ['CS201'],
        description: "Technical interviews are a skill of their own. The best engineers fail them because they've never practiced the format. The goal is not to be the smartest — it is to be the most practiced. Deliberate repetition beats raw intelligence every time.",
        topics: ['Coding Interview Framework', 'The 10 Coding Patterns (Master These)', 'System Design Interview Framework', 'Behavioral Interviews (STAR Method)'],
        subtopics: {
          'Coding Interview Framework': [
            'UCTPV: Understand, Clarify, Think aloud, Plan, Verify',
            'Clarify before coding: input constraints, edge cases, expected output',
            'Think aloud always: narrate your thought process',
            'Brute force first: state naive solution before optimizing',
            'Optimize with questions: space usage, sorted input, constraints',
            'Test manually: trace 2-3 examples including edge cases',
            'Analyze complexity: always state time and space complexity'
          ],
          'The 10 Coding Patterns (Master These)': [
            'Sliding Window: substrings/subarrays with size constraints',
            'Two Pointers: sorted arrays, palindromes, 3-sum',
            'Binary Search: sorted/rotated arrays, answer-range search',
            'BFS/DFS: graphs, trees, grids (shortest path vs existence)',
            'Dynamic Programming: overlapping subproblems + optimal substructure',
            'Backtracking: subsets, permutations, N-queens, word search',
            'Heap/Priority Queue: top K, median of stream, scheduling',
            'Intervals: merge, insert, meeting rooms (sort by start first)',
            'Linked List: fast/slow pointer, reverse in k-groups',
            'Monotonic Stack: next greater element, largest rectangle'
          ],
          'System Design Interview Framework': [
            'Total time: 45 minutes — budget it explicitly at the start',
            'Clarify (5 min): functional and non-functional requirements',
            'Estimate (5 min): DAU, QPS, storage, bandwidth',
            'High-level design (10 min): component diagram, data flow',
            'Deep dive (20 min): tradeoffs and bottlenecks in 1-2 areas',
            'Wrap-up (5 min): bottlenecks and future improvements',
            'Always state tradeoffs: "I chose X over Y because..." '
          ],
          'Behavioral Interviews (STAR Method)': [
            'Situation: context for the interviewer',
            'Task: YOUR specific responsibility',
            'Action: what YOU specifically did (concrete steps)',
            'Result: quantify impact (e.g., reduced latency by 40%)',
            'Prepare 10 stories covering: leadership, failure, conflict, etc.',
            'Common questions: tell me about yourself, greatest challenge',
            'Research: read eng blogs, news, and tech stacks of companies'
          ]
        },
        projects: [
          { 
            name: 'NeetCode 150', 
            description: 'Complete the full organized problem set', 
            level: 'Adv', 
            outcome: 'All solved, pattern identified, time/space complexity documented' 
          },
          { 
            name: '20 Mock Interviews', 
            description: 'Pramp, Interviewing.io, or with peers', 
            level: 'Adv', 
            outcome: 'Record yourself, review communication, note areas of confusion' 
          },
          { 
            name: '7 System Design Walkthroughs', 
            description: 'Solo timed 45-min design sessions', 
            level: 'Adv', 
            outcome: 'Draw on paper, present tradeoffs, review against ByteByteGo' 
          },
          { 
            name: 'Behavioral Stories Bank', 
            description: 'Written STAR stories for 10 scenarios', 
            level: 'Adv', 
            outcome: 'Practiced out loud, timed, ready to deliver in 2 minutes each' 
          }
        ],
        resources: [
          { name: 'neetcode.io', type: 'Platform', cost: 'Free', stars: 5, url: 'https://neetcode.io', notes: 'Best organized roadmap with video solutions' },
          { name: 'Pramp.com', type: 'Platform', cost: 'Free', stars: 5, url: 'https://www.pramp.com', notes: 'Free live mock interviews with real engineers' },
          { name: 'Tech Interview Handbook', type: 'Website', cost: 'Free', stars: 5, url: 'https://www.techinterviewhandbook.org', notes: 'Resume, behavioral, and coding all in one' },
          { name: 'Cracking the Coding Interview', type: 'Book', cost: 'Paid', stars: 4, notes: 'Essential mindset and problem-solving patterns' }
        ],
        commonMistakes: [
          'Grinding 300 LeetCode problems instead of learning all 10 patterns',
          'Practicing coding in silence — the interviewer needs to hear you',
          'Not practicing system design until Phase 5 — should be monthly from Phase 3',
          'Being too proud to ask for hints — clarifying questions are professional',
          'Not researching the company product and engineering culture'
        ],
        selfCheck: [
          'Can you solve any Medium DP problem you\'ve never seen in 35 minutes?',
          'Can you design a URL shortener from scratch in 45 minutes?',
          'Can you deliver your "tell me about yourself" answer in 90 seconds?',
          'Can you name all 10 patterns and give 2 example problems for each?',
          'Can you identify the applicable pattern for a new problem in 2 minutes?'
        ],
        whenStuck: 'If you freeze: say "Let me think through this step by step." Then restate the problem in your own words. Never go silent for more than 30 seconds.'
      },
      {
        id: 'CS502',
        name: 'Portfolio, Brand & Job Search Strategy',
        hours: 80,
        duration: 'Build continuously from Phase 1',
        difficulty: 'Intermediate',
        prerequisites: ['CS301', 'CS302'],
        description: "In the Philippines, your GitHub, LinkedIn, and portfolio website are reviewed before you get a single phone call. Your online presence is your resume before your resume. Build in public from day one — every week, every project, every learning. This is the fastest path to inbound opportunities.",
        topics: [
          'Building a Standout Portfolio',
          'GitHub Profile Mastery',
          'LinkedIn & Online Presence Strategy',
          'Philippines Job Market Strategy',
          'Salary Negotiation (The PH-Specific Script)'
        ],
        subtopics: {
          'Building a Standout Portfolio': [
            'Quality over quantity: 3 exceptional projects beat 10 mediocre ones',
            'Live deployed demo (not localhost), clean code, professional README',
            'README: what it does, why you built it, tech stack, key features',
            'Case studies (200-400 words): problem, approach, technical decisions',
            'The capstone projects from each phase ARE your portfolio',
            'Deployment: Vercel, Railway/Render, Hugging Face Spaces'
          ],
          'GitHub Profile Mastery': [
            'Profile README: who you are, what you build, current focus, contact',
            'Write it like a landing page — make them want to hire in 30 seconds',
            'Pinned repositories: only your 6 best (curate ruthlessly)',
            'Consistent activity: daily commits signal work habit to recruiters',
            'Meaningful commit messages — recruiters DO read them',
            'Open source contributions: even bug fixes in docs count',
            'GitHub Actions: green CI badges signal professional code quality'
          ],
          'LinkedIn & Online Presence Strategy': [
            'Headline formula: [Role] | [Top Skills] | [What you build]',
            'About section: your story, technical strengths, what you seek',
            'Featured section: pin your portfolio site, best live demo, articles',
            'Endorsements: get peers to endorse real skills (FastAPI, React, etc.)',
            'Content strategy: one technical post per week on your learnings',
            'PH communities: DevCon PH, Python PH, ML Philippines'
          ],
          'Philippines Job Market Strategy': [
            'Entry-level targets: Exist, Pointwest, Accenture PH, ING Hubs, KMC',
            'Product companies: GCash (Mynt), Paymaya (Voyager), Kumu, Sprout',
            'Multinational tech: Booking.com, Amazon AWS, Google, Grab',
            'Remote-first: Toptal, Andela, X-Team, Deel, Remote.com',
            'FAANG+: prepare 6 months specifically, 3 mock interviews per week',
            'Salary benchmarks 2025: Junior P40-70K, Mid P80-120K, Senior P150-250K',
            'Remote international: $2,000-5,000/month USD (3-5x local rates)',
            'Freelance: build reputation on Upwork before direct clients'
          ],
          'Salary Negotiation (The PH-Specific Script)': [
            'Never give a number first: "I\'d like to understand the full package first"',
            'Research: Glassdoor, levels.fyi, asking peers in the community',
            'Range tactic: give a range based on research with target at bottom',
            'Counter-offer: "Based on my research and experience, I was expecting X"',
            'Never accept on spot: request 48 hours to review the full offer',
            'Total comp: base, 13th month, HMO, stock, bonus, learning budget',
            'Silence tactic: state your counter-offer, then stop talking',
            'Walk away power: always have a competing offer as leverage'
          ]
        },
        projects: [
          { 
            name: 'Portfolio Website', 
            description: 'Custom-built site, zero templates', 
            level: 'Adv', 
            outcome: 'Mobile-first, dark mode, WCAG AA, Lighthouse 90+, case studies, blog' 
          },
          { 
            name: '10 Technical Blog Posts', 
            description: 'Publish on dev.to or your own site', 
            level: 'Int', 
            outcome: 'At least 2 posts with 500+ views — document your projects and learnings' 
          },
          { 
            name: 'Job Campaign', 
            description: 'Apply to 60 companies, track everything', 
            level: 'Adv', 
            outcome: '20 warm applications, follow-up emails drafted, spreadsheet with full history' 
          }
        ],
        resources: [
          { name: 'levels.fyi', type: 'Website', cost: 'Free', stars: 5, url: 'https://levels.fyi', notes: 'Tech salary data globally — know your worth' },
          { name: 'Tech Interview Handbook', type: 'Website', cost: 'Free', stars: 5, url: 'https://www.techinterviewhandbook.org', notes: 'Job search strategy, resume templates, negotiation scripts' },
          { name: 'Developers Connect PH', type: 'Community', cost: 'Free', stars: 5, notes: 'Active PH dev community, jobs posted, salary discussions' },
          { name: 'LinkedIn', type: 'Platform', cost: 'Free', stars: 4, notes: 'Most important professional platform in PH' }
        ],
        commonMistakes: [
          'Waiting to apply until everything feels ready — start at Phase 3',
          'Putting your expected salary too low because you\'re afraid',
          'Not following up after applications (5 business days is professional)',
          'Treating the job search as passive — you need to warm up connections',
          'Accepting the first offer immediately — always take 24-48 hours and counter'
        ],
        selfCheck: [
          'Do you have 3 projects deployed live with live demo URLs right now?',
          'Can you explain any portfolio project in 3 minutes with clear depth?',
          'Is your GitHub showing consistent daily commits for the past 3+ months?',
          'Have you researched and written down your target salary range?',
          'Can you deliver your salary counter-offer without hesitating?'
        ],
        whenStuck: 'Getting no callbacks? 90% of the time the problem is your resume or portfolio — not the market. Send your resume to 3 senior engineers you trust for brutally honest feedback.'
      },
      {
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
      },
    ],
  },
];
