import {useNavigate} from "react-router-dom";
import blogService from "../services/blogs";

import {useDispatch, useSelector} from "react-redux";

const Blog = ({blog}) => {
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const incrementLikes = async (id) => {
    try {
      await blogService.updateLike(id, user.token);

      dispatch({type: "blogs/incrementLikes", payload: id});
    } catch (error) {
      dispatch({
        type: "alert/showErrorMessage",
        payload: error.response.data,
      });

      setTimeout(() => dispatch({type: "alert/clearAlert"}), 3000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id, user.token);

      dispatch({type: "blogs/deleteBlog", payload: id});

      dispatch({
        type: "alert/showSuccessMessage",
        payload: "Blog Deleted Successfully",
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

  const handleLike = () => {
    incrementLikes(blog.id);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (!confirm) return null;

    deleteBlog(blog.id);

    navigate("/");
  };

  if (!blog) return null;

  return (
    <div>
      <div className="blog">
        <h2>
          {blog.title} {blog.author}
        </h2>

        <div>
          <a href={`http://${blog.url}`} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
          <p>
            {blog.likes} likes
            <button
              onClick={() => handleLike(blog.likes)}
              className="btn btn-primary ms-2"
            >
              Like
            </button>
          </p>
          <p>Added by {blog.user.name}</p>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
