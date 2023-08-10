import React from "react";
import productBanner from "./../resources/productBanner.svg";
import SingleProduct from "./SingleProduct";
import useStore from "../store/store";

const ProductsMain = () => {
  const AllProducts = useStore((state) => state.products);

  return (
    <div>
      <>
        <div className="flex flex-col justify-center p-0 mx-auto">
          <img src={productBanner} alt="" loading="lazy" />
          <div className="flex flex-col items-center justify-center text-center mt-2 md:m-4 space-y-4 p-2">
            <h1 className="md:text-5xl text-4xl font-bold text-center my-10 md:mb-12">
              Delivering High <br />
              Class Engineering Projects
            </h1>
          </div>
          <div className="flex flex-col p-4  items-center  mx-auto">
            <div className="flex flex-col  items-center justify-center md:my-4 md:mx-36">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {AllProducts.map((item,index) => (
                  <SingleProduct
                    name={item.name}
                    description={item.description}
                    key={item.id}
                    url={item.url}
                    id={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductsMain;
