import React from "react";

const InputField = ({ title, priceUser }) => {
  return (
    <div className="flex flex-col md:w-1/2 w-full gap-2 relative">
      <label htmlFor="">{title}</label>
      <input
        type="text"
        className="border py-2 px-2 md:px-8 rounded-md bg-[#eff2f5] font-semibold md:text-xl "
        onChange={(e) => priceUser(e.target.value)}
      />
      <span className=" absolute px-6 py-3 top-[29px] -left-3 text-xl  font-semibold">{`$`}</span>
    </div>
  );
};

export default InputField;