import jwt from "jsonwebtoken";
import { env } from "../config/env";
const secret: string | undefined = process.env.SECRET || env.SECRET;

export const issueToken = async (userData: {
  username?: string;
  email?: string;
  id?: number;
}) => {
  let token = await jwt.sign(userData, secret, { expiresIn: 120 });
  return token;
};
