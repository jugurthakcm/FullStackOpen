import React from "react";

const Error = ({errorMessage}) => {
  const error = {
    color: "white",
    background: "red",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (!errorMessage) {
    return;
  }

  return <div style={error}>{errorMessage}</div>;
};

export default Error;
