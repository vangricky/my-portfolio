// Everything the site says lives here. Edit this file to update your portfolio.

export const PROFILE = {
  name: 'Ricky Vang',
  fullName: 'Ricky Vang',
  email: 'cheemengrvang@gmail.com',
  github: 'https://github.com/vangricky',
  linkedin: 'https://www.linkedin.com/in/rickyvang/',
  title: 'AI Automation · IT/AV Systems · Web Development',
  roles: ['AI Automation', 'Web Developer', 'IT & AV Systems', 'Technical Coordinator'],
  intro:
    'AI automation and IT/AV professional who directs AI agents to build real systems, verifies them with automated tests and real equipment, and designs clean, modern websites.',
}

export const SKILL_TICKER = [
  'Claude & Claude Code', 'AI Agents', 'Prompt Design', 'Automated Testing', 'React', 'JavaScript', 'Python',
  'Crestron', 'Slack & Teams Webhooks', 'Microsoft 365', 'SolarWinds', 'Ivanti', 'PXE Imaging', 'Figma',
]

export const ABOUT = [
  "I'm Ricky Vang, a technologist who loves building things and figuring out how they work. I earned my Bachelor of Science in Web Design and Development from Brigham Young University-Idaho, and I hold the Google AI Professional Certificate.",
  "Today I'm a Technical Coordinator Sr. at Utah State University. I directed Claude, an AI coding agent, to build a campus-wide classroom control standard: one Crestron program designed to run every room, a one-tap help request that reaches the support team's Slack channel, and modern touch panel interfaces. Then I verified the AI-built work with a 132-check automated simulation and testing on real equipment.",
  "Before that, I deployed Epic EHR hardware across 30+ clinics, hospitals and emergency departments for Adventist Health with zero-downtime go-lives, and spent nearly four years at BYU-Idaho as an IT Technician and AV Systems Lead, supporting 300+ classrooms, configuring 500+ Crestron devices and developing a 4-person team.",
  "I also design and build websites, from production sites for real clients to the concept sites below. Combining AI with careful engineering is where I see the future heading: I bring the same care, curiosity and verification to a touch panel, a network closet or a homepage.",
]

export const STATS = [
  { value: '132', label: 'automated checks verifying AI-built work' },
  { value: '500+', label: 'Crestron devices installed and configured' },
  { value: '30+', label: 'clinic and hospital go-lives with zero downtime' },
  { value: 'B.S.', label: 'Web Design & Development, BYU-Idaho' },
]

export const TOOLKIT = [
  { icon: 'Sparkles', title: 'AI & Automation', items: 'Claude and Claude Code, prompt design, directing AI agents on multi-step projects, verifying AI output, Slack and Microsoft Teams webhooks, automated testing' },
  { icon: 'Layout', title: 'Web Development', items: 'React, JavaScript, HTML, CSS, Tailwind, Express.js, REST APIs, responsive design' },
  { icon: 'Database', title: 'Data & Backend', items: 'MongoDB, MySQL, PostgreSQL, Node.js, Python' },
  { icon: 'Server', title: 'AV & Facilities', items: 'Crestron (DMPS, SIMPL, CH5, VT Pro-e), enterprise AV deployment, Axis surveillance systems' },
  { icon: 'Network', title: 'IT Operations', items: 'Windows, macOS, Microsoft 365, Ivanti, SolarWinds, incident response, hardware troubleshooting, PXE imaging' },
  { icon: 'Wrench', title: 'Tools & Practices', items: 'Git and GitHub, Figma, safe handling of secrets and data, handoff docs and test checklists' },
]

// image: a screenshot in /public/projects. live: where the button goes. domain: what the browser bar shows.
export const PROJECTS = [
  {
    title: 'HomeGap',
    kind: 'AI app · Live product',
    icon: 'House',
    image: '/projects/homegap.jpg',
    domain: 'homegap.app',
    desc: 'An AI-powered interior design app that makes great design affordable for everyone. HomeGap analyzes your room, suggests furniture that fits the space, and lets you shop the look, so anyone can bridge the gap between their dream home and reality, regardless of budget or design experience.',
    tags: ['React', 'AI', 'UI/UX', 'Interior Design'],
    live: 'https://homegap.app/',
  },
  {
    title: 'Halden Studio',
    kind: 'Concept site · Minimal',
    icon: 'Building2',
    image: '/projects/halden.jpg',
    domain: 'rickyvang.com/work/halden',
    desc: 'An architecture and interiors studio, designed around white space, light type and calm motion. A filterable project gallery opens each project in a full-screen viewer with keyboard navigation, alongside a studio philosophy, process timeline and a validated inquiry form.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Minimal'],
    live: '/work/halden/index.html',
  },
  {
    title: 'Northvale Partners',
    kind: 'Concept site · Corporate',
    icon: 'BarChart',
    image: '/projects/northvale.jpg',
    domain: 'rickyvang.com/work/northvale',
    desc: 'A two-page site for a strategy and financial advisory firm. Animated stat counters, an accessible tabbed approach section, case studies, a testimonial carousel and a consultation form, plus a careers page with a searchable, filterable job board and application form.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Corporate'],
    live: '/work/northvale/index.html',
  },
  {
    title: 'Waggle & Co.',
    kind: 'Concept site · Playful',
    icon: 'PawPrint',
    image: '/projects/waggle.jpg',
    domain: 'rickyvang.com/work/waggle',
    desc: 'A dog daycare and grooming site full of personality. A live price calculator builds a weekly plan from dog size, service, days and add-ons (with a full-week discount), booking ends in paw-print confetti, and "meet the pack" cards flip to reveal each dog.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Playful'],
    live: '/work/waggle/index.html',
  },
  {
    title: 'Huddlebee',
    kind: 'Concept site · Corporate Memphis',
    icon: 'CalendarDays',
    image: '/projects/huddlebee.jpg',
    domain: 'rickyvang.com/work/huddlebee',
    desc: 'A SaaS landing page for a team-scheduling app, with flat illustrations drawn entirely in code. Visitors can try a working shift board with coverage warnings and auto-fill, then compare plans with a monthly/yearly toggle and a team-size slider.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SVG illustration'],
    live: '/work/huddlebee/index.html',
  },
]

