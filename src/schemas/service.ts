import * as yup from "yup";

export const serviceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  speed: yup.string().required("Speed is required"),
});
