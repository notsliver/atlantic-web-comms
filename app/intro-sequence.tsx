"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "atlantic-intro-seen";

export function IntroSequence() {
  const [phase, setPhase] = useState<"loading" | "visible" | "exiting" | "hidden">(
    "loading",
  );

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") {
        const hiddenTimer = window.setTimeout(() => {
          setPhase("hidden");
        }, 0);
        return () => {
          window.clearTimeout(hiddenTimer);
        };
      }
    } catch {
      // If storage is unavailable, fall back to showing the intro once.
    }

    const showTimer = window.setTimeout(() => {
      setPhase("visible");
    }, 0);

    const dismissTimer = window.setTimeout(() => {
      setPhase((current) => (current === "visible" ? "exiting" : current));
    }, 2800);

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
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore storage failures and continue.
      }

      setPhase("hidden");
    }, 650);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [phase]);

  if (phase === "loading" || phase === "hidden") {
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
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_36%),linear-gradient(120deg,rgba(255,255,255,0.05),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="relative flex h-24 w-24 items-center justify-center border border-white/14 bg-white/[0.04] backdrop-blur-md">
            <Image
              src="/image.png"
              alt="Atlantic logo"
              width={58}
              height={58}
              priority
              className="h-14 w-14 object-contain"
            />
          </div>
        </div>

        <h1 className="max-w-2xl text-4xl font-semibold leading-[1.04] text-balance sm:text-6xl">
          Atlantic Interactive
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/62 sm:text-lg">
          Games players love. Teams built to scale.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-white/24 bg-white/12 px-5 py-3 text-sm font-medium text-white transition hover:border-white/45 hover:bg-white/18"
            onClick={() => setPhase("exiting")}
          >
            Enter studio
          </button>
        </div>
      </div>
    </div>
  );
}
