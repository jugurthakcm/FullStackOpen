import {useState} from "react";

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [toggleView, setToggleView] = useState(false);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setToggleView(!toggleView)}>
          {!toggleView ? "View" : "Hide"}
        </button>
        {toggleView ? (
          <div>
            <p>{blog.url}</p>
            <p>
              {blog.likes} <button>Like</button>
            </p>
            <p>{blog.user.name}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Blog;
