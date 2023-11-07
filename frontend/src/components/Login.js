import React from "react";
import "./LogoutPage.css";
import CommonNavbar from "./CommonNavbar";

const Login = () => {
  return (
    <div className="logout-page">
      <CommonNavbar />
      <h1>Welcome To Trivia.com</h1>
      {/* <p>Click the button below to logout.</p> */}
      {/* <button className="logout-button">Logout</button> */}
    </div>
  );
};

export default Login;
