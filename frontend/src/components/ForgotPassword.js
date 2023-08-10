import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import notify from "./toast";
import useStore from "./../store/store";

const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: "" });
  const postForgotPassword = useStore((state) => state.postForgotPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(email);
    if (!email.email || !document.getElementById("typeEmail").checkValidity()) {
      notify("Please enter correct email");
      return;
    }
    e.preventDefault();
    try {
      await postForgotPassword(email);
    } catch (error) {
      notify("User not registered with this email!");
      return;
    }
    notify("Password reset email sent");
  };
  return (
    <div className="container my-6 flex justify-center items-center">
      <div className="card text-center w-[300px]">
        <div className="card-header h5 text-white bg-theme">Password Reset</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <div className="form-outline">
            <input
              type="email"
              name="email"
              value={email.email}
              onChange={(e) => handleChange(e)}
              id="typeEmail"
              className="form-control my-3"
            />
            <label className="form-label" for="typeEmail">
              Email input
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="btn text-white bg-theme w-100 hover:bg-[#1a1269]"
          >
            Send Email
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

export default ForgotPassword;
