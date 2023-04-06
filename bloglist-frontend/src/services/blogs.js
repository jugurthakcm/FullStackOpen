import axios from "axios";
import {setToken} from "../utils/utils";
const baseUrl = "/api/blogs";

const getAll = (token) => {
  const request = axios.get(baseUrl, setToken(token));
  return request.then((response) => response.data);
};

const addBlog = (title, author, url, token) => {
  const request = axios.post(baseUrl, {title, author, url}, setToken(token));

  return request.then((res) => res.data);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, addBlog};
