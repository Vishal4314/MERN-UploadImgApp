import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImgFileSelect = (event) => {
    setImgFile(event.target.files[0]);
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("photo", imgFile);
    formData.append("name", name);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post("/register", formData, config);
    console.log(response);
    if (response.data.status === 401 || !response.data) {
      console.log("error");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1>Upload Your Img Here</h1>
      <Form className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" onChange={handleNameChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select Your Image</Form.Label>
          <Form.Control type="file" onChange={handleImgFileSelect} />
        </Form.Group>

        <Button
          variant="primary"
          // type="submit"
          onClick={handleUserSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
