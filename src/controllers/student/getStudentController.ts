import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const students = await prisma.student.findMany({});
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving students" });
  } finally {
    await prisma.$disconnect();
  }
};
