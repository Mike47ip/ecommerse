"use client";
import { useState } from "react";
import { Trash2, EyeOff, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function AdminProductActions({
  productId,
  published,
}: {
  productId: string;
  published: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function togglePublish() {
    setLoading(true);
    const res = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (res.ok) {
      toast.success(published ? "Product unpublished" : "Product published");
      router.refresh();
    } else {
      toast.error("Failed to update product");
    }
    setLoading(false);
  }

  async function deleteProduct() {
    if (!confirm("Delete this product permanently?")) return;
    setLoading(true);
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete product");
    }
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={togglePublish}
        disabled={loading}
        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
        title={published ? "Unpublish" : "Publish"}
      >
        {published ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
      <button
        onClick={deleteProduct}
        disabled={loading}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
        title="Delete"
      >
        <Trash2 size={15} />
      </button>
    </>
  );
}
