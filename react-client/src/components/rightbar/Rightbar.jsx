import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_IMAGES;
  const { user: currentUser, dispatch } = useContext(AuthContext);


  // useEffect(() => {
  //   const checkFollowed = async () => {
  //     const isFollowed = await currentUser.following.includes(user?._id);
  //     setFollowed(isFollowed);
  //   };
  //   checkFollowed();
  // }, [currentUser, user?._id]);


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "donald.jpg"} alt="" />
          <span className="birthdayText">
            Featured:
          </span>
        </div>
        <img className="rightbarAd" src={PF + "donald.jpg"} alt="" />
        <h4 className="rightbarTitle"><u>My Artists:</u></h4>
        <img className="rightbarAd" src={PF + "fugees.png"} alt="" />
        <img className="rightbarAd" src={PF + "dre.jpeg"} alt="" />
        <ul className="rightbarFollowingsHome">
        </ul>
        <img className="rightbarAd" src={PF + "tiger.jpg"} alt="" />
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Taken"
                : "-"}
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar />}
      </div>
    </div>
  );
}
