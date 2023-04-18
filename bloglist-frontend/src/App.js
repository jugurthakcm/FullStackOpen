import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Home from "./pages/Home";
import Users from "./pages/Users";
import {useEffect} from "react";

const App = () => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Login User
  useEffect(() => {
    const loggedUserJson = localStorage.getItem("user");
    loggedUserJson &&
      dispatch({type: "user/loginUser", payload: JSON.parse(loggedUserJson)});
  }, [dispatch]);

  // Logout a user
  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch({type: "user/logoutUser"});
  };

  return (
    <>
      <h1>Blog App</h1>
      {user && (
        <p>
          {user.username} is logged in
          <button onClick={handleLogOut}>Log Out</button>
        </p>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
