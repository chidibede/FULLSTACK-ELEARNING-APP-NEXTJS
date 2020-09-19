import { NextApiRequest, NextApiResponse } from "next";
import { deleteStudent } from "../../../src/controllers/student/deleteStudent";
import { getStudentById } from "../../../src/controllers/student/getStudentByIdController";
import { updateStudent } from "../../../src/controllers/student/updateStudent";

export default async function student(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getStudentById(req, res);
  } else if (method === "PUT") {
    await updateStudent(req, res);
  } else if (method === "DELETE") {
    await deleteStudent(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
