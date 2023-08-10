import React, { useEffect, useState } from "react";
import serviceImg from "./../resources/careerImg.svg";
import { Link, useParams } from "react-router-dom";
import useStore from "../store/store";
const Service = () => {
  const { getServiceImage } = useStore();
  const [found, setFound] = useState(null);

  const { services } = useStore();
  const params = useParams().id.slice(1, -1);
  const [img, setImg] = useState(null);

  useEffect(() => {
    console.log(services);
    const foundService = services.find((item) => params === item._id);
    setFound(foundService);
    if (foundService) {
      const getImage = async () => {
        try {
            const response = await getServiceImage(foundService.image);
            const fileBlob = new Blob([response.data]);
            const fileUrl = URL.createObjectURL(fileBlob);
            setImg(fileUrl);
          
        } catch (error) {
          console.log(error);
        }
      };
      getImage();
    }
    // eslint-disable-next-line
  }, [services,params]);

  if (!found || !img) return null;
  return (
    found && (
      <>
        <div className="mx-auto md:my-6 mb-24 px-10 py-2 flex flex-col-reverse justify-between md:flex-row items-center md:space-x-6 space-y-8">
          <div
            className="flex flex-col md:items-start items-center space-y-8 md:space-y-16 serviceText md:w-1/2"
            style={{}}
          >
            <h1 className="text-4xl md:text-5xl mt-8 font-bold">{found.name}</h1>
            <p className="text-2xl md:text-3xl">{found.description}</p>
            <Link
              to="/contact"
              className="bg-theme rounded-full font-semibold text-white p-3 px-4 hover:bg-[#1a1269]"
            >
              Start your Project
            </Link>
          </div>
          <div className="flex md:w-1/2 md:justify-end items-center justify-center">

          <img
            src={img || serviceImg}
            className="w-11/12 h-3/4 md:h-[400px]"
            alt=""
            loading="lazy"
          />
          </div>
        </div>

        <div className="flex flex-col mx-auto bg-[#FCE7F3] space-y-16 mt-24 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            What makes it stand out
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center ">
            {found.features.map((item) => (
              <div className="flex flex-col items-start justify-center px-10 py-16 space-y-10 mx-4 border-slate border-1 bg-white max-h-80 h-80">
                <div className="flex flex-row items-center justify-start space-x-6">
                  <div className="flex flex-col items-start p-1 justify-center space-y-1/2">
                    <h1 className="text-3xl font-bold">{item.name}</h1>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center space-x-4">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row my-4 p-4">
          <h1 className="text-5xl font-bold text-center md:w-1/2">
            Technology Stack <br /> Used
          </h1>
          <div className="flex flex-col text-center md:w-1/2 p-6">
            {found.technologies &&
              found.technologies.map((tech) => (
                <div className="flex justify-center text-center hover:bg-[#FCE7F3] p-6 border-slate border-1">
                  <h1 className="text-3xl font-semibold">{tech}</h1>
                </div>
              ))}
          </div>
        </div>
      </>
    )
  );
};

export default Service;
