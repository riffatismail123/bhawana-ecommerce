export default function ProductCard({ product }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <img src={product.image} alt="={product.image}" className="h-48 w-full object-contain" />
      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-pink-600 font-bold">Rs {product.price}</p>
    </div>
  );
}