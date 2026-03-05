"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-linear-to-r from-purple-600 to-pink-500 p-4 text-white shadow-lg flex justify-between">
      <Link href="/" className="text-2xl font-bold">
        Bhawana
      </Link>
      <div className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/admin/login">Admin</Link>
      </div>
    </nav>
  );
}