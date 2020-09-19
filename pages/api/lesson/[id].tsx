import { NextApiRequest, NextApiResponse } from "next";
import { deleteLesson } from "../../../src/controllers/lesson/deleteLesson";
import { getLessonById } from "../../../src/controllers/lesson/getLessonByIdController";
import { updateLesson } from "../../../src/controllers/lesson/updateLesson";

export default async function lesson(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getLessonById(req, res);
  } else if (method === "PUT") {
    await updateLesson(req, res);
  } else if (method === "DELETE") {
    await deleteLesson(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
