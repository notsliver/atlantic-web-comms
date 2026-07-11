"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function IntroSequence() {
  const [phase, setPhase] = useState<"loading" | "visible" | "exiting" | "hidden">(
    "loading",
  );

  useEffect(() => {
    if (phase === "hidden") {
      document.body.classList.remove("intro-pending");
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [phase]);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setPhase("visible");
    }, 0);

    const dismissTimer = window.setTimeout(() => {
      setPhase((current) => (current === "visible" ? "exiting" : current));
    }, 3600);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(dismissTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "exiting") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPhase("hidden");
    }, 520);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [phase]);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505] px-6 text-white transition duration-700 ${
        phase === "exiting" ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Atlantic Interactive intro"
      onClick={() => setPhase("exiting")}
    >
      <Image
        src="/background.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="animate-hero-zoom object-cover opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.58)_43%,rgba(0,0,0,0.18)_100%),linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.16)_55%,rgba(5,5,5,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative flex w-full max-w-xs flex-col items-center">
        <div className="intro-logo-mark flex h-28 w-28 items-center justify-center">
          <Image
            src="/image.png"
            alt="Atlantic logo"
            width={92}
            height={92}
            priority
            className="h-[5.75rem] w-[5.75rem] object-contain"
          />
        </div>

        <div
          className="mt-8 h-2 w-full overflow-hidden rounded-full border border-white/12 bg-white/[0.045]"
          role="progressbar"
          aria-label="Loading Atlantic Interactive"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="intro-progress h-full rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
