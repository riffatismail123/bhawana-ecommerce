"use client";
import { useState, useRef } from "react";

type Props = {
  onSuccess?: () => void;
};

export default function AdminForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // ✅ Form ref

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      // Reset form using ref
      formRef.current.reset();

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef} // ✅ attach ref
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-4 mb-8"
    >
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter product name"
          required
          className="border p-2 w-full"
        />
      </div>

      {/* Product Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">
          Price
        </label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="Enter price"
          required
          className="border p-2 w-full"
        />
      </div>

      {/* Product Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Product Image
        </label>
        <input
          id="image"
          type="file"
          name="image"
          required
          className="w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}