"use client";

import BookingForm from "@/components/ui/BookingForm";
import ReviewSection from "@/components/ui/ReviewSection";
import ViewReview from "@/components/ui/ViewReview";
import { useCreateBookMutation } from "@/redux/api/bookingApi";
import { useServiceByIdQuery } from "@/redux/api/serviceApi";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const { data: packageData } = useServiceByIdQuery(id);
  const { data: userData } = useUserQuery(userId);
  const [createBook] = useCreateBookMutation();
  const userLoggedIn = isLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, userLoggedIn]);
  //   const router=useRouter()

  const defaultValue = {
    name: userData?.user?.name || "",
    phoneNumber: userData?.user?.phoneNumber || "",
    email: userData?.user?.email || "",
    packageName: packageData?.title || "",
    packagePrice: packageData?.price || "",
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
      <div>
        <h1 className="text-center text-4xl font-bold my-4">Review</h1>
        <ReviewSection id={id} />
        <ViewReview reviewData={packageData?.reviews} />
      </div>
    </div>
  );
};

export default BookingPage;
