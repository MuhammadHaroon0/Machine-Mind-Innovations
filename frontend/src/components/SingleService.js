import React, { memo } from "react";
import { Link } from "react-router-dom";

const SingleService = ({ name, description, id }) => {
  return (
    <div className="flex flex-col items-start justify-center py-8 px-10 m-3 space-y-2 md:space-y-6 bg-white border-slate border-1 h-80">
      <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
      <p>{description}</p>
      <Link
        to={`/services/${5 + id + 8}`}
        className="p-2 text-white px-3 bg-theme rounded-full hover:bg-[#1a1269]"
      >
        Learn More
      </Link>
    </div>
  );
};

export default memo(SingleService);
