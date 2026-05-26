// Content / data layer. The Quant Research Lab style renders from this single source of truth.
// Editing copy or links should only require touching this file.

const CONTENT = {
  meta: {
    name: 'Elijah Morales',
    role: 'Applied Mathematics M.S. @ Columbia · Research Analyst @ SRA Screening',
    tagline: 'Applied mathematics, stochastic modeling, and data-driven automation.',
    location: 'Fort Lauderdale, FL',
    summary:
      'Applied Mathematics M.S. student at Columbia (CVN) and NSF QRLSSP REU alumnus. Building toward roles in quantitative research, data science, risk analytics, scientific computing, and AI automation — at the intersection of probability, simulation, and the small instruments that make analysis legible.',
    short: 'Aspiring quantitative researcher building toward quant research, data science, and risk analytics.',
  },

  links: {
    email:    'elijahymorales04@gmail.com',
    phone:    '(954) 573-3758',
    linkedin: 'https://www.linkedin.com/in/elijah-morales',
    github:   'https://github.com/ElijahMorales04',
    resume:   'assets/resume.pdf',
  },

  nav: [
    { id: 'hero',       label: 'Home' },
    { id: 'focus',      label: 'Focus' },
    { id: 'research',   label: 'Research' },
    { id: 'projects',   label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'toolkit',    label: 'Toolkit' },
    { id: 'roadmap',    label: 'Roadmap' },
    { id: 'writing',    label: 'Writing' },
    { id: 'contact',    label: 'Contact' },
  ],

  focus: [
    { k: 'Stochastic modeling',     v: 'Markov processes, SDEs, Monte Carlo, structured population models' },
    { k: 'Scientific computing',    v: 'Numerical methods, ODE/PDE solvers, optimization, simulation' },
    { k: 'Probability & statistics',v: 'Building toward inference, time-series, and risk analytics' },
    { k: 'Quant data systems',      v: 'Workflow analytics, dashboards, human-in-the-loop automation' },
  ],

  featuredResearch: {
    title: 'Dispersal Evolution in Tribolium Metapopulations',
    badge: 'NSF QRLSSP REU · Technical Report / Preprint · 67 pages',
    institution: 'Arizona State University · Summer 2024',
    authors: ['K. Angell', 'E. Morales', 'B. Wiltshire', 'J. Rodriguez Rincon', 'L. Rodriguez Rodriguez', 'J. D. Nagy'],
    description:
      'During an NSF-funded REU at Arizona State University, I modeled dispersal evolution in Tribolium metapopulations using discrete-time LPA dynamics, ODE/PDE models, stochastic simulation, evolutionary game theory, Python, MATLAB, and LaTeX. We derived R₀-style viability thresholds and characterized evolutionarily stable strategies across parameter regimes, mapping where pure-stay, pure-disperse, and polymorphic coexistence emerge.',
    deepDive: [
      'Modeled adult dispersal in 4- and 5-patch metapopulations with dispersal cost c, local extinction events, and recolonization rates.',
      'Combined deterministic LPA dynamics with patch-level stochasticity to capture rare extinction and invasion events.',
      'Derived R₀-style viability thresholds and applied evolutionary game theory to identify ESS regimes; analyzed mutant invasion criteria against resident strategies.',
      'Implemented simulations in Python (NumPy/SciPy) and MATLAB; wrote the manuscript in LaTeX.',
      'Co-authored a 67-page technical report/preprint; presented findings as a research poster and oral talk at the QRLSSP symposium.',
    ],
    chips: ['LPA model', 'ODE/PDE modeling', 'stochastic simulation', 'evolutionary game theory', 'metapopulations', 'ESS / invasion analysis', 'Python', 'MATLAB', 'LaTeX'],
    links: [
      { label: 'Technical Report', href: 'assets/technical-report.pdf', external: true },
      { label: 'Poster',           href: 'assets/poster.pdf',           external: true },
      { label: 'Slides',           href: 'assets/slides.pdf',           external: true },
      { label: 'Reproducible Simulator', href: '#', external: false, soon: true },
    ],
  },

  projects: [
    {
      id: 'sra-portal',
      title: 'SRA Automation & Analytics Case Study',
      cat: 'Automation',
      status: 'In progress · sanitized demo',
      blurb: 'Internal operations portal concept for a background-screening workflow.',
      description:
        'Concept and prototype for an internal operations portal that centralizes department knowledge, dashboards, trackers, workflow tools, SOPs, and human-in-the-loop automation. The case study walks through workflow analysis, instrument design, and the pre-research automation layer — without exposing any client, candidate, or PII data.',
      tags: ['SQL', 'Excel', 'Dashboards', 'Workflow automation', 'Data verification', 'Internal tools'],
      year: '2025',
    },
    {
      id: 'reu-simulator',
      title: 'REU Stochastic Metapopulation Simulator',
      cat: 'Research',
      status: 'Planned · rebuild in progress',
      blurb: 'Reproducible Python rebuild of the NSF REU metapopulation simulator.',
      description:
        'A reproducible Python rebuild of the NSF REU metapopulation simulator, including LPA dynamics, patch graphs, local extinction events, mutant/resident dispersal strategies, parameter sweeps, and Monte Carlo replications. Goal: a clean, documented research repo and an interactive viewer.',
      tags: ['Python', 'NumPy', 'SciPy', 'Simulation', 'Stochastic modeling', 'Dynamical systems'],
      year: '2025–26',
    },
    {
      id: 'risk-engine',
      title: 'Quant Finance Risk Engine',
      cat: 'Quant/Risk',
      status: 'Planned',
      blurb: 'Returns, volatility, Monte Carlo, VaR/CVaR, regime classification.',
      description:
        'Future project implementing returns analysis, volatility estimation, Monte Carlo simulation, VaR/CVaR, drawdowns, and regime classification on public financial data — designed as a clean, reproducible toolkit.',
      tags: ['Python', 'Risk analytics', 'Monte Carlo', 'Volatility', 'Time series'],
      year: '2026',
    },
    {
      id: 'tda-capstone',
      title: 'TDA Market Regime Capstone',
      cat: 'Quant/Risk',
      status: 'Planned',
      blurb: 'Topological data analysis for market regime detection.',
      description:
        'Future research-style project testing whether topological data analysis features (persistent homology) add value for market regime and bubble-risk detection beyond standard volatility, momentum, drawdown, and correlation features.',
      tags: ['TDA', 'Persistent homology', 'Market regimes', 'ML', 'Risk'],
      year: '2027',
    },
  ],

  projectFilters: ['All', 'Research', 'Automation', 'Quant/Risk', 'Learning'],

  experience: [
    {
      org: 'SRA Screening',
      role: 'Research Analyst — Internal Tools, Automation & Analytics',
      range: 'Oct 2025 — Present',
      loc: 'West Palm Beach, FL',
      tag: 'Current',
      summary: 'Research analyst designing internal tools, dashboards, and human-in-the-loop automation for background-screening operations.',
      bullets: [
        'Performs structured verifications across employment, education, legal, licensing, financial, and reference records while maintaining compliance standards and audit-trail integrity.',
        'Investigates discrepancies using SQL-backed screening platforms, Excel, public records, registry databases, and internal knowledge resources.',
        'Designed and is building an internal operations portal centralizing department knowledge, dashboards, trackers, workflow tools, SOPs, and reference materials.',
        'Developed workflow improvements for case tracking, vendor dispatch logic, turnaround monitoring, and researcher handoff support.',
        'Prototyping human-in-the-loop automation to reduce repetitive pre-research tasks, identify missing information, and standardize case preparation before researcher review.',
      ],
    },
    {
      org: 'Arizona State University · NSF QRLSSP REU',
      role: 'Quantitative Research Assistant',
      range: 'May 2024 — Jul 2024',
      loc: 'Tempe, AZ',
      tag: 'Research',
      summary: 'NSF-funded summer research on stochastic systems and structured population models.',
      bullets: [
        'Selected for the NSF-funded Quantitative Research in the Life and Social Sciences Program, focused on stochastic systems and structured population models.',
        'Modeled dispersal evolution in Tribolium metapopulations using discrete-time LPA dynamics, ODE/PDE models, stochastic simulation, and evolutionary game theory.',
        'Developed and analyzed 4-patch and 5-patch metapopulation simulations with adult dispersal, dispersal cost, local extinction events, and mutant/resident strategies.',
        'Derived and interpreted R₀-style viability thresholds and ESS/invasion criteria.',
        'Co-authored a 67-page technical report/preprint and presented findings through a research poster and oral presentation.',
      ],
    },
  ],

  education: [
    {
      school: 'Columbia University',
      detail: 'M.S. Applied Mathematics · CVN',
      range: 'Jan 2026 — May 2028 (expected)',
      loc: 'New York, NY',
      gpa: '4.165',
      gpaScale: 'Columbia A+ scale',
    },
    {
      school: 'University of South Florida',
      detail: 'B.A. Pure Mathematics & Psychology · Judy Genshaft Honors College',
      range: 'Aug 2022 — May 2025',
      loc: 'Tampa, FL',
      gpa: '3.81',
      gpaScale: 'Magna Cum Laude · 3-year graduate',
    },
  ],

  toolkit: [
    {
      group: 'Languages & Tools',
      items: ['Python', 'SQL', 'MATLAB', 'LaTeX', 'Git / GitHub', 'Excel', 'PowerQuery', 'C++ (coursework)', 'Maple'],
    },
    {
      group: 'Scientific Computing',
      items: ['NumPy', 'SciPy', 'matplotlib', 'Numerical methods', 'Least squares', 'Optimization', 'ODE / PDE modeling', 'Monte Carlo simulation', 'Stochastic simulation'],
    },
    {
      group: 'Quant / Data Concepts',
      items: ['Probability & statistics', 'Stochastic modeling', 'Markov-chain concepts', 'Population dynamics', 'Evolutionary game theory', 'Workflow analytics', 'Dashboarding'],
    },
    {
      group: 'Currently Building',
      items: ['Python fluency', 'Probability & statistics', 'Machine learning', 'Simulation', 'Financial / risk modeling'],
    },
  ],

  coursework: {
    completed: [
      { code: 'APMA E4008', title: 'Advanced and Applied Linear Algebra' },
      { code: 'APMA E4300', title: 'Introduction to Numerical Methods' },
    ],
    current: [
      { code: 'IEOR E4150', title: 'Introduction to Probability and Statistics' },
    ],
    planned: [
      { code: 'APMA E4100', title: 'Applied Analysis' },
      { code: 'IEOR E4106', title: 'Stochastic Models' },
      { code: 'APMA E4200', title: 'Partial Differential Equations' },
      { code: 'IEOR E4004', title: 'Optimization Models and Methods' },
      { code: 'COMS W4771', title: 'Machine Learning' },
      { code: 'IEOR E4404', title: 'Simulation' },
      { code: 'APMA E4306', title: 'Applied Stochastic Analysis' },
    ],
  },

  writing: [],
  futureWriting: [
    'Probability and Statistics in Python',
    'Rebuilding Linear Algebra for ML and Optimization',
    'Stochastic Metapopulation Simulation Notes',
    'Monte Carlo Simulation for Risk Analytics',
  ],
};

window.CONTENT = CONTENT;
