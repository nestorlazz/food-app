import { clearCart, getCart } from "../../../lib/cart";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const { cartId, customerName, customerEmail } = body;

  if (!customerName || !customerEmail) {
    return Response.json(
      { error: "Customer name and email are required" },
      { status: 400 }
    );
  }

  const cart = await getCart(cartId);

  if (cart.length === 0) {
    return Response.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }

  const foodIds = cart.map((item) => item.foodId);

  const foods = await prisma.food.findMany({
    where: {
      id: {
        in: foodIds,
      },
      isAvailable: true,
    },
  });

  if (foods.length !== cart.length) {
    return Response.json(
      { error: "One or more food items are unavailable" },
      { status: 400 }
    );
  }

  const subtotal = cart.reduce((total, item) => {
    const food = foods.find((food) => food.id === item.foodId);

    if (!food) {
      return total;
    }

    return total + Number(food.price) * item.quantity;
  }, 0);

  const tax = 0;
  const totalAmount = subtotal + tax;

  const restaurantId = foods[0].restaurantId;

  const order = await prisma.order.create({
    data: {
      customerName,
      customerEmail,
      subtotal,
      tax,
      totalAmount,
      restaurantId,

      items: {
        create: cart.map((item) => {
          const food = foods.find(
            (food) => food.id === item.foodId
          );

          return {
            foodId: item.foodId,
            quantity: item.quantity,
            price: food!.price,
          };
        }),
      },
    },

    include: {
      items: true,
    },
  });
  
  await clearCart(cartId);

  return Response.json({
    message: "Order created successfully",
    orderId: order.id,
    subtotal,
    tax,
    totalAmount,
    items: order.items,
  });
}