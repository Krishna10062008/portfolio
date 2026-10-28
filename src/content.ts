/**
 * Central Content Bank for Krishna's Portfolio
 * Sourced strictly from the project brief.
 */

export interface FeaturedBuild {
  id: string;
  title: string;
  badge: string;
  summary: string;
  tech: string[];
  youtubeUrl: string; // e.g. "TODO: [FILL link]"
  duration?: string;
  previewThumbnail: string;
  customAsset?: string;
}

export interface SelectedProject {
  id: string;
  title: string;
  domain: string;
  description: string;
  tech: string[];
  isResearchOnly?: boolean;
  researchBadge?: string;
  caseFile: {
    what: string;
    how?: string;
    concept?: string;
    stack: string[];
    keyDeliverables: string[];
    technicalHighlights: string[];
    links?: { label: string; url: string }[];
  };
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  iconName: 'Globe' | 'Workflow' | 'Bot' | 'Eye' | 'Palette' | 'Film';
}

export interface ContentBank {
  identity: {
    name: string;
    wordmark: string;
    headline: string;
    subheadline: string;
    location: string;
    status: {
      isOpenToWork: boolean;
      statusText: string;
    };
    bioShort: string;
    aboutStory: string;
    aboutFactChips: string[];
  };
  links: {
    youtube: string;
    youtubeChannelName: string;
    emailUser: string;
    emailDomain: string;
    email: string;
    linkedin: string;
    hireEndpoint: string;
    hireButtonLabel: string;
  };
  featuredBuilds: FeaturedBuild[];
  selectedWork: SelectedProject[];
  services: ServiceItem[];
  toolbelt: {
    core: string[];
    aiWorkflow: string[];
    aiWorkflowTagline: string;
  };
}

