// Auth utilities: hashing, basic validation, and JWT handling
// This file centralizes auth-related operations for reuse across routes

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./db";
import User, { IUser } from "./models/User";
import { AuthTokenPayload, User as UserType } from "./types";

// NOTE: In production, keep secrets in env vars and rotate regularly
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";
const JWT_EXPIRES_IN = "7d";

export async function hashPassword(plain: string): Promise<string> {
  const rounds = 10;
  return await bcrypt.hash(plain, rounds);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plain, hash);
}

export function generateToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (_e) {
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<UserType | null> {
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) return null;
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash
    };
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

export async function createUser(userData: Omit<UserType, 'id'>): Promise<UserType | null> {
  try {
    await connectDB();
    const user = new User(userData);
    const savedUser = await user.save();
    
    return {
      id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
      passwordHash: savedUser.passwordHash
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export function basicString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}


