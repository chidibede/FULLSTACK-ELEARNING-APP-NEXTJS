import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const admins = await prisma.admin.findMany({});
    res.status(200).json({ success: true, data: admins });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving admins" });
  } finally {
    await prisma.$disconnect();
  }
};
