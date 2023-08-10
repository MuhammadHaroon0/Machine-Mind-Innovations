import React from "react";
import careersBanner from "./../resources/careersBanner.svg";
import careersImg from "./../resources/careerImg.svg";
import interview from "./../resources/interview.jpg";

const Careers = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-0 mx-auto">
        <img src={careersBanner} alt="career" loading="lazy" />
        <img
          src={careersImg}
          className="w-1/2 h-1/2"
          alt="career"
          loading="lazy"
        />
        <h1 className="m-8 text-center text-3xl font-bold">
          Unlock your potential with our personalized hiring platform! Find the
          ideal job that matches your expertise and take the next step in your
          career today.
        </h1>
        <div className="flex flex-col md:bg-transparent bg-[#dbeafe] lg:flex-row mx-2 my-24 lg:p-2 md:relative justify-center lg:justify-end items-center lg:items-center md:items-end">
          <img
            src={interview}
            className="lg:h-4/6 md:h-3/5 md:w-2/5 h-2/3  md:top-auto md:left-10 md:absolute lg:w-5/12"
            alt=""
            loading="lazy"
          />

          <div className="md:bg-[#dbeafe] md:ps-24 flex flex-col text-left items-start justify-center lg:h-[32rem] lg:w-3/5 md:h-[22rem] md:w-3/5 md:mx-0 md:my-0 my-4 mx-3 space-y-4 lg:space-y-12 r-8">
            <h1 className="px-2 font-bold md:text-3xl text-3xl lg:text-4xl">
              Fresh Graduate Hiring
            </h1>
            <p className="md:text-l lg:text-xl p-2">
              Recently graduated? Thrive yourself with Machine Minds Innovations
              by registering to our Fresh Graduate Hiring Program 2023 before
              3rd January {new Date().getFullYear() + 1}!
            </p>
            <button
              disabled
              className="mx-2 font-semibold text-white rounded-full bg-theme p-2 px-3"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <h1 className=" text-center text-5xl font-bold mb-8">Benefits</h1>

      <div className="flex flex-col items-center mb-16">
        <div className="flex flex-col md:flex-row justify-center items-center ">
          <div className="flex flex-col items-start p-10 m-4 border-slate border-1 bg-white md:w-1/3 ">
            <div className="flex flex-row items-center space-x-6">
              <i
                class="fa-solid fa-kit-medical fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center">
                <h1 className="text-3xl font-bold">Medical Allowance</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-10 m-4  bg-white border-slate border-1 md:w-1/3">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-solid fa-utensils fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center ">
                <h1 className="text-3xl font-bold">Free Lunch Facility</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-10 m-4 bg-white border-slate border-1 md:w-1/3">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-solid fa-van-shuttle fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center">
                <h1 className="text-3xl font-bold">Conveyance Service</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row  justify-center items-center ">
          <div className="flex flex-col items-start justify-center p-10 m-4 border-slate border-1 bg-white md:w-1/3 ">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-solid fa-plus fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center">
                <h1 className="text-3xl font-bold">Yearly Increments</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-10 m-4 bg-white border-slate border-1 md:w-1/3 ">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-solid fa-award fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center">
                <h1 className="text-3xl font-bold">Awards and Prizes</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-10 m-4 bg-white border-slate border-1 md:w-1/3">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-solid fa-dumbbell fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center">
                <h1 className="text-3xl font-bold">Gym and Fitness</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;
