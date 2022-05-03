import "./share.css";
import { PermMedia } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_IMAGES;
  const { user } = useContext(AuthContext);
  const description = useRef();
  const title = useRef();

  const [img, setImg] = useState(null);
  const [track, setTrack] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      title: title.current.value,
      description: description.current.value,
    };

    if (img) {
      const data = new FormData();
      const imgName = Date.now() + img.name;
      data.append("name", imgName);
      data.append("file", img);
      newPost.image = imgName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    if (track) {
      const data = new FormData();
      const trackName = Date.now() + track.name;
      data.append("name", trackName);
      data.append("file", track);
      newPost.track = trackName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
              placeholder={"Track Name"}
              className="shareInput"
              ref={title}
          />
          <label htmlFor="track" className="shareOption">
            <PermMedia htmlColor="tomato" className="shareIcon" />
            <span className="shareOptionText">Track</span>
            <input
                style={{ display: "none" }}
                type="file"
                id="track"
                accept=".mp3, .wav"
                onChange={(e) => setTrack(e.target.files[0])} // build this hook
            />
          </label>
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="img" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Cover Art</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="img"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setImg(e.target.files[0])} // build this hook
              />
            </label>
            <input
                placeholder={"(BPM, Key, Inspiration, etc.)"}
                className="shareInput"
                ref={description}
            />
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
