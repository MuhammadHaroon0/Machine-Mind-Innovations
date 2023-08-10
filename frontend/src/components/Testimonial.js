import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useStore from "./../store/store";
import  fourth from './../resources/1.jpg'
import second from './../resources/2.jpg'
import third from './../resources/3.jpg'
import first from './../resources/4.png'
const Testimonial = () => {
  const [slidesToShow, setSlidesToShow] = useState(2);
  const reviews = useStore((state) => state.reviews);
  const images=[first,second,third,fourth]
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setting based on the current window width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };
  return (
    <div className="flex flex-col bg-[#2e318f] pt-12 pb-6 px-6 md:px-24 space-y-4 lg:space-y-10">
      <h2 className="text-5xl text-center text-white  font-bold">
        What our clients say
      </h2>
      <div className="h-96 md:h-[32rem] mb-4">
        <Slider {...settings}>
          {reviews.map((item,index)=><div className="div" key={item._id}>
            <div className="flex flex-col items-center justify-center min-h-[334px] max-h-96 m-6 md:py-12 p-6 md:space-y-12 space-y-8 bg-white">
              <div className="flex flex-row items-center justify-start space-x-6">
                <img
                  src={images[index]}
                  alt=""
                  className="rounded-full h-1/5 w-1/5 aspect-square"
                  loading="lazy"
                />
                <div className="flex flex-col items-start p-1 justify-center space-y-1/2">
                  <h1 className="text-2xl font-semibold">{item.user.name}</h1>
                  <p>{item.createdAt.split('T')[0]}</p>
                </div>
              </div>
              <p className="text-sm md:text-base">
                {item.review}
              </p>
              <div className="flex flex-col space-y-4">
                <hr className="block lg:w-72 w-32 h-1 mx-auto bg-gray-100 md:mb-2 rounded dark:bg-gray-700" />
                <h1 className="font-normal text-l self-center">{item.service.name}</h1>
              </div>
            </div>
          </div>)}
  
        </Slider> 
      </div>
    </div>
  );
};

export default Testimonial;
