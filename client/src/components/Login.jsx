import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./style/style.css";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [displayMsg, updateDisplayMsg] = useState("");

  const getData = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const sendData = {
      userId: data.get("userId"),
      password: data.get("password"),
    };
    // console.log(sendData)
    console.log(data);

    // create code to call API and return userId, userAddress
    fetch("http://localhost:8000/checkLogin", {
      method: "post",
      body: JSON.stringify(sendData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const result = {
            userId: data.userId,
            address: data.address,
            orderId: "No order yet",
          };
          setUser(result);
          navigate("/Home");
        } else {
          updateDisplayMsg("Incorrect Id or Password");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <h1 className="header">Pizza House</h1>
      </div>
      <div className="container">
        <div className="image-container">
          <img src="/logo.webp" alt="logo" className="logo" />
        </div>
        <form onSubmit={getData}>
          <b><label htmlFor="userId">User Id</label></b>
          <input type="text" name="userId" />
          <b><label htmlFor="password">Password</label></b>
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
        <h3 style={{marginBottom:"8px", color: displayMsg ? 'red' : 'black' }}>{displayMsg}</h3>
       <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
          <div><a  style={{fontWeight: 'bold'}} href="./CreateAccount">Create an account?</a><br /></div>
          <div><a  style={{fontWeight: 'bold'}} href="./AdminLogin">I am an Admin</a></div>
       </div>
      </div>
    </>
  );
}
