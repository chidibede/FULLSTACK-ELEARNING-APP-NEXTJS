import { NextApiRequest, NextApiResponse } from "next";
import { deleteInstructor } from "../../../src/controllers/instructor/deleteInstructor";
import { getInstructorById } from "../../../src/controllers/instructor/getInstructorByIdController";
import { updateInstructor } from "../../../src/controllers/instructor/updateInstructor";

export default async function instructor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    await getInstructorById(req, res);
  } else if (method === "PUT") {
    await updateInstructor(req, res);
  } else if (method === "DELETE") {
    await deleteInstructor(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
