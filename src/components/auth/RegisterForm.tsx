"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type FormData = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error ?? "Registration failed");
      return;
    }

    await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    toast.success("Account created! Welcome to ShopWave 🎉");
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {[
        { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
        { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
        { id: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
        { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Repeat password" },
      ].map((f) => (
        <div key={f.id}>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">{f.label}</label>
          <input
            {...register(f.id as keyof FormData)}
            type={f.type}
            className="input"
            placeholder={f.placeholder}
          />
          {errors[f.id as keyof FormData] && (
            <p className="text-red-500 text-xs mt-1">{errors[f.id as keyof FormData]?.message}</p>
          )}
        </div>
      ))}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 mt-2">
        {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Creating account…</> : "Create Account"}
      </button>
    </form>
  );
}
