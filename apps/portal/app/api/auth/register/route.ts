import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const DEFAULT_TENANT_SLUG = "default";
const DEFAULT_TENANT_NAME = "Default Organization";
const BCRYPT_SALT_ROUNDS = 12;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, tenantSlug } = body as {
      email?: string;
      name?: string;
      password?: string;
      tenantSlug?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // Find or create the tenant
    const slug = tenantSlug || DEFAULT_TENANT_SLUG;
    let tenant = await prisma.tenant.findUnique({
      where: { slug },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: {
          name: tenantSlug ? tenantSlug : DEFAULT_TENANT_NAME,
          slug,
        },
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
        tenantId: tenant.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        tenantId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
