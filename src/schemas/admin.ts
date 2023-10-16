import * as yup from "yup";

export const adminSchema = yup.object().shape({
  name: yup.string().required("First name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup.string().min(6).max(32).required("password is required"),
});
