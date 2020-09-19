import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { RegisterStudentInterface } from "../../interfaces/studentInterface";
import { RegisterStudentValidation } from "../../validations/studentValidation";
import { issueToken } from "../../authentication/issueToken";

// instantiate the prisma client
const prisma = new PrismaClient();

export const createStudent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: RegisterStudentInterface = req.body;
    const { error } = RegisterStudentValidation(body);
    const usernameMatch = await prisma.student.findOne({
      where: {
        username: body.username,
      },
    });
    const emailMatch = await prisma.student.findOne({
      where: {
        email: body.email,
      },
    });
    if (error) {
      res.status(401).json({ success: false, message: error.message });
    } else if (usernameMatch) {
      res
        .status(401)
        .json({ success: false, message: "Student Username already exists" });
    } else if (emailMatch) {
      res
        .status(401)
        .json({ success: false, message: "Student Email already exists" });
    } else {
      await bcrypt.hash(
        body.password,
        10,
        async (err: Error, hashedPassword: string) => {
          if (err) {
            console.log("Error hashing password");
          } else {
            const student = await prisma.student.create({
              data: {
                email: body.email,
                username: body.username,
                password: hashedPassword,
                name: body.name,
              },
            });
            const data = {
              id: student.id,
              username: student.username,
              email: student.email,
            };
            const jwt: string = await issueToken(data);

            res.status(200).json({ success: true, data: data, token: jwt });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating students" });
  } finally {
    await prisma.$disconnect();
  }
};
