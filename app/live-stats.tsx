"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { StudioStats } from "@/lib/atlantic";

type LiveStatsProps = {
  initialStats: StudioStats;
};

type MetricKey = keyof Pick<
  StudioStats,
  "activePlayers" | "totalVisits" | "activeGames" | "peakCcu" | "gameCount"
>;

const metricLabels: Array<{
  key: MetricKey;
  label: string;
}> = [
  {
    key: "activePlayers",
    label: "Players Online",
  },
  {
    key: "totalVisits",
    label: "Visits",
  },
  {
    key: "activeGames",
    label: "Live Games",
  },
  {
    key: "peakCcu",
    label: "Peak CCU",
  },
];

export function LiveStats({ initialStats }: LiveStatsProps) {
  const [stats, setStats] = useState(initialStats);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("just now");

  useEffect(() => {
    let active = true;

    async function loadStats() {
      setRefreshing(true);

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
          setLastUpdated(
            new Intl.DateTimeFormat("en", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(new Date()),
          );
        }
      } catch {
        if (active) {
          setLastUpdated("live data unavailable");
        }
      } finally {
        if (active) {
          setRefreshing(false);
        }
      }
    }

    void loadStats();

    const timer = window.setInterval(() => {
      void loadStats();
    }, 30000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const metrics = useMemo(
    () =>
      metricLabels.map((metric) => ({
        ...metric,
        value: stats[metric.key],
      })),
    [stats],
  );

  return (
    <div className="animate-fade-up mt-12 w-full max-w-4xl" style={{ animationDelay: "0.42s" }}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/38">
        <span className="inline-flex items-center gap-2 font-medium text-white/62">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.72)]" />
          Live portfolio analytics
        </span>
        <span>{refreshing ? "Updating" : `Updated ${lastUpdated}`}</span>
      </div>

      <div className="grid border-y border-white/12 sm:grid-cols-4">
        {metrics.map((metric, index) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  isFirst,
}: {
  label: string;
  value: number;
  isFirst: boolean;
}) {
  const animatedValue = useAnimatedNumber(value);

  return (
    <article
      className={`py-4 sm:px-5 ${
        isFirst ? "" : "border-t border-white/12 sm:border-t-0 sm:border-l"
      }`}
    >
      <p className="text-2xl font-semibold text-white tabular-nums sm:text-3xl">
        {formatCompact(animatedValue)}
      </p>
      <p className="mt-1 text-xs font-medium text-white/42">{label}</p>
    </article>
  );
}

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const from = valueRef.current;
    const start = performance.now();
    const duration = 1000;
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = from + (target - from) * eased;
      valueRef.current = nextValue;
      setValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      } else {
        valueRef.current = target;
        setValue(target);
      }
    };

    frame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [target]);

  return value;
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: value >= 1_000_000 ? 1 : 0,
  }).format(Math.round(value));
}
