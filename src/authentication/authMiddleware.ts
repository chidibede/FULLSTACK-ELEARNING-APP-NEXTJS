import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const secret = process.env.SECRET || env.SECRET;
export const authMiddleware = (apiRoute: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  jwt.verify(req.cookies.authorization!, secret, async (error, decoded) => {
    if (!error && decoded) {
      return await apiRoute(req, res);
    }
    res
      .status(403)
      .json({ success: false, message: "You are not authenticated" });
  });
};
