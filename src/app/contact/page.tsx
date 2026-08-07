import { ShopLayout } from "@/components/layout/ShopLayout";
import { ContactForm } from "@/components/shop/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Us" };

const INFO = [
  { icon: Mail, label: "Email", value: "hello@shopwave.com" },
  { icon: Phone, label: "Phone", value: "+233 XX XXX XXXX" },
  { icon: MapPin, label: "Address", value: "Accra, Ghana" },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 9am–6pm GMT" },
];

export default function ContactPage() {
  return (
    <ShopLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have a question, complaint, or feedback? We'd love to hear from you.
            Our team responds within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            {INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-gray-900 font-medium">{value}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-brand-50 border border-brand-100 p-5 mt-6">
              <h3 className="font-semibold text-brand-900 mb-2">Quick Answers</h3>
              <ul className="text-sm text-brand-700 space-y-1.5">
                <li>📦 Track your order in <strong>My Orders</strong></li>
                <li>🔄 Returns accepted within 30 days</li>
                <li>🚚 Delivery takes 2–5 business days</li>
                <li>💳 Payments secured by Paystack</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="card p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}
