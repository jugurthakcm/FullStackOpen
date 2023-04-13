import React, {useState} from "react";
import {useDispatch} from "react-redux";


const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

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
