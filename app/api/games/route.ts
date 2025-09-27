// GET /api/games  -> list all games
// POST /api/games -> create a new game

import { NextResponse } from "next/server";
import { basicString } from "@/lib/auth";
import { createGame, listGames } from "@/lib/games";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const cityTier = searchParams.get('tier');
    
    let games = await listGames();
    
    // Apply filters
    if (state) {
      games = games.filter(game => game.state === state);
    }
    
    if (city) {
      games = games.filter(game => game.city === city);
    }
    
    // Filter by city tier if specified
    if (cityTier && state) {
      const { STATE_CITIES } = await import('@/lib/types');
      const stateCities = STATE_CITIES[state];
      if (stateCities) {
        let tierCities: string[] = [];
        if (cityTier === 'tier1') tierCities = stateCities.tier1;
        else if (cityTier === 'tier2') tierCities = stateCities.tier2;
        else if (cityTier === 'tier3') tierCities = stateCities.tier3;
        
        if (tierCities.length > 0) {
          games = games.filter(game => tierCities.includes(game.city));
        }
      }
    }
    
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
    const state = basicString(body?.state);
    const city = basicString(body?.city);
    const date = basicString(body?.date);
    const time = basicString(body?.time);
    const ageGroup = basicString(body?.ageGroup);
    const createdBy = basicString(body?.createdBy);
    const note = basicString(body?.note);
    const playersNeeded = Number(body?.playersNeeded ?? NaN);
    const costPerPlayer = Number(body?.costPerPlayer ?? NaN);

    if (!sport || !venue || !state || !city || !date || !time || !ageGroup || !createdBy) {
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
      state,
      city,
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


