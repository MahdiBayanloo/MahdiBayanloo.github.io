/**
 * Single source of truth for all site copy and data.
 * Updated October 2026 from Mahdi's confirmed history and public project code.
 * Keep prototypes, mock benchmarks, and completed employment clearly qualified.
 */

export type Experience = {
  company: string;
  title: string;
  start: string; // "Oct 2024"
  end: string | "Present";
  location: string;
  bullets: string[];
  tags: string[];
  current?: boolean;
  /** Highlight marker: renders the amber pulse dot on the timeline */
  highlight?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  kicker: string; // one-line context, e.g. "Personal project · Nov 2022"
  problem: string;
  built: string;
  stack: string[];
  link?: { label: string; href: string };
  evidence?: { label: string; href: string };
  featured?: boolean;
  note?: string;
};

export const identity = {
  name: "Mahdi Bayanloo",
  role: "AI, Robotics & Embedded Software",
  location: "Berlin, Germany",
  headline: "Curiosity keeps me building.",
  tagline:
    "Robotics | AI | Code | Curiosity",
  message:
    "Sense. Reason. Act. Test. The interesting part is making it all work together.",
  subline:
    "I'm into robots, AI, and making ideas do something in the real world. Sometimes that means code. Sometimes it means a robot fight.",
  email: "mahdibayanloo1379@gmail.com",
  // Keep phone and role-specific CVs off the public site.
  links: {
    linkedin: "https://www.linkedin.com/in/mahdi-bayanloo-2b7317215/",
    github: "https://github.com/mahdibayanloo",
  },
};

/** Employer/institution proof strip, in scan order */
export const proof = [
  "RV Tech",
  "Perinet",
  "Zuse Institute Berlin · BMW AutoRun",
  "Holoplot",
  "FU Berlin",
];

export const experience: Experience[] = [
  {
    // Completed internship; retain high-level descriptions of internal work.
    company: "RV Tech",
    title: "Software Integration Engineer — OTA (Intern)",
    start: "Jul 2026",
    end: "Sep 2026",
    location: "Berlin",
    bullets: [
      "Integrated over-the-air update software for vehicle ECUs; supported hardware- and software-in-the-loop validation.",
      "Maintained HIL test setups, Python test tooling, update recipes, and GitLab CI workflows with firmware and integration engineers.",
      "Added signal logging and analyzed test data across ECU platforms; used Claude and LLM-assisted workflows to prepare engineering documentation in Confluence.",
    ],
    tags: ["Python", "C++", "HIL / SIL", "OTA", "GitLab CI", "Confluence"],
  },
  {
    company: "Perinet GmbH",
    title: "Embedded Software Engineer (Working Student)",
    start: "May 2025",
    end: "Jul 2026",
    location: "Berlin",
    bullets: [
      "Wrote automated tests in Python and validated embedded firmware on STM32; debugged hardware–software integration across signal-processing and communication layers.",
      "Validated Automotive Ethernet (100BASE-T1, SPE) communication stacks using VNA and oscilloscopes with high-frequency signal analysis — directly applicable to in-vehicle network testing.",
      "Developed STM32 C/C++ firmware for preemptive and cooperative RTOS systems, including interrupts and communication interfaces; authored engineering and manufacturing documentation in LaTeX.",
      "Prototyped an LLM workflow for firmware analysis and restructuring using task-specific code and architecture context, separate review roles, and bounded repair; presented the work internally with HTML and PowerPoint.",
    ],
    tags: ["Python", "C/C++", "STM32", "RTOS", "LLM Workflows", "LaTeX"],
  },
  {
    company: "Zuse Institute Berlin",
    title: "Research Assistant — Autonomous Driving (BMW AutoRun CAN Project)",
    start: "Oct 2024",
    end: "May 2025",
    location: "Berlin",
    bullets: [
      "Built ROS2 data acquisition and synchronization workflows for LiDAR, IMU, and CAN on the BMW AutoRun research platform.",
      "Built Python automation tooling with NumPy and Pandas for test-data analysis; created dashboards and visualizations for validation runs.",
      "Worked on Python replay and simulation tooling, CAN-based actuation, and reproducible validation of research data.",
    ],
    tags: ["ROS", "LiDAR", "CAN", "Python", "Sensor Fusion"],
  },
  {
    company: "University of Zanjan",
    title: "Head of Robotics Association",
    start: "Oct 2022",
    end: "Oct 2023",
    location: "Zanjan",
    bullets: [
      "Developed ROS-based autonomy software in C++ and Python for UAV and navigation projects, connecting sensing, control, and embedded hardware.",
      "Assembled robotic hardware end-to-end; debugged hardware–software integration across sensors, actuators, and embedded controllers.",
      "Mentored 20+ students in robotics software development, Git workflows, and system testing.",
    ],
    tags: ["ROS", "C++", "Python", "Embedded", "Mentoring"],
  },
  {
    company: "Ileria",
    title: "Embedded Systems Intern",
    start: "Jul 2022",
    end: "Sep 2022",
    location: "Zanjan",
    bullets: [
      "Developed and tested embedded firmware on microcontroller platforms; wrote test scripts to validate sensor and communication peripherals.",
    ],
    tags: ["Firmware", "Microcontrollers", "Test Scripts"],
  },
  {
    company: "University of Zanjan",
    title: "Teaching Assistant — Computer Programming",
    start: "Feb 2020",
    end: "Jun 2021",
    location: "Zanjan",
    bullets: [
      "Taught Python, C++, and Java with a focus on OOP over 4 semesters; mentored students in debugging and software-engineering practices.",
    ],
    tags: ["Python", "C++", "Java", "OOP"],
  },
];

