import AvilableService from "@/components/ui/AvilableService";
import Banner from "@/components/ui/Banner";
import BgDown from "@/components/ui/BgDown/BgDown";
import ExperianceSection from "@/components/ui/ExperianceSection";
import FaqSection from "@/components/ui/Faq";
import OurPromise from "@/components/ui/OurPromise";
import Testimonial from "@/components/ui/Testimonial";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <OurPromise />
      <ExperianceSection />
      <BgDown />
      <AvilableService />
      <Testimonial />
      <FaqSection />
    </div>
  );
};

export default HomePage;
