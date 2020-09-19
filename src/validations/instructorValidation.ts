import Joi from "joi";
import {
  RegisterInstructorInterface,
  LoginInstructorInterface,
} from "../interfaces/instructorInterface";

export const RegisterInstructorValidation = (
  data: RegisterInstructorInterface
) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    username: Joi.string().min(4).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

export const LoginInstructorValidation = (data: LoginInstructorInterface) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};
