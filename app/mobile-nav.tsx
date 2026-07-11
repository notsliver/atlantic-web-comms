"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["Home", "#home"],
  ["Our Games", "#games"],
  ["Services", "#services"],
  ["About", "#about"],
  ["Careers", "#careers"],
  ["Get in touch", "#contact"],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="md:hidden">
      <button type="button" className={`mobile-menu-button ${open ? "is-open" : ""}`} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        <span /><span /><span />
      </button>

      <div id="mobile-navigation" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-atmosphere" />
        <div className="relative flex min-h-full flex-col px-6 pb-8 pt-28">
          <p className="text-xs font-medium text-white/35">Navigation</p>
          <nav aria-label="Mobile navigation" className="mt-7">
            <ul className="space-y-1">
              {links.map(([label, href], index) => (
                <li key={label} style={{ "--menu-index": index } as React.CSSProperties}>
                  <Link href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="mobile-menu-link">
                    <span className="text-xs text-white/25">0{index + 1}</span>
                    <span>{label}</span>
                    <span aria-hidden="true" className="ml-auto text-lg text-white/25">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-6 text-xs text-white/38">
            <span>Atlantic Interactive</span>
            <div className="flex gap-5"><a href="https://x.com" target="_blank" rel="noreferrer">X</a><a href="https://discord.com" target="_blank" rel="noreferrer">Discord</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
