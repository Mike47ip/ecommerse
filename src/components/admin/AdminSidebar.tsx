"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, ShoppingBag, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

interface User { name?: string | null; email?: string | null }

export function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  return (
    <aside className="w-60 bg-gray-950 text-gray-400 flex flex-col shrink-0 min-h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/cart.png" alt="GadgetHub" width={28} height={28} className="rounded-lg" />
          <div>
            <span className="font-display font-black text-white">Gadget</span>
            <span className="font-display font-black text-brand-400">Hub</span>
          </div>
        </Link>
        <span className="text-xs text-gray-500 mt-1 block pl-9">Admin Panel</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active ? "bg-brand-500/20 text-brand-400" : "text-gray-400 hover:text-white hover:bg-gray-800")}>
              <Icon size={17} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-xs shrink-0">
            {user.name?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user.name}</p>
            <p className="text-gray-500 text-xs truncate">{user.email}</p>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-white px-1 py-1">← Back to store</Link>
        <button onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 mt-1 px-1 py-1 w-full">
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
