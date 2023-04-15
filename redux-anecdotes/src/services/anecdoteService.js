import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const createAnecdote = async (content) => {
  const anecdoteObject = {
    id: getId(),
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdoteObject);

  return response;
};

const incrementVote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);

  return response.data;
};

// eslint-disable-next-line
export default { getAll, createAnecdote, incrementVote };
