import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getCourseById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const courses = await prisma.course.findOne({
      where: {
        id: ID,
      },
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
