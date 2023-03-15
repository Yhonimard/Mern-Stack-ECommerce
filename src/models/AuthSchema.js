import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const SignupSchema = () => {
  const schema = yup.object({
    username: yup
      .string()
      .min(4, "usernmae should be more than 6")
      .required("username is required"),
    age: yup
      .number("age must be a number")
      .min(15, "Age must be older than 15y")
      .max(70, "Age must be younger than 70y")
      .positive("name should be positive")

      .integer("age cant be filled with a comma")
      .required("age is required"),
    email: yup.string().email().required("email is required"),
    address: yup
      .string()
      .min(5, "addres should be more than 5 letters")
      .required("address is required"),
    password: yup.string().min(6).max(20).required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "password should be same")
      .min(6)
      .max(20)
      .required("you should confirm password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return {
    register,
    handleSubmit,
    errors,
  };
};

export const LoginSchema = () => {
  const schema = yup.object({
    email: yup
      .string()
      .email("it should be email")
      .required("email is required"),
    password: yup
      .string()
      .min(6, "min password is 6")
      .max(20, "max password is 20")
      .required("passowrd is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return {
    register,
    handleSubmit,
    errors,
  };
};
