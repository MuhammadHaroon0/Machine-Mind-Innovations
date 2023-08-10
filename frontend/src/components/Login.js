import React, { useEffect, useState } from "react";
import "./../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import login from "./../resources/login.svg";
import notify from "./toast";
import useStore from "./../store/store";
import LoadingBar from "react-top-loading-bar";

const Login = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const postLoginData = useStore((state) => state.postLoginData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (
      !loginData.email ||
      !loginData.password ||
      !document.getElementById("form3Example3").checkValidity()
    ) {
      notify("Please enter correct email and password");
      return;
    }
    e.preventDefault();
    try {
      setProgress(80);
      await postLoginData(loginData);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      notify("Wrong Email or Password");
      return;
    }
    setIsLoggedIn(true);
    notify("Logged In successfully");
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  });

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <section className="mt-16 mb-36">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={login} className="img-fluid" alt="Sample " />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h1 className="text-center mb-8 text-4xl font-bold">Login</h1>
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    onChange={(e) => handleChange(e)}
                    name="email"
                    value={loginData.email}
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    required
                  />
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    onChange={(e) => handleChange(e)}
                    name="password"
                    value={loginData.password}
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    required
                  />
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/forgotPassword" className="text-body">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn hover:bg-[#1a1269] text-white bg-[#2e318f] btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-danger">
                      Register
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

export default Login;
