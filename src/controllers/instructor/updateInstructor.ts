import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const updateInstructor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const { body } = req;
    const instructor = await prisma.instructor.update({
      where: {
        id: ID,
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      success: true,
      message: "Instructor updated succesfully",
      data: instructor,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error updating instructor" });
  } finally {
    await prisma.$disconnect();
  }
};
