import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession, login } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      password?: string;
    };

    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const password = body.password?.trim();

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingPhoneOwner = await prisma.user.findUnique({ where: { phone } });
    if (existingPhoneOwner && existingPhoneOwner.id !== session.id) {
      return NextResponse.json(
        { error: "Phone already used by another account" },
        { status: 400 }
      );
    }

    const data: { name: string; phone: string; password?: string } = {
      name,
      phone,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: session.id },
      data,
      select: { id: true, name: true, phone: true, role: true },
    });

    // Keep auth cookie/session in sync with updated profile info
    await login(updated);

    return NextResponse.json({ message: "Profile updated successfully", user: updated });
  } catch (error) {
    console.error("PUT /api/users/me error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

