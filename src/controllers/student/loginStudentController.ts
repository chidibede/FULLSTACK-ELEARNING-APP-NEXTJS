import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { LoginStudentInterface } from "../../interfaces/studentInterface";
import { LoginStudentValidation } from "../../validations/studentValidation";
import { issueToken } from "../../authentication/issueToken";
import cookie from "cookie";

// instantiate the prisma client
const prisma = new PrismaClient();

export const loginStudent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: LoginStudentInterface = req.body;
    const { error } = LoginStudentValidation(body);
    const studentMatch = await prisma.student.findOne({
      where: {
        username: body.username,
      },
    });

    if (error) {
      res.status(401).json({ success: false, message: error.message });
    } else if (!studentMatch) {
      res
        .status(403)
        .json({ success: false, message: "Invalid username or password" });
    } else {
      const validStudent = await bcrypt.compare(
        body.password,
        studentMatch.password
      );

      if (validStudent) {
        const student = await prisma.student.findOne({
          where: {
            username: body.username,
          },
        });
        const data = {
          id: student.id,
          username: student.username,
          email: student.email,
        };
        const jwt: string = await issueToken(data);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("authorization", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSize: "strict",
            path: "/",
            maxAge: 4200,
          })
        );

        res.status(200).json({ success: true, data: data, token: jwt });
      } else {
        res
          .status(403)
          .json({ success: false, message: "Invalide username or password" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error logging students" });
  } finally {
    await prisma.$disconnect();
  }
};
