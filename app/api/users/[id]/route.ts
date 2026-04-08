import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { Role } from "@prisma/client";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin role required." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = (await request.json()) as { role?: Role };
    const role = body.role;

    if (!role || (role !== "ADMIN" && role !== "USER")) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Guard: don't allow changing your own role (avoid locking yourself out)
    if (session.id === id) {
      return NextResponse.json(
        { error: "You cannot change your own role." },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, phone: true, role: true },
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin role required." },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Guard: don't allow deleting your own account
    if (session.id === id) {
      return NextResponse.json(
        { error: "You cannot delete your own account." },
        { status: 400 }
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

