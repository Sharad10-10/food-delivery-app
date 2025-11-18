import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./style/style.css";

export default function MyCart() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const placeOrder = () => {
    fetch("http://localhost:8000/placeorder", {
      method: "post",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const result = {
          userId: user.userId,
          address: user.address,
          orderId: data.orderId,
        };
        setUser(result);
        navigate("/Home");
      })
      .catch((err) => console.log(err));
    // Code for API // user will send data to database
  };

  return (
    <>
      <div>
        <h1 className="header">Pizza House</h1>
      </div>
      <h2
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "right",
        }}
      >
        My Cart
      </h2>
      <br />

      <div className="container">
        <div className="image-container">
          <img src="/logo.webp" alt="logo" className="logo" />
        </div>
        <table>
          <tbody>
            <tr>
              <td>User Id</td> <td>{user.userId}</td>
            </tr>
            <tr>
              {" "}
              <td>Cheese and Corn Pizza</td> <td>{user.cheeseandcorn}</td>
            </tr>
            <tr>
              {" "}
              <td>Capsicum Pizza</td> <td>{user.capsicum}</td>
            </tr>
            <tr>
              {" "}
              <td>Margherita Pizza</td> <td>{user.margherita}</td>
            </tr>
            <tr>
              {" "}
              <td>Onion Pizza</td> <td>{user.onion}</td>
            </tr>
            <tr>
              {" "}
              <td>Address: </td> <td>{user.address}</td>
            </tr>

            <tr>
              <td>Total Amount: </td> <td>{user.totalAmount}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </>
  );
}
