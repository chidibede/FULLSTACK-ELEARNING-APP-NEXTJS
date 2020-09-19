import { NextApiRequest, NextApiResponse } from "next";
import { loginAdmin } from "../../../src/controllers/admin/loginAdminController";

export default async function loginAdministrator(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    await loginAdmin(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
