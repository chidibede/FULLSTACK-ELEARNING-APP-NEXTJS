import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { CreateLessonInterface } from "../../interfaces/lessonInterface";

// instantiate the prisma client
const prisma = new PrismaClient();

export const createLesson = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: CreateLessonInterface = req.body;
    const lesson = await prisma.lesson.create({
      data: {
        number: body.number,
        title: body.title,
        content: body.content,
        contentUrl: body.contentUrl,
        course: {
          connect: { id: body.courseId },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "lesson created successfully",
      data: lesson,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error creating lesson" });
  } finally {
    await prisma.$disconnect();
  }
};
