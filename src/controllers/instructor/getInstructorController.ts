import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getInstructor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const instructors = await prisma.instructor.findMany({});
    res.status(200).json({ success: true, data: instructors });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving instructors" });
  } finally {
    await prisma.$disconnect();
  }
};
