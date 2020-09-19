import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const deleteLesson = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const lesson = await prisma.lesson.delete({
      where: {
        id: ID,
      },
    });
    res.status(200).json({
      success: true,
      data: lesson,
      message: "lesson deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving lessons" });
  } finally {
    await prisma.$disconnect();
  }
};
