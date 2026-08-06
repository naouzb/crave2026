import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, role } = body;

    // Strict Validation: Required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "First Name, Last Name, Email, and Password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Validation 1: Check if user already exists in Neon PostgreSQL DB
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email." },
        { status: 400 }
      );
    }

    // Hashing: Securely hash password
    const passwordHash = await hashPassword(password);

    // Save to DB: Create user record
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        passwordHash,
        role: role === 'BUSINESS' ? 'BUSINESS' : 'CLIENT',
      },
    });

    // Return sanitized user object (exclude passwordHash)
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create user account. Please try again." },
      { status: 500 }
    );
  }
}
