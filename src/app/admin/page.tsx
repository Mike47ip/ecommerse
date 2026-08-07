import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Users, Package, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const [
    totalOrders,
    totalRevenue,
    totalUsers,
    totalProducts,
    recentOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } }, items: true },
    }),
    prisma.product.findMany({
      where: { stock: { lte: 5 } },
      orderBy: { stock: "asc" },
      take: 5,
    }),
  ]);

  const stats = [
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue._sum.total ?? 0),
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
      change: "+12%",
    },
    {
      label: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
      change: "+8%",
    },
    {
      label: "Customers",
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      change: "+5%",
    },
    {
      label: "Products",
      value: totalProducts.toLocaleString(),
      icon: Package,
      color: "bg-orange-50 text-orange-600",
      change: "Active",
    },
  ];

  const STATUS_STYLES: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PROCESSING: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary text-sm">+ New Product</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={18} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-brand-600 flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">No orders yet.</p>
            )}
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{order.user.name ?? order.user.email} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(order.total)}</p>
                  <span className={`badge text-[10px] px-2 py-0.5 ${STATUS_STYLES[order.status]}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Low Stock Alert</h2>
            <Link href="/admin/products" className="text-sm text-brand-600 hover:underline">Manage</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {lowStockProducts.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">All products well stocked!</p>
            )}
            {lowStockProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3.5">
                <p className="text-sm text-gray-800 font-medium line-clamp-1 flex-1">{p.name}</p>
                <span className={`badge ml-3 ${p.stock === 0 ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {p.stock === 0 ? "Out" : `${p.stock} left`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
