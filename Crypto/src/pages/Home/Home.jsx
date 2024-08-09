import React from "react";
// import { AdsBanner, TaxCalutaor } from "../../components";
import AdsBanner from "../../components/adsBanner/AdsBanner"
import TaxCalutaor from "../../components/taxCalculator/TaxCalculator"

const Home = () => {
  return (
    <div className="bg-[#eff2f5] pb-10">
      <div className="max-w-screen-xl m-auto pt-5 ">
      <div className="flex gap-10 flex-wrap md:flex-nowrap ">
        <div className="md:w-[70%] w-full bg-white px-4 md:px-16 md:py-8 py-4  rounded-lg">
          <TaxCalutaor />
        </div>
        <div className="md:w-[30%] w-full rounded-lg ">
          <AdsBanner />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;