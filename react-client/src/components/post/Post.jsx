import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import React from 'react';
import ReactPlayer from 'react-player';

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PI = process.env.REACT_APP_PUBLIC_IMAGES;
  const PT = process.env.REACT_APP_PUBLIC_TRACKS;

  const { user: currentUser } = useContext(AuthContext); // unwrap the user value to alias currentUser

  // check if the post is already liked by the viewing user

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  // get the post author's user

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  // increase the like and update in DB based on states

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                user.profilePicture
                  ? PI + user.profilePicture
                  : PI + "person/noAvatar.png"
              }
              alt=""
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {/* {post.track ? PT + post.track : ""} */}
          <span>{post.title}</span>
          <img
            className="postImg"
            src={post.image ? PI + post.image : ""}
            alt=""
          />
          <ReactPlayer
              url={post.track ? PT + post.track : ""}
              playing
              light={true} 
              height='100px'
              controls
              style={ {padding: 20} }
          />
          <span style={{ padding: 20 }}className="postText">{post.description}</span>
          
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PI + "like.png"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{likes === 1 ? likes+" person likes this" : likes+" people like this"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
