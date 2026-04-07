import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const locale = request.headers.get("x-locale") === "ar" ? "ar" : "fr";
    const messages = {
      fr: {
        missing: "Numéro de téléphone ou mot de passe manquant",
        invalid: "Identifiants invalides",
        internal: "Erreur interne du serveur",
      },
      ar: {
        missing: "رقم الهاتف أو كلمة المرور مفقودة",
        invalid: "بيانات الدخول غير صحيحة",
        internal: "خطأ داخلي في الخادم",
      },
    } as const;

    const { phone, password } = await request.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: messages[locale].missing },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json(
        { error: messages[locale].invalid },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: messages[locale].invalid },
        { status: 401 }
      );
    }

    // Create session cookie
    await login({
      id: user.id,
      phone: user.phone,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json(
      { message: "Login successful", user: { id: user.id, name: user.name, role: user.role } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: locale === "ar" ? "خطأ داخلي في الخادم" : "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
