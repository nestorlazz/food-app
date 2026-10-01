"use client";

type AddToCartButtonProps = {
  foodId: number;
};

export default function AddToCartButton({
  foodId,
}: AddToCartButtonProps) {
  async function handleAddToCart() {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: "test-user",
        foodId: foodId,
        quantity: 1,
      }),
    });

    const cart = await response.json();

    console.log("Cart:", cart);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
}