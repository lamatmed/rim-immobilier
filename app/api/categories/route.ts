import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { PropertyType } from "@prisma/client";



export async function GET() {
  try {
    const rows = await prisma.property.groupBy({
      by: ["type"],
      _count: { _all: true },
    });

    const counts: Record<PropertyType, number> = {
      HOUSE: 0,
      APARTMENT: 0,
      LAND: 0,
      BUILDING: 0,
    };

    for (const r of rows) {
      counts[r.type] = r._count._all;
    }

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