export const projects: Project[] = [
  {
    slug: "vehicle-assistant-validation-lab",
    name: "Vehicle Assistant Validation Lab",
    kicker: "Independent engineering lab · Oct 2026",
    featured: true,
    problem:
      "How can assistant tools, stored preferences, and scenario checks be tested against explicit contracts before connecting them to real systems?",
    built:
      "Implemented a Python lab combining budget-aware test selection, a simulated vehicle backend with token, scope, and ownership checks, idempotent writes, and SQLite memory with provenance and per-user isolation. Added structural and semantic checks for a defined OpenSCENARIO 1.2 XML subset, an official-SDK MCP stdio tool adapter, 29 automated tests, and reproducible JSON/XML benchmark reports.",
    note:
      "Local proof of concept using synthetic fixtures and a simulated backend. Scenario checks cover a restricted subset; production OAuth, live-model evaluation, and simulator execution remain future work.",
    stack: ["Python", "MCP SDK", "HTTP / JSON", "Authorization", "SQLite", "OpenSCENARIO", "Test Selection"],
    link: {
      label: "Explore GitHub repository",
      href: "https://github.com/MahdiBayanloo/vehicle-assistant-validation-lab",
    },
    evidence: {
      label: "Read benchmark evidence",
      href: "https://github.com/MahdiBayanloo/vehicle-assistant-validation-lab/blob/main/reports/latest/BENCHMARK.md",
    },
  },
  {
    slug: "ai-optimization-pipeline",
    name: "Multi-Agent Firmware Optimization Pipeline",
    kicker: "LLM engineering prototype · Apr–May 2026",
    problem:
      "How can an LLM propose firmware changes while keeping architecture constraints, behavior review, and an inspectable record of each step?",
    built:
      "Built a Python orchestrator using the Anthropic SDK with six roles: planner, generator, architecture reviewer, behavior reviewer, repair agent, and test designer. It assembles task-specific code and documentation context, limits repair iterations to three, and records prompts, responses, and token usage in JSONL. Includes a C++ timing harness comparing simulated blocking and non-blocking communication.",
    note:
      "Prototype scope: timing results come from a mock harness. Generated patches still require build, hardware integration, and validation; this is not a measured hardware speedup.",
    stack: ["Python", "Anthropic SDK", "Context Engineering", "Agent Orchestration", "JSONL", "C++"],
    link: { label: "Explore source & run artifacts", href: "https://github.com/MahdiBayanloo/ai-optimization-pipeline" },
  },
  {
    slug: "braking-events",
    name: "Telemetry Resampling & Braking-Event Detection",
    kicker: "Python data-processing project · 2026",
    problem:
      "Irregular timestamps and missing measurements make it difficult to identify sustained events consistently in sensor logs.",
    built:
      "Implemented a Pandas pipeline that aligns telemetry to an exact 10 Hz grid, interpolates continuous speed values, and forward-fills the discrete brake state. It extracts braking intervals lasting at least 0.5 seconds and reports their start, end, sampled duration, and speed drop. Three focused tests cover interpolation, discrete-state preservation, and event thresholds.",
    stack: ["Python", "Pandas", "Time Series", "Signal Processing", "pytest"],
    link: { label: "Read implementation & tests", href: "https://github.com/MahdiBayanloo/braking-events" },
  },
  {
    slug: "spatial-air-quality-traffic",
    name: "Spatial Analysis of Air Quality & Traffic Patterns in German Cities",
    kicker: "FU Berlin · Spatial Databases (Prof. Agnès Voisard) · 2026",
    problem:
      "Where does poor urban air quality actually coincide with traffic congestion — and can raw traffic and sensor data answer that at district level?",
    built:
      "A unified spatial data pipeline in PostgreSQL/PostGIS joining TomTom road-traffic data with OpenAQ air-quality sensor measurements. Multi-layer interactive maps (Leaflet/OpenStreetMap) of Berlin, Hamburg, Munich, Cologne, Frankfurt and Stuttgart: district-level AQI polygons, 2,000+ individual sensor points, and traffic hotspots. Spatial queries and visualizations support investigation of relationships between congestion and air quality. Team of three.",
    stack: ["PostgreSQL", "PostGIS", "Spatial Queries", "TomTom Traffic API", "OpenAQ", "Leaflet"],
    link: {
      label: "View on LinkedIn",
      href: "https://www.linkedin.com/posts/mahdi-bayanloo-2b7317215_spatial-analysis-of-air-quality-traffic-activity-7425275601516789760-f-V1",
    },
  },
  {
    slug: "iot-demo-kit",
    name: "Plug-and-Play IoT Demonstration Kit",
    kicker: "Industrial IoT · 2026",
    problem:
      "Turn a complex industrial IoT system into a plug-and-play, customer-facing demo experience.",
    built:
      "A compact demonstration kit integrating sensors, industrial controllers, networking, and power management in a single enclosure — waterproof panel-mounted connectivity, integrated wireless access for field demonstrations, and clean cable management for serviceability.",
    stack: ["IoT", "Embedded Systems", "Industrial Automation", "Networking", "Enclosure Design"],
    link: {
      label: "View on LinkedIn",
      href: "https://www.linkedin.com/feed/update/urn:li:activity:7469749439654486016/",
    },
  },
  {
    slug: "flow-matching-vs-ddpm",
    name: "Flow Matching vs. Denoising Diffusion (DDPM)",
    kicker: "FU Berlin course project · 2026",
    problem:
      "Which modern generative approach performs better under truly identical conditions — flow matching or diffusion?",
    built:
      "Implemented both methods on one shared PyTorch codebase (same backbone and training budget) and benchmarked them on 2D data and MNIST — Sliced Wasserstein, MMD, and FID with a self-trained feature network. Fully reproducible: fixed seeds, resumable, checkpointed experiments.",
    stack: ["PyTorch", "Flow Matching", "DDPM", "U-Net", "Generative Models"],
  },
  {
    slug: "jenkins-hil",
    name: "Jenkins CI/CD Pipeline for Embedded Systems",
    kicker: "HOLOPLOT · Dec 2024–Jan 2025",
    problem:
      "Embedded software validation was manual — no automated path from commit to verified hardware behavior.",
    built:
      "A Jenkins + Gradle CI/CD pipeline with automated test scripts and hardware-in-the-loop integration tests: every commit triggered automated build, test, and reporting on real hardware targets.",
    stack: ["Jenkins", "Gradle", "Groovy", "HIL", "CI/CD"],
    link: {
      label: "Watch demo",
      href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7279625656865345536/",
    },
  },
  {
    slug: "esp32-face-door",
    name: "CNN Face-Recognition Door Control",
    kicker: "Bachelor thesis · Sep 2023",
    problem:
      "Run real-time face recognition on a microcontroller-class device — no cloud, no GPU.",
    built:
      "Trained a custom CNN in PyTorch, then deployed quantized inference in C++ with OpenCV on an ESP32 for real-time embedded execution.",
    stack: ["PyTorch", "CNN", "Quantization", "C++", "OpenCV", "ESP32"],
    link: {
      label: "Watch demo",
      href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7101179505246879744/",
    },
  },
  {
    slug: "llm-as-a-judge",
    name: "LLM as a Judge",
    kicker: "Kaggle competition · Jan 2025",
    problem:
      "How robust are LLM judges — and can structured strategies systematically shift their verdicts?",
    built:
      "Collaborated with a 20-researcher team at Experience Cafe on a Kaggle competition investigating disagreement among LLM judges. Researched model robustness, subjective evaluation, and exploit strategies; contributed code and essay-submission experiments.",
    stack: ["Python", "LLMs", "Evaluation", "Robustness", "Kaggle"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI & Machine Learning",
    items: ["PyTorch", "TensorFlow", "Generative Models", "LLMs", "Anthropic SDK", "RAG", "Agent Workflows", "Model Evaluation"],
  },
  {
    group: "Programming & Automation",
    items: ["Python", "C/C++", "Java", "JavaScript / TypeScript", "Bash", "Groovy", "Git", "Linux"],
  },
  {
    group: "Robotics & Embedded Systems",
    items: ["ROS / ROS2", "STM32", "RTOS", "LiDAR / IMU", "Sensor Synchronization", "CAN", "MATLAB / Simulink", "OpenCV"],
  },
  {
    group: "Data & Visualization",
    items: ["SQL", "PostgreSQL / PostGIS", "Pandas", "NumPy", "Matplotlib", "Leaflet", "Geospatial Analysis", "Time Series"],
  },
  {
    group: "Testing & Infrastructure",
    items: ["Jenkins", "GitLab CI", "HIL / SIL", "Docker", "Gradle", "AWS S3 / Lambda", "Kubernetes"],
  },
  {
    group: "APIs & Technical Communication",
    items: ["REST", "GraphQL", "JSON / JSONL", "Confluence", "LaTeX", "HTML", "PowerPoint", "Technical Presentations"],
  },
];

export const education = [
  {
    school: "Freie Universität Berlin",
    degree: "M.Sc. Computational Sciences",
    period: "Oct 2024 – Present · expected enrolment through 2028",
    stat: { value: "1.3", label: "Current grade · German scale" },
    detail: "Computer science, applied mathematics, and physics. Passed coursework includes machine learning methods and evaluation, robotics/navigation, statistical physics, and a seminar on function-space ML, operator learning, and inverse problems. German grading scale: 1.0 is the highest grade.",
  },
  {
    school: "University of Zanjan",
    degree: "B.Sc. Electrical Engineering (Embedded Systems)",
    period: "Sep 2019 – Sep 2023",
    stat: { value: "1st", label: "Rank in cohort" },
    detail: "Grade: 1.7 on the German grading scale (1.0 highest). Focus on embedded systems; CNN-based face-recognition thesis.",
  },
];

export const certifications = [
  {
    name: "Building RAG Agents with LLMs",
    issuer: "NVIDIA",
    date: "Jan 2025", // scan verified: issued Jan 30, 2025
    image: "/certs/nvidia-rag-agents.jpg",
  },
  {
    // Verified from scan (not on CV): NVIDIA DLI + UNITAR/UNOSAT, Jan 23, 2025
    name: "Disaster Risk Monitoring Using Satellite Imagery",
    issuer: "NVIDIA · UNITAR",
    date: "Jan 2025",
    image: "/certs/nvidia-disaster-risk.jpg",
  },
  {
    name: "Machine Learning Certificate",
    issuer: "IEEE",
    date: "Nov 2020",
    image: null,
  },
];

export const languages = [
  { name: "English", level: "Advanced (IELTS 7.5)" },
  { name: "German", level: "Intermediate — actively studying" },
  { name: "Turkish", level: "Native" },
  { name: "Persian", level: "Native" },
];

export const about = {
  // Personal context, kept distinct from professional project claims.
  paragraph:
    "I'm Mahdi, based in Berlin. I'm fascinated by what happens when code meets the physical world: a robot moving, a sensor making sense of its surroundings, or an AI idea becoming something I can actually test. I study Computational Sciences at Freie Universität Berlin, where I get to work across computer science, applied mathematics, and physics.",
  arc: "Teaching programming → robotics team leadership → embedded systems → research & sensor data → AI-assisted firmware → software integration.",
  interests: "Outside work: building combat robots with my team, motorcycle riding, and guitar. I like projects that give me something to figure out—and something to build.",
};
