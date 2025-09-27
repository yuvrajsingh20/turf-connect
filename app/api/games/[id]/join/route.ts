// POST /api/games/:id/join
// Adds the requesting user to the game's players list

import { NextResponse } from "next/server";
import { basicString } from "@/lib/auth";
import { joinGame } from "@/lib/games";

interface RouteParams {
  params: { id: string };
}

export async function POST(_req: Request, { params }: RouteParams) {
  const gameId = basicString(params?.id);
  if (!gameId) {
    return NextResponse.json({ error: "Game id is required" }, { status: 400 });
  }

  try {
    // In a real app, you'd extract the userId from the JWT in the Authorization header.
    // For this mock API, accept a JSON body with `userId`.
    const body = await _req.json().catch(() => ({}));
    const userId = basicString(body?.userId);
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const updated = await joinGame(gameId, userId);
    if (!updated) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    return NextResponse.json({ game: updated }, { status: 200 });
  } catch (error) {
    console.error('Error joining game:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


