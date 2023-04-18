import {useState, useEffect} from "react";
import Blog from "./Blog";
import CreateBlog from "../components/CreateBlog";
import blogService from "../services/blogs";
import Login from "../components/Login";
import {login} from "../services/login";
import Alert from "../components/Alert";
import Toggleable from "../components/Toggleable";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Home = () => {
  const blogs = useSelector((state) => state.blog);
  const {user} = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const successStyle = {
    color: "black",
    backgroundColor: "lightgreen",
    height: "50px",
    width: "50%",
    border: "2px solid green",
    fontSize: "2rem",
  };
  const errorStyle = {
    color: "black",
    backgroundColor: "red",
    height: "50px",
    width: "50%",
    border: "2px solid red",
    fontSize: "2rem",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await login(username, password);
      dispatch({type: "user/loginUser", payload: loggedUser});
      setUsername("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      dispatch({
        type: "alert/showErrorMessage",
        payload: error.response.data.error,
      });

      setTimeout(() => dispatch({type: "alert/clearAlert"}), 3000);
    }
  };

  const addBlog = async (title, author, url) => {
    try {
      const addedBlog = await blogService.addBlog(
        title,
        author,
        url,
        user.token
      );
      dispatch({type: "blogs/addBlog", payload: addedBlog});

      dispatch({
        type: "alert/showSuccessMessage",
        payload: "Blog Added Successfully",
      });

      setTimeout(() => dispatch({type: "alert/clearAlert"}), 3000);
    } catch (error) {
      dispatch({
        type: "alert/showErrorMessage",
        payload: error.response.data,
      });

      setTimeout(() => dispatch({type: "alert/clearAlert"}), 3000);
    }
  };

  // Getting blogs if user is logged in
  useEffect(() => {
    user &&
      blogService.getAll(user.token).then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

        dispatch({type: "blogs/getBlogs", payload: sortedBlogs});
      });
  }, [user, dispatch]);

  return (
    <div>
      {user ? (
        <>
          {alert.successMessage && (
            <Alert message={alert.successMessage} style={successStyle} />
          )}
          {alert.errorMessage && (
            <Alert message={alert.errorMessage} style={errorStyle} />
          )}
          {blogs.map((blog) => (
            <p key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </p>
          ))}

          <Toggleable buttonLabel={"create"}>
            <CreateBlog addBlog={addBlog} />
          </Toggleable>
        </>
      ) : (
        <>
          <h2>Login</h2>
          {alert.errorMessage && (
            <Alert message={alert.errorMessage} style={errorStyle} />
          )}
          <Login
            handleSubmit={handleSubmit}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </>
      )}
    </div>
  );
};

export default Home;
