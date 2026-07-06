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
    visits: "7.7M+ visits",
  },
  {
    name: "Expedition Cave Dive",
    thumbnail: "/ExpeditionCaveDiveT.png",
    href: "https://www.roblox.com/games/77747054101308/Expedition-Cave-Dive",
    visits: "1.3M+ visits",
  },
];

export default function Home() {
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
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />

        <header className="absolute inset-x-0 top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
            <Link
              href="/"
              className="flex items-center gap-3 transition hover:opacity-90"
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
                      className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
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
          <div className="mx-auto w-full max-w-7xl px-6 pt-44 pb-16 sm:px-8 sm:pt-48 lg:px-12 lg:pt-52">
          <div className="max-w-5xl">
            <h1 className="max-w-5xl text-4xl leading-tight font-semibold text-balance text-white sm:text-5xl lg:text-7xl">
              We Power the Teams Behind Great Games
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-pretty text-white/68 sm:text-lg sm:leading-8">
              From engineering and QA to LiveOps and strategic partnerships,
              we help game studios build better experiences and scale
              long-term.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="inline-flex min-w-44 items-center justify-center rounded-md border border-white/45 bg-white/14 px-6 py-3 text-sm font-medium text-white shadow-[0_16px_44px_rgba(0,0,0,0.34)] backdrop-blur-md transition hover:border-white/65 hover:bg-white/20"
              >
                Partner With Us
              </Link>
              <Link
                href="#games"
                className="inline-flex min-w-44 items-center justify-center rounded-md border border-white/18 bg-black/35 px-6 py-3 text-sm font-medium text-white/86 backdrop-blur-md transition hover:border-white/35 hover:bg-black/25 hover:text-white"
              >
                Explore Games
              </Link>
            </div>
            <div className="mt-10">
              <p className="text-xs font-medium text-white/45">Trusted by</p>
              <div className="mt-4 flex max-w-3xl flex-wrap items-center gap-x-8 gap-y-5">
                {showcaseLogos.map((logo, index) => (
                  <Image
                    key={logo}
                    src={logo}
                    alt={`Trusted partner ${index + 1}`}
                    width={132}
                    height={64}
                    className="max-h-11 w-auto max-w-24 object-contain opacity-100 grayscale contrast-150 brightness-125 mix-blend-screen"
                  />
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <main>
        <section
          id="games"
          className="scroll-mt-6 border-t border-white/10 bg-[#050505] px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-white/45">Our Games</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Games we helped build.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                These projects were created with partner studios, with our team
                contributing engineering, QA, LiveOps, and production support.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {games.map((game) => (
                <article
                  key={game.name}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
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
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                          {game.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-white/65">
                          {game.visits}
                        </p>
                      </div>
                      <a
                        href={game.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/24 bg-white/12 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/45 hover:bg-white/18"
                      >
                        <span>
                          Play Game
                        </span>
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
              <p className="text-sm font-medium text-white/45">Join our team</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Help studios build better games.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
                We work with people who care about execution, taste, and the
                small details that make games feel better to play.
              </p>
              <Link
                href="#contact"
                className="mt-8 inline-flex items-center justify-center rounded-md border border-white/24 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-white/45 hover:bg-white/16"
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
              <p className="text-sm font-medium text-white/45">Contact us</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Tell us what you are building.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
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
