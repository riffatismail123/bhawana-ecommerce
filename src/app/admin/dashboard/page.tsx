"use client";

import { useState, useEffect } from "react";
import AdminForm from "@/components/AdminForm";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Admin form to add new product */}
      <AdminForm onSuccess={fetchProducts} />

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <img src={p.image} alt={p.name} className="h-40 w-full object-contain mb-2 rounded" />
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-gray-600">${p.price.toFixed(2)}</p>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-500 mt-2 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}