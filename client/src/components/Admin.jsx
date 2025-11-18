import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Admin() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([
    { Column1: "No data", Column2: "No data" },
  ]);

  const fetchData = () => {
    // console.log('fetching data...')
    // call api to receive order info
    fetch("http://localhost:8000/getorders")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (user) {
    return (
      <>
        <div>
          <h1 className="header">Pizza House</h1>
        </div>

        <div className="container">
          <div className="image-container">
            <img src="/logo.webp" alt="logo" className="logo" />
          </div>
        </div>
        <h1 style={{textAlign: "center", backgroundColor: "black", color: "white"}}>Welcome Admin</h1>
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((column) => {
                return <th key={Math.random()}>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((obj) => {
              return (
                <tr key={Math.random()}>
                  {Object.values(obj).map((values) => {
                    return <td>{values}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h1>You are not logged in</h1>
      </>
    );
  }
}
