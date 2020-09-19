import { NextApiRequest, NextApiResponse } from "next";
import { createStudent } from "../../../src/controllers/student/createStudentController";
import { getStudent } from "../../../src/controllers/student/getStudentController";

export default async function student(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getStudent(req, res);
  } else if (method === "POST") {
    await createStudent(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
