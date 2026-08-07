import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { AdminOrderActions } from "@/components/admin/AdminOrderActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Orders — Admin" };

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Order", "Customer", "Date", "Items", "Total", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-mono text-xs text-gray-600">#{order.id.slice(-8).toUpperCase()}</p>
                    {order.paystackRef && (
                      <p className="text-[10px] text-gray-400 truncate max-w-[120px]">{order.paystackRef}</p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{order.user.name ?? "—"}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[160px]">{order.user.email}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-4 text-gray-600">{order.items.length}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${STATUS_STYLES[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <AdminOrderActions orderId={order.id} currentStatus={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-16">No orders placed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
