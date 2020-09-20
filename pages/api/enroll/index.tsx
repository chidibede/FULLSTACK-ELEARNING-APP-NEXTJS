import { NextApiRequest, NextApiResponse } from "next";
import { enrollCourse } from "../../../src/controllers/enroll/enrollController";
import { getEnrolledCourses } from "../../../src/controllers/enroll/getEnrolledCourses";

export default async function instructor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getEnrolledCourses(req, res);
  } else if (method === "POST") {
    await enrollCourse(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
