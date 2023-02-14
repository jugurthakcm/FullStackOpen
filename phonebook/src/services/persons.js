import axios from "axios";
const baseUrl =
  "https://crudcrud.com/api/5b003126882b40a8abdb4649c3ea0e8b/persons";

export const getAll = () => {
  return axios.get(`${baseUrl}`);
};

export const addPerson = (newObj) => {
  return axios.post(`${baseUrl}`, newObj);
};


