import axios from "axios";
const baseUrl = "/api/persons";

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
