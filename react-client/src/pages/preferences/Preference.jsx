import { useRef } from "react";
import "./register.css";
import "./login.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const genrePreference = useRef();
  const zipCode = useRef();
  const songCloundLink = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dispatch);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">More About You</h3>
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
              <button className="loginRegisterButton">Continue</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
