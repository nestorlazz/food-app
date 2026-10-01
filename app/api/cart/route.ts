import { addToCart, getCart, updateCartItem, removeFromCart } from "../../../lib/cart";

export async function POST(request: Request) {
  const body = await request.json();

  const { cartId, foodId, quantity } = body;

  const cart = await addToCart(cartId, foodId, quantity);

  return Response.json(cart);
}

export async function GET() {
  const cart = await getCart("test-user");

  return Response.json(cart);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { cartId, foodId, quantity } = body;

  const cart = await updateCartItem(cartId, foodId, quantity);

  return Response.json(cart);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  const { cartId, foodId } = body;

  const cart = await removeFromCart(cartId, foodId);

  return Response.json(cart);
}