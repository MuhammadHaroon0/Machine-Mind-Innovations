import React from "react";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import { memo } from "react";

const Dropdown = (props) => {
  let doc;
  let products = useStore((state) => state.products);
  let services = useStore((state) => state.services);
  if (props.page) {
    doc = products;
  } else {
    doc = services;
  }
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      className="absolute w-full left-0 my-0 py-2 px-14 mx-0 bg-white hidden md:flex flex-col"
    >
      <div className="m-6 ml-4 flex align-middle">
        <Link
          to={props.page ? "/products" : "/services"}
          className="font-semibold text-xl"
        >
          See all
        </Link>
      </div>
      <hr />
      <div className="grid grid-cols-3 mx-10 my-4 justify-content-center items-start">
        {doc &&
          doc.map((item) => (
            <Link
              to={props.page ? item.url : "/services/" + 5 + item.id + 8}
              className="font-semibold	 my-1 text-xl"
              target="_blank"
            >
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default memo(Dropdown);
