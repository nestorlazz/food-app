"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [customerEmail, setCustomerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: customerEmail,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    if (data.role === "SUPER_ADMIN") {
      router.push("/super-admin");
    } else {
      router.push("/");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="mb-2 text-3xl font-bold">
            Login
          </h1>

          <p className="mb-8 text-gray-600">
            Sign in to continue.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              value={customerEmail}
              onChange={(event) =>
                setCustomerEmail(event.target.value)
              }
              required
              className="mb-6 w-full rounded-lg border p-3"
              placeholder="Enter your email"
            />

            <label className="mb-2 block font-semibold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="mb-6 w-full rounded-lg border p-3"
              placeholder="Enter your password"
            />

            {error && (
              <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}