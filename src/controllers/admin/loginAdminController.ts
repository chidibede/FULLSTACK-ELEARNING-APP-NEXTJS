import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { LoginAdminInterface } from "../../interfaces/adminInterface";
import { LoginAdminValidation } from "../../validations/adminValidation";
import { issueToken } from "../../authentication/issueToken";

// instantiate the prisma client
const prisma = new PrismaClient();

export const loginAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: LoginAdminInterface = req.body;
    const { error } = LoginAdminValidation(body);
    const adminMatch = await prisma.admin.findOne({
      where: {
        username: body.username,
      },
    });

    if (error) {
      res.status(401).json({ success: false, message: error.message });
    } else if (!adminMatch) {
      res
        .status(403)
        .json({ success: false, message: "Invalid username or password" });
    } else {
      await bcrypt.compare(
        body.password,
        adminMatch.password,
        async (err: Error, result) => {
          if (err) {
            res.status(403).json({
              success: false,
              message: "Invalid username or password",
            });
          } else if (result) {
            const admin = await prisma.admin.findOne({
              where: {
                username: body.username,
              },
            });
            const data = {
              id: admin.id,
              username: admin.username,
              email: admin.email,
            };
            const jwt: string = await issueToken(data);

            res.status(200).json({ success: true, data: data, token: jwt });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error logging admins" });
  } finally {
    await prisma.$disconnect();
  }
};
