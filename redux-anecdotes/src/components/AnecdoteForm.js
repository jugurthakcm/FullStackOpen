import React, { useState } from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await anecdoteService.createAnecdote(newAnecdote);

    dispatch({
      type: "anecdotes/createAnecdotes",
      payload: response,
    });

    dispatch({
      type: "notification/showNotification",
      payload: "Anecdote Created",
    });

    setNewAnecdote("");

    setTimeout(() => {
      dispatch({ type: "notification/clearNotification" });
    }, 5000);
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
