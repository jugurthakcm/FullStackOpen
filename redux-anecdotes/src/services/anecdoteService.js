import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const createAnecdote = async (content) => {
  const anecdoteObject = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdoteObject);

  return response.data;
};

const incrementVote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);

  return response.data;
};

// eslint-disable-next-line
export default { getAll, createAnecdote, incrementVote };
