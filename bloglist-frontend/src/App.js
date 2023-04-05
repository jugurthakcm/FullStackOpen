import {useState, useEffect} from "react";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import {login} from "./services/login";
import Alert from "./components/Alert";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setUser(loggedUser);
      setUsername("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleAddBlog = async (e) => {
    try {
      e.preventDefault();
      const addedBlog = await blogService.addBlog(title, url, user.token);
      setBlogs([...blogs, addedBlog]);
      setTitle("");
      setUrl("");
      setSuccessMessage("Blog Added Successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response.data);
      setTimeout(() => setErrorMessage(""), 3000);
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    const loggedUserJson = localStorage.getItem("user");
    loggedUserJson && setUser(JSON.parse(loggedUserJson));
  }, []);

  useEffect(() => {
    user && blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
  }, [user]);

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          {successMessage && (
            <Alert message={successMessage} style={successStyle} />
          )}
          {errorMessage && <Alert message={errorMessage} style={errorStyle} />}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}

          <p>
            {user.username} is logged in{" "}
            <button onClick={handleLogOut}>Log Out</button>
          </p>
          <Toggleable buttonLabel={"create"}>
            <CreateBlog
              handleAddBlog={handleAddBlog}
              title={title}
              setTitle={setTitle}
              url={url}
              setUrl={setUrl}
            />
          </Toggleable>
        </>
      ) : (
        <>
          <h2>Login</h2>
          {errorMessage && <Alert message={errorMessage} style={errorStyle} />}
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

export default App;
