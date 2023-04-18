import React from "react";

const Alert = ({style, message}) => {
  return (
    <div className={`alert ${style.class}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;
