import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PropertyType } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const rawTake = Number(searchParams.get("take") ?? "24");
    const rawSkip = Number(searchParams.get("skip") ?? "0");
    const typeParam = searchParams.get("type") as PropertyType | null;

    const take = Number.isFinite(rawTake) ? Math.min(Math.max(rawTake, 1), 100) : 24;
    const skip = Number.isFinite(rawSkip) ? Math.max(rawSkip, 0) : 0;

    const items = await prisma.property.findMany({
      where: {
        featured: true,
        ...(typeParam ? { type: typeParam } : {}),
      },
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET /api/favorites error:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

