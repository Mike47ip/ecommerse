import { ShopLayout } from "@/components/layout/ShopLayout";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Orders" };

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/orders");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id! },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ShopLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
              <Package size={28} className="text-brand-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">No orders yet</h3>
            <p className="text-gray-500 text-sm mb-6">You haven't placed any orders.</p>
            <Link href="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">Order #{order.id.slice(-8).toUpperCase()}</span>
                    <span className={`badge ${STATUS_STYLES[order.status]} px-2.5 py-0.5`}>{order.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(order.createdAt)} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                  <p className="text-xs text-brand-600 mt-1">View details →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
