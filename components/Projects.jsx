"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Removed unused hooks
import { useState } from "react";
import {
  ExternalLink,
  GitBranch,
  Wind,
  Settings,
  Rocket,
  Database,
  BarChart3,
  Activity,
  Cpu,
  Filter,
  Tag,
  Zap,
  Crosshair,
  Link as LinkIcon,
} from "lucide-react";

// ---------------- ANIMATION VARIANTS ----------------
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

// ---------------- STATIC CARD (No Tilt) ----------------
function Card({ children, className = "" }) {
  return (
    <div className={`relative z-10 h-full ${className}`}>
      {/* Glow effect behind the card */}
      <div className="absolute -inset-2 bg-gradient-to-b from-[#FFA500]/20 to-transparent blur-2xl rounded-[30px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative h-full bg-[#0C0C0C]/95 border border-[#252525] overflow-hidden rounded-3xl transition-all duration-300 hover:border-[#FFA500]/40 hover:shadow-[0_0_30px_-10px_rgba(255,165,0,0.15)]">
        {/* Subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffffff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-full p-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------- HUD / SCHEMATIC IMAGE COMPONENT ----------------
function SchematicImage({ src, alt, gradient }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050505] aspect-[16/10] mb-4 group/image shadow-2xl">
      <Image src={src} alt={alt} fill className="object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
      <div className={`absolute inset-0 bg-gradient-to-br ${projectGradient(gradient)} opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay`} />

      {/* HUD Overlay Elements */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-[#FFA500]/80 shadow-[0_0_15px_#FFA500]"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FFA500]/50" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FFA500]/50" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FFA500]/50" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FFA500]/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFA500]/30">
          <Crosshair size={48} strokeWidth={1} />
        </div>
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#FFA500] text-[10px] font-mono font-bold px-2 py-1 border border-[#FFA500]/30 rounded flex items-center gap-1.5 shadow-lg">
          <Activity size={10} className="animate-pulse" />
          SIMULATION_ACTIVE
        </div>
      </div>
    </div>
  );
}

const projectGradient = (grad) => grad || "from-gray-500 to-gray-700";

// ---------------- PROJECT DATA ----------------
const projects = [
  // 12. Bracket FEA
  {
    id: "bracket-fea",
    title: "Bracket FEA in ANSYS Workbench",
    shortTag: "Structural · FEA",
    period: "Academic Project",
    role: "Design & Analysis Engineer",
    domain: "FEA & CAD",
    gradient: "from-zinc-500 to-slate-600",
    icon: Settings,
    image: "/bracket-placeholder.jpg",
    summary:
      "Designed a structural bracket and performed static structural analysis to evaluate stress distribution and deformation, optimizing for strength-to-weight ratio.",
    details: [
      "Modelled the bracket geometry in CAD (SolidWorks/NX) incorporating fillets, bolt holes, and mounting features for manufacturability.",
      "Conducted mesh convergence studies in ANSYS, refining element sizes in high-stress regions to ensure result accuracy.",
      "Evaluated von Mises stress and total deformation under static loading to identify potential failure points.",
      "Proposed design modifications to reduce peak stress concentrations while maintaining structural integrity.",
    ],
    tech: ["ANSYS Workbench", "SolidWorks / NX", "Static Structural FEA"],
    highlight: {
      label: "Outcome",
      value: "Optimized bracket",
      icon: Settings,
    },
    liveUrl: "https://github.com/Neelayjain02/bracket-fea",
    codeUrl: "https://github.com/Neelayjain02/bracket-fea",
    docUrl: "#",
  },
  // 11. Airfoil Noise Prediction
  {
    id: "airfoil-noise",
    title: "Airfoil Noise Prediction using ML",
    shortTag: "Aeroacoustics · Regression ML",
    period: "Academic Project",
    role: "ML Engineer",
    domain: "Aero & Data",
    gradient: "from-sky-500 to-cyan-500",
    icon: Activity,
    image: "/airfoil-placeholder.jpg",
    summary:
      "Regression-based machine learning model to estimate airfoil self-noise based on aerodynamic and geometric parameters.",
    details: [
      "Processed aerodynamic datasets containing features like angle of attack, chord length, free-stream velocity, and suction side displacement thickness.",
      "Implemented and compared regression models (Linear, Decision Tree, Random Forest) to predict Scaled Sound Pressure Level (SSPL).",
      "Analyzed feature importance to understand how flow velocity and frequency affect acoustic output.",
      "Evaluated model performance using RMSE and MAE metrics to select the most robust predictor for aeroacoustic design.",
    ],
    tech: ["Python", "Scikit-learn", "Regression Models"],
    highlight: {
      label: "Focus",
      value: "Aeroacoustics",
      icon: Activity,
    },
    liveUrl: "https://github.com/Neelayjain02/airfoil-noise-ml",
    codeUrl: "https://github.com/Neelayjain02/airfoil-noise-ml",
    docUrl: "#",
  },
  // 10. GSLV Simulation
  {
    id: "gslv",
    title: "GSLV MkIII Launch Vehicle Simulation",
    shortTag: "Aerospace · MATLAB · Trajectory",
    period: "Academic Project",
    role: "Simulation Engineer",
    domain: "Simulation & Aerospace",
    gradient: "from-blue-600 to-indigo-500",
    icon: Rocket,
    image: "/gslv-placeholder.jpg",
    summary:
      "Numerical trajectory model of the 3-stage GSLV MkIII (S200, L110, CE-20) to analyze ascent performance and orbital injection parameters.",
    details: [
      "Formulated equations of motion for a multi-stage vehicle, modeling the S200 solid boosters, L110 liquid core, and CE-20 cryogenic upper stage.",
      "Incorporated aerodynamic drag as a function of dynamic pressure and altitude-dependent air density.",
      "Simulated pitch-over maneuver and gravity turn trajectory to minimize gravity losses during ascent.",
      "Calculated key flight parameters: velocity, altitude, flight path angle, and dynamic pressure (Q) throughout the burn duration.",
    ],
    tech: ["MATLAB", "Numerical Integration", "Vehicle Dynamics"],
    highlight: {
      label: "Altitude",
      value: "≈180 km (sim)",
      icon: Rocket,
    },
    liveUrl: "https://github.com/Neelayjain02/GSLV-MKIII-Rocket-Simulation",
    codeUrl: "https://github.com/Neelayjain02/GSLV-MKIII-Rocket-Simulation",
    docUrl: "#",
  },
  // 2. NASA Space Apps – SPECTRA
  {
    id: "spectra",
    title: "SPECTRA — Exoplanet Detection Web App",
    shortTag: "NASA Space Apps · Full Stack · ML",
    period: "2025",
    role: "ML & Full-Stack Developer",
    domain: "Web + AI",
    gradient: "from-purple-500 to-pink-600",
    icon: Rocket,
    image: "/spectra-placeholder.jpg",
    summary:
      "AI-powered full-stack web application for detecting and characterizing exoplanets using NASA Kepler mission data.",
    details: [
      "Developed a dual-model system: Classification (Confirmed, Candidate, False Positive) and Characterization (Habitability, Water Potential).",
      "Trained XGBoost and MLP Neural Networks on processed Kepler data, achieving high accuracy on imbalanced datasets.",
      "Built a responsive frontend with React, Tailwind, and Framer Motion for interactive data visualization.",
      "Deployed a Flask API backend to serve real-time model predictions to the user interface.",
    ],
    tech: [
      "React",
      "Tailwind",
      "Flask API",
      "XGBoost",
    ],
    highlight: {
      label: "Pipeline",
      value: "Full-stack ML → Web",
      icon: Database,
    },
    liveUrl: "https://spectraa.netlify.app/",
    codeUrl: "https://github.com/Neelayjain02/Spectra",
    docUrl: "#",
  },
  // 9. Additive Manufacturing in Aerospace
  {
    id: "am-aerospace",
    title: "Advancements in AM for Aerospace",
    shortTag: "Literature Review · AM · Aerospace",
    period: "May 2025 – Jun 2025",
    role: "Research Intern",
    domain: "Manufacturing & Materials",
    gradient: "from-amber-500 to-orange-600",
    icon: Settings,
    image: "/am-aerospace-placeholder.jpg",
    summary:
      "Comprehensive review of additive manufacturing technologies (SLM, EBM, DED) for flight-critical aerospace components.",
    details: [
      "Analyzed behavior of aerospace alloys (Ti-6Al-4V, Inconel 718) and high-performance polymers (PEEK, ULTEM) in AM processes.",
      "Identified key challenges: residual stresses, porosity, surface roughness, and certification bottlenecks.",
      "Highlighted design opportunities using topology optimization and lattice structures for weight reduction.",
      "Reviewed industrial adoption cases from NASA, Airbus, and GE for engine and structural components.",
    ],
    tech: [
      "SLM / EBM / DED",
      "Material Science",
      "Topology Optimization",
    ],
    highlight: {
      label: "Scope",
      value: "Metal & polymer AM",
      icon: Settings,
    },
    liveUrl: "#",
    codeUrl: "#",
    docUrl: "#",
  },
  // 7. Self Balancing Bike
  {
    id: "self-balancing-bike",
    title: "Self-Balancing Bike Prototype",
    shortTag: "Robotics · Control · Arduino",
    period: "Concept & Prototype",
    role: "Designer & Integrator",
    domain: "Robotics & Embedded",
    gradient: "from-cyan-500 to-blue-600",
    icon: Activity,
    image: "/bike-placeholder.jpg",
    summary:
      "Prototype two-wheeler utilizing active control and gyroscopic principles to maintain upright stability.",
    details: [
      "Modeled the system as an inverted pendulum, analyzing the physics of stability and center of gravity.",
      "Implemented a reaction wheel system controlled by an Arduino and IMU (MPU6050) to counteract tilt.",
      "Developed a PID control loop to adjust motor speed and torque in real-time based on lean angle data.",
      "Designed the mechanical chassis to house electronics and motors while optimizing mass distribution.",
    ],
    tech: ["Arduino", "IMU/Gyroscope", "Control Systems"],
    highlight: {
      label: "Focus",
      value: "Gyro-based stability",
      icon: Activity,
    },
    liveUrl: "#",
    codeUrl: "#",
    docUrl: "#",
  },
  // 8. Robofest Submission
  {
    id: "robofest",
    title: "Robofest – Intelligent Robot",
    shortTag: "Educational Robotics · Adaptive Control",
    period: "Aug 2025 – Sep 2025",
    role: "Algorithm & Systems Lead",
    domain: "Robotics & AI",
    gradient: "from-teal-500 to-emerald-500",
    icon: Cpu,
    image: "/robot-placeholder.jpg",
    summary:
      "Autonomous robot designed to demonstrate intelligent learning behavior and adaptation for the 'Robots for Research' challenge.",
    details: [
      "Implemented pattern recognition algorithms for line following, color detection, and shape identification.",
      "Designed an adaptive control framework allowing the robot to infer rules from examples and adjust strategy dynamically.",
      "Optimized for the scoring rubric: 40% learning accuracy, 30% adaptation to new rules, 30% algorithmic clarity.",
      "Integrated sensor fusion to ensure robust operation under varying environmental conditions.",
    ],
    tech: ["Arduino", "Sensors", "Control Logic"],
    highlight: {
      label: "Key Metric",
      value: "Adaptive behaviour",
      icon: Cpu,
    },
    liveUrl: "#",
    codeUrl: "#",
    docUrl: "#",
  },
  // 6. Emotion Recognition
  {
    id: "emotion-recognition",
    title: "Real-Time Emotion Recognition",
    shortTag: "Deep Learning · OpenCV · HCI",
    period: "2025",
    role: "ML Engineer",
    domain: "AI & Vision",
    gradient: "from-sky-500 to-indigo-500",
    icon: Cpu,
    image: "/emotion-placeholder.jpg",
    summary:
      "Real-time facial expression analysis system using a Convolutional Neural Network (CNN) integrated with OpenCV.",
    details: [
      "Trained a CNN on a facial emotion dataset to classify 7 categories: Angry, Disgust, Fear, Happy, Neutral, Sad, Surprise.",
      "Built a live inference pipeline using OpenCV for face detection (Haar Cascades) and preprocessing.",
      "Optimized the model for low-latency performance to enable smooth real-time video processing.",
      "Demonstrated potential applications in Human-Computer Interaction (HCI) and user feedback analysis.",
    ],
    tech: ["TensorFlow / Keras", "OpenCV", "Python"],
    highlight: {
      label: "Classes",
      value: "7 emotions",
      icon: Cpu,
    },
    liveUrl: "https://github.com/Neelayjain02/emotion-recognition",
    codeUrl: "https://github.com/Neelayjain02/emotion-recognition",
    docUrl: "#",
  },
  // 4. Ball Bearing Condition Monitoring
  {
    id: "bearing-ai",
    title: "Condition Monitoring of Ball Bearings",
    shortTag: "Computer Vision · Thermal Imaging · CNN",
    period: "2024 – 2025",
    role: "Researcher",
    domain: "AI & Mechanical Systems",
    gradient: "from-orange-500 to-red-500",
    icon: Activity,
    image: "/bearing-placeholder.jpg",
    summary:
      "Deep learning model for non-intrusive fault detection in ball bearings using thermal imaging, published at ICRAM 2025.",
    details: [
      "Classified 6 specific conditions: Healthy, Ball Defect, Cage Defect, Inner Race Defect, Outer Race Defect, Lack of Lubrication.",
      "Achieved 99.25% validation accuracy with a low validation loss of 0.0445.",
      "Designed a specialized CNN architecture optimized for thermal texture analysis.",
      "Applied extensive data augmentation (rotation, flip, scaling) to ensure robustness in industrial environments.",
    ],
    tech: [
      "TensorFlow / Keras",
      "OpenCV",
      "Thermal Imaging",
    ],
    highlight: {
      label: "Accuracy",
      value: "≈99.8%",
      icon: Zap,
    },
    liveUrl: "#",
    codeUrl: "#",
    docUrl: "#",
  },
  // 5. Casting Defect Detection
  {
    id: "casting-defects",
    title: "Casting Defect Detection",
    shortTag: "Quality Control · MobileNetV2",
    period: "2025",
    role: "Computer Vision Engineer",
    domain: "AI for Manufacturing",
    gradient: "from-gray-500 to-slate-500",
    icon: Activity,
    image: "/casting-placeholder.jpg",
    summary:
      "Automated visual inspection system for casting defects using Transfer Learning with MobileNetV2.",
    details: [
      "Fine-tuned MobileNetV2 to classify casting surface images as 'Defective' or 'Non-Defective'.",
      "Achieved ~88% validation accuracy, demonstrating feasibility for real-time shop floor quality control.",
      "Implemented L2 regularization, dropout, and learning-rate scheduling to prevent overfitting.",
      "Analyzed performance using confusion matrices and ROC curves to minimize false negatives.",
    ],
    tech: [
      "TensorFlow / Keras",
      "MobileNetV2",
      "Industrial Vision",
    ],
    highlight: {
      label: "Use-case",
      value: "Real-time QC",
      icon: Activity,
    },
    liveUrl: "#",
    codeUrl: "#",
    docUrl: "#",
  },
  // 3. F1 Race Strategy
  {
    id: "f1-strategy",
    title: "Formula 1 Race Position Prediction",
    shortTag: "Motorsport Analytics · XGBoost · Optuna",
    period: "2018 – 2024 Data",
    role: "ML Engineer",
    domain: "Data Science & ML",
    gradient: "from-red-600 to-red-800",
    icon: BarChart3,
    image: "/f1-placeholder.jpg",
    summary:
      "Machine learning pipeline to predict F1 driver finishing positions using historical race data and hyperparameter optimization.",
    details: [
      "Processed data from 2018-2024 seasons, engineering features for drivers, teams, circuits, weather, and tires.",
      "Utilized XGBoost Regressor with automated hyperparameter tuning via Optuna (30 trials).",
      "Achieved a Mean Absolute Error (MAE) of 0.83, providing highly accurate position estimates.",
      "Deployed an interactive Streamlit app allowing users to input race scenarios (e.g., 'British GP - Haas - P9').",
    ],
    tech: ["Python", "XGBoost", "Optuna", "Pandas", "Streamlit"],
    highlight: {
      label: "MAE",
      value: "≈0.83",
      icon: BarChart3,
    },
    liveUrl: "https://f1-driver-position-predictor.streamlit.app/",
    codeUrl: "https://github.com/Neelayjain02/F1-Driver-Position-Predictor",
    docUrl: "#",
  },
  // 1. CAWT – Wind Turbine
  {
    id: "cawt",
    title: "Cross-Axis Wind Turbine (CAWT)",
    shortTag: "Wind Energy · Hardware Prototype",
    period: "2024",
    role: "Student Investigator",
    domain: "Mechanical & Renewable",
    gradient: "from-green-500 to-emerald-600",
    icon: Wind,
    image: "/cawt-placeholder.jpg",
    summary:
      "Design and fabrication of a hybrid wind turbine prototype optimized for low-speed, turbulent urban wind conditions.",
    details: [
      "Designed a hybrid rotor configuration with 3 vertical and 6 horizontal 3D-printed PETG blades.",
      "Integrated a 5:1 planetary gearbox to step up RPM for efficient power generation.",
      "Proposed a budget of ₹92,733 for full prototyping including generator, battery, and structure.",
      "Analyzed potential for decentralized energy generation in rural and urban settings.",
    ],
    tech: ["3D Printing", "Planetary Gearbox", "Wind Analysis"],
    highlight: {
      label: "Design Focus",
      value: "Urban, low-speed wind",
      icon: Settings,
    },
    liveUrl: "#",
    codeUrl: "#",
    docUrl: "#",
  },
];

// -------------------------------- COMPONENT --------------------------------

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const domains = [
    "All",
    "Mechanical & Renewable",
    "Simulation & Aerospace",
    "FEA & CAD",
    "AI & Mechanical Systems",
    "AI for Manufacturing",
    "Web + AI",
    "Data Science & ML",
    "Robotics & Embedded",
    "Robotics & AI",
    "Aero & Data",
    "Manufacturing & Materials",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.domain === activeFilter);

  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-[#E0E4EB] overflow-hidden pt-10 md:pt-16">
      {/* Background grid + glow */}
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
        {/* HERO */}
        <motion.section variants={item} className="mb-14 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFA500]/30 bg-[#FFA500]/5 text-[#FFA500] text-xs font-mono tracking-widest uppercase mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFA500]" />
                </span>
                Project Archive
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-3">
                Engineering Systems /
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] via-orange-400 to-red-500">
                  Built with Code &amp; Physics
                </span>
              </h1>
              <p className="text-sm md:text-base text-gray-400 max-w-xl">
                Bridging the physical and digital worlds. From mechanical first principles to deployed predictive intelligence. Use the filters to jump to specific domains.
              </p>
            </div>

            {/* Filter */}
            <div className="w-full md:w-[320px] bg-[#101010]/90 border border-[#2A2A2A] rounded-2xl p-4 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E0E4EB] uppercase tracking-[0.2em]">
                  <Filter size={14} className="text-[#FFA500]" />
                  Filter by Domain
                </div>
                <span className="text-[10px] text-[#A1A8B8] flex items-center gap-1">
                  <Tag size={10} />
                  {filteredProjects.length} shown
                </span>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => setActiveFilter(domain)}
                    className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                      activeFilter === domain
                        ? "bg-[#FFA500] text-black border-[#FFA500]"
                        : "bg-[#151515] text-[#A1A8B8] border-[#333] hover:border-[#FFA500]/40 hover:text-white"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* PROJECT SECTIONS */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-12 md:space-y-16"
        >
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            const HighlightIcon = project.highlight.icon;
            const sectionOdd = index % 2 === 0;

            return (
              <motion.div
                variants={item}
                key={project.id}
                id={project.id}
                className="group scroll-mt-28"
              >
                <Card className="rounded-3xl">
                  {/* Background gradient */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 md:p-10">
                    {/* Visual side */}
                    <div
                      className={`lg:col-span-5 flex ${
                        sectionOdd ? "order-1" : "order-1 lg:order-2"
                      }`}
                    >
                      <div className="w-full">
                        {/* SCHEMATIC Image */}
                        <SchematicImage
                          src={project.image}
                          alt={project.title}
                          gradient={project.gradient}
                        />

                        {/* Highlight stat */}
                        <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm transition-transform duration-300">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                              <HighlightIcon
                                size={18}
                                className="text-[#FFA500]"
                              />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold">
                                {project.highlight.label}
                              </p>
                              <p className="text-sm font-bold text-white">
                                {project.highlight.value}
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:flex flex-wrap gap-1 justify-end max-w-[160px]">
                            {project.tech.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Text side */}
                    <div
                      className={`lg:col-span-7 flex flex-col gap-4 ${
                        sectionOdd ? "order-2" : "order-2 lg:order-1"
                      }`}
                    >
                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-2">
                            <Icon size={16} className="text-[#FFA500]" />
                            {project.domain}
                          </div>

                          {/* Title with Anchor Link */}
                          <div className="flex items-center gap-3 group/title">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[#FFA500] transition-colors duration-300">
                              {project.title}
                            </h2>
                            <Link
                                href={`#${project.id}`}
                                className="opacity-0 group-hover/title:opacity-100 transition-all duration-300 text-gray-500 hover:text-[#FFA500] translate-y-1 group-hover/title:translate-y-0"
                                aria-label="Link to this project"
                            >
                                <LinkIcon size={18} />
                            </Link>
                          </div>

                          <p className="text-xs md:text-sm text-[#FFA500] font-mono flex items-center gap-2">
                            <span>{project.shortTag}</span>
                            <span className="hidden md:inline-block w-px h-3 bg-[#FFA500]/40" />
                            <span className="hidden md:inline text-gray-300">
                              {project.period}
                            </span>
                          </p>
                        </div>
                        <div className="text-[11px] text-gray-400 text-right">
                          <p className="font-semibold uppercase tracking-[0.2em] text-gray-500">
                            Role
                          </p>
                          <p className="font-medium text-gray-200">
                            {project.role}
                          </p>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Bullet details */}
                      <ul className="mt-1 space-y-2 text-sm text-gray-300">
                        {project.details.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#FFA500]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-[#151515] border border-[#333] text-[11px] text-[#CBD2E0] group-hover:border-[#FFA500]/40 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Buttons (FIXED: Link wrappers instead of button nesting) */}
                      <div className="flex flex-wrap gap-3 pt-3">
                        <Link
                          href={project.codeUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 text-white transition hover:scale-105 active:scale-95"
                        >
                          <GitBranch size={14} />
                          View Code
                        </Link>

                        <Link
                          href={project.liveUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-transparent bg-black/40 hover:bg-black/70 text-gray-200 transition hover:scale-105 active:scale-95"
                        >
                          <ExternalLink size={14} />
                          Live / Demo
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Bottom CTA */}
        <motion.section variants={item} className="mt-16 mb-12">
          <Card className="rounded-2xl bg-[#101010]/95 p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFA50010,transparent_70%)] animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white leading-tight">
                Have a problem worth simulating or automating?
              </h2>
              <p className="text-base md:text-lg text-[#A1A8B8] mb-10 max-w-2xl mx-auto leading-relaxed">
                I love taking messy engineering problems and turning them into
                models, code and prototypes. If any of these projects sparked
                ideas, let&apos;s talk.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.a
                  href="mailto:neelayjain957@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full bg-[#FFA500]/20 border border-[#FFA500]/70 text-[#FFA500] text-sm font-bold tracking-wide"
                >
                  Reach Out via Email
                </motion.a>
                <Link href="/">
                  <button className="px-8 py-4 rounded-full border border-[#FFA500]/30 text-sm font-bold text-[#E0E4EB] hover:border-[#FFA500] transition tracking-wide">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  );
}