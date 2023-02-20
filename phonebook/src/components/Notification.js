import React from "react";

const Notification = ({notification}) => {
  const error = {
    color: "white",
    background: "red",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const success = {
    color: "black",
    background: "lightgreen",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (!notification) {
    return;
  }

  return <div style={success}>{notification}</div>;
};

export default Notification;
