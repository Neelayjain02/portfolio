"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ArrowDownToLine, Zap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 20, stiffness: 100 }}
        className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto relative flex items-center gap-2 rounded-full border border-white/5 bg-[#050505]/80 p-2 pl-4 shadow-[0_0_40px_-10px_rgba(255,165,0,0.1)] backdrop-blur-xl">

          {/* --- LOGO: Mechanical Badge --- */}
          <Link href="/" className="group flex items-center gap-3 pr-4 border-r border-white/10">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#1A1A1A] border border-white/10 group-hover:border-[#FFA500]/50 transition-colors">
              <span className="font-mono text-xs font-bold text-[#FFA500]">NJ</span>
              {/* Rotating ring effect */}
              <div className="absolute inset-0 rounded-full border border-[#FFA500] border-t-transparent opacity-20 group-hover:animate-spin" />
            </div>
            <span className="hidden font-mono text-[10px] tracking-widest text-zinc-500 uppercase sm:block group-hover:text-white transition-colors">
              Neelay Jain
            </span>
          </Link>

          {/* --- DESKTOP: Navigation Links --- */}
          <ul className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative block px-4 py-2 text-xs font-medium transition-colors ${
                      isActive ? "text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[#FFA500]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 font-mono tracking-wide uppercase">
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* --- ACTION: Resume (Industrial Button) --- */}
          <motion.a
            href="/Neelay-Jain-CV.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-4 py-2 ml-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800 hover:border-white/20 group"
          >
             <ArrowDownToLine size={12} className="text-zinc-500 group-hover:text-[#FFA500] transition-colors" />
             <span className="font-mono text-[10px] uppercase tracking-wider">Resume</span>
          </motion.a>

          {/* --- MOBILE: Hamburger --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white sm:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* --- MOBILE: Dropdown Panel (HUD Style) --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 16, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto absolute top-full mt-2 w-[90%] max-w-sm rounded-2xl border border-white/10 bg-[#0A0A0A]/95 p-4 backdrop-blur-2xl shadow-2xl"
            >
               {/* Decorative Header */}
               <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                 <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Navigation Protocol</span>
                 <Zap size={10} className="text-[#FFA500] animate-pulse" />
               </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-[#FFA500]/10 transition-colors"
                    >
                      <span className="font-mono text-sm text-zinc-300 group-hover:text-[#FFA500] transition-colors uppercase tracking-wider">
                        {link.label}
                      </span>
                      <span className="text-[10px] text-zinc-700 font-mono group-hover:text-[#FFA500]/50">
                        0{idx + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.a
                  href="/Neelay-Jain-CV.pdf"
                  download
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFA500] py-3 text-xs font-bold text-black hover:bg-[#ffb326] transition-colors uppercase tracking-widest"
                >
                  <ArrowDownToLine size={14} /> Download CV
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