export const content: ContentBank = {
  identity: {
    name: "Krishna",
    wordmark: "K",
    headline: "AI Engineering Student · Automation & Computer Vision · Freelance Builder",
    subheadline: "Turning computer vision algorithms, real-time automation pipelines, and custom web interfaces into cinematic, production-grade software.",
    location: "India",
    status: {
      isOpenToWork: true,
      statusText: "Open to Work",
    },
    bioShort: "AI engineering student from India. I learn by building.",
    aboutStory:
      "I’m Krishna, an AI engineering student from India. I learn by building: computer vision, automation, local servers and web interfaces. The fun ones go on my channel, The ZeroShot. I’m open to work in any form: freelance, full-time, internships and collaborations.",
    aboutFactChips: [
      "AI Engineering Student",
      "Self-taught builder",
      "Creator at The ZeroShot",
    ],
  },

  links: {
    youtube: "https://www.youtube.com/@TheZeroShot-02",
    youtubeChannelName: "The ZeroShot",
    emailUser: "kg6940749",
    emailDomain: "gmail.com",
    email: "kg6940749@gmail.com",
    linkedin: "https://www.linkedin.com/in/krishna-patel-045247401",
    hireEndpoint: "/hire",
    hireButtonLabel: "@krishna",
  },

  featuredBuilds: [
    {
      id: "mandala",
      title: "Doctor Strange Mandala",
      badge: "Real-time CV & Gesture",
      summary:
        "Real-time hand-gesture detection. Do the gesture and an animated sling-ring mandala appears on my hands.",
      tech: ["OpenCV", "MediaPipe", "Python"],
      youtubeUrl: "https://www.youtube.com/@TheZeroShot-02",
      duration: "CV Demo",
      previewThumbnail: "/assets/aistudio/image_f6fe4e4d.png",
      customAsset: "/assets/aistudio/image_f6fe4e4d.png",
    },
    {
      id: "thanos-snap",
      title: "Thanos Snap",
      badge: "Gesture Particle FX",
      summary:
        "Snap on camera and I turn to dust. Gesture triggered particle dispersion tracking real-time finger kinematics.",
      tech: ["OpenCV", "MediaPipe", "Python"],
      youtubeUrl: "https://www.youtube.com/@TheZeroShot-02",
      duration: "CV Demo",
      previewThumbnail: "/assets/aistudio/thanos_gauntlet.png",
      customAsset: "/assets/aistudio/thanos_gauntlet.png",
    },
    {
      id: "home-ott",
      title: "ZeroStreamz (Home OTT)",
      badge: "Local Network Streaming",
      summary:
        "Streams my local library to every device on my Wi-Fi (TV, tablet, phones) from a Python Static IP Server.",
      tech: ["Python", "FastAPI", "Static IP Server", "Local Network"],
      youtubeUrl: "https://www.youtube.com/@TheZeroShot-02",
      duration: "Full Pipeline",
      previewThumbnail: "/assets/aistudio/zerostreamz_logo.png",
      customAsset: "/assets/aistudio/zerostreamz_logo.png",
    },
  ],

  selectedWork: [
    {
      id: "ai-radar",
      title: "AI Radar System",
      domain: "Hardware & CV",
      description:
        "An integrated radar tracking system leveraging machine learning to identify and predict trajectories in real-time.",
      tech: ["Arduino", "Python", "TensorFlow", "C++", "Embedded Systems"],
      caseFile: {
        what:
          "Traditional ultrasonic and radar sweeps suffer from high sensor jitter and static obstacle ambiguity in dynamic multi-object spaces. This system tracks angular sweeps and predicts flight vectors in real-time.",
        how:
          "Arduino sensor hardware serializes live angular sweep matrices to a Python runtime, where a TensorFlow recurrent model classifies acoustic signatures and predicts dynamic movement vectors at 60 FPS.",
        stack: ["Arduino", "Python", "TensorFlow", "C++", "Embedded Systems"],
        keyDeliverables: [
          "Microcontroller telemetry firmware in C++",
          "Low-latency serial parser pipeline in Python",
          "TensorFlow continuous trajectory predictor",
        ],
        technicalHighlights: [
          "Real-time coordinate plotting at 60 FPS",
          "Sub-15ms inference latency on edge processor",
          "Adaptive noise suppression filter",
        ],
      },
    },
    {
      id: "cctv-threat",
      title: "CCTV Threat Detection",
      domain: "Computer Vision",
      description:
        "Real-time anomaly and threat detection pipeline utilizing YOLOv8 and OpenCV for urban surveillance.",
      tech: ["YOLOv8", "OpenCV"],
      caseFile: {
        what:
          "Human surveillance monitoring suffers from fatigue and misses high-velocity anomalies across multi-camera streams. This pipeline automates real-time anomaly detection with instant timestamping.",
        how:
          "RTSP video streams are decoded via OpenCV frame batches and fed into an optimized YOLOv8 neural network for object classification, bounding box verification, and rapid alert dispatch.",
        stack: ["YOLOv8", "OpenCV", "Python", "RTSP Streams"],
        keyDeliverables: [
          "Multi-stream RTSP ingestion pipeline",
          "Custom-trained YOLOv8 detection weights",
          "Instant alert dispatcher with bounding snapshot logging",
        ],
        technicalHighlights: [
          "Processes multi-camera feeds at 30+ FPS per channel",
          "Drastic reduction in false positive trigger rates",
          "Instant frame-accurate threat timestamping",
        ],
      },
    },
    {
      id: "jarvis-smartwatch",
      title: "JARVIS Smartwatch",
      domain: "Research & IoT",
      isResearchOnly: true,
      researchBadge: "RESEARCH ONLY",
      description:
        "A research study of a context-aware wearable agent that combines LLMs with local sensor data. It is a concept and architecture study, not a built device.",
      tech: ["LLM APIs", "Bluetooth LE"],
      caseFile: {
        what:
          "What I explored: Wearable devices currently push notification noise rather than proactive contextual assistance synthesized from biometric and temporal context. I investigated the architectural feasibility of on-device sensor pruning feeding cloud LLM reasoning.",
        concept:
          "System architecture detailing how low-energy wearable sensors can stream structured state telemetry via Bluetooth LE to a local or cloud LLM agent, generating situational assistance.",
        stack: ["LLM APIs", "Bluetooth LE", "Sensor Telemetry", "System Architecture"],
        keyDeliverables: [
          "System architecture diagram & dataflow specification",
          "Sensor telemetry schema definition (IMU, PPG, ambient lux)",
          "LLM context prompt construction framework",
        ],
        technicalHighlights: [
          "Strict research paper & architectural feasibility analysis",
          "Exploration of latency constraints in wearable BLE pipelines",
          "Conceptual context pruning algorithms for token efficiency",
        ],
      },
    },
    {
      id: "enterprise-web",
      title: "Enterprise Web Platforms",
      domain: "Frontend Engineering",
      description:
        "High-performance, accessible, and conversion-optimized web applications for modern businesses.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      caseFile: {
        what:
          "Complex web interfaces often degrade under heavy client state, compromising load speed, Lighthouse ratings, and user retention. This project delivers production web interfaces built for high velocity and conversion.",
        how:
          "Engineered modular React architecture with atomic design primitives, fluid typography, zero layout shift (CLS < 0.05), and WCAG AA accessibility compliance.",
        stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
        keyDeliverables: [
          "Design system token architecture",
          "Production-ready responsive layouts across mobile & desktop",
          "High-conversion kinetic UI micro-interactions",
        ],
        technicalHighlights: [
          "100/100 Lighthouse performance metrics",
          "Sub-2s initial load and full keyboard navigability",
          "Tailwind design tokens mapped to unified CSS properties",
        ],
      },
    },
    {
      id: "ai-teaching-bots",
      title: "AI Teaching Bots",
      domain: "AI Apps",
      description:
        "Interactive tutors built with Google Labs tools for DSA, NumPy/Pandas and FastAPI, plus a simple-concepts tutor built for a CA student.",
      tech: ["Google Labs Tools", "Prompt Engineering", "Python", "DSA", "FastAPI"],
      caseFile: {
        what:
          "Generic AI chats provide walls of generic answers without guiding students through step-by-step Socratic inquiry. These interactive bots guide learners through DSA, NumPy/Pandas, FastAPI, and accounting concepts.",
        how:
          "Structured prompt pipelines tuned with pedagogical constraints: enforcing interactive hints, memory checks, and code sandboxing for DSA and data science concepts without answer dumping.",
        stack: ["Google Labs Tools", "Prompt Engineering", "Python", "DSA", "FastAPI"],
        keyDeliverables: [
          "DSA & algorithmic logic interactive tutor",
          "NumPy/Pandas practical data science drill bot",
          "FastAPI backend architecture tutor",
          "Tailored CA accounting simple-concepts pedagogical bot",
        ],
        technicalHighlights: [
          "Socratic reasoning loops that prevent answer dumping",
          "Adaptive difficulty adjustments based on learner responses",
          "Structured feedback rubrics",
        ],
      },
    },
  ],

  services: [
    {
      id: "srv-web",
      index: "01",
      title: "Websites & Web Interfaces",
      description: "Bespoke, cinematic web applications with high visual impact, rapid load times, and conversion-focused UX.",
      iconName: "Globe",
    },
    {
      id: "srv-automation",
      index: "02",
      title: "Automation (n8n, WhatsApp API, Python)",
      description: "End-to-end operational automation workflows that eliminate repetitive manual tasks and connect internal tools.",
      iconName: "Workflow",
    },
    {
      id: "srv-ai-apps",
      index: "03",
      title: "AI Apps & Bots",
      description: "Specialized contextual bots and LLM applications designed with structured prompts, grounded responses, and clean UX.",
      iconName: "Bot",
    },
    {
      id: "srv-cv",
      index: "04",
      title: "Computer Vision Builds",
      description: "Custom image and video analysis systems using state-of-the-art vision models and real-time camera tracking.",
      iconName: "Eye",
    },
    {
      id: "srv-graphic-design",
      index: "05",
      title: "Graphic Design",
      description: "Distinctive brand assets, comic-style visual identity, and editorial graphic layouts that demand attention.",
      iconName: "Palette",
    },
    {
      id: "srv-motion-graphics",
      index: "06",
      title: "Motion Graphics",
      description: "Punchy visual effects, animated user interface transitions, and video assets that communicate technical concepts.",
      iconName: "Film",
    },
  ],

  toolbelt: {
    core: [
      "Python",
      "FastAPI",
      "JavaScript",
      "HTML/CSS",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "OpenCV",
      "MediaPipe",
      "YOLOv8",
      "TensorFlow",
      "NumPy",
      "Pandas",
      "Arduino",
    ],
    aiWorkflow: ["Claude", "Codex", "Antigravity", "Cursor", "OpenCode", "n8n", "WhatsApp API"],
    aiWorkflowTagline: "AI-assisted, human-verified.",
  },
};
