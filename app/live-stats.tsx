"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Gamepad2, UsersRound } from "lucide-react";
import type { StudioStats } from "@/lib/atlantic";

type LiveStatsProps = {
  initialStats: StudioStats;
  fallbackStats?: StudioStats;
};

type MetricKey = keyof Pick<
  StudioStats,
  "activePlayers" | "totalVisits" | "activeGames" | "gameCount"
>;

const metricLabels: Array<{
  key: MetricKey;
  label: string;
}> = [
  {
    key: "activePlayers",
    label: "Active Players",
  },
  {
    key: "totalVisits",
    label: "Total Visits",
  },
  {
    key: "activeGames",
    label: "Live Games",
  },
];

export function LiveStats({ initialStats, fallbackStats }: LiveStatsProps) {
  const [stats, setStats] = useState<StudioStats>(() => fallbackStats ?? initialStats);
  const currentStats = stats ?? fallbackStats ?? initialStats;

  useEffect(() => {
    let active = true;
    let timer: number | undefined;

    async function loadStats() {
      try {
        const response = await fetch("/api/stats", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to refresh live stats.");
        }

        const nextStats = (await response.json()) as StudioStats;

        if (active) {
          setStats(nextStats);
        }
      } catch {
        if (active) setStats(initialStats);
      }
    }

    function startLiveUpdates() {
      if (!active || timer !== undefined) return;

      void loadStats();
      timer = window.setInterval(() => {
        void loadStats();
      }, 10000);
    }

    if (document.body.classList.contains("intro-complete")) {
      startLiveUpdates();
    } else {
      window.addEventListener("atlantic:intro-complete", startLiveUpdates, {
        once: true,
      });
    }

    return () => {
      active = false;
      window.removeEventListener("atlantic:intro-complete", startLiveUpdates);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [initialStats]);

  const metrics = useMemo(
    () =>
      metricLabels.map((metric) => ({
        ...metric,
        value: currentStats[metric.key],
      })),
    [currentStats],
  );

  return (
    <div className="animate-fade-up mt-12 w-full max-w-4xl" style={{ animationDelay: "0.42s" }}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/38">
        <span className="live-badge inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1.5 font-medium text-emerald-100">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
          Live game analytics
        </span>
      </div>

      <div className="live-stats-grid grid overflow-hidden rounded-lg border border-white/12 bg-black/20 backdrop-blur-sm sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <StatCard
            key={metric.label}
            metricKey={metric.key}
            label={metric.label}
            value={metric.value}
            index={index}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  metricKey,
  label,
  value,
  index,
  isFirst,
}: {
  metricKey: MetricKey;
  label: string;
  value: number;
  index: number;
  isFirst: boolean;
}) {
  const { displayValue, isAnimating } = useAnimatedNumber(value);

  return (
    <article
      style={{ "--stat-index": index } as React.CSSProperties}
      className={`live-stat-card px-4 py-4 sm:px-5 ${
        isFirst ? "" : "border-t border-white/12 sm:border-t-0 sm:border-l"
      }`}
    >
      <p className="text-2xl font-semibold text-white tabular-nums sm:text-3xl">
        {formatCount(displayValue, isAnimating)}
      </p>
      <p className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-white/42">
        <MetricIcon metricKey={metricKey} />
        {label}
      </p>
    </article>
  );
}

function MetricIcon({ metricKey }: { metricKey: MetricKey }) {
  const props = {
    "aria-hidden": true,
    className: "h-[13px] w-[13px] shrink-0 text-emerald-300/80",
    strokeWidth: 1.6,
  } as const;

  if (metricKey === "activePlayers") return <UsersRound {...props} />;
  if (metricKey === "totalVisits") return <Eye {...props} />;
  return <Gamepad2 {...props} />;
}

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);
  const [isAnimating, setIsAnimating] = useState(false);
  const valueRef = useRef(target);
  const previousTarget = useRef(target);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (target === previousTarget.current) return;

    const from = valueRef.current;
    const duration = 1800;
    let frame = 0;
    const start = performance.now();
    previousTarget.current = target;
    setIsAnimating(true);

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const nextValue = from + (target - from) * eased;
      valueRef.current = nextValue;
      setValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      } else {
        valueRef.current = target;
        setValue(target);
        setIsAnimating(false);
      }
    };

    frame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [target]);

  return { displayValue: value, isAnimating };
}

function formatCount(value: number, isAnimating = false) {
  const rounded = Math.round(value);
  const precision = isAnimating ? 2 : 1;
  if (rounded >= 1_000_000_000) return `${(rounded / 1_000_000_000).toFixed(precision).replace(/\.0+$/, "")}B+`;
  if (rounded >= 1_000_000) return `${(rounded / 1_000_000).toFixed(precision).replace(/\.0+$/, "")}M+`;
  if (rounded >= 1_000) return `${(rounded / 1_000).toFixed(precision).replace(/\.0+$/, "")}K+`;
  return new Intl.NumberFormat("en").format(rounded);
}
