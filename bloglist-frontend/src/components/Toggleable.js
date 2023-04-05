import React, {useState} from "react";

const Toggleable = ({buttonLabel, children}) => {
  const [toggleVisible, setToggleVisible] = useState(false);

 

  return !toggleVisible ? (
    <>
      <button onClick={() => setToggleVisible(true)}>{buttonLabel}</button>
    </>
  ) : (
    <>
      <div>{children}</div>
      <button onClick={() => setToggleVisible(false)}>Cancel</button>
    </>
  );
};

export default Toggleable;
