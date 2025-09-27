// MongoDB Game model
import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<IGame>({
  sport: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  venue: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  date: { 
    type: String, 
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format']
  },
  time: { 
    type: String, 
    required: true,
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format']
  },
  ageGroup: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 20
  },
  playersNeeded: { 
    type: Number, 
    required: true,
    min: 1,
    max: 50
  },
  costPerPlayer: { 
    type: Number, 
    required: true,
    min: 0
  },
  note: { 
    type: String,
    trim: true,
    maxlength: 500
  },
  createdBy: { 
    type: String, 
    required: true,
    ref: 'User'
  },
  players: [{ 
    type: String,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Create the model if it doesn't exist, otherwise use the existing one
const Game = mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;
