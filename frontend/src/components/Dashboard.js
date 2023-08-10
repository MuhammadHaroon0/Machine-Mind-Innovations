import React, { useEffect, useState } from "react";
import AddProducts from "./AddProducts";
import AddServices from "./AddServices";
import UpdateMe from "./UpdateMe";
import AddPicture from "./AddPicture";
import OngoingProjects from "./OngoingProjects";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import jwtDecode from "jwt-decode";
import defaultImg from "./../resources/default.png";

const Dashboard = () => {
  const { setIsLoggedIn, getUserImage, userImg } = useStore();

  useEffect(() => {
    const getImage = async () => {
      try {
        const jwt = Cookies.get("jwt");
        const id = jwtDecode(jwt).id;
        if (!userImg) {
          await getUserImage(id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImage();
  }, [getUserImage, userImg]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleLocalStorageChange = (e) => {
      if (e.key === "role" && !e.newValue) {
        Cookies.remove("jwt");
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleLocalStorageChange);

    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
    // eslint-disable-next-line
  }, []);

  const role = localStorage.getItem("role");
  const [page, setPage] = useState("OngoingProjects");

  const handleChangePage = (val) => {
    if (val === "AddProducts") setPage("AddProducts");
    else if (val === "UpdateMe") setPage("UpdateMe");
    else if (val === "AddPicture") setPage("AddPicture");
    else if (val === "AddServices") setPage("AddServices");
    else setPage("OngoingProjects");
  };

  const renderPage = () => {
    if (page === "AddServices") {
      return <AddServices />;
    } else if (page === "AddProducts") {
      return <AddProducts />;
    } else if (page === "UpdateMe") {
      return <UpdateMe />;
    } else if (page === "AddPicture") {
      return <AddPicture />;
    } else {
      return <OngoingProjects />;
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col p-2 sm:m-2 md:m-12">
      <div className="flex md:flex-row justify-between items-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          {role === "admin"
            ? "Admin "
            : role === "employee"
            ? "Employee "
            : "Client "}
          Dashboard
        </h1>
        <img
          src={userImg || defaultImg}
          alt=""
          className="rounded-full w-1/12 h-1/12"
        />
      </div>
      <h1 className="text-2xl font-bold">{}</h1>
      <div className="grid md:grid-cols-6 grid-cols-3  justify-start items-start my-3">
        <button
          onClick={() => handleChangePage("OngoingProjects")}
          className="p-[2px] md:p-3  border-y border-l border-slate hover:bg-[#2e318f] hover:text-white font-semibold text-base md:text-xl leading-5"
        >
          Ongoing Projects
        </button>
        {role === "admin" && (
          <button
            onClick={() => handleChangePage("AddServices")}
            className="p-2 md:p-3  border-1 border-slate hover:bg-[#2e318f] active:bg-[#2e318f]  hover:text-white font-semibold text-xl h-full"
          >
            Add Services
          </button>
        )}
        {role === "admin" && (
          <button
            onClick={() => handleChangePage("AddProducts")}
            className="p-2 md:p-3  border-y border-r border-slate hover:bg-[#2e318f] hover:text-white font-semibold text-xl h-full"
          >
            Add Products
          </button>
        )}
        <button
          onClick={() => handleChangePage("UpdateMe")}
          className="p-1 md:p-3  border-y border-x border-slate hover:bg-[#2e318f] hover:text-white font-semibold  text-base md:text-xl md:h-full h-[45.5px] leading-5"
        >
          Update Password
        </button>
        <button
          onClick={() => handleChangePage("AddPicture")}
          className="p-2 md:p-3  border-y border-r md:border-l-0 border-l border-slate hover:bg-[#2e318f] hover:text-white font-semibold text-xl md:h-full"
        >
          Add Picture
        </button>
        <button
          onClick={handleLogout}
          className="p-2 md:p-3  border-y border-x border-slate hover:bg-[#2e318f] hover:text-white font-semibold text-xl md:h-full"
        >
          Log Out
        </button>
      </div>
      {page && renderPage()}
    </div>
  );
};

export default Dashboard;
