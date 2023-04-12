import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createAnecdotes(newAnecdote));

    setNewAnecdote("");
  };
  return (
    <>
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
