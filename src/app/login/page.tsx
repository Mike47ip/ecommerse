import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 to-brand-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl text-white mb-2">
            <span className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </span>
            ShopWave
          </Link>
          <p className="text-brand-300 text-sm">Sign in to your account</p>
        </div>
        <div className="card p-8">
          <LoginForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-brand-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
