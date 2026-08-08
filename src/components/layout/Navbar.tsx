"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";

const NAV_LINKS = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=airpods", label: "AirPods" },
  { href: "/products?category=computers", label: "Computers" },
  { href: "/products?category=cameras", label: "Cameras" },
  { href: "/products?category=batteries", label: "Batteries" },
  { href: "/products?category=storage", label: "Storage" },
];

export function Navbar() {
  const { data: session } = useSession();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 ">

          {/* ── Logo — small on mobile, big on desktop ── */}
          <Link href="/" className="shrink-0">
<Image
  src="/images/gadgethub.png"
  alt="GadgetHub Signature"
  width={220}
  height={60}
  className="object-contain w-auto h-36 sm:h-40 lg:h-60"
  priority
/>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-1">
            <Link href="/products" className="p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Search">
              <Search size={18} className="text-gray-600" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Cart">
              <ShoppingCart size={18} className="text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* User menu */}
            {session ? (
              <div className="relative">
                <button onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-brand-700 font-semibold text-xs">
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </span>
                  </div>
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserOpen(false)}>My Orders</Link>
                    {session.user?.role === "ADMIN" && (
                      <Link href="/admin" className="flex items-center px-4 py-2 text-sm text-brand-500 font-medium hover:bg-blue-50"
                        onClick={() => setUserOpen(false)}>Admin Panel</Link>
                    )}
                    <button onClick={() => { setUserOpen(false); signOut(); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-xs px-3 py-1.5 ml-1 sm:px-4 sm:py-2">
                <User size={13} /> <span className="hidden sm:inline">Sign In</span><span className="sm:hidden">In</span>
              </Link>
            )}

            <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-brand-500">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}