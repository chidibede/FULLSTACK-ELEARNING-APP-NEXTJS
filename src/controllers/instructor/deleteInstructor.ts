import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const deleteInstructor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const ID = parseInt(id.toString());
    const student = await prisma.student.delete({ where: { id: ID } });
    res.status(200).json({
      success: true,
      message: "Student deleted succesfully",
      data: student,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving students" });
  } finally {
    await prisma.$disconnect();
  }
};
