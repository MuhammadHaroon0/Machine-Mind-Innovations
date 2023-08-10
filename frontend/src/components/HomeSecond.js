import React, { useState } from "react";

import Industries from "./Industries";
import Services from "./Services";
import Products from "./Products";
const HomeSecond = () => {
  const [page, setPage] = useState("Industries");
  const handleChangePage = (val) => {
    if (val === "Products") setPage("Products");
    else if (val === "Services") setPage("Services");
    else setPage("Industries");
  };
  return (
    <div className="flex flex-col p-2 sm:m-2 md:m-12">
      <div className="flex flex-row justify-start items-start">
        <button
          onClick={() => handleChangePage("Industries")}
          className="p-2 md:p-3  border-1 border-slate hover:bg-[#2e318f] active:bg-[#2e318f]  hover:text-white font-semibold text-xl"
        >
          Industries
        </button>
        <button
          onClick={() => handleChangePage("Services")}
          className="p-2 md:p-3  border-y border-slate hover:bg-[#2e318f] hover:text-white font-semibold text-xl"
        >
          Services
        </button>
        <button
          onClick={() => handleChangePage("Products")}
          className="p-2 md:p-3  border-1 border-slate hover:bg-[#2e318f] hover:text-white font-semibold text-xl"
        >
          Products
        </button>
      </div>

      {page === "Industries" && <Industries />}
      {page === "Services" && <Services />}
      {page === "Products" && <Products />}

      <div className=" text-center space-y-6 flex flex-col mt-16 p-6">
        <h1 className="md:text-5xl text-4xl font-bold">
          We've achieved partnerships, certifications, and customer growth
        </h1>
        <p className="">
          Machine Minds Innovations rich experience and strong work ethic have
          forged valuable industry partnerships, leading to coveted
          certifications from industry leaders and enabling seamless acquisition
          of new businesses and customers.
        </p>
      </div>
    </div>
  );
};

export default HomeSecond;
