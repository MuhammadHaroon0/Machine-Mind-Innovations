import React from "react";
import banner from "./../resources/home-banner.svg";
import userAvatar from "./../resources/userAvatar.svg";
import officeAvatar from "./../resources/officeAvatar.svg";
import documentAvatar from "./../resources/documentAvatar.svg";
import starAvatar from "./../resources/starAvatar.svg";
import office from "./../resources/office.jpg";
import { useNavigate } from "react-router-dom";
import HomeSecond from "./HomeSecond";
import Testimonial from "./Testimonial";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mx-auto my-0 p-0">
      <img src={banner} alt="banner" className="" loading="lazy" />
      <div className="justify-center items-center text-center flex flex-col m-4 p-4">
        <h1 className="md:text-6xl text-4xl font-bold">
          A Journey of <span className="text-theme">Success</span>
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-24 py-4 p-3">
          <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
            <img
              src={userAvatar}
              className="max-w-20 max-h-20"
              alt=""
              srcset=""
            />
            <h1 className="text-4xl font-bold">800+</h1>
            <p>People on board</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
            <img
              src={officeAvatar}
              alt=""
              className="max-w-20 max-h-20"
              srcset=""
            />
            <h1 className="text-4xl font-bold">3</h1>
            <p>Global Offices</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
            <img
              src={documentAvatar}
              alt=""
              className="max-w-20 max-h-20"
              srcset=""
            />
            <h1 className="text-4xl font-bold">50+</h1>
            <p>Projects completed</p>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
            <img
              src={starAvatar}
              alt=""
              className="max-w-20 max-h-20"
              srcset=""
            />
            <h1 className="text-4xl font-bold">4.7</h1>
            <p>Overall Rating</p>
          </div>
        </div>
        <div className="flex flex-col md:bg-transparent bg-[#dbeafe] lg:flex-row -mx-10 my-4 lg:p-2 md:relative justify-center lg:justify-end items-center lg:items-center md:items-end">
          <img
            src={office}
            className="lg:h-4/6 md:h-3/5 md:w-2/5 h-2/3  md:top-auto md:left-10 md:absolute lg:w-5/12"
            alt=""
            loading="lazy"
          />

          <div className="md:bg-[#dbeafe] md:ps-24 flex flex-col text-left items-start justify-center lg:h-[32rem] lg:w-3/5 md:h-[22rem] md:w-3/5 md:mx-0 md:my-0 my-4 mx-2  md:p-10 space-y-4 lg:space-y-12 r-8">
            <h1 className="font-bold md:text-3xl text-3xl lg:text-4xl">
              Discovering your needs
            </h1>
            <p className="md:text-l lg:text-xl">
              Our team of over 100 blends the skills of engineers, developers,
              UX architects, and designers to craft impactful solutions.
              Together, we have aided businesses in their journey toward digital
              transformation by delivering custom software that drives change.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="font-semibold text-white rounded-full bg-theme p-2 px-3 hover:bg-[#1a1269]"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <HomeSecond />
      <Testimonial />
    </div>
  );
};

export default Home;
