"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: "test-user",
        customerName,
        customerEmail,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push(`/order-success?orderId=${data.orderId}`);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-4xl font-bold">Checkout</h1>

        <p className="mb-8 text-gray-600">
          Enter your details to place your order.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow"
        >
          <label className="mb-2 block font-semibold">
            Name
          </label>

          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            required
            className="mb-6 w-full rounded-lg border p-3"
            placeholder="Enter your name"
          />

          <label className="mb-2 block font-semibold">
            Email
          </label>

          <input
            type="email"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            required
            className="mb-6 w-full rounded-lg border p-3"
            placeholder="Enter your email"
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
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </main>
  );
}