import axios from "axios";

export const login = async (username, password) => {
  const response = await axios.post("/login", {username, password});
  return response.data;
};
