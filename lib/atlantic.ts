export const studioGames = [
  {
    name: "Catch A Fade 2",
    thumbnail: "/CatchAFade2T.png",
    href: "https://www.roblox.com/games/103820982596314/Catch-A-Fade-2-SHOES#!/about",
    universeId: 10195887022,
    fallbackPlayers: 4_000,
    fallbackVisits: 8_900_000,
    cta: "Jump Into the Fight",
  },
  {
    name: "Expedition Cave Dive",
    thumbnail: "/ExpeditionCaveDiveT.png",
    href: "https://www.roblox.com/games/77747054101308/Expedition-Cave-Dive",
    universeId: 7677035096,
    fallbackPlayers: 200,
    fallbackVisits: 1_400_000,
    cta: "Dive In",
  },
  {
    name: "Traitor VS Sheriff DUELS [COMP]",
    thumbnail: "/TraitorVsSherffT.png",
    href: "https://www.roblox.com/games/119068914321553/Traitor-VS-Sheriff-DUELS",
    universeId: 9741874508,
    fallbackPlayers: 3_390,
    fallbackVisits: 68_300_000,
    cta: "Enter the Duel",
  },
  {
    name: "Cut Grass for Anime Characters",
    thumbnail: "/CutGrassforanimecharactersT.jpg",
    href: "https://www.roblox.com/games/137422980844414/Cut-Grass-for-Anime-Characters",
    universeId: 9889404689,
    fallbackPlayers: 0,
    fallbackVisits: 0,
    cta: "Start Cutting",
  },
  {
    name: "Snatch a Seed",
    thumbnail: "/SnatchaSeedT.png",
    href: "https://www.roblox.com/games/121180020176396/Snatch-a-Seed",
    universeId: 8125244608,
    fallbackPlayers: 0,
    fallbackVisits: 9_200_000,
    cta: "Play Snatch a Seed",
  },

] as const;

export const aboutServices = [
  {
    title: "Game Production",
    description:
      "Turn ambitious ideas into shippable Roblox experiences with clear milestones, tight execution, and strong creative direction.",
  },
  {
    title: "Marketing",
    description:
      "Shape launches, campaigns, creator moments, and audience hooks that help great games find the players they deserve.",
  },
  {
    title: "LiveOps",
    description:
      "Keep worlds fresh with events, updates, retention loops, and community moments that give players reasons to return.",
  },
  {
    title: "Analytics",
    description:
      "Use live data, player behavior, and performance signals to guide better decisions across development and growth.",
  },
] as const;

export const brandInquiryCards = [
  {
    title: "Audience fit",
    description:
      "Who are you building for, and what emotional promise should the experience deliver from the first session?",
  },
  {
    title: "Launch readiness",
    description:
      "Do the game loop, presentation, onboarding, and content cadence line up with the scale you want to reach?",
  },
  {
    title: "Long-term growth",
    description:
      "What systems need to exist so the experience can keep improving after the first wave of attention?",
  },
] as const;

export const careerRoles = [
  "Concept Artist",
  "Animator",
  "Programmer",
  "Game Producer",
  "Acquisition Lead",
  "Acquisition Scout",
  "Data Analyst",
  "Game Designer",
  "Engineer",
  "VFX Artist",
  "Builder",
  "Project Management",
  "Quality Assurance Tester",
] as const;

export type RobloxGameStats = {
  id: number;
  playing: number;
  visits: number;
};

export type StudioStats = {
  activePlayers: number;
  totalVisits: number;
  activeGames: number;
  gameCount: number;
  games: Array<{
    id: number;
    playing: number;
    visits: number;
  }>;
};

export async function fetchRobloxGameStats() {
  try {
    const universeIds = studioGames.map((game) => game.universeId).join(",");
    const response = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeIds}`,
      {
        next: { revalidate: 10 },
      },
    );

    if (!response.ok) {
      return new Map<number, RobloxGameStats>();
    }

    const payload = (await response.json()) as { data?: RobloxGameStats[] };

    return new Map(
      (payload.data ?? []).map((game) => [game.id, game] as const),
    );
  } catch {
    return new Map<number, RobloxGameStats>();
  }
}

export function buildStudioStats(statsByGame: Map<number, RobloxGameStats>) {
  const games = studioGames.map((game) => {
    const liveStats = statsByGame.get(game.universeId);

    return {
      id: game.universeId,
      playing: liveStats?.playing ?? game.fallbackPlayers,
      visits: liveStats?.visits ?? game.fallbackVisits,
    };
  });

  const activePlayers = games.reduce((sum, game) => sum + game.playing, 0);
  const totalVisits = games.reduce((sum, game) => sum + game.visits, 0);
  const activeGames = games.filter((game) => game.playing > 0).length;

  return {
    activePlayers,
    totalVisits,
    activeGames,
    gameCount: studioGames.length,
    games,
  } satisfies StudioStats;
}
