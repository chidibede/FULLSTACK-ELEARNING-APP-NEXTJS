import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const updateStudent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const { body } = req;
    const student = await prisma.student.update({
      where: {
        id: ID,
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      success: true,
      message: "Student updated succesfully",
      data: student,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error updating student" });
  } finally {
    await prisma.$disconnect();
  }
};
