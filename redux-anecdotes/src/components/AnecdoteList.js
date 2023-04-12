import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {incrementVote} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);

  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );

  const filteredAnecdotes =
    filter !== ""
      ? anecdotes.filter((e) => e.content.includes(filter))
      : anecdotes;

  const vote = (id) => {
    dispatch(incrementVote(id));
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
