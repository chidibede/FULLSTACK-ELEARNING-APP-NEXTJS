import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { RegisterAdminInterface } from "../../interfaces/adminInterface";
import { RegisterAdminValidation } from "../../validations/adminValidation";
import { issueToken } from "../../authentication/issueToken";

// instantiate the prisma client
const prisma = new PrismaClient();

export const createAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: RegisterAdminInterface = req.body;
    const { error } = RegisterAdminValidation(body);
    const usernameMatch = await prisma.admin.findOne({
      where: {
        username: body.username,
      },
    });
    const emailMatch = await prisma.admin.findOne({
      where: {
        email: body.email,
      },
    });
    if (error) {
      res.status(401).json({ success: false, message: error.message });
    } else if (usernameMatch) {
      res
        .status(401)
        .json({ success: false, message: "Admin Username already exists" });
    } else if (emailMatch) {
      res
        .status(401)
        .json({ success: false, message: "Admin Email already exists" });
    } else {
      await bcrypt.hash(
        body.password,
        10,
        async (err: Error, hashedPassword: string) => {
          if (err) {
            console.log("Error hashing password");
          } else {
            const admin = await prisma.admin.create({
              data: {
                email: body.email,
                username: body.username,
                password: hashedPassword,
                name: body.name,
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
    res.status(500).json({ success: false, message: "Error creating admins" });
  } finally {
    await prisma.$disconnect();
  }
};
