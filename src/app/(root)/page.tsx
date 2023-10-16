import AvilableService from "@/components/ui/AvilableService";
import Banner from "@/components/ui/Banner";
import ExperianceSection from "@/components/ui/ExperianceSection";
import Footer from "@/components/ui/Footer";
import OurPromise from "@/components/ui/OurPromise";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <OurPromise />
      <ExperianceSection />
      <AvilableService />
      <Footer />
    </div>
  );
};

export default HomePage;
