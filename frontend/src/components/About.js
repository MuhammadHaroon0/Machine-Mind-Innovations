import React from "react";
import banner from "./../resources/about-banner.svg";
import features from "./../resources/companyFeatures.svg";

const About = () => {
  return (
    <>
      <div className="flex flex-col justify-end mx-auto l-0 my-0 p-0 w-full">
        <img src={banner} alt="banner" className="w-screen" loading="lazy" />
      </div>
      <div className="flex flex-col items-center justify-center m-4 space-y-4 p-2">
        <h1 className="md:text-5xl text-4xl font-bold text-center mt-12">
          Your Preferred Trusted Partner <br /> for Exceptional Solutions
        </h1>

        <div className="flex flex-col lg:flex-row py-8 justify-center items-center">
          <div className="flex flex-col items-start justify-center p-10 m-4 space-y-10 border-slate border-1 bg-white lg:w-1/3 h-80">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-solid fa-handshake fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center space-y-1/2">
                <h1 className="text-3xl font-bold">
                  Creating Enduring <br /> Partnerships
                </h1>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center space-x-4">
              <div className="bg-[#2e318f] h-16 w-1"></div>
              <p>
                Fostering enduring partnerships through value creation across
                diverse industries.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-10 m-4 space-y-10 bg-white border-slate border-1 lg:w-1/3 h-80">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-regular fa-gem fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center space-y-1/2">
                <h1 className="text-3xl font-bold">
                  Delivering Lasting <br /> Value
                </h1>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center space-x-4">
              <div className="bg-[#2e318f] h-16 w-[0.33rem]"></div>
              <p>
                Our skilled engineers are dedicating their expertise to craft
                tangible value for our clients.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-10 m-4 space-y-10 bg-white border-slate border-1 lg:w-1/3 h-80">
            <div className="flex flex-row items-center justify-start space-x-6">
              <i
                class="fa-solid fa-certificate fa-2xl"
                style={{ color: "#2e318f" }}
              ></i>
              <div className="flex flex-col items-start p-1 justify-center space-y-1/2">
                <h1 className="text-3xl font-bold">
                  Verified & Certified Proficiency
                </h1>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center space-x-4">
              <div className="bg-[#2e318f] h-16 w-1"></div>
              <p>
                From enterprise to analytical software, we serve every industry
                with excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto mt-12 md:p-24 p-12 space-y-12 md:space-y-24 w-full bg-[#2e318f]">
        <h1 className="text-center text-white text-2xl md:text-5xl font-bold">
          Guided by Our Founding Principles
        </h1>
        <img src={features} alt="" loading="lazy" />
      </div>
    </>
  );
};

export default About;
