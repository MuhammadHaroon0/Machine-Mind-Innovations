import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../resources/logo.svg";
import text from "./../resources/text.png";
import web from "./../resources/web.png";
import matours from "./../resources/matours.png";
const SingleProduct = ({name,description,id,url}) => {
  const [hover, setHover] = useState(false);
  const logos=[matours,text,web,logo]
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const styles = {
    backgroundColor: hover ? "#FCE7F3" : "white",
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-start justify-center py-8 px-10 m-3 space-y-2 md:space-y-6 border-slate border-1 group transition-colors"
      style={styles}
    >
      <img src={logos[id]} className="w-1/3 h-1/3" alt="" />
      <h1 className="text-2xl md:text-3xl font-bold">
        {name}
      </h1>
      <p>
        {description}
      </p>
      <Link
        to={url}
        className="p-2 px-3 border-slate border-1 rounded-full hover:bg-theme hover:text-white"
        target="_blank"
      >
        Visit Website
      </Link>
    </div>
  );
};

export default memo(SingleProduct);
