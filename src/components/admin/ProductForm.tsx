"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  description: z.string().min(10, "Description required"),
  price: z.coerce.number().positive("Price must be positive"),
  comparePrice: z.coerce.number().optional(),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or more"),
  categoryId: z.string().min(1, "Category required"),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

interface Category { id: string; name: string }
interface InitialData {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  stock: number;
  categoryId: string;
  images: string[];
  featured: boolean;
  published: boolean;
}

export function ProductForm({
  categories,
  initialData,
}: {
  categories: Category[];
  initialData?: InitialData;
}) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [images, setImages] = useState<string[]>(initialData?.images ?? [""]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          price: initialData.price,
          comparePrice: initialData.comparePrice ?? undefined,
          stock: initialData.stock,
          categoryId: initialData.categoryId,
          featured: initialData.featured,
          published: initialData.published,
        }
      : { published: true, featured: false, stock: 0 },
  });

  async function onSubmit(data: FormData) {
    const validImages = images.filter((i) => i.trim() !== "");
    const payload = { ...data, images: validImages, slug: slugify(data.name) };

    const res = isEdit
      ? await fetch(`/api/products/${initialData!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (res.ok) {
      toast.success(isEdit ? "Product updated!" : "Product created!");
      router.push("/admin/products");
      router.refresh();
    } else {
      const err = await res.json();
      toast.error(err.error?.fieldErrors?.name?.[0] ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Basic Info</h2>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Product Name</label>
          <input {...register("name")} className="input" placeholder="e.g. Wireless Headphones Pro" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
          <textarea {...register("description")} className="input resize-none" rows={4} placeholder="Detailed product description…" />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Category</label>
          <select {...register("categoryId")} className="input">
            <option value="">— Select category —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Pricing & Inventory</h2>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Price (GHS)</label>
            <input {...register("price")} type="number" step="0.01" className="input" placeholder="0.00" />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Compare Price (optional)</label>
            <input {...register("comparePrice")} type="number" step="0.01" className="input" placeholder="0.00" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Stock</label>
            <input {...register("stock")} type="number" className="input" placeholder="0" />
            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Images (URLs)</h2>
          <button
            type="button"
            onClick={() => setImages([...images, ""])}
            className="text-xs text-brand-600 flex items-center gap-1 hover:underline"
          >
            <Plus size={13} /> Add image
          </button>
        </div>
        {images.map((url, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                const next = [...images];
                next[i] = e.target.value;
                setImages(next);
              }}
              className="input flex-1"
              placeholder="https://images.unsplash.com/photo-…"
            />
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => setImages(images.filter((_, j) => j !== i))}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input {...register("published")} type="checkbox" className="w-4 h-4 accent-brand-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">Published</p>
            <p className="text-xs text-gray-500">Visible to customers</p>
          </div>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input {...register("featured")} type="checkbox" className="w-4 h-4 accent-brand-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">Featured</p>
            <p className="text-xs text-gray-500">Show on homepage</p>
          </div>
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-3">
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : isEdit ? "Update Product" : "Create Product"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary px-6 py-3">
          Cancel
        </button>
      </div>
    </form>
  );
}
