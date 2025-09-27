// TypeScript types for the Turf Customs mock backend

export interface User {
  id: string;
  name: string;
  email: string;
  // Store hashed password only
  passwordHash: string;
}

export interface Game {
  id: string;
  sport: string;
  venue: string;
  date: string; // ISO date e.g., 2025-09-25
  time: string; // 24h time e.g., 18:00
  ageGroup: string;
  playersNeeded: number;
  costPerPlayer: number;
  note?: string;
  createdBy: string; // user id
  players: string[]; // user ids
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  name: string;
}


