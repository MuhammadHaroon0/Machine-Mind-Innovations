import React, { useState } from "react";
import notify from "./toast.js";
import useStore from "../store/store";

const AddProducts = () => {
  const postProductData = useStore((state) => state.postProductData);

  const [product, setProduct] = useState({
    name: "",
    url: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postProductData(product);
    } catch (error) {
      notify("Enter Correct Data");
      return;
    }
    notify("Added");
  };

  return (
    <>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={product.name}
          onChange={(e) => handleChange(e)}
          id="exampleFormControlInput1"
          placeholder="name"
          required
        />
        <label for="exampleFormControlInput1" className="form-label">
          Url
        </label>
        <input
          type="text"
          className="form-control"
          name="url"
          value={product.url}
          onChange={(e) => handleChange(e)}
          id="exampleFormControlInput1"
          placeholder="url"
          required
        />
        <label for="exampleFormControlInput1" className="form-label">
          Description
        </label>

        <input
          type="text"
          className="form-control"
          name="description"
          value={product.description}
          onChange={(e) => handleChange(e)}
          id="exampleFormControlInput1"
          placeholder="description"
          required
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="my-4 p-2 bg-theme text-white rounded-full"
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default AddProducts;
