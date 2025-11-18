import React, { useState } from "react";
import "./style/style.css";

export default function CreateAccount() {
  const [data, updateData] = useState({});

  const register = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const sendData = {
      userId: data.get("userId"),
      password: data.get("password"),
      address: data.get("address"),
    };
    // code for calling api and return registration successful

    fetch("http://localhost:8000/CreateAccount", {
      method: "post",
      body: JSON.stringify(sendData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => updateData(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <h1 className="header">Join our Pizza House Family</h1>
      </div>

      <div className="container">
        <div className="image-container">
          <img src="/logo.webp" alt="logo" className="logo" />
        </div>

        <form onSubmit={register}>
          <b><label htmlFor="userName">Enter your email</label></b>
          <input type="text" name="userId" /> <br /> <br />
          <b><label htmlFor="password">Password</label></b>
          <input type="password" name="password" /> <br /> <br />
          <b><label htmlFor="address">Full Address</label></b><span style={{paddingLeft: "8px",fontSize: "12px"}}>Note: This address will be used for delivery</span>
          <input type="text" name="address" /> <br /> <br />
          <button type="submit">Register</button>
        </form>
        <h2>{data.msg}</h2>

        <a style={{fontWeight: "bold"}}href="./">Go to Home</a>
      </div>
      <div style={{marginTop: "16px"}}></div>
    </>
  );
}
