import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import notify from "./toast";
import useStore from "../store/store";

const ResetPassword = () => {
  const params = useParams();
  console.log(params.token);
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const patchResetPassword = useStore((state) => state.patchResetPassword);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (!data.password || !data.confirmPassword) {
      notify("Please enter Password and Password Confirm");
      return;
    }
    e.preventDefault();
    try {
      await patchResetPassword(params.token, data);
    } catch (error) {
      notify("Passwords are not correct!");
      return;
    }
    notify("Updated");
    navigate("/login");
  };
  return (
    <div className="container my-6 flex justify-center items-center">
      <div className="card text-center w-[300px]">
        <div className="card-header h5 text-white bg-theme">Password Reset</div>
        <div className="card-body px-5">
          <div className="form-outline">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
              id="typeEmail"
              className="form-control my-3"
              placeholder="Password"
            />
            <label className="form-label" for="typeEmail">
              Password must contain atleast 1 capital,1 small letter,1 digit and
              1 special character and minimum 7 letters
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={(e) => handleChange(e)}
              id="typeEmail"
              className="form-control my-3"
              placeholder="Confirm Password"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="btn  hover:bg-[#1a1269] text-white bg-theme w-100"
          >
            Reset password
          </button>
          <div className="d-flex justify-content-between mt-4 space-x-4 ">
            <Link
              className="bg-theme text-white p-2 px-2 w-1/2 rounded-full hover:bg-[#1a1269]"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-theme text-white p-2 px-2 w-1/2 rounded-full hover:bg-[#1a1269]"
              to="/signup"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
