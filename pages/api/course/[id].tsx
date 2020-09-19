import { NextApiRequest, NextApiResponse } from "next";
import { deleteCourse } from "../../../src/controllers/course/deleteCourse";
import { getCourseById } from "../../../src/controllers/course/getCourseByIdController";
import { updateCourse } from "../../../src/controllers/course/updateCourse";

export default async function course(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getCourseById(req, res);
  } else if (method === "PUT") {
    await updateCourse(req, res);
  } else if (method === "DELETE") {
    await deleteCourse(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
