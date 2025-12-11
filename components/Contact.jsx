"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Check,
  Rocket,
  Zap,
  Cpu,
  Terminal,
  Activity,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MECH-DATA INTERFACE v4.1
 * - Theme: Mechanical Engineering x Data Science
 * - Layout: Horizontal Button (Bottom)
 * - Feature: Mouse-tracking Spotlights
 * - Update: Brighter BG ambiance + Sample placeholders
 */

// --- Components ---

const SpotlightCard = ({ children, className = "" }) => {
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
      className={`relative rounded-3xl border border-zinc-800 bg-zinc-900/80 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,165,0,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, error, placeholder }) => (
  <div className="flex flex-col gap-1.5 w-full relative">
    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
      <span className="text-[#FFA500]">{">"}</span> {label}
    </label>
    <div className="relative group">
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full bg-[#050505] border ${
          error ? "border-red-500/40" : "border-zinc-800"
        } rounded-lg px-4 py-3 text-sm text-zinc-300 font-mono placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#FFA500]/50 focus:shadow-[0_0_15px_rgba(255,165,0,0.05)] group-hover:border-zinc-700`}
      />
      {/* Mechanical corner markers */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <AnimatePresence>
      {error && (
        <motion.span
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[9px] text-red-400 font-mono mt-1 ml-1"
        >
          [ERR: {error}]
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

// --- Main Page ---

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const MY_EMAIL = "neelayjain957@gmail.com";

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "ID_MISSING";
    if (!form.email.trim()) e.email = "SIGNAL_LOST";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "BAD_FORMAT";
    if (!form.subject.trim()) e.subject = "NO_DIRECTIVE";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "DATA_CORRUPT";
    return e;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(MY_EMAIL);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1500);
    } catch { /* ignore */ }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    if (Object.keys(eobj).length) {
      setErrors(eobj);
      return;
    }

    setStatus("launching");

    const subject = encodeURIComponent(form.subject.trim());
    const body = encodeURIComponent(`Operator: ${form.name}\nFreq: ${form.email}\n\n${form.message}`);
    const mailto = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;

    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => {});
    } catch { /* ignore */ }

    await new Promise((r) => setTimeout(r, 2200));

    try {
      window.location.href = mailto;
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVars = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40 } } };

  return (
    // UPDATED BG COLOR from #020202 to #080808 for slightly lighter feel
    <main className="relative min-h-screen w-full bg-[#080808] text-zinc-300 font-sans selection:bg-[#FFA500]/30 selection:text-[#FFA500] flex items-center justify-center p-4 overflow-hidden">

      {/* --- CINEMATIC LAUNCH OVERLAY --- */}
      <AnimatePresence>
        {status === "launching" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            {/* Warp Starfield */}
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-10" />
               {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: (Math.random() - 0.5) * 2000,
                    y: (Math.random() - 0.5) * 2000,
                    opacity: [0, 1, 0],
                    scale: [0, 2, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
                  className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-[#FFA500] blur-[1px] origin-center rotate-[var(--r)]"
                  style={{ '--r': `${Math.random() * 360}deg` }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 1, y: 100 }}
              animate={{ scale: [1, 0.8, 60], y: [100, 0, -800], opacity: [1, 1, 0] }}
              transition={{ duration: 2.2, times: [0, 0.4, 1], ease: "anticipate" }}
              className="relative z-20 flex flex-col items-center"
            >
              <Rocket size={100} className="text-white fill-[#FFA500] drop-shadow-[0_0_50px_#FFA500]" />
              <div className="mt-8 text-[#FFA500] font-mono text-xs tracking-[1em] uppercase animate-pulse">
                Uplink_Established
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BG Grid & Glows --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        {/* Original Orange Glow (Top Right) */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFA500]/10 rounded-full blur-[150px] mix-blend-screen" />

        {/* NEW Cyan Glow (Bottom Left) for balance and brightness */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6"
      >

        {/* --- LEFT: DATA TERMINAL --- */}
        <motion.section variants={itemVars} className="lg:col-span-5 h-full">
          <SpotlightCard className="h-full bg-[#0A0A0A]/80 backdrop-blur-xl p-8 flex flex-col justify-between group">

            {/* Header / System Status */}
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
                System Nominal
              </motion.div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                Establish <span className="text-[#FFA500]">Uplink.</span>
              </h1>
              <p className="text-zinc-500 font-mono text-xs leading-relaxed max-w-xs mt-4 border-l-2 border-zinc-800 pl-4">
                // AWAITING INPUT STREAM... <br/>
                // OPEN FOR COLLABORATION DATA PACKETS & TECHNICAL INTERNSHIP PROTOCOLS.
              </p>


            {/* Coordinates Block */}
            <div className="mt-8 space-y-6">
               <div>
                 <h3 className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Terminal size={10} /> Comm_Channels
                 </h3>
                 <div className="space-y-3">
                   <div className="flex items-center justify-between group/item p-2 rounded hover:bg-zinc-900/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Mail size={14} className="text-zinc-500 group-hover/item:text-[#FFA500]" />
                        <span className="text-xs font-mono text-zinc-300">{MY_EMAIL}</span>
                      </div>
                      <button onClick={handleCopyEmail} className="opacity-0 group-hover/item:opacity-100 text-[9px] font-bold text-[#FFA500] uppercase">
                        {status === "copied" ? "COPIED" : "[COPY]"}
                      </button>
                   </div>
                   <div className="flex items-center gap-3 p-2 rounded hover:bg-zinc-900/50 transition-colors">
                      <MapPin size={14} className="text-zinc-500" />
                      <span className="text-xs font-mono text-zinc-300">Ahmedabad, IN [Grid: 24.01°N]</span>
                   </div>
                 </div>
               </div>

               {/* Social Matrix */}
               <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/50">
                  <Link href="https://github.com/Neelayjain02" target="_blank" className="flex items-center justify-center gap-2 p-3 bg-zinc-900/50 border border-zinc-800 hover:border-[#FFA500]/50 hover:bg-[#FFA500]/5 transition-all group/btn">
                     <Github size={14} className="text-zinc-400 group-hover/btn:text-[#FFA500]" />
                     <span className="text-[10px] font-mono uppercase text-zinc-400">Github_Repo</span>
                  </Link>
                  <Link href="https://www.linkedin.com/in/neelayjain21" target="_blank" className="flex items-center justify-center gap-2 p-3 bg-zinc-900/50 border border-zinc-800 hover:border-[#FFA500]/50 hover:bg-[#FFA500]/5 transition-all group/btn">
                     <Linkedin size={14} className="text-zinc-400 group-hover/btn:text-[#FFA500]" />
                     <span className="text-[10px] font-mono uppercase text-zinc-400">Link_Node</span>
                  </Link>
               </div>
            </div>

            {/* Corner Deco */}
            <div className="absolute bottom-4 right-4 text-zinc-800 opacity-50"><Cpu size={48} strokeWidth={1} /></div>
          </SpotlightCard>
        </motion.section>

        {/* --- RIGHT: TRANSMISSION FORM --- */}
        <motion.section variants={itemVars} className="lg:col-span-7 h-full">
           <SpotlightCard className="h-full bg-[#0A0A0A]/80 backdrop-blur-xl flex flex-col">
              <form onSubmit={handleSubmit} className="relative flex-1 p-8 flex flex-col gap-5 z-10">

                 {/* Success Overlay */}
                 <AnimatePresence>
                    {status === "success" && (
                       <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-50 bg-[#050505]/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8"
                       >
                          <div className="w-16 h-16 bg-[#FFA500]/10 rounded-full flex items-center justify-center mb-4 border border-[#FFA500]/30 shadow-[0_0_30px_rgba(255,165,0,0.15)]">
                             <Check size={32} className="text-[#FFA500]" />
                          </div>
                          <h3 className="text-xl font-bold text-white font-mono uppercase tracking-widest">Packet Sent</h3>
                          <p className="text-zinc-500 mt-2 font-mono text-[10px] uppercase">Telemetry Logged Successfully.</p>
                       </motion.div>
                    )}
                 </AnimatePresence>

                 {/* Inputs with Sample Placeholders */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Operator_ID" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="e.g. Dr. Alex Chen" />
                    <InputField label="Return_Freq" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="e.g. alex@quantum.net" />
                 </div>

                 <InputField label="Directive" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} placeholder="Mission Objective / Inquiry" />

                 <div className="flex-1 flex flex-col gap-1.5 min-h-[120px]">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                       <Activity size={10} className="text-[#FFA500]" /> Data_Payload
                    </label>
                    <textarea
                       name="message"
                       value={form.message}
                       onChange={handleChange}
                       placeholder="Input raw telemetry data..."
                       className={`flex-1 w-full bg-[#050505] border ${errors.message ? "border-red-500/40" : "border-zinc-800"} rounded-lg px-4 py-3 text-sm font-mono text-zinc-300 placeholder-zinc-800 outline-none resize-none transition-all duration-300 focus:border-[#FFA500]/50 focus:shadow-[0_0_15px_rgba(255,165,0,0.05)]`}
                    />
                    {errors.message && <span className="text-[9px] text-red-400 font-mono text-right">[ERR: DATA_SIZE]</span>}
                 </div>

                 {/* HORIZONTAL MECHANICAL TRIGGER */}
                 <button
                   type="submit"
                   disabled={status === "launching" || status === "success"}
                   className="group relative w-full h-14 mt-2 bg-zinc-900 border border-zinc-800 hover:border-[#FFA500]/50 hover:bg-[#FFA500]/5 transition-all overflow-hidden rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {/* Striped Warning Texture */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] bg-[size:10px_10px] transition-opacity" />

                    <div className="flex items-center justify-center gap-3 relative z-10">
                       {status === "launching" ? (
                          <>
                             <Zap className="text-[#FFA500] animate-pulse" size={16} />
                             <span className="font-mono font-bold text-xs tracking-[0.2em] text-[#FFA500] uppercase animate-pulse">
                                Initializing Sequence...
                             </span>
                          </>
                       ) : (
                          <>
                             <Rocket className="text-zinc-500 group-hover:text-[#FFA500] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" size={18} />
                             <span className="font-mono font-bold text-xs tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors uppercase">
                                Initialize Uplink
                             </span>
                          </>
                       )}
                    </div>

                    {/* Loading Bar */}
                    {status === "launching" && (
                       <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2 }}
                          className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                       />
                    )}
                 </button>
              </form>
           </SpotlightCard>
        </motion.section>

      </motion.div>
    </main>
  );
}