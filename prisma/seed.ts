import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Food Hub",
      rating: 4.5,
      isOpen: true,

      food: {
        create: [
          {
            name: "Chicken Burger",
            description: "Grilled chicken burger with fresh vegetables",
            price: 180,
            category: "Burgers",
            isAvailable: true,
          },
          {
            name: "Chicken Biryani",
            description: "Aromatic basmati rice with chicken",
            price: 220,
            category: "Main Course",
            isAvailable: true,
          },
          {
            name: "French Fries",
            description: "Crispy golden French fries",
            price: 100,
            category: "Sides",
            isAvailable: true,
          },
          {
            name: "Chicken Pizza",
            description: "Chicken pizza with cheese and vegetables",
            price: 250,
            category: "Pizza",
            isAvailable: true,
          },
        ],
      },
    },
    include: {
      food: true,
    },
  });

  console.log("Restaurant created:", restaurant.name);
  console.log("Food items created:", restaurant.food.length);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });