import {useState, useEffect} from "react";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import {login} from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await login(username, password);
      setUser(loggedUser);
      setUsername("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      console.error(error.response.data.error);
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
    } catch (error) {
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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}

          <p>
            {user.username} is logged in{" "}
            <button onClick={handleLogOut}>Log Out</button>
          </p>

          <CreateBlog
            handleAddBlog={handleAddBlog}
            title={title}
            setTitle={setTitle}
            url={url}
            setUrl={setUrl}
          />
        </>
      ) : (
        <>
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
