/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PropertyType } from "@prisma/client";

// ===================== HELPERS =====================
function isValidPropertyType(value: string): value is PropertyType {
  return Object.values(PropertyType).includes(value as PropertyType);
}

// ===================== POST =====================
export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin role required." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      type,
      price,
      location,
      locationAr,
      bedrooms,
      bathrooms,
      area,
      image,
      images,
      featured,
    } = body;

    // ✅ Validation forte
    if (
      !type ||
      !isValidPropertyType(type) ||
      !price ||
      !location ||
      !locationAr ||
      !area ||
      !image
    ) {
      return NextResponse.json(
        { error: "Invalid or missing property fields" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        type, // ✅ maintenant safe enum
        price: Number(price),
        location,
        locationAr,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        area: Number(area),
        image,
        images: Array.isArray(images) ? images : [],
        featured: Boolean(featured),
        userId: session.id,
      },
    });

    return NextResponse.json(
      { message: "Property created successfully", property },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create property error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ===================== GET (OPTIMIZED + SAFE ENUM) =====================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 12);
    const categoryParam = searchParams.get("category");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where: any = {};

    // ✅ FIX ENUM (plus d’erreur TS)
    if (categoryParam && categoryParam !== "all") {
      if (isValidPropertyType(categoryParam)) {
        where.type = categoryParam;
      }
    }

    // ✅ SEARCH
    if (search) {
      where.OR = [
        {
          location: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          locationAr: {
            contains: search,
          },
        },
      ];
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,

      // ⚡ BONUS PERF (optionnel mais recommandé)
      select: {
        id: true,
        type: true,
        price: true,
        location: true,
        locationAr: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        image: true,
        featured: true,
        createdAt: true,
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}