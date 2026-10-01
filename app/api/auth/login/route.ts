import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  if (!email || !password) {
    return Response.json(
      { error: "Email and Password are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return Response.json({
    message: "User found",
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}