import homeInternetImg from "@/assets/home-internet-icon.png";
import corporateInternetImg from "@/assets/corporate-internet-icon.png";
import dataConnectivityImg from "@/assets/data-connectivity-icon.png";
import PromiseCard from "../card/PromiseCard";

const OurPromise = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  bg-white py-20 px-3 rounded-2xl shadow-xl">
          <PromiseCard
            img={homeInternetImg}
            title={"Home Internet"}
            text1={"Bufferless Steaming"}
            text2={"Lag Free Gaming"}
            text3={"Real IP Included"}
            text4={"Stable Connection With No Interruptions"}
          />

          <PromiseCard
            img={corporateInternetImg}
            title={"Corporate Internet"}
            text1={"Dedicated Network"}
            text2={"Business-friendly SLAs"}
            text3={"24×7 Support"}
            text4={"Flexible & Scalable internet Bandwidth"}
          />

          <PromiseCard
            img={dataConnectivityImg}
            title={"Data Connectivity"}
            text1={"Optimal Performance"}
            text2={"World Class Reliability"}
            text3={"Optical Fiber Network"}
            text4={"Symmetrical Upload & Download Speeds"}
          />
        </div>
      </div>
    </div>
  );
};

export default OurPromise;
