/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    // Verification: Only Logged-in ADMINs can add properties
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
      featured 
    } = body;

    // Validate required fields
    if (!type || !price || !location || !locationAr || !area || !image) {
      return NextResponse.json(
        { error: "Missing required property fields" },
        { status: 400 }
      );
    }

    // Create property in MongoDB
    const property = await prisma.property.create({
      data: {
        type,
        price: parseFloat(price),
        location,
        locationAr,
        bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
        bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
        area: parseFloat(area),
        image,
        images: images || [],
        featured: !!featured,
        userId: session.id, // Linked to the admin
      },
    });

    return NextResponse.json(
      { message: "Property created successfully", property },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create property error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET all properties (Public)
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
