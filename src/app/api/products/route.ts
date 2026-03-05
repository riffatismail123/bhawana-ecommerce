import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: any) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const file = formData.get("image") as File;

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(uploadDir, file.name);

  fs.writeFileSync(filePath, buffer);

  const product = await prisma.product.create({
    data: {
      name,
      price,
      image: `/uploads/${file.name}`,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const product = await prisma.product.delete({ where: { id } });

  const filePath = path.join(process.cwd(), "public", product.image);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  return NextResponse.json({ success: true });
}