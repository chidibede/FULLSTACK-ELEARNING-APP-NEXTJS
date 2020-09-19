import { NextApiRequest, NextApiResponse } from "next";
import { createInstructor } from "../../../src/controllers/instructor/createInstructorController";
import { getInstructor } from "../../../src/controllers/instructor/getInstructorController";

export default async function instructor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getInstructor(req, res);
  } else if (method === "POST") {
    await createInstructor(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
