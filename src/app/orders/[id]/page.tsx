import { ShopLayout } from "@/components/layout/ShopLayout";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Details" };

const STATUS_STEPS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect("/login");

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: { include: { product: { select: { images: true, slug: true } } } },
    },
  });

  if (!order || (order.userId !== session.user.id && session.user.role !== "ADMIN")) {
    notFound();
  }

  const address = order.shippingAddress as Record<string, string>;
  const stepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <ShopLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/orders" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} /> Back to Orders
        </Link>

        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-display font-bold text-gray-900">
                  Order #{order.id.slice(-8).toUpperCase()}
                </h1>
                <span className={`badge ${STATUS_STYLES[order.status]} px-3 py-1`}>{order.status}</span>
              </div>
              <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
            </div>
            {order.paystackRef && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Ref:</span>{" "}
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{order.paystackRef}</span>
              </div>
            )}
          </div>

          {/* Progress tracker — only for non-cancelled orders */}
          {!["CANCELLED", "REFUNDED"].includes(order.status) && (
            <div className="mt-6">
              <div className="flex items-center gap-0">
                {STATUS_STEPS.map((step, i) => (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        i <= stepIndex ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-400"
                      }`}>
                        {i < stepIndex ? <CheckCircle size={16} /> : i + 1}
                      </div>
                      <span className={`text-[10px] mt-1 font-medium ${i <= stepIndex ? "text-brand-600" : "text-gray-400"}`}>
                        {step.charAt(0) + step.slice(1).toLowerCase()}
                      </span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < stepIndex ? "bg-brand-600" : "bg-gray-100"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {/* Shipping address */}
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-brand-600" /> Shipping Address
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state}</p>
              <p>{address.phone}</p>
            </div>
          </div>

          {/* Order summary */}
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <Package size={16} className="text-brand-600" /> Payment Summary
            </h2>
            <div className="text-sm space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? <span className="text-green-600">Free</span> : formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t border-gray-100 pt-2 mt-2">
                <span>Total</span><span>{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 pt-1">
                <span>Payment</span>
                <span className="capitalize">{order.paystackStatus ?? "—"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  {item.product.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.product.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.product.slug}`} className="font-medium text-gray-900 text-sm hover:text-brand-600">
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                </div>
                <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Link href="/products" className="btn-outline">Continue Shopping</Link>
          <Link href="/orders" className="btn-secondary">All Orders</Link>
        </div>
      </div>
    </ShopLayout>
  );
}
