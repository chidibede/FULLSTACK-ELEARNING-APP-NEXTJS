import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getEnrolledCourses = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const enrolled = await prisma.studentOnCourses.findMany({
      include: {
        student: true,
        course: true,
      },
    });
    res.status(200).json({ success: true, data: enrolled });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving courses" });
  } finally {
    await prisma.$disconnect();
  }
};
