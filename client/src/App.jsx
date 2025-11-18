import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/admin";
import AdminLogin from "./components/adminLogin";
import CreateAccount from "./components/createAccount";
import Login from "./components/login";
import MyCart from "./components/myCart";
import { useState, createContext } from "react";

export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(false);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/MyCart" element={<MyCart />}></Route>
            <Route path="/Admin" element={<Admin />}></Route>
            <Route path="/AdminLogin" element={<AdminLogin />}></Route>
            <Route path="/CreateAccount" element={<CreateAccount />}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
