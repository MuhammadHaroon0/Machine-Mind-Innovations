import React from "react";
import useStore from "../store/store";
import notify from "./toast.js";
import { useState } from "react";

const AddPicture = () => {
  const updatePicture = useStore((state) => state.patchUpdatePicture);
  const [userImage, setUserImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", userImage);
    try {
      await updatePicture(formData);
      notify("Added");
      window.location.reload();
    } catch (error) {
      notify("Please provide correct format images only");
      return;
    }
  };
  return (
    <div>
      <form action="">
        <label for="formFile" className="form-label">
          Add Image
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={(e) => setUserImage(e.target.files[0])}
        />
        <button
          className="text-white rounded-full bg-theme p-2 my-4"
          onClick={handleSubmit}
          type="submit"
        >
          Add Picture
        </button>
      </form>
    </div>
  );
};

export default AddPicture;
