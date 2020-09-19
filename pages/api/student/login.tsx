import { NextApiRequest, NextApiResponse } from "next";
import { loginStudent } from "../../../src/controllers/student/loginStudentController";

export default async function loginStudentistrator(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    await loginStudent(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
