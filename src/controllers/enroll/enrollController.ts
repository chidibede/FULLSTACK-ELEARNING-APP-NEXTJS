import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { EnrollInterface } from "../../interfaces/enrollInterface";

// instantiate the prisma client
const prisma = new PrismaClient();

export const enrollCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: EnrollInterface = req.body;
    const enroll = await prisma.studentOnCourses.create({
      data: {
        student: { connect: { id: body.studentId } },
        course: { connect: { id: body.courseId } },
      },
    });
    res.status(200).json({
      success: true,
      message: "Course enrolled successfully",
      data: enroll,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error enrolling in course" });
  } finally {
    await prisma.$disconnect();
  }
};
