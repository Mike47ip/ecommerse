import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { items, shippingAddress, subtotal, shippingCost, total, notes } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const reference = `SW-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const order = await prisma.order.create({
    data: {
      userId: session.user.id!,
      status: "PENDING",
      subtotal,
      shippingCost,
      total,
      shippingAddress,
      paystackRef: reference,
      notes,
      items: {
        create: items.map((i: { productId: string; quantity: number; price: number; name: string }) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
          name: i.name,
        })),
      },
    },
  });

  return NextResponse.json({ orderId: order.id, reference });
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id! },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
