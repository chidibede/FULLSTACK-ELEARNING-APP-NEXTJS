import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: true,
      },
    });
    res.status(200).json({ success: true, data: courses });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving courses" });
  } finally {
    await prisma.$disconnect();
  }
};
