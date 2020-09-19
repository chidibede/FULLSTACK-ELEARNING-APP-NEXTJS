import { NextApiRequest, NextApiResponse } from "next";
import { createLesson } from "../../../src/controllers/lesson/createLessonController";
import { getLesson } from "../../../src/controllers/lesson/getLessonController";

export default async function instructor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getLesson(req, res);
  } else if (method === "POST") {
    await createLesson(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
