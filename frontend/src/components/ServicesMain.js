import React from "react";
import servicesBanner from "./../resources/servicesBanner.svg";
import SingleService from "./SingleService";
import useStore from "../store/store";
const ServicesMain = () => {
  const { services } = useStore();
  return (
    <>
      <div className="flex flex-col justify-center p-0 mx-auto">
        <img src={servicesBanner} alt="" loading="lazy" />
        <div className="flex flex-col items-center justify-center text-center m-4 space-y-4 p-2">
          <h1 className="md:text-5xl text-4xl font-bold text-center my-12 md:mb-36">
            Delivering Exceptional <br /> Engineering Services
          </h1>
        </div>
        <div className="flex flex-col bg-[#ebedfd] p-4  items-center  mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 md:mx-36 -mt-24">
            {services.map((item) => (
              <SingleService
                name={item.name}
                description={item.description}
                key={item.id}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesMain;
