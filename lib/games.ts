// Game utilities: creation, listing, and joining

import connectDB from "./db";
import Game, { IGame } from "./models/Game";
import { Game as GameType } from "./types";

export async function listGames(): Promise<GameType[]> {
  try {
    await connectDB();
    const games = await Game.find().sort({ createdAt: -1 });
    
    return games.map(game => ({
      id: game._id.toString(),
      sport: game.sport,
      venue: game.venue,
      state: game.state,
      city: game.city,
      date: game.date,
      time: game.time,
      ageGroup: game.ageGroup,
      playersNeeded: game.playersNeeded,
      costPerPlayer: game.costPerPlayer,
      note: game.note,
      createdBy: game.createdBy,
      players: game.players
    }));
  } catch (error) {
    console.error('Error listing games:', error);
    return [];
  }
}

export async function createGame(input: Omit<GameType, "players"> & { players?: string[] }): Promise<GameType | null> {
  try {
    await connectDB();
    const game = new Game({
      ...input,
      players: input.players ?? [input.createdBy],
    });
    
    const savedGame = await game.save();
    
    return {
      id: savedGame._id.toString(),
      sport: savedGame.sport,
      venue: savedGame.venue,
      state: savedGame.state,
      city: savedGame.city,
      date: savedGame.date,
      time: savedGame.time,
      ageGroup: savedGame.ageGroup,
      playersNeeded: savedGame.playersNeeded,
      costPerPlayer: savedGame.costPerPlayer,
      note: savedGame.note,
      createdBy: savedGame.createdBy,
      players: savedGame.players
    };
  } catch (error) {
    console.error('Error creating game:', error);
    return null;
  }
}

export async function findGameById(id: string): Promise<GameType | null> {
  try {
    await connectDB();
    const game = await Game.findById(id);
    
    if (!game) return null;
    
    return {
      id: game._id.toString(),
      sport: game.sport,
      venue: game.venue,
      state: game.state,
      city: game.city,
      date: game.date,
      time: game.time,
      ageGroup: game.ageGroup,
      playersNeeded: game.playersNeeded,
      costPerPlayer: game.costPerPlayer,
      note: game.note,
      createdBy: game.createdBy,
      players: game.players
    };
  } catch (error) {
    console.error('Error finding game by ID:', error);
    return null;
  }
}

export async function joinGame(gameId: string, userId: string): Promise<GameType | null> {
  try {
    await connectDB();
    const game = await Game.findById(gameId);
    
    if (!game) return null;
    
    if (!game.players.includes(userId)) {
      game.players.push(userId);
      await game.save();
    }
    
    return {
      id: game._id.toString(),
      sport: game.sport,
      venue: game.venue,
      state: game.state,
      city: game.city,
      date: game.date,
      time: game.time,
      ageGroup: game.ageGroup,
      playersNeeded: game.playersNeeded,
      costPerPlayer: game.costPerPlayer,
      note: game.note,
      createdBy: game.createdBy,
      players: game.players
    };
  } catch (error) {
    console.error('Error joining game:', error);
    return null;
  }
}


