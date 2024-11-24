import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [usersData, setUsersData] = useState([]);
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get("/getData", config);
    console.log("data is", response.data.data);

    if (response.data.status === 401 || !response.data) {
      console.log("error");
    } else {
      setUsersData(response.data.data);
    }
  };

  const handleDeleteUser = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(`/deleteUser/${id}`, config);
    if (response.data.status === 401 || !response.data) {
      console.log("error");
    } else {
      console.log("User Deleted Successfully");
      setShow(true);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content =
    usersData.length > 0 ? (
      usersData.map((user) => {
        return (
          <Card
            style={{ width: "22rem", height: "18rem" }}
            className="mb-3"
            key={user._id}
          >
            <Card.Img
              variant="top"
              src={`/uploads/${user.imgPath}`}
              style={{ width: "100px", textAlign: "center", margin: "auto" }}
              className="mt-2"
            />
            <Card.Body className="text-center">
              <Card.Title>UserName : {user.name}</Card.Title>
              <Card.Text>
                Date Added: {moment(user.dateCreated).format("L")}
              </Card.Text>
              <Button
                variant="danger"
                className="col-lg-6 text-center"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })
    ) : (
      <></>
    );

  let alertContent = show ? (
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      User Deleted Succesfully!!
    </Alert>
  ) : (
    ""
  );

  return (
    <div className="container mt-2">
      {alertContent}
      <h1 className="text-center mt-2">MERN Image Upload Project</h1>
      <div className="text-end">
        <Button variant="primary">
          <NavLink className="text-decoration-none text-light" to="/register">
            Add User
          </NavLink>
        </Button>
      </div>
      <div className="d-flex row justify-content-between align-items-center mt-5">
        {content}
      </div>
    </div>
  );
};

export default Home;
