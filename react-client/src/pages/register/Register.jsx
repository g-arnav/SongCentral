import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/preferences");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="ultimateCircle"></div>
      <div className="gigaCircle"></div>
      <div className="biggestCircle"></div>
      <div className="bigCircle"></div>
      <div className="mediumCircle"></div>
      <div className="loginWrapper">
        <div className="loginTop">
          <h4 className="loginLogo">Fire Starter</h4>
        </div>
        <div className="loginBottom">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="username"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              className="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              type="password"
              className="password"
            />
            <button className="loginRegisterButton">Log into Account</button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="loginButton" type="submit">
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
