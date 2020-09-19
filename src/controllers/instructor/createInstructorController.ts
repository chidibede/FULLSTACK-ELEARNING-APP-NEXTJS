import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { RegisterInstructorInterface } from "../../interfaces/instructorInterface";
import { RegisterInstructorValidation } from "../../validations/instructorValidation";
import { issueToken } from "../../authentication/issueToken";

// instantiate the prisma client
const prisma = new PrismaClient();

export const createInstructor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body: RegisterInstructorInterface = req.body;
    const { error } = RegisterInstructorValidation(body);
    const usernameMatch = await prisma.instructor.findOne({
      where: {
        username: body.username,
      },
    });
    const emailMatch = await prisma.instructor.findOne({
      where: {
        email: body.email,
      },
    });
    if (error) {
      res.status(401).json({ success: false, message: error.message });
    } else if (usernameMatch) {
      res
        .status(401)
        .json({
          success: false,
          message: "Instructor Username already exists",
        });
    } else if (emailMatch) {
      res
        .status(401)
        .json({ success: false, message: "Instructor Email already exists" });
    } else {
      await bcrypt.hash(
        body.password,
        10,
        async (err: Error, hashedPassword: string) => {
          if (err) {
            console.log("Error hashing password");
          } else {
            const instructor = await prisma.instructor.create({
              data: {
                email: body.email,
                username: body.username,
                password: hashedPassword,
                name: body.name,
              },
            });
            const data = {
              id: instructor.id,
              username: instructor.username,
              email: instructor.email,
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
      .json({ success: false, message: "Error creating instructors" });
  } finally {
    await prisma.$disconnect();
  }
};
