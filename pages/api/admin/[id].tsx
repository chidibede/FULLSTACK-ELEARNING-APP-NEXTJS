import { NextApiRequest, NextApiResponse } from "next";
import { deleteAdmin } from "../../../src/controllers/admin/deleteAdmin";
import { getAdminById } from "../../../src/controllers/admin/getAdminByIdController";
import { updateAdmin } from "../../../src/controllers/admin/updateAdmin";

export default async function admin(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === "GET") {
    await getAdminById(req, res);
  } else if (method === "PUT") {
    await updateAdmin(req, res);
  } else if (method === "DELETE") {
    await deleteAdmin(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
