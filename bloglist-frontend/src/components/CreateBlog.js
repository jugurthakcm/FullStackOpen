import React from "react";

const CreateBlog = ({handleAddBlog, setTitle, setUrl, title, url}) => {
  return (
    <>
      <h2>createBlog</h2>
      <form onSubmit={handleAddBlog}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          name="url"
          type="text"
          placeholder="Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default CreateBlog;
