import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Preferences from "./pages/preferences/Preference";



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { register } from "timeago.js";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/preferences" element={<Preferences/>} />
        <Route
          path="/register"
        
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
