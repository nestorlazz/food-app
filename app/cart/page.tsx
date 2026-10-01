import { getCart } from "../../lib/cart";
import { prisma } from "../../lib/prisma";
import CartItemControls from "../components/CartItemControls";

export default async function CartPage() {
  const cart = await getCart("test-user");

  const foodIds = cart.map((item) => item.foodId);

  const foods = await prisma.food.findMany({
    where: {
      id: {
        in: foodIds,
      },
    },
  });

  const cartItems = cart.map((item) => {
    const food = foods.find((food) => food.id === item.foodId);

    return {
      ...item,
      food,
    };
  });

  const subtotal = cartItems.reduce((total, item) => {
    if (!item.food) {
      return total;
    }

    return total + Number(item.food.price) * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.foodId}
                  className="flex items-center justify-between rounded-xl bg-white p-6 shadow"
                >
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.food?.name}
                    </h2>

                    <p className="text-gray-600">
                      ₹{item.food?.price.toString()} × {item.quantity}
                    </p>

                    <CartItemControls
                        foodId={item.foodId}
                        quantity={item.quantity}
                    />
                  </div>

                  <p className="text-lg font-bold">
                    ₹
                    {item.food
                      ? Number(item.food.price) * item.quantity
                      : 0}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-white p-6 shadow">
              <div className="flex justify-between text-xl font-bold">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <a
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-black px-4 py-3 text-center font-semibold text-white hover:bg-gray-800"
              >
                Proceed to Checkout
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}