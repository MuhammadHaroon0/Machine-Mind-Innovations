import React, { useState } from "react";
import signup from "./../resources/signup.svg";
import notify from "./toast.js";
import useStore from "../store/store";
import LoadingBar from "react-top-loading-bar";

const UpdateMe = () => {
  const updatePassword = useStore((state) => state.patchUpdatePassword);
  const [updateData, setupdateData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateData);
    try {
      setProgress(80);
      await updatePassword(updateData);
      notify("Updated successfull");
      setProgress(100);
    } catch (error) {
      setProgress(100);
      notify("Please provide correct passwords");
      return;
    }
  };
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div>
        <section className="md:mb-10 mb-48 mt-4">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src={signup} className="img-fluid" alt="Sample " />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <h1 className="text-center mb-8 mt-6 text-4xl font-bold">
                  Update Password
                </h1>
                <form>
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example5"
                      onChange={(e) => handleChange(e)}
                      name="oldPassword"
                      value={updateData.oldPassword}
                      className="form-control form-control-lg"
                      placeholder="Enter old password"
                    />
                    <label className="form-label" for="form3Example5">
                      Old Password
                    </label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example6"
                      onChange={(e) => handleChange(e)}
                      name="password"
                      value={updateData.password}
                      className="form-control form-control-lg"
                      placeholder="Enter new password"
                    />
                    <label className="form-label" for="form3Example5">
                      Password must be alphanumeric,containing a special
                      character and upper case letter and 7 letters minimum
                    </label>
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example7"
                      onChange={(e) => handleChange(e)}
                      name="confirmPassword"
                      value={updateData.confirmPassword}
                      className="form-control form-control-lg"
                      placeholder="Enter confrim password"
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
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpdateMe;
