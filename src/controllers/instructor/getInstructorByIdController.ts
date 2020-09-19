import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const getInstructorById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());

    const instructor = await prisma.instructor.findOne({
      where: { id: ID },
      include: {
        courses: true,
      },
    });
    res.status(200).json({ success: true, data: instructor });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving instructors" });
  } finally {
    await prisma.$disconnect();
  }
};
