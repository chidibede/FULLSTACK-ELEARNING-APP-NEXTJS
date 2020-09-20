import { NextApiRequest, NextApiResponse } from "next";
import { completeCourse } from "../../../src/controllers/enroll/completeCourse";

export default async function course(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "PUT") {
    await completeCourse(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
