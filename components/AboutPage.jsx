"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react"; // Added useRef
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Award,
  Briefcase,
  Code2,
  Rocket,
  Zap,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Download,
  Sparkles,
  ChevronLeft,
  Terminal,
  GitBranch,
  Copy,
  Wind,
  Settings,
  Crosshair,
  Cpu,
  Activity,
  Database,
  Layers,
  FileCode,
  PlayCircle,
  BarChart3,
  Timer,
  Check
} from "lucide-react";

// --- NEW COMPONENT: MOUSE TRACKING SPOTLIGHT ---
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 165, 0, 0.15)" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* The Glow Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

// --- ANIMATION VARIANTS ---
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- CUSTOM ICONS ---
const Box = ({ size = 14, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 4 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// --- DATA ---

const skillCategories = [
  {
    title: "Mechanical & Simulation",
    icon: Settings,
    skills: [
      "SolidWorks", "Siemens NX", "Solid Edge",
      "ANSYS Workbench", "Fusion 360",
      "GD&T", "DFM", "Additive Mfg"
    ]
  },
  {
    title: "Computational & AI",
    icon: Cpu,
    skills: [
      "Python", "MATLAB", "Simulink",
      "TensorFlow", "PyTorch", "OpenCV",
      "XGBoost", "Optuna", "Scikit-Learn"
    ]
  },
  {
    title: "Web & Tools",
    icon: Code2,
    skills: [
      "React.js", "Flask API", "Git/GitHub",
      "Streamlit", "Canva", "VS Code"
    ]
  }
];

const skillBars = [
  { label: "CAD Modeling & FEA (NX / SolidWorks)", level: 90, icon: Layers },
  { label: "Python & Scientific Computing", level: 88, icon: Code2 },
  { label: "Deep Learning & Computer Vision", level: 85, icon: Zap },
  { label: "MATLAB & Simulink", level: 82, icon: Activity },
  { label: "Data Science & Algorithms", level: 80, icon: TrendingUp },
];

const experiences = [
  {
    id: 1,
    role: "Production Engineering Intern",
    company: "Larsen & Toubro – Precision Engineering & Systems IC, Hazira",
    period: "May 2025 – Jul 2025",
    description:
      "Worked on heavy-lift fixture validation and additive manufacturing research for aerospace components. Analyzed materials like Ti-6Al-4V and Inconel 718 for microstructure and anisotropy.",
    highlights: [
      "Validated 450 MT lifting fixture & designed 24 MT deck fixture (SF > 1.5)",
      "Applied DFM & GD&T for shop-floor integration",
      "Reviewed AM technologies (SLM, DED) for aerospace applications"
    ],
    color: "#FF6B35",
    href: "/projects",
    ctaLabel: "View certificate",
  },
  {
    id: 2,
    role: "Research: Condition Monitoring of Ball Bearings",
    company: "ICRAM 2025, IITRAM",
    period: "2024 – 2025",
    description:
      "Developed a CNN-based deep learning model to classify thermal images of ball bearings into six specific conditions, enabling automated industrial fault detection.",
    highlights: [
      "Achieved 99.83% accuracy using thermal imaging",
      "Classified 6 conditions: Healthy, Inner/Outer Race Defect, etc.",
      "Published at ICRAM 2025"
    ],
    color: "#4ECDC4",
    href: "/projects#bearing-ai",
    ctaLabel: "View publication",
  },
];

// --- FEATURED PROJECTS ---
const featuredProjects = [
  {
    title: "Cross-Axis Wind Turbine (CAWT)",
    tag: "Renewable Energy · Hardware Prototype",
    summary:
      "Designed and prototyped a high-efficiency wind turbine optimized for urban environments. Utilized a hybrid configuration with 3 vertical and 6 horizontal 3D-printed PETG blades and a 5:1 planetary gearbox.",
    image: "/cawt-placeholder.jpg",
    gradient: "from-green-500 to-emerald-600",
    techStack: [
      { icon: Wind, name: "Aerodynamics" },
      { icon: Settings, name: "Planetary Gearbox" },
      { icon: Box, name: "3D Printing (PETG)" },
    ],
    highlightStat: { label: "Est. Output", value: "500W", icon: Zap },
    domain: "Hardware",
    liveLink: "/projects#cawt",
    repoLink: "/projects#cawt"
  },
  {
    title: "GSLV MkIII Trajectory Simulation",
    tag: "Aerospace · MATLAB · Flight Dynamics",
    summary:
      "Modeled the trajectory of a 3-stage launch vehicle (S200, L110, CE-20), analyzing complex forces including variable thrust, aerodynamic drag, and gravity losses to predict orbital injection parameters.",
    image: "/gslv-placeholder.jpg",
    gradient: "from-blue-600 to-indigo-500",
    techStack: [
      { icon: Rocket, name: "Orbital Mechanics" },
      { icon: Code2, name: "MATLAB" },
      { icon: Activity, name: "Physics Sim" },
    ],
    highlightStat: { label: "Altitude", value: "180 km", icon: Rocket },
    domain: "Simulation",
    liveLink: "/projects#gslv",
    repoLink: "https://github.com/Neelayjain02/GSLV-MKIII-Rocket-Simulation"
  },
  {
    title: "Industrial Bearing Fault Detection",
    tag: "Computer Vision · CNN · Predictive Maint.",
    summary:
      "A deep learning solution capable of classifying 6 different bearing conditions from thermal images with 99.83% accuracy. Implements data augmentation to handle industrial environments.",
    image: "/bearing-placeholder.jpg",
    gradient: "from-orange-500 to-red-500",
    techStack: [
      { icon: Zap, name: "TensorFlow/Keras" },
      { icon: Crosshair, name: "Thermal Imaging" },
      { icon: Code2, name: "Python" },
    ],
    highlightStat: { label: "Accuracy", value: "99.83%", icon: Check },
    domain: "AI Vision",
    liveLink: "/projects#bearing-ai",
    repoLink: "/projects#bearing-ai"
  },
  {
    title: "SPECTRA — Exoplanet Detection",
    tag: "NASA Space Apps · Full Stack · XGBoost",
    summary:
      " Web app build for International NASA Space App Challengethat processes Kepler mission data to classify celestial objects. Features a React frontend and Flask API backend to predict planetary habitability and water potential.",
    image: "/spectra-placeholder.jpg",
    gradient: "from-purple-500 to-pink-600",
    techStack: [
      { icon: Rocket, name: "React + Tailwind" },
      { icon: Code2, name: "Flask API" },
      { icon: TrendingUp, name: "XGBoost" },
    ],
    highlightStat: { label: "Predictions", value: "Real-time", icon: Timer },
    domain: "Web App",
    liveLink: "/projects#spectra",
    repoLink: "https://github.com/Neelayjain02/Spectra"
  },
  {
    title: "F1 Race Strategy Predictor",
    tag: "Analytics · XGBoost · Optuna",
    summary:
      "Machine learning pipeline optimizing F1 race strategies using historical data (2018-2024). Used Optuna for hyperparameter tuning to minimize MAE to 0.83 for position prediction.",
    image: "/f1-placeholder.jpg",
    gradient: "from-red-600 to-red-800",
    techStack: [
      { icon: TrendingUp, name: "XGBoost" },
      { icon: Settings, name: "Optuna" },
      { icon: Code2, name: "Streamlit" },
    ],
    highlightStat: { label: "Mean Error", value: "0.83", icon: BarChart3 },
    domain: "ML Model",
    liveLink: "/projects#f1-strategy",
    repoLink: "https://github.com/Neelayjain02/F1-Driver-Position-Predictor"
  },
  {
    title: "Casting Defect Detection",
    tag: "Quality Control · MobileNetV2",
    summary:
      "Automated quality inspection system using Transfer Learning (MobileNetV2). Achieved ~88% accuracy in classifying casting defects, optimized for real-time shop floor inference.",
    image: "/casting-placeholder.jpg",
    gradient: "from-gray-500 to-slate-500",
    techStack: [
      { icon: Crosshair, name: "MobileNetV2" },
      { icon: Zap, name: "Transfer Learning" },
      { icon: Activity, name: "Quality Control" },
    ],
    highlightStat: { label: "Inference", value: "45 FPS", icon: Zap },
    domain: "QC System",
    liveLink: "/projects#casting-defects",
    repoLink: "/projects#casting-defects"
  }
];

const leadership = [
  {
    id: "l1",
    title: "President — I-MECH, PDEU",
    period: "Aug 2023 – Present",
    summary:
      "Led a team to organize technical events, workshops, and industry visits. Revamped initiatives to boost student participation and coordinated with faculty/experts to enhance learning.",
    images: [
      "/imech-event-1.jpg",
      "/imech-event-2.jpg",
      "/imech-event-3.jpg",
      "/imech-event-4.jpg"
    ],
    icon: Award,
  },
  {
    id: "l2",
    title: "Executive Director — Mech-A-Tech",
    period: "Jan 2023 – Present",
    summary:
      "Managed content creation and publication of the department's technical newsletter. Ensured technical accuracy and timely dissemination of monthly editions.",
    images: [
      "/newsletter-launch.jpg",
      "/newsletter-team.jpg"
    ],
    icon: Briefcase,
  },
];

export default function AboutPage() {
  const [activeExperience, setActiveExperience] = useState(experiences[0]);
  const [activeLeadership, setActiveLeadership] = useState(leadership[0]);
  const [leadershipImgIndex, setLeadershipImgIndex] = useState(0);

  const nextImage = () => {
    if (!activeLeadership.images || activeLeadership.images.length === 0) return;
    setLeadershipImgIndex((prev) => (prev + 1) % activeLeadership.images.length);
  };

  const prevImage = () => {
    if (!activeLeadership.images || activeLeadership.images.length === 0) return;
    setLeadershipImgIndex((prev) => (prev - 1 + activeLeadership.images.length) % activeLeadership.images.length);
  };

  const handleLeadershipChange = (role) => {
    setActiveLeadership(role);
    setLeadershipImgIndex(0);
  };

  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-[#E0E4EB] overflow-hidden pt-10 md:pt-16">
      {/* BACKGROUND ELEMENTS */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,#FFA50033,transparent_60%)] blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,#FFA50033,transparent_60%)] blur-3xl"
        />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12"
      >
        {/* HERO SECTION */}
        <section className="relative mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 1. TEXT CONTENT (Left) */}
            <motion.div
              variants={item}
              className="order-2 lg:order-1 space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFA500]/30 bg-[#FFA500]/5 text-[#FFA500] text-xs font-mono tracking-widest uppercase"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFA500]"></span>
                </span>
                Available for Internships
              </motion.div>

              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                  Hi, I&apos;m <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] via-orange-400 to-red-500">
                    Neelay Jain
                  </span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-1.5 bg-[#FFA500] mt-4 rounded-full"
                />
              </div>

              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl">
                Bridging the gap between <span className="text-gray-100 font-semibold">Mechanical Systems</span> and <span className="text-gray-100 font-semibold">Artificial Intelligence</span>.
                <br className="hidden md:block" />
                I transform first principles into data-driven prototypes, specializing in CAD, FEA, and Computer Vision.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="#projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 py-3 bg-[#FFA500] text-black font-bold rounded-full transition-all flex items-center gap-2"
                  >
                    View Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 -z-10 bg-[#FFA500]/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#FFA500" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gray-700 text-gray-300 hover:text-white rounded-full transition-all flex items-center gap-2 bg-black/20 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </motion.button>
              </div>
            </motion.div>

            {/* 2. VISUALS (Right) */}
            <motion.div
              variants={item}
              className="order-1 lg:order-2 relative mx-auto lg:mr-0"
            >
              <div className="relative z-20 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] shadow-2xl shadow-[#FFA500]/10 group">
                <Image
                  src="/me.jpg"
                  alt="Neelay Jain"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 border border-dashed border-[#FFA500]/30 rounded-full z-10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-8 -left-8 w-40 h-40 border border-dotted border-gray-600/30 rounded-full z-10"
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-32 -right-6 md:-right-4 bg-[#1A1A1A]/95 backdrop-blur-md border border-gray-700 p-5 rounded-xl shadow-xl z-30 w-[220px]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#FFA500]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Focus Areas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300">Generative Design</span>
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300">Comp Vision</span>
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300">Robotics</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CAREER ENGINE */}
        <motion.section variants={container} className="mb-24 relative z-10">
          <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* LEFT COLUMN: Experience */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Experience</h2>
                <div className="flex bg-[#1A1A1A] p-1 rounded-lg border border-white/5">
                  {experiences.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExperience(exp)}
                      className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                        activeExperience.id === exp.id
                          ? "bg-[#FFA500] text-black shadow-lg shadow-orange-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {exp.period}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 h-full"
                >
                  {/* WRAPPED WITH SPOTLIGHT */}
                  <SpotlightCard className="bg-[#0F0F0F] border border-[#333] rounded-2xl p-6 lg:p-8 h-full">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FFA500]/5 blur-[80px] rounded-full -z-10" />

                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                          {activeExperience.role}
                        </h3>
                        <p className="text-sm text-[#FFA500] font-medium mt-1 flex items-center gap-2">
                          <Briefcase size={14} /> {activeExperience.company}
                        </p>
                      </div>
                      <Link href={activeExperience.href || "#"} className="hidden sm:block">
                        <div className="bg-[#1A1A1A] hover:bg-[#FFA500] hover:text-black border border-white/10 text-white p-2.5 rounded-xl transition-colors cursor-pointer">
                          <ExternalLink size={18} />
                        </div>
                      </Link>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-[#FFA500]/30 to-transparent my-5" />
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {activeExperience.description}
                    </p>

                    <motion.div
                      className="space-y-3 bg-[#151515]/50 rounded-xl p-4 border border-white/5"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                        }
                      }}
                    >
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">
                        Key Impact
                      </p>

                      {activeExperience.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } }
                          }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 size={16} className="text-[#FFA500] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{highlight}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Leadership */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  Leadership
                </h2>

                <div className="flex bg-[#1A1A1A] p-1 rounded-lg border border-white/5">
                  {leadership.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleLeadershipChange(role)}
                      className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                        activeLeadership.id === role.id
                          ? "text-[#FFA500] bg-[#FFA500]/10 border border-[#FFA500]/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {role.period}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLeadership.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 h-full"
                >
                  {/* WRAPPED WITH SPOTLIGHT */}
                  <SpotlightCard className="bg-[#101010] border border-[#2A2A2A] rounded-2xl overflow-hidden flex flex-col h-full">
                    <div className="relative h-48 bg-[#1A1A1A] group">
                      {activeLeadership.images && activeLeadership.images.length > 0 ? (
                        <>
                          <Image
                            src={activeLeadership.images[leadershipImgIndex]}
                            alt={activeLeadership.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent opacity-60" />

                          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button
                              onClick={prevImage}
                              className="p-2 bg-black/50 hover:bg-[#FFA500] text-white hover:text-black rounded-full backdrop-blur-sm transition-all"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={nextImage}
                              className="p-2 bg-black/50 hover:bg-[#FFA500] text-white hover:text-black rounded-full backdrop-blur-sm transition-all"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {activeLeadership.images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${
                                  idx === leadershipImgIndex ? "w-6 bg-[#FFA500]" : "w-1.5 bg-white/40"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-[#151515]">
                          <p className="text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                            <Award size={16} /> No Images
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-6 relative flex-1 bg-gradient-to-b from-[#101010] to-[#0A0A0A]">
                      <div className="absolute -top-6 right-6 w-12 h-12 bg-[#1A1A1A] rounded-xl border border-[#333] flex items-center justify-center shadow-xl z-10">
                        {(() => {
                          const Icon = activeLeadership.icon;
                          return <Icon size={20} className="text-[#FFA500]" />;
                        })()}
                      </div>

                      <h3 className="text-lg font-bold text-white pr-12 leading-tight mb-2">
                        {activeLeadership.title}
                      </h3>

                      <p className="text-sm text-gray-400 leading-relaxed font-medium">
                        {activeLeadership.summary}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>

        {/* === FEATURED PROJECTS === */}
        <section id="projects" className="mb-32 relative z-10">
          <motion.div
            variants={item}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#E0E4EB] mb-3 leading-tight">
                Featured <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-orange-600">
                  Innovation
                </span>
              </h2>
              <p className="text-[#A1A8B8] max-w-md">
                Deep dives into complex engineering problems solved with code, data, and design.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#FFA500] font-mono uppercase tracking-widest">
              <Terminal size={14} />
              <div className="h-px w-12 bg-[#FFA500]/30" />
              Scroll to explore
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {featuredProjects.map((project, idx) => {
              const { highlightStat, domain } = project;

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 }}
                  className="flex flex-col gap-6 group"
                >
                  <div className="w-full relative perspective-1000">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 blur-[80px] -z-10 rounded-full group-hover:opacity-40 transition-opacity duration-500`}
                    />

                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      className="relative"
                    >
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A] aspect-[16/9] z-10">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-25`}
                        />
                      </div>

                      <div className="absolute top-4 -left-2 z-20">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0F0F0F]/90 backdrop-blur-md border border-white/10 rounded-r-full shadow-xl">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                            {domain}
                          </span>
                        </div>
                      </div>

                      <div className="absolute -bottom-6 -right-2 z-20">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 px-4 py-3 bg-[#151515]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                        >
                          <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                            {highlightStat && (
                              <highlightStat.icon size={18} className="text-[#FFA500]" />
                            )}
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
                              {highlightStat?.label}
                            </p>
                            <p className="text-sm font-bold text-white">
                              {highlightStat?.value}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="w-full space-y-4 pt-8">
                    <div>
                      <span
                        className={`inline-block mb-2 text-[10px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}
                      >
                        {project.tag}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-[#FFA500] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed text-sm">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-gray-300"
                        >
                          <tech.icon size={12} />
                          {tech.name}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link href={project.liveLink || "#"}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg`}
                        >
                          View Details
                        </motion.button>
                      </Link>

                      <Link href={project.repoLink || "#"}>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full text-white text-xs font-semibold transition-all">
                          <GitBranch size={12} />
                          Code
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "#FFA500", color: "#FFA500" }}
                className="px-8 py-3 border border-gray-700 rounded-full text-gray-300 font-semibold transition-all"
              >
                View Complete Project Archive
              </motion.button>
            </Link>
          </div>
        </section>

        {/* SKILLS */}
        <motion.section variants={container} className="mb-20">
          <motion.div variants={item}>
            {/* WRAPPED WITH SPOTLIGHT */}
            <SpotlightCard className="bg-[#101010]/95 border border-[#FFA500]/25 rounded-2xl p-6 md:p-8 lg:p-10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <div className="mb-8 border-b border-[#FFA500]/10 pb-6">
                <h2 className="text-3xl font-bold text-[#E0E4EB] mb-2">
                  Skills &amp; Tools
                </h2>
                <p className="text-sm text-[#A1A8B8]">
                  Mechanical design, simulation, and AI integration.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="space-y-8">
                  {skillCategories.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#9CA3AF] mb-4 flex items-center gap-2">
                        <category.icon size={14} className="text-[#FFA500]" />
                        {category.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{
                              y: -2,
                              borderColor: "#FFA500",
                              color: "#FFA500",
                              backgroundColor: "rgba(255, 165, 0, 0.1)",
                            }}
                            className="px-3 py-1.5 bg-[#151515] border border-[#333] text-[#CBD2E0] rounded-md text-xs font-medium transition-all cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#9CA3AF] mb-6 flex items-center gap-2">
                    <TrendingUp size={14} className="text-[#FFA500]" />
                    Proficiency Metrics
                  </h3>

                  <div className="space-y-6">
                    {skillBars.map((skill, idx) => {
                      const IconComponent = skill.icon;
                      return (
                        <motion.div
                          key={skill.label}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2 text-[#E0E4EB]">
                              <IconComponent size={14} className="text-[#FFA500]" />
                              <span className="text-xs md:text-sm font-semibold tracking-wide">
                                {skill.label}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#FFA500] opacity-80">
                              {skill.level}%
                            </span>
                          </div>

                          <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_20%,#000_20%,#000_22%,transparent_22%)] bg-[size:20%_100%] opacity-30 z-10" />

                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                              className="h-full bg-gradient-to-r from-[#FFA500] to-[#FF5500] shadow-[0_0_10px_rgba(255,165,0,0.5)] relative"
                            >
                              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-50" />
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.section>

        {/* CTA SECTION */}
        <motion.section variants={item} className="mb-10">
          {/* WRAPPED WITH SPOTLIGHT */}
          <SpotlightCard className="relative bg-[#101010]/95 border border-[#FFA500]/25 text-[#E0E4EB] rounded-2xl p-10 md:p-12 text-center shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden">
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFA50020,transparent_70%)]"
            />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-3"
              >
                Let&apos;s Work Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-[#A1A8B8] mb-8"
              >
                Open to internships and early-career roles in AI, robotics,
                aerospace, and data-driven mechanical systems.
              </motion.p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="mailto:neelayjain957@gmail.com"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255,165,0,0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#FFA500]/15 border border-[#FFA500]/70 text-[#FFA500] px-8 py-3 rounded-full text-xs md:text-sm font-bold hover:bg-[#FFA500]/25 transition"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#FFA500",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-[#FFA500]/40 text-[#E0E4EB] px-8 py-3 rounded-full text-xs md:text-sm font-bold transition"
                >
                  View All Projects
                </motion.a>
              </div>
            </div>
          </SpotlightCard>
        </motion.section>
      </motion.div>
    </main>
  );
}