import React from "react";
import education from "./../resources/education.png";
import travel from "./../resources/travel.png";
import finance from "./../resources/finance.png";
import health from "./../resources/health.png";
const Industries = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row  lg:h-[28rem]">
        <div
          className="flex flex-col p-12 space-y-10 justify-center md:w-1/2"
          style={{ backgroundImage: `url(${health})` }}
        >
          <h1 className="font-bold text-white text-4xl  lg:text-5xl">
            Healthcare
          </h1>
          <p className="text-white">
            Our applications have been instrumental in revolutionizing
            healthcare education and patient management, driving significant
            advancements in the industry.
          </p>
        </div>
        <div
          className="flex flex-col p-12 space-y-10 justify-center md:w-1/2 "
          style={{ backgroundImage: `url(${travel})` }}
        >
          <h1 className="font-bold text-white text-4xl  lg:text-5xl">Travel</h1>
          <p className="text-white">
            With our dedicated team of software developers, machine learning
            experts, and data engineers, we empower leading travel & hospitality
            search engines.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  lg:h-[28rem]">
        <div
          className="flex flex-col p-12 space-y-10 justify-center md:w-1/2 "
          style={{ backgroundImage: `url(${finance})` }}
        >
          <h1 className="font-bold text-white text-4xl  lg:text-5xl">
            Finance
          </h1>
          <p className="text-white">
            Our experts have collaborated with a diverse array of organizations,
            assisting them in adapting to the rapid and dynamic transformations
            within the financial sector.
          </p>
        </div>
        <div
          className="flex flex-col  p-12 space-y-10 justify-center md:w-1/2 "
          style={{ backgroundImage: `url(${education})` }}
        >
          <h1 className="font-bold text-white text-4xl  lg:text-5xl">
            Education
          </h1>
          <p className="text-white">
            We have joined forces with prominent education and financial
            institutions, as well as nonprofits, to revolutionize and modernize
            global learning approaches.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Industries;
