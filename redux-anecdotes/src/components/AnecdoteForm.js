import React, {useState} from "react";
import {useDispatch} from "react-redux";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await anecdoteService.createAnecdote(newAnecdote);

    console.log(response);

    dispatch({
      type: "anecdotes/createAnecdotes",
      payload: {content: newAnecdote},
    });

    setNewAnecdote("");
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={newAnecdote}
            onChange={(e) => setNewAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
