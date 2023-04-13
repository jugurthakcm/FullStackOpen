import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import anecdoteService from "../services/anecdoteService";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((res) => dispatch({type: "anecdotes/getAnecdotes", payload: res}));
  }, [dispatch]);

  const anecdotes = useSelector((state) => state.anecdotes);

  const filteredAnecdotes =
    filter !== ""
      ? anecdotes.filter((e) => e.content.includes(filter))
      : anecdotes;

  const vote = (id) => {
    dispatch({type: "anecdotes/incrementVote", payload: {id}});
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
