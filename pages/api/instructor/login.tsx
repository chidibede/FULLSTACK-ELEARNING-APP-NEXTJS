import { NextApiRequest, NextApiResponse } from "next";
import { loginInstructor } from "../../../src/controllers/instructor/loginInstructorController";

export default async function loginInstructoristrator(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    await loginInstructor(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
