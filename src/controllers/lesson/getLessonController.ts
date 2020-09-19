import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getLesson = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        course: true,
      },
    });
    res.status(200).json({ success: true, data: lessons });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving lessons" });
  } finally {
    await prisma.$disconnect();
  }
};
