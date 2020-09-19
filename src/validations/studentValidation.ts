import Joi from "joi";
import {
  RegisterStudentInterface,
  LoginStudentInterface,
} from "../interfaces/studentInterface";

export const RegisterStudentValidation = (data: RegisterStudentInterface) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    username: Joi.string().min(4).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

export const LoginStudentValidation = (data: LoginStudentInterface) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};
