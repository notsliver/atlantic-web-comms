"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "./mobile-nav";

const links = [
  ["Home", "/#home"],
  ["Our Games", "/games"],
  ["Services", "/#services"],
  ["About", "/#about"],
  ["Careers", "/#careers"],
  ["Get in touch", "/#contact"],
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [isIsland, setIsIsland] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setIsIsland(window.scrollY > 80));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`site-header ${isIsland ? "is-island" : ""} ${overlay ? "absolute" : "relative border-b border-white/10 bg-[#050505]"} inset-x-0 top-0 z-50`}>
      <div className="site-header-inner mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3 text-white transition hover:opacity-80">
          <Image src="/image.png" alt="Atlantic Interactive logo" width={38} height={38} priority className="h-9 w-9 object-contain" />
          <span className="text-xs font-semibold uppercase sm:text-sm">Atlantic Interactive</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-white/62">
            {links.map(([item, href]) => <li key={item}><Link href={href} className="transition hover:text-white">{item}</Link></li>)}
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
