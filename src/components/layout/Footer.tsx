import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
<Link href="/" className="flex items-center mb-4">
  <Image
    src="/images/gadgethub.png"
    alt="GadgetHub Signature"
    width={180}
    height={48}
    className="object-contain"
  />
</Link>
            <p className="text-sm leading-relaxed mb-4">
              Your premium destination for gadgets and electronics. Fast delivery across Ghana.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2"><Mail size={14} /> hello@gadgethubsignature.com</span>
              <span className="flex items-center gap-2"><Phone size={14} /> +233 XX XXX XXXX</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> Accra, Ghana</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "AirPods & Earbuds", slug: "airpods" },
                { label: "Computers & Laptops", slug: "computers" },
                { label: "Cameras", slug: "cameras" },
                { label: "Batteries & Power", slug: "batteries" },
                { label: "Storage & Drives", slug: "storage" },
              ].map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="hover:text-white transition-colors">{c.label}</Link>
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
                { label: "Contact Us", href: "/contact" },
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
              {["About Us", "Privacy Policy", "Terms of Service", "Returns Policy", "Warranty Info"].map((t) => (
                <li key={t}>
                  <Link href="/contact" className="hover:text-white transition-colors">{t}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} GadgetHub Signature. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-brand-500/20 border border-brand-500/30 text-brand-400 px-2 py-1 rounded">Powered by Paystack</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
