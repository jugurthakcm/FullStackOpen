import {useState} from "react";

const Blog = ({blog, incrementLikes, deleteBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [toggleView, setToggleView] = useState(false);

  const handleLike = () => {
    incrementLikes(blog.id, blog.likes + 1);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (!confirm) return null;

    deleteBlog(blog.id);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setToggleView(!toggleView)}>
          {!toggleView ? "View" : "Hide"}
        </button>
        {toggleView ? (
          <div>
            <a href={`http://${blog.url}`} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
            <p>
              {blog.likes}{" "}
              <button onClick={() => handleLike(blog.likes)}>Like</button>
            </p>
            <p>{blog.user.name}</p>
            <button onClick={handleDelete}>delete</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Blog;
