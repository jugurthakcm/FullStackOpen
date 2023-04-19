import React, { useState } from "react";

const Toggleable = ({ buttonLabel, children }) => {
  const [toggleVisible, setToggleVisible] = useState(false);

  return !toggleVisible ? (
    <>
      <button
        className="btn btn-primary"
        id="createBlogBtn"
        onClick={() => setToggleVisible(true)}
      >
        {buttonLabel}
      </button>
    </>
  ) : (
    <>
      <div>{children}</div>
      <button
        className="btn btn-warning mt-2"
        onClick={() => setToggleVisible(false)}
      >
        Cancel
      </button>
    </>
  );
};

export default Toggleable;
