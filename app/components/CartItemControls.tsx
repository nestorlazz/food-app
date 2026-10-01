"use client";

type CartItemControlsProps = {
  foodId: number;
  quantity: number;
};

export default function CartItemControls({
  foodId,
  quantity,
}: CartItemControlsProps) {
  async function updateQuantity(newQuantity: number) {
    const response = await fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: "test-user",
        foodId,
        quantity: newQuantity,
      }),
    });

    const cart = await response.json();

    console.log("Updated cart:", cart);

    window.location.reload();
  }

  async function removeItem() {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: "test-user",
        foodId,
      }),
    });

    const cart = await response.json();

    console.log("Cart after removal:", cart);

    window.location.reload();
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={() => updateQuantity(quantity - 1)}
        className="rounded bg-gray-200 px-3 py-1 text-black"
      >
        −
      </button>

      <span className="font-semibold">{quantity}</span>

      <button
        onClick={() => updateQuantity(quantity + 1)}
        className="rounded bg-gray-200 px-3 py-1 text-black"
      >
        +
      </button>

      <button
        onClick={removeItem}
        className="rounded bg-red-600 px-3 py-1 text-white"
      >
        Remove
      </button>
    </div>
  );
}