"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/admin/dashboard");
    else alert("Invalid Credentials");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-linear-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80">
        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="bg-purple-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}