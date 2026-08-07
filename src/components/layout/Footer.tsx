import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-white mb-3">
              <span className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </span>
              ShopWave
            </Link>
            <p className="text-sm leading-relaxed">
              Your modern marketplace for premium products. Fast delivery across Ghana.
            </p>
            <div className="flex flex-col gap-2 mt-4 text-sm">
              <span className="flex items-center gap-2"><Mail size={14} /> hello@shopwave.com</span>
              <span className="flex items-center gap-2"><Phone size={14} /> +233 XX XXX XXXX</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> Accra, Ghana</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              {["All Products", "Electronics", "Fashion", "Home & Living", "Beauty"].map((t) => (
                <li key={t}>
                  <Link href="/products" className="hover:text-white transition-colors">{t}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "My Account", href: "/login" },
                { label: "My Orders", href: "/orders" },
                { label: "Cart", href: "/cart" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Contact Us", "Privacy Policy", "Terms of Service", "Returns Policy"].map((t) => (
                <li key={t}>
                  <Link href="/contact" className="hover:text-white transition-colors">{t}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} ShopWave. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5 opacity-60 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 opacity-60 grayscale" />
            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">Paystack</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
