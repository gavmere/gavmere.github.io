/**
 * ============================================================================
 *  GAVIN MEREGILLANO — PORTFOLIO TEXT & CONTENT CONFIG (content.js)
 * ============================================================================
 *  All copy, hover labels, tags, links, projects, and tracks live here.
 *  `body` fields support inline HTML like <strong>bold</strong> or <em>italics</em>.
 * ============================================================================
 */

window.SITE_CONTENT = {
  hud: {
    pageTitle: 'Gavin Meregillano',
    name: 'Gavin Meregillano',
    role: 'SWE at Google / YouTube',
    hint: ''
  },

  screens: {
    mainBadge: 'PROJECTS',
    mainButton: 'CLICK ME!',
    vertPrompt: 'gavin@SWE:~',
    vertHeading: '// TECH STACK',
    vertBullets: [
      '• Python · SQL · C++',
      '• Spark · MapReduce',
      '• AWS · GCP · Docker',
      '• ML · LLM Tools'
    ]
  },

  items: {
    gavin: {
      hoverLabel: 'Gavin Meregillano',
      partId: '',
      category: 'About',
      avatar: 'imgs/headshot.png',
      title: 'Gavin Meregillano',
      subtitle: '',
      body: 'Hey, I\'m Gavin! I\'m a Software Engineer working on <strong>Identity Infrastructure</strong> at <strong>YouTube</strong> and a UC San Diego Data Science grad. Previously I built data systems &amp; tooling at <strong>PlayStation</strong>, <strong>S&amp;P Global</strong>, and <strong>Cadence</strong>. Outside of engineering, I’ve built 50+ side projects and enjoy mixing and creating House, UK Garage &amp; DnB as <strong>DJ Databass</strong>.',
      tags: ['Super Awesome', 'Really Big Nerd', 'Has a Cat Named Gia'],
      links: [
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gavin-meregillano/', primary: true },
        { label: 'GitHub', url: 'https://github.com/gavmere', primary: false },
        { label: 'Email', url: 'mailto:gavinmeregillano@gmail.com', primary: false }
      ]
    },

    google: {
      hoverLabel: 'Google / YouTube',
      partId: '',
      category: 'Current role',
      logo: 'imgs/youtube-logo.png',
      title: 'Google / YouTube',
      subtitle: 'Software Engineer, Identity Infrastructure',
      body: 'Earned the Noogler propeller hat after graduating from UC San Diego! Working as a Software Engineer on <strong>Identity Infrastructure</strong> across <strong>Google &amp; YouTube</strong>, building reliable, low-latency data pipelines and account systems for billions of viewers, channels, and creators worldwide. Defining the YOU on YouTube.',
      tags: ['Identity Models', 'Distributed Systems', 'C++', 'System Design'],
      links: []
    },

    cadence: {
      hoverLabel: 'Cadence Design Systems',
      partId: '',
      category: 'Work experience',
      logo: 'imgs/Cadence_Logo.svg.png',
      title: 'Cadence Design Systems',
      subtitle: 'IT Software Developer Intern',
      body: 'My first hands-on enterprise software &amp; database role at the EDA silicon pioneer. Built an automated cross-database discrepancy detector between two disconnected enterprise systems and authored 20+ production SQL views for analytics teams.',
      tags: ['Python', 'MySQL', 'SAP ERP', 'Workday'],
      links: []
    },

    spglobal: {
      hoverLabel: 'S&P Global',
      partId: '',
      category: 'Work experience',
      logo: 'imgs/S&P Global.png',
      title: 'S&P Global',
      subtitle: 'Data Engineering Intern, LLM Competition Winner',
      body: 'Migrated terabytes of developer productivity telemetry from Amazon Redshift into Databricks, <strong>won a company-wide intern competition</strong> for innovative enterprise LLM tooling, and shipped Power BI analytics across vertical orgs.',
      tags: ['Databricks', 'PySpark', 'GenAI Winner', 'SQL', 'Power BI'],
      links: []
    },

    playstation: {
      hoverLabel: 'Sony Interactive / PlayStation',
      partId: '',
      category: 'Work experience',
      logo: 'imgs/PS.png',
      title: 'Sony Interactive / PlayStation',
      subtitle: 'Analytics Engineering Intern',
      body: 'Built an automated data governance workflow that slashed admin promotion turnaround time, developed an internal office engagement platform connecting employees with events, and authored a Python library for rapid local testing &amp; deployment of serverless Domo functions.',
      tags: ['Python', 'SQL', 'Serverless', 'Domo', 'Data Governance'],
      links: []
    },

    ucsd: {
      hoverLabel: 'UC San Diego',
      partId: '',
      category: 'Education',
      logo: 'imgs/UCSD-Logo.png',
      title: 'UC San Diego',
      subtitle: 'B.S. Data Science, Triton',
      body: 'Studied Data Science at UC San Diego, mainly focusing on Machine Learning and Database systems.',
      tags: ['B.S. Data Science', 'Database Systems', 'ML & Systems', 'Go Tritons!'],
      links: []
    },

    mainMonitor: {
      hoverLabel: 'Main Monitor (50+ Projects)',
      partId: '',
      category: 'Featured projects'
    },

    vertMonitor: {
      hoverLabel: 'Core Engineering Toolkit',
      partId: '',
      category: 'Engineering stack'
    },

    speakers: {
      hoverLabel: "KRK Rokit 5's",
      partId: '',
      category: 'Audio & DJ Databass',
      icon: '🔊',
      title: "KRK Rokit 5's",
      subtitle: '',
      body: 'You found my musical alter ego! When I’m not making data pipelines, I’m mixing &amp; producing EDM on these studio monitors—bumping <strong>Sammy Virji</strong>, <strong>Chris Lake</strong>, <strong>Sub Focus</strong>, <strong>Chase &amp; Status</strong>, and <strong>Disco Lines</strong>. Not only that, I also listen to almost every genre of music; check out my favorites below.'
    },

    pc: {
      hoverLabel: 'Custom White PC Tower',
      partId: '',
      category: 'Hardware',
      icon: '🖥️',
      title: 'Custom White PC Tower',
      subtitle: '',
      body: 'I like to call this PC my baby. It powers through any embedding, local AI, DAW, or game I can throw at it. Fun fact: I built my first PC at 13 years old, and every 3 years I\'ve built a new one.',
      tags: ['NVIDIA 5070 Ti', 'AIO Liquid Cooled', 'WSL', 'Ableton'],
      links: []
    },

    keyboard: {
      hoverLabel: 'Custom Keychron V3',
      partId: '',
      category: 'Peripherals',
      icon: '⌨️',
      title: 'Custom Keychron V3',
      subtitle: '',
      body: 'I built this keyboard when I went off to college and it\'s been with me ever since. Despite all the accidental spills and bumps, it still clicks and clacks just like the day I bought it.',
      tags: ['Matte Black 75%', 'Kailh Coco Pink Box V2', 'Volume Knob'],
      links: []
    },

    mouse: {
      hoverLabel: 'CORSAIR SABRE v3 PRO',
      partId: '',
      category: 'Peripherals',
      icon: '🖱️',
      title: 'CORSAIR SABRE v3 PRO',
      subtitle: '',
      body: 'I won this mouse participating in the Corsair Build a PC challenge (see their Instagram). We got third! (Out of 3 teams.)',
      tags: ['Matte Black Wireless', 'Way Too Light'],
      links: []
    },

    desk: {
      hoverLabel: 'Autonomous Standing Desk',
      partId: '',
      category: 'Workspace',
      icon: '📐',
      title: 'Autonomous Standing Desk',
      subtitle: '',
      body: 'Bought off Facebook Marketplace for $50—great deal, though the hard part was fitting it in my car.',
      tags: ['Probably Used the Standing Part Once', 'Heavy'],
      links: []
    },

    slab: {
      hoverLabel: 'PSA 10 Pokémon Card',
      partId: '',
      category: 'Collectible',
      icon: '🃏',
      title: 'PSA 10 Pokémon Card',
      subtitle: '',
      body: 'You may know that I\'ve been OBSESSED with Pokémon cards since 2020. A lot of the projects I make are centered around the Pokémon card ecosystem, and my collection has grown A LOT these past couple of years. My philosophy is that you aren\'t really into cards if you only collect sealed product.',
      tags: ['Too Much Money', 'Kinda Gambling'],
      links: []
    },

    gr86: {
      hoverLabel: 'Toyota GR86 Model',
      partId: '',
      category: 'Collectible',
      icon: '🏎️',
      title: 'Toyota GR86 Model',
      subtitle: '',
      body: 'I drive a 2026 Raven Black GR86. It\'s my dream car and I love driving it around (responsibly, of course). I also do my own detailing almost every week. Too much? Yes—but anything to keep my black paint clean.',
      tags: ['Boxer 4 Engine', 'Raven Black', 'RWD Coupe'],
      links: []
    },

    chair: {
      hoverLabel: 'Branch Ergonomic Chair',
      partId: '',
      category: 'Workspace',
      icon: '🪑',
      title: 'Branch Ergonomic Chair',
      subtitle: '',
      body: 'Bought off Facebook Marketplace for $20—I\'ve used this chair for 4+ years and counting.',
      tags: ['Adjustable Armrests', '5 Legs', 'My Posture Still Bad'],
      links: []
    }
  },

  projects: [
    {
      short: 'ArXivViz 3D',
      screenLabel: 'arxiv-viz // 10,000 papers 3D',
      title: 'ArXivViz — 3D Research Paper Visualization',
      img: 'imgs/ArXivViz.png',
      desc: 'Clustered and projected the first 10,000 ArXiv papers into interactive 3D space using OpenAI embeddings, UMAP dimensionality reduction, and K-Means—exploring paths to scale toward all ~2.2M papers.',
      tags: ['UMAP', 'K-Means', 'JavaScript 3D', 'Embeddings'],
      link: 'https://www.gavmere.me/arXivViz/',
      linkText: 'Open ArXivViz'
    },
    {
      short: 'LikeMe',
      screenLabel: 'likeme-api // <500ms face search',
      title: 'LikeMe — Celebrity Look-Alike Engine',
      img: 'imgs/LikeMe.png',
      desc: 'Built deep-learning facial embeddings, vector similarity search, and the FastAPI backend matching a face against 1,500+ celebrities in under 500ms. Used 300+ times within 24 hours of launch.',
      tags: ['FastAPI', 'Deep Learning', 'Vector Search'],
      link: '',
      linkText: ''
    },
    {
      short: 'PokeID',
      screenLabel: 'poke-id // 102 base set CNN',
      title: 'PokeID — Trading Card CNN Identifier',
      img: 'imgs/chansey.JPG',
      desc: 'Trained a convolutional neural network to identify all 102 original Base Set Pokémon cards, building custom web scrapers, labeling tools, and Keras image augmentation pipelines from scratch.',
      tags: ['Keras', 'CNN', 'Computer Vision', 'Scraping'],
      link: '',
      linkText: ''
    },
    {
      short: 'Subset API',
      screenLabel: 'subset-svc // SQL + NoSQL sampler',
      title: 'Subset — Random Dataset Microservice',
      img: 'imgs/Subset.JPG',
      desc: 'REST API microservice generating reproducible random subsets across SQL and NoSQL stores with local serialization so any historical sample can be re-materialized on demand.',
      tags: ['FastAPI', 'REST', 'SQL & NoSQL', 'Serialization'],
      link: '',
      linkText: ''
    },
    {
      short: 'LoL Side',
      screenLabel: 'lol-stats // blue vs red winrate',
      title: 'League of Legends Side Win-Rate Study',
      img: 'imgs/LOLanalysis.JPG',
      desc: 'Statistical deep-dive into Blue vs. Red side map asymmetry and win-rate drivers using Pandas, NumPy, hypothesis testing, and interactive Plotly charts.',
      tags: ['Statistics', 'Pandas', 'Plotly', 'Data Viz'],
      link: 'https://gavmere.github.io/LeagueOfLegendsAnalysis/',
      linkText: 'Read report'
    },
    {
      short: 'Datasaur',
      screenLabel: 'datasaur-rl // hackathon winner',
      title: 'Datasaur Royale — Genetic Survival Sim',
      img: 'imgs/Datasaur.JPG',
      desc: 'Hackathon winner! Built a custom dinosaur survival ecosystem in PyGame and evolved optimal morphology + cooperative traits via genetic algorithms & RL.',
      tags: ['Genetic Algorithms', 'RL', 'PyGame', 'Hackathon Winner'],
      link: '',
      linkText: ''
    },
    {
      short: 'Annotate It',
      screenLabel: 'annotate-it // +75% faster labeling',
      title: 'Annotate It — Rapid Dataset Labeler',
      img: 'imgs/annotate.JPG',
      desc: 'Generalized the labeling tool from PokeID into a desktop PyQt annotation suite with autocomplete and instant rewind—cutting image labeling time by over 75%.',
      tags: ['Python', 'PyQt', 'Data Tooling'],
      link: '',
      linkText: ''
    }
  ],

  vertMonitorTabs: {
    ucsdTabLabel: 'UC San Diego',
    campusTabLabel: 'UCSD / Startups / IT',
    stackTitle: 'Core Engineering Toolkit',
    stackBody: 'My vertical monitor stays dedicated to terminals, documentation, and system telemetry across infrastructure, data pipelines, and ML:',
    stackTags: [
      'Python',
      'C++',
      'SQL & NoSQL',
      'Databricks & Spark',
      'Airflow / ETL',
      'Docker',
      'AWS (S3, EC2)',
      'GCP (BigQuery, GCS)',
      'Keras / Sklearn / XGBoost'
    ],
    campusTitle: 'Research, Consulting & Leadership',
    campusRoles: [
      {
        img: 'imgs/UCSD-Logo.png',
        title: 'UCSD Bioregional Center — Data Science Researcher',
        desc: 'Geospatial farm analysis in ArcGIS, survey pipelines & interactive visual tools for faculty.'
      },
      {
        img: 'imgs/7sherpas.png',
        title: '7Sherpas — Data Science Consultant',
        desc: 'Designed analytical PostgreSQL schemas & MongoDB data infrastructure for a local startup.'
      },
      {
        img: 'imgs/restech.png',
        title: 'UC Riverside ResTech — Student IT Lead',
        desc: 'Sole student lead managing 12 technicians supporting thousands of students, faculty & DoD events.'
      }
    ]
  },

  djMode: {
    spotifyTracks: [
      { label: 'Track 01', id: '0fVL6EBaQ2X12qQLiFgyg2' },
      { label: 'Track 02', id: '4oXfq53zABX3oq2fQ7zDzj' },
      { label: 'Track 03', id: '6dqgA5KawNSuAUk2PLxF5r' },
      { label: 'Track 04', id: '10XPqtGklNRy9p6rTpFyba' }
    ]
  }
};
