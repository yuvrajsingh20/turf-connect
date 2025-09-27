// In-memory mock store for users and games. This is reset on server restart.
// In a real app, this would be replaced with a persistent database.

import { Game, User } from "./types";

export const users: User[] = [];

export const games: Game[] = [];

// Seed with a starter user and game to make testing easier
users.push({
  id: "user1",
  name: "Demo User",
  email: "demo@turf.customs",
  passwordHash: "$2b$10$8Hrk2vM2e1M4rUq.8e9dxeuM8eKX9pS6kA5x6oQ0fHzm1Qn3t8jra", // 'password' (random placeholder, not validated)
});

games.push({
  id: "game1",
  sport: "Cricket",
  venue: "XYZ Turf Ground",
  date: "2025-09-25",
  time: "18:00",
  ageGroup: "18-30",
  playersNeeded: 6,
  costPerPlayer: 200,
  note: "Bring your own bat",
  createdBy: "user1",
  players: ["user1"],
});


