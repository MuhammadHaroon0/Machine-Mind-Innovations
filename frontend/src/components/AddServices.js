import React, { useState } from "react";
import notify from "./toast.js";
import useStore from "../store/store";

const AddServices = () => {
  const postServiceData = useStore((state) => state.postServiceData);

  const [serviceImage, setServiceImage] = useState(null);
  const [feature, setFeature] = useState({ name: "", description: "" });
  const [service, setService] = useState({
    name: "",
    description: "",
    features: [feature],
    technologies: [""],
  });

  const handlefeatureChange = (e, index) => {
    const { name, value } = e.target;
    setFeature((prevFeature) => ({
      ...prevFeature,
      [name]: value,
    }));

    setService((prevService) => {
      const newArray = [...prevService.features];
      newArray[index] = { ...prevService.features[index], [name]: value };
      return {
        ...prevService,
        features: newArray,
      };
    });
  };

  const handleTechnologyChange = (index, value) => {
    const newArray = [...service.technologies];
    newArray[index] = value;
    setService((prev) => {
      return {
        ...prev,
        technologies: newArray,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddfeature = () => {
    setService((prev) => {
      return {
        ...prev,
        features: [...prev.features, { name: "", description: "" }],
      };
    });
  };
  const handleAddTechnology = () => {
    setService((prev) => {
      return {
        ...prev,
        technologies: [...prev.technologies, ""],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("description", service.description);
      service.technologies.forEach((tech, index) => {
        formData.append(`technologies[${index}]`, tech);
      });
      service.features.forEach((fea, index) => {
        formData.append(`features[${index}][name]`, fea.name);
        formData.append(`features[${index}][description]`, fea.description);
      });
      formData.append("image", serviceImage);
      await postServiceData(formData);
    } catch (error) {
      notify("Wrong Content");
      return;
    }
    notify("Added");
  };
  return (
    <div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={service.name}
          onChange={(e) => handleChange(e)}
          id="exampleFormControlInput1"
          placeholder="name"
          required
        />
        <label for="exampleFormControlInput1" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={service.description}
          onChange={(e) => handleChange(e)}
          id="exampleFormControlInput1"
          placeholder="description"
          required
        />

        <label for="formFile" className="form-label">
          Service Image
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          required
          onChange={(e) => setServiceImage(e.target.files[0])}
        ></input>
        <button
          className="bg-theme p-1 my-4 rounded-full text-white"
          onClick={handleAddfeature}
        >
          Add Feature
        </button>
        {service.features.map((singlef, index) => (
          <div key={index}>
            <label>Enter element {index + 1} Name: </label>
            <input
              className="form-control"
              placeholder={`Feature ${index + 1}`}
              type="text"
              name="name"
              value={singlef.name}
              onChange={(e) => handlefeatureChange(e, index)}
              required
            />
            <label>Enter element {index + 1} Description: </label>
            <input
              className="form-control"
              placeholder={`Feature ${index + 1}`}
              name="description"
              type="description"
              value={singlef.description}
              onChange={(e) => handlefeatureChange(e, index)}
              required
            />
          </div>
        ))}

        <button
          className="bg-theme p-1 my-4 rounded-full text-white"
          onClick={handleAddTechnology}
        >
          Add Technology
        </button>
        {service.technologies.map((value, index) => (
          <div key={index}>
            <label>Enter element {index + 1}: </label>
            <input
              className="form-control"
              placeholder={`Technology ${index + 1}`}
              type="text"
              value={value}
              onChange={(e) => handleTechnologyChange(index, e.target.value)}
              required
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="p-2 my-4 bg-theme text-white rounded-full"
      >
        Submit
      </button>
    </div>
  );
};

export default AddServices;
