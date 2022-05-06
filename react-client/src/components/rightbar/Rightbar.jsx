import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_IMAGES;
  const [friends, setFriends] = useState([]);
  const [currentFriends, setCurrentFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get(`/users/friends/${user?._id}`);
        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user?._id]);

  useEffect(() => {
    const getCurrentFriends = async () => {
      try {
        const currentFriendsList = await axios.get(
          `/users/friends/${currentUser._id}`
        );
        setCurrentFriends(currentFriendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentFriends();
  }, [currentUser._id]);

  useEffect(() => {
    const checkFollowed = async () => {
      const isFollowed = await currentUser.following.includes(user?._id);
      setFollowed(isFollowed);
    };
    checkFollowed();
  }, [currentUser, user?._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

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
          {currentFriends.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({ followed }) => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowx`Button" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
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
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar followed={followed} /> : <HomeRightbar />}
      </div>
    </div>
  );
}
