import Joi from "joi";
import {
  RegisterAdminInterface,
  LoginAdminInterface,
} from "../interfaces/adminInterface";

export const RegisterAdminValidation = (data: RegisterAdminInterface) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    username: Joi.string().min(4).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

export const LoginAdminValidation = (data: LoginAdminInterface) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};
