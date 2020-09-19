import { NextApiRequest, NextApiResponse } from "next";
import { createAdmin } from "../../../src/controllers/admin/createAdminController";
import { getAdmin } from "../../../src/controllers/admin/getAdminController";

export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    await getAdmin(req, res);
  } else if (method === "POST") {
    await createAdmin(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
