"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { usePublishReviewQuery } from "@/redux/api/userReviewApi";
import { Divider } from "antd";
import quoteImg from "@/assets/quote.png";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0",
    className: "center",
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data } = usePublishReviewQuery(undefined);

  return (
    <div className="max-w-[1200px] overflow-hidden mx-auto px-7 lg:px-0 mt-14 md:mt-16 lg:mt-24 mb-20">
      <h1 className="text-4xl text-center font-bold my-10 mb-20 primary-text">
        Client Reviews
      </h1>
      <Slider {...settings}>
        {data?.map((review: any) => (
          <>
            <div>
              <div className="p-3 ">
                <div>
                  <Image
                    src={quoteImg}
                    width={100}
                    height={100}
                    alt="Quote image"
                  />
                </div>
                <p style={{ margin: "2rem 0" }}>{review?.text}</p>
                <Divider orientation="right">
                  <p className="font-bold primary-text">{review?.name}</p>
                </Divider>
              </div>
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
