"use client";

import BookingForm from "@/components/ui/BookingForm";
import { useCreateBookMutation } from "@/redux/api/bookingApi";
import { useServiceByIdQuery } from "@/redux/api/serviceApi";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

type IDProps = {
  params: any;
};
type FormValues = {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  packageName: string;
};

const BookingPage = ({ params }: IDProps) => {
  const { userId } = getUserInfo() as any;
  const id = params?.id;
  const { data: packageData, isLoading } = useServiceByIdQuery(id);
  const { data: userData } = useUserQuery(userId);
  const [createBook] = useCreateBookMutation();
  //   const router=useRouter()

  const defaultValue = {
    name: userData?.user?.name || "",
    phoneNumber: userData?.user?.phoneNumber || "",
    email: userData?.user?.email || "",
    packageName: packageData?.title || "",
  };
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const res = await createBook({ ...data }).unwrap();
    if (res?._id) {
      message.success("Booking successfully");
    } else {
      message.error("Already booking our connection");
    }
  };
  return (
    <div>
      <BookingForm
        onSubmit={onSubmit}
        userData={userData}
        packageData={packageData}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default BookingPage;
