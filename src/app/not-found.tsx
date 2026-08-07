import Link from "next/link";
import { ShopLayout } from "@/components/layout/ShopLayout";

export default function NotFound() {
  return (
    <ShopLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-8xl font-display font-extrabold text-brand-200 mb-4">404</p>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">Go Home</Link>
      </div>
    </ShopLayout>
  );
}
