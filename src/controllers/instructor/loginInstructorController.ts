import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { LoginInstructorInterface } from "../../interfaces/instructorInterface";
import { LoginInstructorValidation } from "../../validations/instructorValidation";
import { issueToken } from "../../authentication/issueToken";
import cookie from "cookie";

// instantiate the prisma client
const prisma = new PrismaClient();

export const loginInstructor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: LoginInstructorInterface = req.body;
    const { error } = LoginInstructorValidation(body);
    const instructorMatch = await prisma.instructor.findOne({
      where: {
        username: body.username,
      },
    });

    if (error) {
      res.status(401).json({ success: false, message: error.message });
    } else if (!instructorMatch) {
      res
        .status(403)
        .json({ success: false, message: "Invalid username or password" });
    } else {
      const validInstructor = await bcrypt.compare(
        body.password,
        instructorMatch.password
      );

      if (validInstructor) {
        const instructor = await prisma.instructor.findOne({
          where: {
            username: body.username,
          },
        });
        const data = {
          id: instructor.id,
          username: instructor.username,
          email: instructor.email,
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
    res
      .status(500)
      .json({ success: false, message: "Error logging instructors" });
  } finally {
    await prisma.$disconnect();
  }
};
