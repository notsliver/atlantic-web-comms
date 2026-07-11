import Image from "next/image";
import { buildStudioStats, fetchRobloxGameStats, studioGames } from "@/lib/atlantic";
import { SiteHeader } from "../site-header";

function formatCount(value: number) { return new Intl.NumberFormat("en").format(value); }

export default async function GamesPage() {
  const stats = buildStudioStats(await fetchRobloxGameStats());
  return (
    <main className="min-h-screen bg-[#050505] pb-20 text-white">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 pt-16 sm:px-8 lg:px-12">
        <p className="text-sm font-medium text-white/42">Experiences</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-6xl">Worlds built for repeat play.</h1>
        <p className="mt-5 max-w-2xl leading-7 text-white/58">Explore every Atlantic Interactive experience and jump directly into the games our players are enjoying.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {studioGames.map((game, index) => (
            <article key={game.name} className="game-showcase group overflow-hidden rounded-xl border border-white/10 bg-[#090909]">
              <div className="game-showcase-art relative aspect-[16/10] overflow-hidden"><Image src={game.thumbnail} alt={`${game.name} thumbnail`} fill sizes="(min-width:768px) 50vw, 100vw" className="game-showcase-image object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" /></div>
              <div className="p-5 sm:p-6"><h2 className="text-xl font-semibold">{game.name}</h2><div className="mt-5 flex gap-6 text-xs text-white/42"><span><strong className="mr-1 text-base text-white">{formatCount(stats.games[index]?.playing ?? game.fallbackPlayers)}</strong> active</span><span><strong className="mr-1 text-base text-white">{formatCount(stats.games[index]?.visits ?? game.fallbackVisits)}</strong> visits</span></div><a href={game.href} target="_blank" rel="noreferrer" className="game-showcase-cta mt-5 inline-flex min-h-11 w-full items-center justify-between rounded-md border border-white/18 bg-white/[0.05] px-4 text-sm font-semibold text-white"><span>{game.cta}</span><span aria-hidden="true">↗</span></a></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
