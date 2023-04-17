import React from "react";

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>

      <p>has {anecdote.votes} votes</p>

      <p>For more info, please check: {anecdote.info}</p>
    </div>
  );
};

export default Anecdote;
