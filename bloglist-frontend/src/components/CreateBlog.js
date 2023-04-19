import React, { useState } from "react";

const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    addBlog(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>createBlog</h2>
      <form onSubmit={handleAddBlog}>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Title
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="blogTitle"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Author
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="blogAuthor"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            URL
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="blogUrl"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-2"
          id="submitCreateBlogBtn"
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default CreateBlog;
