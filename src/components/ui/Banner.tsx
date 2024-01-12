import BannerImg from "@/assets/banner.png";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="max-w-[1200px] mx-auto min-h-[600px] relative overflow-hidden">
      <div className="flex flex-col-reverse justify-center py-6 mx-auto sm:py-12 lg:py-[100px] lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center py-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leadi sm:text-6xl">
            Interspace Services Ltd.
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Best internet service provider in Bangladesh which provides fully
            dedicated, super fast, cost-effective, secured internet connection.
            We’re promised to meeting your needs and delivering industry-leading
            customer service.
          </p>
          <div className="flex md:px-0 px-10  flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link
              href="/packages"
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-[#00674A] rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#124436] rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-[#124436] rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Get Started Now
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center py-6 px-5 md:px-0 mt-8 lg:mt-0 ">
          <Image
            src={BannerImg}
            alt="global map"
            height={500}
            width={500}
            className="object-contain "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
