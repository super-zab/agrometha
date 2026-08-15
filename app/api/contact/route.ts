import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      org?: string;
      role?: string;
    };

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ ok: false, error: "Champs requis manquants." }, { status: 400 });
    }

    // Placeholder : brancher un service mail / CRM ici.
    console.info("[AgroMetha contact]", {
      name: body.name,
      org: body.org,
      email: body.email,
      role: body.role,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
