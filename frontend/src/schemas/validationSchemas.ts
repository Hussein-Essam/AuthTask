import * as Yup from "yup";

const emailValidation = Yup.string()
  .email("Invalid email format")
  .required("Email is required");

const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Za-z]/, "Password must contain at least one letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
  .required("Password is required");

export const signInValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: emailValidation,
  password: passwordValidation,
});
