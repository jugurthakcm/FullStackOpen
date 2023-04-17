import {Link} from "react-router-dom";

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <p  key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </p>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
