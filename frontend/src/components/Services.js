import React from "react";
import useStore from "../store/store";

const Services = () => {
  const AllServices = useStore((state) => state.services);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row  lg:h-[28rem]">
        <div className="flex flex-col border-slate border-1 p-12 space-y-10 justify-center md:w-1/2">
          <h1 className="font-bold text-4xl  lg:text-5xl">
            {AllServices[0].name}
          </h1>
          <p className="">{AllServices[0].description}</p>
        </div>
        <div className="flex flex-col border-slate border-l md:border-l-0 border-r md:border-t border-b p-12 space-y-10 justify-center md:w-1/2 ">
          <h1 className="font-bold  text-4xl lg:text-5xl">
            {AllServices[1].name}
          </h1>
          <p className="">{AllServices[1].description}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  lg:h-[28rem]">
        <div className="flex flex-col border-slate border-x border-b p-12 space-y-10 justify-center items center md:w-1/2">
          <h1 className="font-bold  text-4xl lg:text-5xl">
            {AllServices[2].name}
          </h1>
          <p className="">{AllServices[2].description}</p>
        </div>
        <div className="flex flex-col border-slate md:border-x-0 border-x md:border-r border-b p-12 space-y-10 justify-center items center md:w-1/2">
          <h1 className="font-bold  text-4xl lg:text-5xl">
            {AllServices[3].name}
          </h1>
          <p className="">{AllServices[3].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
