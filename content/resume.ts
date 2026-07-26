/**
 * Single source of truth for all site copy and data.
 * Mirrors the CV (`Mahdi Bayanloo RivianVW CV`) + user-supplied RV Tech details.
 * RULE: nothing appears here that Mahdi hasn't verified. TODO(intake) items
 * are placeholders that MUST be resolved with him before Phase 2 ships.
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
};

export const identity = {
  name: "Mahdi Bayanloo",
  role: "Software Integration Engineer — Vehicle OTA & Embedded Test",
  location: "Berlin, Germany",
  headline: "Building the Software Behind Future Vehicles", // confirmed by Mahdi
  tagline:
    "Software Integration Engineer | OTA Systems | Embedded Software | Vehicle Intelligence",
  message:
    "Modern vehicles are no longer only machines. They are intelligent software platforms.",
  subline:
    "Software integration engineer for vehicle OTA and embedded systems — ECUs, hardware-in-the-loop validation, test automation. Berlin.",
  email: "mahdibayanloo1379@gmail.com",
  // No phone, no CV download on the site — confirmed by Mahdi (LinkedIn only)
  links: {
    linkedin: "https://www.linkedin.com/in/mahdi-bayanloo-2b7317215/",
    github: "https://github.com/mahdibayanloo",
  },
};

/** Employer/institution proof strip, in scan order */
export const proof = [
  "Rivian and Volkswagen Group Technologies",
  "Perinet",
  "Zuse Institute Berlin · BMW AutoRun",
  "Holoplot",
  "FU Berlin",
];

export const experience: Experience[] = [
  {
    // Confirmed by Mahdi 2026-07-26. Confidentiality: describe ECU/OTA work
    // only — do NOT name specific vehicle brands (no "Audi").
    company: "Rivian and Volkswagen Group Technologies",
    title: "Software Integration Engineer — OTA",
    start: "Jul 2026",
    end: "Present",
    location: "Berlin",
    current: true,
    highlight: true,
    bullets: [
      "Integrate over-the-air update software for production vehicle ECUs.",
      "Maintain and extend HIL test setups; update code and OTA update recipes.",
      "Write and integrate new signal logs; analyze signal-log data across ECU platforms.",
    ],
    tags: ["Python", "C++", "Linux", "HIL", "OTA", "ECU"],
  },
  {
    company: "Perinet GmbH",
    title: "Electronics Engineer (Working Student)",
    start: "May 2025",
    end: "2026", // ended per Mahdi — TODO: exact end month
    location: "Berlin",
    bullets: [
      "Wrote automated tests in Python and validated embedded firmware on STM32; debugged hardware–software integration across signal-processing and communication layers.",
      "Validated Automotive Ethernet (100BASE-T1, SPE) communication stacks using VNA and oscilloscopes with high-frequency signal analysis — directly applicable to in-vehicle network testing.",
      "Developed RTOS C/C++ firmware (USART, SPE stacks); authored manufacturing and test documentation in LaTeX.",
      "Built an agentic AI pipeline (RAG + agent orchestration) to analyze and restructure RTOS firmware; presented technical evaluation internally.",
    ],
    tags: ["Python", "C/C++", "STM32", "RTOS", "100BASE-T1", "VNA", "RAG"],
  },
  {
    company: "Zuse Institute Berlin",
    title: "Research Assistant — Autonomous Driving (BMW AutoRun CAN Project)",
    start: "Oct 2024",
    end: "May 2025",
    location: "Berlin",
    bullets: [
      "Engineered ROS-based multi-sensor data acquisition pipelines (LiDAR, IMU, CAN) on a real vehicle platform; synchronized heterogeneous streams via sensor fusion.",
      "Built Python automation tooling with NumPy and Pandas for test-data analysis; created dashboards and visualizations for validation runs.",
      "Managed large demonstration datasets and CI-style reproducible test workflows for autonomous-driving research.",
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
      "Developed a full ROS autonomy stack (OOP C++ & Python) for competitive robotics; team achieved top placement in the Pathfinder competition.",
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
    company: "TU Berlin / University of Zanjan",
    title: "Teaching Assistant — Computer Programming",
    start: "Feb 2020",
    end: "Jun 2021",
    location: "Berlin / Zanjan",
    bullets: [
      "Taught Python, C++, and Java with a focus on OOP over 4 semesters; mentored students in debugging and software-engineering practices.",
    ],
    tags: ["Python", "C++", "Java", "OOP"],
  },
];

export const projects: Project[] = [
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
    kicker: "Holoplot · Dec 2024",
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
      "An evaluation pipeline with LLMs and RAG; analyzed model behavior across structured test datasets and developed strategies maximizing disagreement among LLM judges.",
    stack: ["Python", "LLMs", "RAG", "Jupyter"],
    link: {
      label: "GitHub",
      href: "https://github.com/MahdiBayanloo/LLM-as-a-Judge",
    },
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Embedded & Vehicle Systems",
    items: [
      "STM32",
      "Raspberry Pi",
      "Arduino",
      "RTOS",
      "Automotive Ethernet",
      "100BASE-T1 / SPE",
      "CAN",
      "Altium",
      "VNA",
      "Oscilloscope",
    ],
  },
  {
    group: "DevOps & Test",
    items: ["Jenkins", "CI/CD", "Git", "Gradle", "Docker", "Linux", "HIL Testing"],
  },
  {
    group: "Programming & Automation",
    items: ["Python", "C/C++", "Java", "OOP", "Bash", "Groovy"],
  },
  {
    group: "Robotics & Sensors",
    items: ["ROS / ROS2", "LiDAR", "IMU", "Sensor Fusion", "Computer Vision", "OpenCV"],
  },
  {
    group: "AI / ML",
    items: ["PyTorch", "Deep Learning", "LLMs", "LangChain", "RAG"],
  },
  {
    group: "Data & Visualization",
    items: ["NumPy", "Pandas", "Matplotlib", "Dashboarding", "Test Reporting"],
  },
];

export const education = [
  {
    school: "Freie Universität Berlin",
    degree: "M.Sc. Computer Science",
    period: "Oct 2024 – 2026",
    stat: { value: "1.3", label: "GPA (1.0 highest)" },
    detail: "Coursework: Machine Learning, Robotics, Computer Vision, Algorithms.",
  },
  {
    school: "University of Zanjan",
    degree: "B.Sc. Electrical Engineering (Embedded Systems)",
    period: "Sep 2019 – Sep 2023",
    stat: { value: "1st", label: "Rank in cohort" },
    detail: "GPA 1.7.",
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
    date: "Nov 2022",
    image: null, // TODO(intake): no scan in repo — ask Mahdi for it
  },
];

export const languages = [
  { name: "English", level: "Advanced (IELTS 7.5)" },
  { name: "German", level: "Intermediate — actively studying" },
  { name: "Turkish", level: "Native" },
  { name: "Persian", level: "Native" },
];

export const about = {
  // TODO(intake): refine with Mahdi during Phase 2 copy pass
  paragraph:
    "I'm an embedded software and test-automation engineer in Berlin. My work spans the full vehicle software stack — from STM32 firmware and Automotive Ethernet validation to ROS sensor pipelines on real autonomous-driving platforms, and now over-the-air updates for production ECUs. Alongside, I'm finishing an M.Sc. in Computer Science at FU Berlin.",
  arc: "Teaching OOP → robotics team lead → embedded intern → autonomous-driving research → automotive Ethernet validation → vehicle OTA integration.",
};
