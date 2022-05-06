import { useRef } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Palette} from "@material-ui/icons";

export default function Preferences() {

  const genrePreference = useRef();
  const zip = useRef();
  const link = useRef();
  const city = useRef();
  const about = useRef()
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [img, setImg] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();



    const updates = {
      userId: user._id,
      zip: zip.current.value,
      genrePreference: genrePreference.current.value,
      link: link.current.value,
      city: city.current.value,
      about: about.current.value,
      ProfilePicture: ""
    }

    if (img) {
      const data = new FormData();
      const imgName = Date.now() + img.name;
      data.append("name", imgName);
      data.append("file", img);
      updates.ProfilePicture = imgName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(updates);
    try {
      console.log("updating", user._id);
      await axios.put("/users/" + user._id, updates);
      navigate("/");
    } catch (error) {
      console.log(error);
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
          <div className="loginLeft">
            <h4 id = "top-preference" className="loginLogo">About You</h4>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit}>
              <input
                  placeholder="Favorite Genre"
                  ref={genrePreference}
                  className="loginInput"
              />
              <input
                  placeholder="City"
                  ref={city}
                  type=""
                  className="loginInput"
                  minLength="3"
              />
              <input
                  placeholder="Zipcode"
                  ref={zip}
                  type="number"
                  className="loginInput"
                  maxLength="5"
              />
              <input
                  placeholder="Link to your music"
                  ref={link}
                  type="url"
                  className="loginInput"
                  minLength="6"
              />
              <input
                  placeholder="Bio"
                  ref={about}
                  type="text"
                  className="loginInput"
                  maxLength="500"
              />
              <Palette className="shareIcon" />
              <span className="shareOptionText">Profile Picture</span>
              <input
                  style={{ display: "none" }}
                  type="file"
                  id="img"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setImg(e.target.files[0])} // build this hook
              />
              <button type={"submit"} className="loginRegisterButton">Continue</button>
            </form>
          </div>
        </div>
      </div>
  );
}