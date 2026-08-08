import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #000d1a 0%, #001f4d 50%, #0047ab 100%)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <Image src="/cart.png" alt="GadgetHub Signature" width={52} height={52} className="rounded-xl" />
            <div>
              <span className="font-display font-black text-2xl text-white">Gadget</span>
              <span className="font-display font-black text-2xl text-blue-400">Hub</span>
              <span className="font-display font-light text-sm text-blue-300 ml-1">signature</span>
            </div>
          </Link>
          <p className="text-blue-300 text-sm mt-2">Sign in to your account</p>
        </div>
        <div className="card p-8">
          <LoginForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-brand-500 font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
