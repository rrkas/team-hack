import React, { useState } from "react";
import "./Login.css";
import LoginImage from "../../assests/LoginImage.jpg";
import GoogleLogin from "react-google-login";
import Navbar from "../Navbar/Navbar";
//import { useHistory } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const failedresponseGoogle = (respose) => {
    console.log(respose);
  };
  const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    window.open(
      `https://0wwr9.csb.app/welcome?name=${response.profileObj.name}`,
      "_self"
    );
  };
  return (
    <>
    <Navbar />
    <div className="container">
      <img src={LoginImage} alt="" />
      <div className="right column">
        <div className="header">
          <h1>SIGN IN</h1>
          <h3>Don't have an account?Sign Up</h3>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">
              <h3>Email Address</h3>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <h3>Password</h3>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter 6 characters or more"
            ></input>
          </div>
          <div className="footer">
            <button>LOGIN</button>
            <div class="border">
              <hr></hr>OR<hr></hr>
            </div>
            <GoogleLogin
              clientId="785266231457-7s6int6mpun4delti52kp0jcn8fq3prd.apps.googleusercontent.com"
              buttonText="SIGN  IN  WITH  GOOGLE"
              onSuccess={responseGoogle}
              onFailure={failedresponseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}