import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

// instantiate the prisma client
const prisma = new PrismaClient();

export const completeCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { query } = req;
    console.log(query);
    const studentID = parseInt(query.id.toString());
    const courseID = parseInt(query.courseId.toString());
    const student = await prisma.student.findOne({
      where: {
        id: studentID,
      },
    });

    const course = await prisma.course.findOne({
      where: {
        id: courseID,
      },
    });

    const complete = await prisma.studentOnCourses.update({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId: course.id,
        },
      },
      data: {
        isCompleted: true,
      },
    });
    console.log(complete);
    res.status(200).json({
      success: true,
      data: complete,
      message: "course completed successfully",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error completing courses" });
  } finally {
    await prisma.$disconnect();
  }
};
