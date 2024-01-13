import ExperianceImg from "@/assets/Online-bro.png";
import Image from "next/image";
import ButtonMain from "./Button";

const ExperianceSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto min-h-[600px] relative overflow-hidden px-5 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center py-6 mx-auto sm:py-12 lg:py-[100px] lg:flex-row lg:justify-between">
        <div className="mb-5 md:mb-0">
          <Image src={ExperianceImg} width={380} alt="login image" />
        </div>

        <div>
          <h1 className="text-3xl mb-4">
            Reliable, Safe, Fast High speed broadband internet connection from
            Interspace Services Ltd.
          </h1>
          <div>
            <p className="text-base">
              Interspace changes your lifestyle and letting you focus on the
              growth of your business by providing superfast broadband internet
              service.
            </p>
            <div className="flex justify-center md:justify-start">
              <ButtonMain>Experiance Now</ButtonMain>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperianceSection;
