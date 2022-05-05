import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Home() {

  const { user, isFetching, error, dispatch } = useContext(AuthContext);
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
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />

       
        <form onSubmit={handleClick} style={{ textDecoration: "none" }}>
              <button className="loginRegisterButton" type={"submit"} > Logout </button>
        </form>
      </div>
    </>
  );
}
