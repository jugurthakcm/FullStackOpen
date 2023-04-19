import { useState } from "react";
import CreateBlog from "../components/CreateBlog";
import blogService from "../services/blogs";
import Login from "../components/Login";
import { login } from "../services/login";
import Alert from "../components/Alert";
import Toggleable from "../components/Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const blogs = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const successStyle = { class: "alert-success" };
  const errorStyle = { class: "alert-danger" };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await login(username, password);
      dispatch({ type: "user/loginUser", payload: loggedUser });
      setUsername("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      dispatch({
        type: "alert/showErrorMessage",
        payload: error.response.data.error,
      });

      setTimeout(() => dispatch({ type: "alert/clearAlert" }), 3000);
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
      dispatch({ type: "blogs/addBlog", payload: addedBlog });

      dispatch({
        type: "alert/showSuccessMessage",
        payload: "Blog Added Successfully",
      });

      setTimeout(() => dispatch({ type: "alert/clearAlert" }), 3000);
    } catch (error) {
      dispatch({
        type: "alert/showErrorMessage",
        payload: error.response.data,
      });

      setTimeout(() => dispatch({ type: "alert/clearAlert" }), 3000);
    }
  };

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
          <Toggleable buttonLabel={"Create new blog"}>
            <CreateBlog addBlog={addBlog} />
          </Toggleable>

          {blogs.map((blog) => (
            <p key={blog.id} className="mt-2">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </p>
          ))}
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
