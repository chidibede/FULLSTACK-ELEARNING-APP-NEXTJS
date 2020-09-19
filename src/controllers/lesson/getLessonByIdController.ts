import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getLessonById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const lesson = await prisma.lesson.findOne({
      where: {
        id: ID,
      },
      include: {
        course: true,
      },
    });
    res.status(200).json({ success: true, data: lesson });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving lesson" });
  } finally {
    await prisma.$disconnect();
  }
};
