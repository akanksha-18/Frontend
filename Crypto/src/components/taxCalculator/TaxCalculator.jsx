import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

const TaxCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [annualIncome, setAnnualIncome] = useState("");
  const [taxRate, setTaxRate] = useState("--");
  const [taxToPay, setTaxToPay] = useState({ base: 0, rate: 0 });
  const [term, setTerm] = useState("LongTerm");

  const capitalGain =
    Number(salePrice) - Number(purchasePrice) - Number(expenses);

  const discountForLongTerm =
    term === "LongTerm" && capitalGain > 0 ? capitalGain * 0.5 : 0;

  const netCapitalGain =
    term === "LongTerm" ? capitalGain - discountForLongTerm : capitalGain;

  const calculateTax = (selectedIncome) => {
    switch (selectedIncome) {
      case "0-18200":
        return { base: 0, rate: 0 };
      case "18201-45000":
        return { base: 0, rate: 0.19 };
      case "45001-120000":
        return { base: 5092, rate: 0.325 };
      case "120001-180000":
        return { base: 29467, rate: 0.37 };
      case "180001+":
        return { base: 51667, rate: 0.45 };
      default:
        return { base: 0, rate: 0 };
    }
  };

  const handleAnnualIncomeChange = (event) => {
    const selectedIncome = event.target.value;
    setAnnualIncome(selectedIncome);
    let rate;
    switch (selectedIncome) {
      case "0-18200":
        rate = "0%";
        break;
      case "18201-45000":
        rate = "Nil + 19% of the excess over $18,200";
        break;
      case "45001-120000":
        rate = "$5,092 + 32.5% of the excess over $45,000";
        break;
      case "120001-180000":
        rate = "$29,467 + 37% of the excess over $120,000";
        break;
      case "180001+":
        rate = "$51,667 + 45% of the excess over $180,000";
        break;
      default:
        rate = "--";
    }
    setTaxRate(rate);
    const { base, rate: calculatedRate } = calculateTax(selectedIncome);
    setTaxToPay({ base, rate: calculatedRate });
  };

  useEffect(() => {
    const { base, rate } = calculateTax(annualIncome);
    setTaxToPay({ base, rate });
  }, [annualIncome]);

  const taxPay =
    taxToPay.base + taxToPay.rate * (netCapitalGain > 0 ? netCapitalGain : 0);

  return (
    <div className="">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-10">
        Free Crypto Tax Calculator Australia
      </h1>

      <div className="flex gap-4 md:gap-12 items-center">
        <div className="w-1/2">
          <div className="flex gap-2 items-center flex-col md:flex-row">
            <label className="md:text-lg w-fit inline-block shrink-0 ">
              Financial Year
            </label>
            <select className="bg-[#eff2f5] md:w-full  px-2 py-2 rounded-md font-semibold">
              <option value="">FY 2023-24</option>
            </select>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex gap-2 items-center flex-col md:flex-row">
            <p className="md:text-lg w-fit inline-block shrink-0 ">Country</p>
            <select className="bg-[#eff2f5] py-2  px-4 rounded-md md:w-64 font-semibold">
              <option value="">Australia</option>
            </select>
          </div>
        </div>
      </div>

      <hr className="my-8" />
      {/* four field complete */}
      <div className="w-full">
        <div className="flex  gap-12 items-center mt-5 w-full flex-wrap md:flex-nowrap">
          <InputField
            title={"Enter purchase price of Crypto"}
            priceUser={setPurchasePrice}
          />
          <InputField
            title={"Enter sale price of Crypto"}
            priceUser={setSalePrice}
          />
        </div>
        <div className="flex justify-between mt-5 gap-12 flex-wrap md:flex-nowrap">
          <InputField title={"Enter your Expenses"} priceUser={setExpenses} />
          <div className="flex flex-col gap-2 md:w-1/2 w-full">
            <p>Investment Type</p>
            <div className="flex md:gap-5 gap-2 w-full">
              <div className="flex flex-col gap-1 w-1/2   ">
                <button
                  className={`rounded-md md:py-2 md:px-4 px-1 py-1 w-full border-2  ${
                    term === "ShortTerm"
                      ? "border-blue-700 text-blue-700"
                      : "border-slate-700 text-black"
                  }`}
                  onClick={() => setTerm("ShortTerm")}
                >
                  <h1 className="flex items-center md:gap-2 w-full font-semibold">
                    Short Term{" "}
                    {term === "ShortTerm" ? (
                      <FaCheck className="inline-block" />
                    ) : null}{" "}
                  </h1>
                </button>
                <p className="flex items-center">
                  <IoIosArrowBack /> 12 Months
                </p>
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <button
                  className={`rounded-md md:py-2 md:px-4 px-1 py-1 w-full border-2  ${
                    term === "LongTerm"
                      ? "border-blue-700 text-blue-700"
                      : "border-slate-700 text-black"
                  }`}
                  onClick={() => setTerm("LongTerm")}
                >
                  <h1 className="flex items-center md:gap-2 w-full font-semibold">
                    Long Term{" "}
                    {term === "LongTerm" ? (
                      <FaCheck className="inline-block" />
                    ) : null}{" "}
                  </h1>
                </button>
                <p className="flex items-center">
                  <IoIosArrowForward /> 12 Months
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* next filed */}
      <div className="mt-10 w-full">
        <div className="flex md:flex-nowrap flex-wrap gap-12 items-center">
          <div className="flex flex-col gap-2 md:w-1/2 w-full">
            <label htmlFor="selec">Select Your Annual Income</label>
            <select
              id="selec"
              className="border py-2 px-2 rounded border-black w-full font-semibold"
              onChange={handleAnnualIncomeChange}
              value={annualIncome}
            >
              <option value="">Select Income Range</option>
              <option value="0-18200">0% - $18,200</option>
              <option value="18201-45000">$18,201 - $45,000</option>
              <option value="45001-120000">$45,001 - $120,000</option>
              <option value="120001-180000">$120,001 - $180,000</option>
              <option value="180001+">$180,001+</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 md:w-1/2 w-full">
            <p>Tax Rate</p>
            <p className="font-semibold">{taxRate}</p>
          </div>
        </div>
        {term === "LongTerm" ? (
          <div className="flex gap-12 flex-wrap md:flex-nowrap items-center w-full mt-10">
            <div className="flex flex-col gap-2 md:w-1/2 w-full">
              <p>Capital gains amount</p>
              <div className="bg-[#eff2f5] px-3 py-3 w-full rounded-md font-semibold text-xl">
               $  {capitalGain}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:w-1/2 w-full">
              <p>Discount For Long Terms Gain</p>
              <div className="bg-[#eff2f5] px-3 py-3 w-full rounded-md font-semibold text-xl">
              $  {discountForLongTerm}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex mt-10 items-center w-full gap-12 flex-wrap md:flex-nowrap">
        <div className="flex flex-col items-center bg-[#EBF9F4] px-4 md:px-10 py-5 gap-2 md:w-1/2  w-fullrounded-md text-xl font-semibold">
          <p>Net Capital gains tax amount</p>
          <p className="text-[#0fba83]">$ {netCapitalGain}</p>
        </div>
        <div className="flex flex-col items-center bg-[#EBF2FF] px-4 md:px-10 py-5 gap-2 md:w-1/2 w-full rounded-md text-xl font-semibold">
          <p>The tax you need to pay*</p>
          <p className="text-[#0141cf]">{taxPay.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;