import React from "react";
import logo from "../resources/logowhite.svg";

const Footer = () => {
  return (
    <section>
      <div className=" flex flex-col justify-between py-2 px-2 mx-auto my-0 bg-theme">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center p-6 my-0 space-y-2">
          <div className="flex flex-col-reverse md:flex-col justify-center items-center md:space-y-12 p-4 md:w-1/3">
            <img src={logo} className="hidden md:block md:w-3/5" alt="logo" />
          </div>

          <div className="flex flex-row justify-center items-center md:space-x-12 md:w-2/3">
            <div className="flex flex-col justify-start items-start space-y-4 md:space-y-3 p-2 md:w-1/2">
              {/* eslint-disable-next-line */}
              <a href="#" className="text-white">
                123 Main Street, Anytown, USA
              </a>
              {/*  eslint-disable-next-line */}
              <a href="#" className="text-white">
                456 Elm Avenue, Somewhereville, Canada
              </a>
              {/* eslint-disable-next-line */}
              <a href="#" className="text-white">
                789 Oak Lane, Nowhere City, Australia
              </a>
            </div>
            <div className="flex flex-col justify-center items-start space-y-6 md:space-y-3 p-2 md:w-1/2">
              <a href="mailto:contact@mminnovations.com" className="text-white">
                For business enquiries: contact@mminnovations.com
              </a>
              <a href="mailto:hr@mminnovations.com" className="text-white">
                For job oppurtunities: hr@mminnovations.com
              </a>
              <a href="/" className="text-white">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* <h2></h2> */}
        </div>
        <hr className="text-white mb-2" />
        <div className="flex flex-row justify-between p-1 my-2 md:p-3 md:px-12">
          <div className="flex flex-row justify-center items-center space-x-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i
                className="fa-brands fa-facebook fa-lg"
                style={{ color: "#ffffff", cursor: "pointer" }}
              ></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i
                className="fa-brands fa-instagram fa-lg"
                style={{ color: "#ffffff", cursor: "pointer" }}
              ></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i
                className="fa-brands fa-linkedin fa-lg"
                style={{ color: "#ffffff", cursor: "pointer" }}
              ></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i
                className="fa-brands fa-twitter fa-lg"
                style={{ color: "#ffffff", cursor: "pointer" }}
              ></i>
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
              <i
                className="fa-brands fa-whatsapp fa-lg"
                style={{ color: "#ffffff", cursor: "pointer" }}
              ></i>
            </a>
          </div>
          <small className=" text-white">
            Copyright {new Date().getFullYear()}. All rights reserved.
          </small>
        </div>
      </div>
    </section>
  );
};

export default Footer;
