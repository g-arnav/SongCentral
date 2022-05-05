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

  const genrePreference = useRef();
  const zipCode = useRef();
  const songCloundLink = useRef();

  

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Preferences</h3>
          <span className="loginDesc"></span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Preference"
              required
              ref={genrePreference}
              className="loginInput"
            />
            <input
              placeholder="City"
              required
              ref={zipCode}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="link"
              required
              ref={songCloudLink}
              type="password"
              className="loginInput"
              minLength="6"
            />
           
            
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
