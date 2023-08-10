import React from "react";
import useStore from "../store/store";

const Products = () => {
  const AllProducts = useStore((state) => state.products);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row  lg:h-[28rem]">
        <div className="flex flex-col border-slate border-1 p-12 space-y-10 justify-center md:w-1/2">
          <h1 className="font-bold text-4xl  lg:text-5xl">
            {AllProducts[0].name}
          </h1>
          <p className="">{AllProducts[0].description}</p>
        </div>
        <div className="flex flex-col border-slate border-l md:border-l-0 border-r md:border-t border-b p-12 space-y-10 justify-center md:w-1/2 ">
          <h1 className="font-bold  text-4xl lg:text-5xl">
            {AllProducts[1].name}
          </h1>
          <p className="">{AllProducts[1].description}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  lg:h-[28rem]">
        <div className="flex flex-col border-slate border-x border-b p-12 space-y-10 justify-center items center md:w-1/2">
          <h1 className="font-bold  text-4xl lg:text-5xl">
            {AllProducts[2].name}
          </h1>
          <p className="">{AllProducts[2].description}</p>
        </div>
        <div className="flex flex-col border-slate md:border-x-0 border-x md:border-r border-b p-12 space-y-10 justify-center items center md:w-1/2">
          <h1 className="font-bold  text-4xl lg:text-5xl">
            {AllProducts[3].name}
          </h1>
          <p className="">{AllProducts[3].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
