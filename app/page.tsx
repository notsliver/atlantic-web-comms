import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { IntroSequence } from "./intro-sequence";
import { LiveStats } from "./live-stats";
import { MobileNav } from "./mobile-nav";
import {
  aboutServices,
  buildStudioStats,
  brandInquiryCards,
  careerRoles,
  fetchRobloxGameStats,
  studioGames,
} from "@/lib/atlantic";

const showcaseLogos = [
  "/showcase1.png",
  "/showcase2.png",
  "/showcase3.png",
  "/showcase4.png",
];

function formatCount(value: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function Home() {
  const initialStats = buildStudioStats(await fetchRobloxGameStats());

  return (
    <div className="bg-[#050505] text-white">
      <IntroSequence />

      <section id="home" className="relative min-h-[92svh] overflow-hidden border-b border-white/10">
        <Image
          src="/background.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.58)_43%,rgba(0,0,0,0.18)_100%),linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.16)_55%,rgba(5,5,5,0.86)_100%)]" />

        <header className="absolute inset-x-0 top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
            <Link
              href="/"
              className="flex items-center gap-3 text-white transition hover:opacity-80"
            >
              <Image
                src="/image.png"
                alt="Atlantic Interactive logo"
                width={38}
                height={38}
                priority
                className="h-9 w-9 object-contain"
              />
              <span className="hidden text-sm font-semibold uppercase sm:block">
                Atlantic Interactive
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-7 text-sm font-medium text-white/62">
                {[
                  ["Home", "#home"],
                  ["Our Games", "#games"],
                  ["Services", "#services"],
                  ["About", "#about"],
                  ["Careers", "#careers"],
                  ["Get in touch", "#contact"],
                ].map(([item, href]) => (
                  <li key={item}>
                    <Link
                      href={href}
                      className="transition hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <MobileNav />
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-6 pb-10 pt-32 sm:px-8 lg:px-12">
          <div className="max-w-5xl pb-8 lg:pb-14">
            <h1
              className="animate-fade-up text-5xl font-semibold leading-[0.96] text-balance sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "0.08s" }}
            >
              Atlantic Interactive
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl"
              style={{ animationDelay: "0.18s" }}
            >
              We build the games players love, and empower the teams behind
              them with production, LiveOps, analytics, and growth strategy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contact"
                className="animate-fade-up inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/84"
                style={{ animationDelay: "0.28s" }}
              >
                Start a partnership
              </Link>
              <Link
                href="#games"
                className="animate-fade-up inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 bg-black/20 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/38 hover:bg-white/8"
                style={{ animationDelay: "0.34s" }}
              >
                Explore Our Games
              </Link>
            </div>

            <LiveStats initialStats={initialStats} />
          </div>
        </div>
      </section>

      <main>
        <section className="border-b border-white/10 px-6 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium uppercase text-white/36">
              Studio network
            </p>
            <div className="studio-network-marquee flex-1 overflow-hidden sm:max-w-2xl">
              <div className="studio-network-track flex w-max items-center gap-10 pr-10">
                {[...showcaseLogos, ...showcaseLogos].map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex h-12 w-32 shrink-0 items-center justify-center"
                  >
                    <Image
                      src={logo}
                      alt={`Studio partner ${(index % showcaseLogos.length) + 1}`}
                      width={132}
                      height={64}
                      className="max-h-9 w-auto object-contain opacity-[0.58] grayscale contrast-125 brightness-125 transition duration-300 hover:opacity-90"
                      sizes="132px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="games"
          className="scroll-mt-6 border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-medium text-white/42">
                  Experiences
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
                  Roblox experiences, built for repeat play.
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-white/58">
                We partner across production, systems, QA, community moments,
                and the operating rhythm that keeps a game moving.
              </p>
            </div>

            <div className="mt-14 space-y-7">
              {studioGames.map((game, index) => (
                <article
                  key={game.name}
                  className="game-showcase group overflow-hidden rounded-xl border border-white/10 bg-[#090909]"
                >
                  <div className={`grid lg:grid-cols-[1.35fr_.65fr] ${index % 2 ? "lg:grid-cols-[.65fr_1.35fr]" : ""}`}>
                    <div className={`game-showcase-art relative min-h-[280px] overflow-hidden lg:min-h-[420px] ${index % 2 ? "lg:order-2" : ""}`}>
                      <Image src={game.thumbnail} alt={`${game.name} thumbnail`} fill sizes="(min-width: 1024px) 65vw, 100vw" className="game-showcase-image object-cover" />
                      <div className="game-showcase-overlay absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                    </div>
                    <div className={`game-showcase-panel relative flex flex-col justify-between p-6 sm:p-9 ${index % 2 ? "lg:order-1" : ""}`}>
                      <div>
                        <h3 className="game-showcase-title text-2xl font-semibold leading-tight text-white sm:text-3xl">{game.name}</h3>
                        <p className="game-showcase-copy mt-4 text-sm leading-7 text-white/52">A live Atlantic experience shaped around memorable sessions, competitive energy, and reasons to return.</p>
                      </div>
                      <div className="mt-10">
                        <div className="game-showcase-stats grid grid-cols-2 border-y border-white/10 py-4">
                          <div className="game-showcase-stat"><strong className="block text-xl font-semibold tabular-nums">{formatCount(initialStats.games[index]?.playing ?? game.fallbackPlayers)}</strong><span className="mt-1 block text-xs font-medium text-white/38">Active players</span></div>
                          <div className="game-showcase-stat border-l border-white/10 pl-5"><strong className="block text-xl font-semibold tabular-nums">{formatCount(initialStats.games[index]?.visits ?? game.fallbackVisits)}</strong><span className="mt-1 block text-xs font-medium text-white/38">Total visits</span></div>
                        </div>
                        <a href={game.href} target="_blank" rel="noreferrer" className="game-showcase-cta mt-5 inline-flex min-h-11 w-full items-center justify-between rounded-md border border-white/18 bg-white/[0.05] px-4 text-sm font-semibold text-white"><span>{game.cta}</span><span aria-hidden="true">↗</span></a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-6 border-b border-white/10 bg-[#080808] px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-medium text-white/42">Studio</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
                A production partner for ambitious Roblox teams.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-white/66">
                From first prototype to the millions session, we help
                Roblox teams make games worth returning to. Atlantic combines
                hands-on production, creative instinct, and live player insight
                to build worlds that feel alive—and stay that way.
              </p>

              <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {aboutServices.map((service) => (
                  <article key={service.title} className="border-t border-white/12 pt-5">
                    <h3 className="text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/56">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-6 border-b border-white/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-white/42">Brand inquiry</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
                Sharpen the story before the launch window opens.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
                We help studios clarify positioning, polish presentation, and
                understand the signals that make a game easier to market,
                operate, and scale.
              </p>
            </div>

            <div className="mt-10 grid gap-0 border-y border-white/12 md:grid-cols-3">
              {brandInquiryCards.map((card, index) => (
                <article
                  key={card.title}
                  className={`py-6 md:px-6 ${
                    index === 0
                      ? ""
                      : "border-t border-white/12 md:border-t-0 md:border-l"
                  }`}
                >
                  <p className="text-xs font-medium uppercase text-white/34">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/56">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>

            <Link
              href="#contact"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/84"
            >
              Request a review
            </Link>
          </div>
        </section>

        <section
          id="careers"
          className="scroll-mt-6 border-b border-white/10 bg-[#080808] px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div>
              <p className="text-sm font-medium text-white/42">Careers</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
                Make work millions of players remember.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
                Join a team where craft moves quickly, good ideas can come from
                anywhere, and your work reaches real players. Choose the role
                that fits, then show us what you can do.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap content-start gap-2">
              {careerRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-medium text-white/72"
                >
                  {role}
                </span>
              ))}
            </div>
            <Link
              href="#contact"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/84"
            >
              Apply through our contact form
            </Link>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-6 px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-white/42">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
                Tell us what you are building.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
                Send the project link, what you need help with, your timeline,
                and who we should speak with first.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="border-t border-white/8 bg-[#040404] px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <Link href="#home" className="inline-flex items-center gap-3 self-start text-white/75 transition hover:text-white">
              <Image src="/image.png" alt="Atlantic Interactive" width={32} height={32} className="opacity-80" />
              <span className="text-sm font-semibold">Atlantic Interactive</span>
            </Link>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/42">
              <Link className="transition hover:text-white/75" href="#games">Our Games</Link>
              <Link className="transition hover:text-white/75" href="#services">Services</Link>
              <Link className="transition hover:text-white/75" href="#careers">Careers</Link>
              <Link className="transition hover:text-white/75" href="#contact">Contact</Link>
              <a className="transition hover:text-white/75" href="https://x.com" target="_blank" rel="noreferrer">X</a>
              <a className="transition hover:text-white/75" href="https://discord.com" target="_blank" rel="noreferrer">Discord</a>
            </nav>
          </div>
          <div className="mt-7 flex flex-col gap-3 border-t border-white/8 pt-5 text-[11px] text-white/25 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Atlantic Interactive. All rights reserved.</p>
            <div className="flex gap-5"><a className="transition hover:text-white/55" href="#">Privacy Policy</a><Link className="transition hover:text-white/55" href="#home">Back to top</Link></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
