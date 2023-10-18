import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  name: yup.string().required("First name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.string().required("address is required"),
  packageName: yup.string().required("package name is required"),
});
