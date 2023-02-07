import React from "react";

const Filter = ({searchName, setSearchName}) => {
  return (
    <div>
      Search name
      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
    </div>
  );
};

export default Filter;
