import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const finalOrder = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);

    const sendData = {
      userId: user.userId,
      cheeseandcorn: data.get("cheeseandcorn"),
      capsicum: data.get("capsicum"),
      margherita: data.get("margherita"),
      onion: data.get("onion"),
      address: user.address,
      totalAmount:
        data.get("cheeseandcorn") * 100 +
        data.get("capsicum") * 100 +
        data.get("margherita") * 100 +
        data.get("onion") * 100,
    };
    setUser(sendData);
    navigate("/MyCart");
    console.log(sendData);
  };

  if (user) {
    return (
      <>
        <h1 className="header">Pizza House</h1>
        <h2
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "right",
          }}
        >
          Welcome {user.userId} to our Pizza House
        </h2>
        <h2
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "right",
          }}
        >
          Your Order will be delivered to {user.address}
        </h2>
        
        <div style={{marginTop: '8px'}}><h1>Order id: {user.orderId}</h1></div>

        <div style={{paddingTop: '16px'}}>
          <form onSubmit={finalOrder}>
          <div className="menu">
            <div className="menu-card">
              <img
                src="./cheeseandcorn.jpg"
                className="icon"
                alt="cheeseandcorn"
                title="Cheese and Corn Pizza"
              />
              <div className="container-card">
                <h4>
                  <b>Cheese and Corn Pizza</b>
                </h4>
                <h4>
                  <b>Rs.100</b>
                </h4>
                <input
                  type="number"
                  name="cheeseandcorn"
                  min={0}
                  defaultValue={0}
                />
              </div>
            </div>

            <div className="menu-card">
              <img
                src="./capsicum.jpg"
                className="icon"
                alt="capsicum"
                title="Capsicum Pizza"
              />
              <div className="container-card">
                <h4>
                  <b>Capsicum Pizza</b>
                </h4>
                <h4>
                  <b>Rs.100</b>
                </h4>
                <input type="number" name="capsicum" min={0} defaultValue={0} />
              </div>
            </div>

            <div className="menu-card">
              <img
                src="./margherita.jpg"
                className="icon"
                alt="margherita"
                title="Margherita"
              />
              <div className="container-card">
                <h4>
                  <b>Margherita Pizza</b>
                </h4>
                <h4>
                  <b>Rs.100</b>
                </h4>
                <input
                  type="number"
                  name="margherita"
                  min={0}
                  defaultValue={0}
                />
              </div>
            </div>

            <div className="menu-card">
              <img
                src="./onion.jpg"
                className="icon"
                alt="onion"
                title="Onion Pizza"
              />
              <div className="container-card">
                <h4>
                  <b>Onion Pizza</b>
                </h4>
                <h4>
                  <b>Rs.100</b>
                </h4>
                <input type="number" name="onion" min={0} defaultValue={0} />
              </div>
            </div>
          </div>

          <button
          onSubmit={finalOrder}
          type="submit"
          style={{ width: "100vw", height: "50px"}}
        >
          <b>ADD PIZZA</b>
        </button>
        </form>
        </div>


        

        <button
          type="submit"
          style={{ width: "100vw", height: "50px"}}
        >
          <a href="./" style={{ color: "white"}}><b>Go to Home</b></a>
        </button>

        
      </>
    );
  } else {
    return (
      <>
        <div style={{display: 'flex', alignItems: 'center'}}><h1>You are not logged in</h1></div>
      </>
    );
  }
}