export const RESUME = [
  {
    section: 'Work Experience',
    entries: [
      {
        title: 'Technical Coordinator Sr.',
        org: 'Utah State University · Logan, UT',
        date: 'Aug 2026 – Present',
        points: [
          'Directed Claude, an AI coding agent, to build a campus-wide classroom control standard: one Crestron DMPS program designed to run every room, replacing programs written room by room.',
          "Built a one-tap help request that sends technician requests from the room touch panel straight to the support team's Slack channel, with cancel from the panel.",
          'Designed a modern React (CH5) touch panel interface and a browser control panel, plus a matching VT Pro-e version so older TSW-752 panels get the same experience.',
          'Verified AI-built work with a 132-check automated simulation and testing on real equipment, catching a reversed projector command, missing mute feedback, a wrong clock time zone, and audio playing while rooms were off.',
          'Kept webhook links, passwords, and device logins out of shared code, and wrote handoff docs and test checklists so other technicians can maintain the system.',
        ],
      },
      {
        title: 'Epic Technology Advisor (Contract)',
        org: 'Adventist Health · Marysville, CA',
        date: 'Nov 2025 – Apr 2026',
        points: [
          'Deployed Epic EHR hardware across 30+ clinics, hospitals, and emergency departments, achieving zero downtime go-lives across all sites.',
          'Automated workstation imaging via PXE boot, reducing per-device deployment time and enabling faster clinic go-lives.',
          'Maintained uptime for a 150+ device Workstation on Wheels fleet across five clinical departments.',
        ],
      },
      {
        title: 'IT Technician and AV Systems Lead',
        org: 'BYU-Idaho · Rexburg, ID',
        date: 'Jul 2021 – Apr 2025',
        points: [
          'Reduced AV downtime by 20% across 300+ classrooms and 20+ Zoom conference rooms by resolving thousands of hardware and software issues, including TVs, projectors, speakers, and microphones.',
          'Supervised and developed a 4-person IT team, increasing diagnostic speed and first-call resolution rate through weekly ops meetings, trainings, and hands-on workshops.',
          'Served as primary Crestron AV technical lead; installed, debugged, and configured 500+ Crestron devices and kept a centralized device inventory for asset tracking.',
          'Led a campus-wide LG commercial display deployment (July – Aug 2024), coordinating IT and facilities teams to standardize classroom and conference room displays with minimal disruption.',
          'Created AV system diagrams that guided device programming and installs, and acted as liaison between IT tiers, faculty, and departments, explaining solutions clearly to non-technical stakeholders.',
        ],
      },
    ],
  },
  {
    section: 'Leadership',
    entries: [
      {
        title: 'President — Web Design & Development Society',
        org: 'BYU-Idaho',
        date: 'Sep – Dec 2024',
        points: [
          'Led weekly strategy meetings with my Vice President, Media Content Creator, Events Coordinator, and Marketing Head to plan and coordinate instructional topics and activities for 10+ members, representing the society at career fairs to engage peers, parents, and prospective students',
          'Collaborated with an adjunct professor to prototype a music portfolio website',
        ],
      },
    ],
  },
  {
    section: 'AI & Generative AI',
    entries: [
      {
        title: 'AI & Generative AI Learning',
        org: 'Self-directed',
        date: 'Ongoing',
        points: [
          'Learning and implementing Retrieval-Augmented Generation (RAG) for document-based AI systems',
          'Working with frontier and open-source models, focusing on inference and prompt engineering',
          'Developing AI agents and tool-using workflows',
          'Applying fine-tuning techniques such as QLoRA',
          'Using tools and frameworks including Hugging Face, LangChain, and Gradio',
        ],
      },
    ],
  },
  {
    section: 'Education',
    entries: [
      {
        title: 'Bachelor of Science in Web Design and Development',
        org: 'Brigham Young University – Idaho · Rexburg, ID',
        date: 'Graduated Dec 2025',
        points: [],
      },
    ],
  },
  {
    section: 'Certifications',
    entries: [
      { title: 'Google AI Professional Certificate', org: 'Google', date: '', points: [] },
    ],
  },
]
