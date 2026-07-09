import { NextResponse } from "next/server";
import { buildStudioStats, fetchRobloxGameStats } from "@/lib/atlantic";

export const revalidate = 30;

export async function GET() {
  const stats = buildStudioStats(await fetchRobloxGameStats());

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
