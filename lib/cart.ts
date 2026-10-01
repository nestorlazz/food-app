import { redis } from "./redis";

export type CartItem = {
  foodId: number;
  quantity: number;
};

export async function getCart(cartId: string): Promise<CartItem[]> {
  const cart = await redis.get<CartItem[]>(`cart:${cartId}`);

  return cart ?? [];
}

export async function addToCart(
  cartId: string,
  foodId: number,
  quantity: number
): Promise<CartItem[]> {
  const cart = await getCart(cartId);

  const existingItem = cart.find((item) => item.foodId === foodId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      foodId,
      quantity,
    });
  }

  await redis.set(`cart:${cartId}`, cart);

  return cart;
}

export async function removeFromCart(
  cartId: string,
  foodId: number
): Promise<CartItem[]> {
  const cart = await getCart(cartId);

  const updatedCart = cart.filter((item) => item.foodId !== foodId);

  await redis.set(`cart:${cartId}`, updatedCart);

  return updatedCart;
}

export async function updateCartItem(
  cartId: string,
  foodId: number,
  quantity: number
): Promise<CartItem[]> {
  const cart = await getCart(cartId);

  const item = cart.find((item) => item.foodId === foodId);

  if (!item) {
    return cart;
  }

  if (quantity <= 0) {
    return removeFromCart(cartId, foodId);
  }

  item.quantity = quantity;

  await redis.set(`cart:${cartId}`, cart);

  return cart;
}

export async function clearCart(cartId: string): Promise<void> {
  await redis.del(`cart:${cartId}`);
}