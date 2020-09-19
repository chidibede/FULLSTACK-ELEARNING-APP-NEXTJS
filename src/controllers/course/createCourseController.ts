import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { CreateCourseInterface } from "../../interfaces/courseInterface";

// instantiate the prisma client
const prisma = new PrismaClient();

export const createCourse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: CreateCourseInterface = req.body;
    const course = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        imgUrl: body.imgUrl,
        instructor: {
          connect: { id: body.instructorId },
        },
      },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Course created successfully",
        data: course,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error creating course" });
  } finally {
    await prisma.$disconnect();
  }
};
