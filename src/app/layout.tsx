import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "GadgetHub Signature", template: "%s | GadgetHub Signature" },
  description: "Ghana's premium gadget store — AirPods, laptops, cameras, batteries and storage.",
  keywords: ["gadgets", "electronics", "airpods", "laptops", "cameras", "Ghana"],
  icons: { icon: "/cart.png", apple: "/cart.png" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          {children}
          <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: "12px", fontFamily: "Outfit, sans-serif", fontSize: "14px" } }} />
        </SessionProvider>
      </body>
    </html>
  );
}
