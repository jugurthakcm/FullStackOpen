import axios from "axios";
const baseUrl =
  "https://jugurthakcm-sturdy-halibut-xvg954999wp3vjj6-3001.preview.app.github.dev/api/persons";

export const getAll = () => {
  return axios.get(`${baseUrl}`);
};

export const addPerson = (newObj) => {
  return axios.post(`${baseUrl}`, newObj);
};

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export const updatePerson = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj);
};
