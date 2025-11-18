import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./style/style.css";

export default function AdminLogin() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [displayMsg, updateDisplayMsg] = useState("");

  const getData = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const sendData = {
      userId: data.get("userId"),
      password: data.get("password"),
    };
    // console.log(sendData)
    // console.log(data);

    // create code to call API and return userId, userAddress
    fetch("http://localhost:8000/adminlogin", {
      method: "post",
      body: JSON.stringify(sendData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUser(data);
          navigate("/Admin");
        } else {
          updateDisplayMsg("Incorrect Id or Password");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="header">Pizza House</h1>

      <div className="container">
        <div className="image-container">
          <img src="/logo.webp" alt="logo" className="logo" />
        </div>
        <h2>Admin Login</h2>
        <form onSubmit={getData}>
          <input type="text" name="userId" />
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
        <h3>{displayMsg}</h3>
        <a href="./">Go to Home</a>
      </div>
    </>
  );
}
