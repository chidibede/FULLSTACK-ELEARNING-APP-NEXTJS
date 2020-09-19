import { NextApiRequest, NextApiResponse } from "next";
import { createCourse } from "../../../src/controllers/course/createCourseController";
import { getCourse } from "../../../src/controllers/course/getCourseController";

export default async function instructor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getCourse(req, res);
  } else if (method === "POST") {
    await createCourse(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
