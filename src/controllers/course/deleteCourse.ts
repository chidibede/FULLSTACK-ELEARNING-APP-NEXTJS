import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const deleteCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const course = await prisma.course.delete({
      where: {
        id: ID,
      },
    });
    res.status(200).json({
      success: true,
      data: course,
      message: "course deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving courses" });
  } finally {
    await prisma.$disconnect();
  }
};
