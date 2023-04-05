import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = (token) => {
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll};
