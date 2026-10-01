"use client";

import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow">
        <div className="mb-4 text-5xl">✓</div>

        <h1 className="mb-3 text-3xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mb-6 text-gray-600">
          Thank you for your order. Your order has been received.
        </p>

        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="mt-1 break-all font-mono font-semibold">
            {orderId}
          </p>
        </div>

        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
        >
          Continue Shopping
        </a>
      </div>
    </main>
  );
}