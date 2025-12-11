"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  Layers,
  Wrench,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen
} from "lucide-react";

export default function LnTReport() {
  return (
    // Changed to h-screen to force full height fitting
    <main className="h-screen bg-[#050505] text-[#E0E4EB] font-sans selection:bg-[#FFA500] selection:text-black overflow-hidden flex flex-col">

      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFA500]/5 rounded-full blur-[120px]" />
      </div>

      {/* --- HEADER --- */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#FFA500] transition-colors">
              <ArrowLeft size={16} /> Portfolio
            </button>
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <h1 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
            <FileText size={18} className="text-[#FFA500]" />
            Internship Report: L&T Precision Engineering
          </h1>
        </div>

        <a
          href="/LnT_Report.pdf"
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1002] border border-[#FFA500]/40 text-[#FFA500] text-xs font-bold hover:bg-[#FFA500] hover:text-black transition-all shadow-[0_0_15px_rgba(255,165,0,0.1)]"
        >
          <Download size={16} /> <span className="hidden sm:inline">Download PDF</span>
        </a>
      </header>

      {/* --- MAIN CONTENT (Split View) --- */}
      <div className="flex-1 relative z-10 flex flex-col lg:flex-row overflow-hidden">

        {/* SIDEBAR: Project Context */}
        <aside className="w-full lg:w-[400px] xl:w-[450px] border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0C0C0C] p-6 lg:p-8 overflow-y-auto custom-scrollbar shrink-0">
          <div className="space-y-10">

            {/* Meta Data */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#FFA500]/50 bg-[#1A1002] text-[#FFA500] text-[10px] font-mono font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(255,165,0,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#FFA500]" />
                Technical Report
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white leading-tight mb-2">Larsen & Toubro</h2>
                <p className="text-zinc-400 text-sm">Precision Engineering & Systems IC</p>
              </div>

              <div className="flex flex-col gap-3 text-xs text-zinc-500 font-mono border-l-2 border-[#222] pl-4">
                <div className="flex items-center gap-3"><Calendar size={14} className="text-[#FFA500]" /> May 2025 – July 2025</div>
                <div className="flex items-center gap-3"><MapPin size={14} className="text-[#FFA500]" /> Hazira, Gujarat, India</div>
                <div className="flex items-center gap-3"><Wrench size={14} className="text-[#FFA500]" /> Production Engineering Dept.</div>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#FFA500]/30 to-transparent" />

            {/* KEY PROJECT 1 */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers size={14} className="text-[#FFA500]" /> Project I: 450 MT Fixture
              </h3>
              <div className="bg-[#111] border border-white/5 rounded-xl p-4 space-y-3">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Finite Element Analysis (FEA) of a heavy-duty section lifting fixture designed for <strong>450 Metric Tons</strong>.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-3 text-xs text-zinc-400">
                    <CheckCircle2 size={12} className="text-[#FFA500] mt-0.5 shrink-0" />
                    <span>Resolved meshing failures by simplifying mirrored geometry in Siemens NX.</span>
                  </li>
                  <li className="flex gap-3 text-xs text-zinc-400">
                    <CheckCircle2 size={12} className="text-[#FFA500] mt-0.5 shrink-0" />
                    <span>Validated von Mises stress & deformation factors for safety compliance.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* KEY PROJECT 2 */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Wrench size={14} className="text-[#FFA500]" /> Project II: 24 MT Deck Fixture
              </h3>
              <div className="bg-[#111] border border-white/5 rounded-xl p-4 space-y-3">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Full lifecycle design of a horizontal deck lifting fixture (24 MT) for cylindrical shell integration.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-1 rounded bg-[#1A1002] border border-[#FFA500]/20 text-[10px] text-[#FFA500] font-mono">Solid Edge</span>
                  <span className="px-2 py-1 rounded bg-[#1A1002] border border-[#FFA500]/20 text-[10px] text-[#FFA500] font-mono">DFM</span>
                  <span className="px-2 py-1 rounded bg-[#1A1002] border border-[#FFA500]/20 text-[10px] text-[#FFA500] font-mono">Load Balancing</span>
                </div>
              </div>
            </div>

            {/* RESEARCH */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen size={14} className="text-[#FFA500]" /> Research: AM in Aerospace
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Conducted a technical review of Additive Manufacturing technologies (SLM, DED) for flight-critical components.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Ti-6Al-4V", "Inconel 718", "Lattice Structures", "Digital Twins"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md border border-white/10 bg-[#151515] text-[10px] text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* PDF VIEWER AREA - MAXIMIZED HEIGHT */}
        <section className="flex-1 bg-[#050505] relative p-0 lg:p-6 flex flex-col h-[600px] lg:h-auto">
          <div className="flex-1 w-full h-full bg-[#111] rounded-none lg:rounded-2xl border-t lg:border border-white/10 overflow-hidden shadow-2xl relative group">

            {/* PDF Iframe with Full Height */}
            <iframe
              src="/LnT_Report.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
              className="w-full h-full"
              title="L&T Project Report PDF"
            />

            {/* Loading Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/50 z-[-1] p-6 text-center">
              <p className="text-zinc-500 text-sm">Loading Secure Document...</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}