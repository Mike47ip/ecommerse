import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (!formspreeId) {
    return NextResponse.json({ error: "Formspree not configured" }, { status: 500 });
  }

  const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, subject, message }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
