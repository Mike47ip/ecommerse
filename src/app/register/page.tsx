import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import { Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
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
          <p className="text-brand-300 text-sm">Create your account</p>
        </div>
        <div className="card p-8">
          <RegisterForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
