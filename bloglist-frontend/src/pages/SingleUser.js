import React from "react";

const SingleUser = ({user}) => {
  console.log(user);
  return (
    <>
      <h2>{user && user.name}</h2>

      {user && user.blogs.map((blog) => <li>{blog.title}</li>)}
    </>
  );
};

export default SingleUser;
