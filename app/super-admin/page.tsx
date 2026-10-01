import { prisma } from "../../lib/prisma";
import AddToCartButton from ".././components/AddToCartButton";

export default async function Home() {
  const foods = await prisma.food.findMany({
    where: {
      isAvailable: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-4xl font-bold">Food Hub</h1>
    <p className="mt-2 text-gray-600">Choose your food</p>
  </div>

  <a
    href="/cart"
    className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
  >
    🛒 Cart
  </a>
</div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <div
              key={food.id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <h2 className="text-xl font-semibold">
                {food.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {food.description}
              </p>

              <p className="mt-4 text-lg font-bold">
                ₹{food.price.toString()}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {food.category}
              </p>

              <AddToCartButton foodId={food.id} />
              
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}