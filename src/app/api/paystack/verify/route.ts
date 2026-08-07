import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { reference, orderId } = await req.json();

  if (!reference || !orderId) {
    return NextResponse.json({ error: "Missing reference or orderId" }, { status: 400 });
  }

  try {
    const result = await verifyPaystackTransaction(reference);

    if (result.data.status === "success") {
      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PROCESSING",
          paystackStatus: "success",
        },
      });

      // Decrement stock
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (order) {
        for (const item of order.items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      return NextResponse.json({ success: true, orderId });
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: { paystackStatus: result.data.status },
      });
      return NextResponse.json({ success: false, status: result.data.status });
    }
  } catch (err) {
    console.error("Paystack verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
