import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./contact-form";

const showcaseLogos = [
  "/showcase1.png",
  "/showcase2.png",
  "/showcase3.png",
  "/showcase4.png",
];

const games = [
  {
    name: "Catch A Fade 2",
    thumbnail: "/CatchAFade2T.png",
    href: "https://www.roblox.com/games/103820982596314/Catch-A-Fade-2-SHOES#!/about",
    universeId: 10195887022,
    fallbackPlayers: "4K+",
    fallbackVisits: "8.9M+",
    cta: "Jump Into the Fight",
  },
  {
    name: "Expedition Cave Dive",
    thumbnail: "/ExpeditionCaveDiveT.png",
    href: "https://www.roblox.com/games/77747054101308/Expedition-Cave-Dive",
    universeId: 7677035096,
    fallbackPlayers: "200+",
    fallbackVisits: "1.4M+",
    cta: "Dive In",
  },
];

const specializations = [
  "LiveOps",
  "Scaling Games",
  "Making Games",
  "Producing Games",
  "Boosting Games Analytics",
  "Marketing Games",
  "Designing Games",
  "Monetization & Economy",
];

type RobloxGame = {
  id: number;
  playing: number;
  visits: number;
};

async function getRobloxStats() {
  try {
    const universeIds = games.map((game) => game.universeId).join(",");
    const response = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeIds}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return new Map<number, RobloxGame>();
    }

    const payload = (await response.json()) as { data?: RobloxGame[] };

    return new Map(
      (payload.data ?? []).map((game) => [game.id, game] as const),
    );
  } catch {
    return new Map<number, RobloxGame>();
  }
}

function formatStat(value: number | undefined, fallback: string) {
  if (typeof value !== "number") {
    return fallback;
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: value >= 1_000_000 ? 1 : 0,
  }).format(value);
}

