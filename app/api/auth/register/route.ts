// POST /api/auth/register
// Registers a new user in the database with hashed password

import { NextResponse } from "next/server";
import { basicString, findUserByEmail, hashPassword, createUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = basicString(body?.name);
    const email = basicString(body?.email);
    const password = basicString(body?.password);
    const contactNumber = basicString(body?.contactNumber);
    const ageGroup = basicString(body?.ageGroup);
    const state = basicString(body?.state);
    const city = basicString(body?.city);

    if (!name || !email || !password || !contactNumber || !ageGroup || !state || !city) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Validate contact number format
    if (!/^[6-9]\d{9}$/.test(contactNumber)) {
      return NextResponse.json({ error: "Please enter a valid 10-digit mobile number" }, { status: 400 });
    }

    // Validate age group
    const validAgeGroups = ['18-25', '25-35', '35-45', '45+', 'All Ages'];
    if (!validAgeGroups.includes(ageGroup)) {
      return NextResponse.json({ error: "Please select a valid age group" }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const newUser = await createUser({
      name,
      email,
      contactNumber,
      ageGroup,
      state,
      city,
      passwordHash,
      gamesHosted: 0,
      gamesAttended: 0,
    });

    if (!newUser) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    // Do not return password hash
    const { passwordHash: _omit, ...safe } = newUser as unknown as Record<string, unknown>;
    return NextResponse.json({ user: safe }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


