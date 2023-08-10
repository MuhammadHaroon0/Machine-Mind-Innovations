import React, { useState } from "react";
import "./../css/login.css";
import LoadingBar from "react-top-loading-bar";

import { Link, useNavigate } from "react-router-dom";
import signup from "./../resources/signup.svg";
import notify from "./toast.js";
import useStore from "./../store/store";

const Signup = () => {
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const postSignUpData = useStore((state) => state.postSignUpData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (
      !signupData.email ||
      !signupData.name ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !document.getElementById("form3Example4").checkValidity()
    ) {
      notify("Please enter correct credentials");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      notify("Password do not match");
      return;
    }
    e.preventDefault();
    try {
      setProgress(80);
      await postSignUpData(signupData);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      notify("Wrong Email or Password");
      return;
    }
    notify("Signed up successfully.Now Login with your credentials");
    navigate("/login");
  };

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <section className="md:mb-10 mb-48 mt-4">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={signup} className="img-fluid" alt="Sample " />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h1 className="text-center mb-8 mt-6 text-4xl font-bold">
                Sign Up
              </h1>
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    onChange={(e) => handleChange(e)}
                    name="name"
                    value={signupData.name}
                    className="form-control form-control-lg"
                    placeholder="Enter a valid name"
                    required
                  />
                  <label className="form-label" for="form3Example3">
                    Name
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example4"
                    onChange={(e) => handleChange(e)}
                    name="email"
                    value={signupData.email}
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    required
                  />
                  <label className="form-label" for="form3Example4">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example5"
                    onChange={(e) => handleChange(e)}
                    name="password"
                    value={signupData.password}
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    required
                  />
                  <label className="form-label" for="form3Example5">
                    Password must contain atleast 1 capital,1 small letter,1
                    digit and 1 special character and minimum 7 letters
                  </label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example6"
                    onChange={(e) => handleChange(e)}
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    className="form-control form-control-lg"
                    placeholder="Enter confirm password"
                    required
                  />
                  <label className="form-label" for="form3Example6">
                    Confirm Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn hover:bg-[#1a1269] text-white bg-[#2e318f] btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Sign Up
                  </button>
                  <p className="small fw-bold mt-2 pt-1">
                    Already have an account?{" "}
                    <Link to="/login" className="link-primary">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
