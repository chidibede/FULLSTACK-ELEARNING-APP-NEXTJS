import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const updateAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const { body } = req;
    const admin = await prisma.admin.update({
      where: {
        id: ID,
      },
      data: {
        ...body,
      },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Admin updated succesfully",
        data: admin,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error updating admin" });
  } finally {
    await prisma.$disconnect();
  }
};
