import axios from "axios";
const baseUrl =
  "https://crudcrud.com/api/510c105e164e4f20a1e57b27c9806d4b/persons";

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
