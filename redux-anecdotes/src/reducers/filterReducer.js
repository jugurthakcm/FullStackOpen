const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;

    default:
      return state;
  }
};

export const filter = (payload) => {
  return {
    type: "FILTER",
    payload,
  };
};

export default filterReducer;
