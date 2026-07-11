"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
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
  const [brandSpinning, setBrandSpinning] = useState(false);
  const brandTimer = useRef<number | null>(null);
  const router = useRouter();

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

  useEffect(() => () => {
    if (brandTimer.current) window.clearTimeout(brandTimer.current);
  }, []);

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const scrollToTop = () => {
      if (window.atlanticScrollToTop) window.atlanticScrollToTop();
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isIsland) {
      event.preventDefault();
      scrollToTop();
      if (isTouch) {
        setBrandSpinning(false);
        window.requestAnimationFrame(() => setBrandSpinning(true));
        if (brandTimer.current) window.clearTimeout(brandTimer.current);
        brandTimer.current = window.setTimeout(() => setBrandSpinning(false), 650);
      }
      return;
    } else if (!isTouch) {
      return;
    } else {
      event.preventDefault();
    }

    setBrandSpinning(false);
    window.requestAnimationFrame(() => setBrandSpinning(true));
    if (brandTimer.current) window.clearTimeout(brandTimer.current);
    brandTimer.current = window.setTimeout(() => {
      setBrandSpinning(false);
      router.push("/");
    }, 650);
  }

  return (
    <header className={`site-header ${isIsland ? "is-island" : ""} ${overlay ? "absolute" : "relative border-b border-white/10 bg-[#050505]"} inset-x-0 top-0 z-[70]`}>
      <div className="site-header-inner mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <Link href="/" onClick={handleBrandClick} className={`site-brand flex items-center gap-3 text-white transition hover:opacity-80 ${brandSpinning ? "is-spinning" : ""}`}>
          <Image src="/image.png" alt="Atlantic Interactive logo" width={38} height={38} priority className="site-brand-logo h-9 w-9 object-contain" />
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
