import {Routes, Route, useMatch, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Home from "./pages/Home";
import Users from "./pages/Users";
import axios from "axios";
import SingleUser from "./pages/SingleUser";
import {useState, useEffect} from "react";
import Blog from "./pages/Blog";
import blogService from "./services/blogs";

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

  // Getting blogs if user is logged in
  useEffect(() => {
    user &&
      blogService.getAll(user.token).then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

        dispatch({type: "blogs/getBlogs", payload: sortedBlogs});
      });
  }, [user, dispatch]);

  const matchUser = useMatch("/users/:id");

  const userMatched =
    users && matchUser ? users.find((u) => u.id === matchUser.params.id) : null;

  const matchBlog = useMatch("/blogs/:id");

  const blogMatched =
    blogs && matchBlog ? blogs.find((b) => b.id === matchBlog.params.id) : null;

  return (
    <div className="container">
  

      <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
        <div class="container-fluid">
          <span class="navbar-brand">Blog App</span>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
            </ul>
            <div class="d-flex">
              {user && (
                <span>
                  {user.username}
                  <button
                    className="btn btn-primary ms-2"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<SingleUser user={userMatched} />} />
        <Route path="/blogs/:id" element={<Blog blog={blogMatched} />} />
      </Routes>
    </div>
  );
};

export default App;
