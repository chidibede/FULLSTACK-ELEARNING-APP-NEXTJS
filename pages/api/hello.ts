import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function greet(req: NextApiRequest, res: NextApiResponse) {
  const admin = await prisma.admin.findMany();
  res.json({ success: true, data: admin });
}
