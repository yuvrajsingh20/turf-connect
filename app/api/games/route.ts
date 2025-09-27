// GET /api/games  -> list all games
// POST /api/games -> create a new game

import { NextResponse } from "next/server";
import { basicString } from "@/lib/auth";
import { createGame, listGames } from "@/lib/games";

export async function GET() {
  try {
    const games = await listGames();
    return NextResponse.json({ games });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sport = basicString(body?.sport);
    const venue = basicString(body?.venue);
    const date = basicString(body?.date);
    const time = basicString(body?.time);
    const ageGroup = basicString(body?.ageGroup);
    const createdBy = basicString(body?.createdBy);
    const note = basicString(body?.note);
    const playersNeeded = Number(body?.playersNeeded ?? NaN);
    const costPerPlayer = Number(body?.costPerPlayer ?? NaN);

    if (!sport || !venue || !date || !time || !ageGroup || !createdBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!Number.isFinite(playersNeeded) || playersNeeded < 0) {
      return NextResponse.json({ error: "playersNeeded must be a non-negative number" }, { status: 400 });
    }
    if (!Number.isFinite(costPerPlayer) || costPerPlayer < 0) {
      return NextResponse.json({ error: "costPerPlayer must be a non-negative number" }, { status: 400 });
    }

    const game = await createGame({
      sport,
      venue,
      date,
      time,
      ageGroup,
      playersNeeded,
      costPerPlayer,
      note,
      createdBy,
    });

    if (!game) {
      return NextResponse.json({ error: "Failed to create game" }, { status: 500 });
    }

    return NextResponse.json({ game }, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


