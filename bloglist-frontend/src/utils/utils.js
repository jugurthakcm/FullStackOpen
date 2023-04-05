export const setToken = (token) => {
  return {
    headers: {
      authorization: "Bearer " + token,
    },
  };
};

