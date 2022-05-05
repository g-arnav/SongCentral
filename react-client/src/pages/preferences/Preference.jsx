import { useRef } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Preferences() {
  
  const genrePreference = useRef();
  const zip = useRef();
  const link = useRef();
  const city = useRef();
  const about = useRef()
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const user = {
      zip: zip.current.value,
      genrePreference: genrePreference.current.value,
      link: link.current.value,
      city: city.current.value,
      about: about.current.value
    }
    try {
      await axios.put("/" + currentUser._id, user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
              placeholder="city"
              required
              ref={city}
              type=""
              className="loginInput"
              minLength="3"
            />
            <input
              placeholder="zip"
              required
              ref={zip}
              type="number"
              className="loginInput"
              maxLength="5"
            />
            <input
              placeholder="link"
              required
              ref={link}
              type="url"
              className="loginInput"
              minLength="6"
            />
            <input
              placeholder="about"
              required
              ref={about}
              type="text"
              className="loginInput"
              maxLength="500"
            />
            

           
            
            <Link to="/" style={{ textDecoration: "none" }}>
              <button className="loginRegisterButton">Continue</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