export default async function Home() {
  const robloxStats = await getRobloxStats();

  return (
    <div className="bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/background.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75 animate-hero-drift" />
        <div className="animate-pulse-soft pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <header className="absolute inset-x-0 top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
            <Link
              href="/"
              className="flex items-center gap-3 transition duration-300 hover:opacity-90 hover:scale-[1.02]"
            >
              <Image
                src="/image.png"
                alt="Atlantic logo"
                width={40}
                height={40}
                priority
                className="h-10 w-10 object-contain"
              />
              <span className="hidden text-sm font-semibold tracking-[0.28em] text-white/90 uppercase sm:block">
                Atlantic
              </span>
            </Link>

            <nav aria-label="Primary">
              <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
                {[
                  ["Games", "#games"],
                  ["Careers", "#careers"],
                  ["Contact", "#contact"],
                ].map(([item, href]) => (
                  <li key={item}>
                    <Link
                      href={href}
                      className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <div className="relative z-10 flex min-h-screen items-start">
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-44 sm:px-8 sm:pt-48 lg:px-12 lg:pt-52">
            <div className="max-w-5xl">
              <h1
                className="animate-fade-up max-w-5xl text-4xl font-semibold leading-tight text-balance text-white sm:text-5xl lg:text-7xl"
                style={{ animationDelay: "0.12s" }}
              >
                We Power the Teams Behind Great Games
              </h1>
              <p
                className="animate-fade-up mt-5 max-w-2xl text-base leading-7 text-pretty text-white/68 sm:text-lg sm:leading-8"
                style={{ animationDelay: "0.24s" }}
              >
                From engineering and QA to LiveOps and strategic partnerships,
                we help game studios build better experiences and scale
                long-term.
              </p>
              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#contact"
                  className="animate-fade-up inline-flex min-w-44 items-center justify-center rounded-md border border-white/45 bg-white/14 px-6 py-3 text-sm font-medium text-white shadow-[0_16px_44px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-300 hover:border-white/65 hover:bg-white/20 hover:translate-y-[-1px]"
                  style={{ animationDelay: "0.36s" }}
                >
                  Partner With Us
                </Link>
                <Link
                  href="#games"
                  className="animate-fade-up inline-flex min-w-44 items-center justify-center rounded-md border border-white/18 bg-black/35 px-6 py-3 text-sm font-medium text-white/86 backdrop-blur-md transition duration-300 hover:border-white/35 hover:bg-black/25 hover:text-white hover:translate-y-[-1px]"
                  style={{ animationDelay: "0.44s" }}
                >
                  Explore Games
                </Link>
              </div>
              <div
                className="animate-fade-up mt-8 max-w-2xl"
                style={{ animationDelay: "0.54s" }}
              >
                <p className="text-xs font-medium text-white/45">Trusted by</p>
                <div className="trusted-logo-stage animate-fade-up mt-3 overflow-hidden border-y border-white/10 py-2">
                  <div className="grid grid-cols-4 items-center gap-2">
                    {showcaseLogos.map((logo, index) => (
                      <div
                        key={logo}
                        className="trusted-logo-item flex h-9 items-center justify-center px-2 sm:h-10"
                        style={{
                          animationDelay: `${index * 1.15}s`,
                        }}
                      >
                        <Image
                          src={logo}
                          alt={`Trusted partner ${index + 1}`}
                          width={132}
                          height={64}
                          className="trusted-logo max-h-7 w-auto max-w-18 object-contain opacity-70 grayscale contrast-125 brightness-125 mix-blend-screen transition duration-300 sm:max-h-8 sm:max-w-20"
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="animate-fade-up text-sm font-medium text-white/45">
                  Specialize in
                </p>
                <h2
                  className="animate-fade-up mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
                  style={{ animationDelay: "0.08s" }}
                >
                  End-to-end game growth.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {specializations.map((specialization, index) => (
                  <div
                    key={specialization}
                    className="animate-fade-up rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-white/82"
                    style={{ animationDelay: `${0.12 + index * 0.04}s` }}
                  >
                    {specialization}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="games"
          className="scroll-mt-6 border-t border-white/10 bg-[#050505] px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="animate-fade-up text-sm font-medium text-white/45">Our Games</p>
              <h2 className="animate-fade-up mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl" style={{ animationDelay: "0.08s" }}>
                Games we have scaled, partnered with, owned, and more.
              </h2>
              <p className="animate-fade-up mt-5 max-w-2xl text-base leading-7 text-white/62" style={{ animationDelay: "0.16s" }}>
                These are games we have scaled, partnered with, owned, and
                supported through engineering, QA, LiveOps, and production.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {games.map((game) => (
                <article
                  key={game.name}
                  className="animate-fade-up group overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
                  style={{ animationDelay: game.name === "Catch A Fade 2" ? "0.2s" : "0.3s" }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={game.thumbnail}
                      alt={`${game.name} thumbnail`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <div className="min-w-0">
                        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                          {game.name}
                        </h3>
                        <div className="mt-4 grid max-w-sm grid-cols-2 overflow-hidden rounded-md border border-white/14 bg-black/45 shadow-[0_18px_44px_rgba(0,0,0,0.32)] backdrop-blur-md">
                          <div className="px-3.5 py-3">
                            <p className="flex items-center gap-2 text-[0.63rem] font-semiboldtext-white/45">
                              Active Players
                            </p>
                            <p className="mt-1 text-lg font-semibold leading-none text-white sm:text-xl">
                              {formatStat(
                                robloxStats.get(game.universeId)?.playing,
                                game.fallbackPlayers,
                              )}
                            </p>
                          </div>
                          <div className="border-l border-white/12 px-3.5 py-3">
                            <p className="text-[0.63rem] font-semibold text-white/45">
                              Live Visits
                            </p>
                            <p className="mt-1 text-lg font-semibold leading-none text-white/90 sm:text-xl">
                              {formatStat(
                                robloxStats.get(game.universeId)?.visits,
                                game.fallbackVisits,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <a
                        href={game.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center justify-center rounded-md border border-red-200/35 bg-red-200/12 px-5 py-3 text-sm font-semibold text-red-50 shadow-[0_12px_34px_rgba(0,0,0,0.34),0_0_24px_rgba(254,202,202,0.08)] backdrop-blur-md transition duration-300 hover:border-red-200/60 hover:bg-red-200/18 hover:text-white hover:shadow-[0_14px_38px_rgba(0,0,0,0.38),0_0_32px_rgba(254,202,202,0.14)] hover:translate-y-[-1px]"
                      >
                        <span>{game.cta}</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="careers"
          className="scroll-mt-6 border-t border-white/10 bg-black px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="animate-fade-up text-sm font-medium text-white/45">Join our team</p>
              <h2 className="animate-fade-up mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl" style={{ animationDelay: "0.08s" }}>
                Help studios build better games.
              </h2>
              <p className="animate-fade-up mt-5 max-w-xl text-base leading-7 text-white/62" style={{ animationDelay: "0.16s" }}>
                We work with people who care about execution, taste, and the
                small details that make games feel better to play.
              </p>
              <Link
                href="#contact"
                className="animate-fade-up mt-8 inline-flex items-center justify-center rounded-md border border-white/24 bg-white/10 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/45 hover:bg-white/16 hover:translate-y-[-1px]"
                style={{ animationDelay: "0.24s" }}
              >
                Apply through contact
              </Link>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-6 border-t border-white/10 bg-[#050505] px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="animate-fade-up text-sm font-medium text-white/45">Contact us</p>
              <h2 className="animate-fade-up mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl" style={{ animationDelay: "0.08s" }}>
                Tell us what you are building.
              </h2>
              <p className="animate-fade-up mt-5 max-w-xl text-base leading-7 text-white/62" style={{ animationDelay: "0.16s" }}>
                The fastest way to get a useful reply is to include the project
                link, what you need help with, your timeline, and the decision
                maker we should speak with.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
