import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import anecdoteService from "../services/anecdoteService";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((res) =>
        dispatch({ type: "anecdotes/getAnecdotes", payload: res })
      );
  }, [dispatch]);

  const anecdotes = useSelector((state) => state.anecdotes);

  const filteredAnecdotes =
    filter !== ""
      ? anecdotes.filter((e) => e.content.includes(filter))
      : anecdotes;

  const vote = (id) => {
    const anecdoteToChange = anecdotes.find((e) => e.id === id);

    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    anecdoteService
      .incrementVote(changedAnecdote)
      .then((res) =>
        dispatch({ type: "anecdotes/incrementVote", payload: res })
      );

    dispatch({
      type: "notification/showNotification",
      payload: "You have voted",
    });

    setTimeout(() => {
      dispatch({ type: "notification/clearNotification" });
    }, 5000);
  };
  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
