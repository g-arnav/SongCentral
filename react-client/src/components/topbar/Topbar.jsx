import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_IMAGES;
  const { isFetching, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        console.log(dispatch);

        dispatch(
            {type: "LOGOUT"}
        );
        navigate("/login");
    };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FireStarter</span>
        </Link>
      </div>
      <div className="topbarRight">
        {"Welcome, " +  user.username + "   "}
        <form onSubmit={handleClick} style={{ textDecoration: "none" }}>
          <button className="loginRegisterButton" type={"submit"} > Logout </button>
        </form>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
