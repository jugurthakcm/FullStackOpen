import React from "react";

const Success = ({successMessage}) => {

  const success = {
    color: "black",
    background: "lightgreen",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (!successMessage) {
    return;
  }

  return <div style={success}>{successMessage}</div>;
};

export default Success;
