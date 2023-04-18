import {Routes, Route, useMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Home from "./pages/Home";
import Users from "./pages/Users";
import axios from "axios";
import SingleUser from "./pages/SingleUser";
import {useState, useEffect} from "react";
import Blog from "./pages/Blog";

const App = () => {
  const {user} = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);
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

  const [users, setUsers] = useState();

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  const matchUser = useMatch("/users/:id");

  const userMatched =
    users && matchUser ? users.find((u) => u.id === matchUser.params.id) : null;

  const matchBlog = useMatch("/blogs/:id");

  const blogMatched =
    blogs && matchBlog ? blogs.find((b) => b.id === matchBlog.params.id) : null;

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
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<SingleUser user={userMatched} />} />
        <Route path="/blogs/:id" element={<Blog blog={blogMatched} />} />
      </Routes>
    </>
  );
};

export default App;
