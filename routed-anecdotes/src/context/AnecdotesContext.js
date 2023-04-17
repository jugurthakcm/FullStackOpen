import {createContext, useReducer} from "react";

const initialState = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1,
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2,
  },
];

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    default:
      return state;
  }
};

const AnecdoteContext = createContext();

export const AnecdoteContextProvider = (props) => {
  const [anecdotes, dispatchAnecdotes] = useReducer(
    anecdoteReducer,
    initialState
  );

  return (
    <AnecdoteContext.Provider value={[anecdotes, dispatchAnecdotes]}>
      {props.children}
    </AnecdoteContext.Provider>
  );
};

export default AnecdoteContext;
