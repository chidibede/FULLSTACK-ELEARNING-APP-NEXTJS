import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const updateLesson = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const { body } = req;
    const lesson = await prisma.lesson.update({
      where: {
        id: ID,
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      success: true,
      data: lesson,
      message: "lesson updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error updating lesson" });
  } finally {
    await prisma.$disconnect();
  }
};
