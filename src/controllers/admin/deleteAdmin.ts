import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const deleteAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const admin = await prisma.admin.delete({ where: { id: ID } });
    res
      .status(200)
      .json({
        success: true,
        message: "Admin deleted succesfully",
        data: admin,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving admins" });
  } finally {
    await prisma.$disconnect();
  }
};
