import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  createdAt: Date;
};

export default async function Home() {
  // Fetch products from Neon DB using Prisma
  const products: Product[] = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-indigo-200 p-10">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Bhawana
        </h1>
        <p className="text-gray-600 text-lg">
          Discover Premium Fashion & Lifestyle Products
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/hero1.jpg"
              alt="Premium Fashion"
              width={500}
              height={300}
              className="object-contain w-full h-60"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/hero2.jpg"
              alt="Lifestyle Collection"
              width={500}
              height={300}
              className="object-contain w-full h-60"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/hero3.jpg"
              alt="Exclusive Collection"
              width={500}
              height={300}
              className="object-contain w-full h-60"
            />
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Latest Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}