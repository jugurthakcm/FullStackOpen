import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    incrementVote(state, action) {
      const id = action.payload.id;
      const anecdoteToChange = state.find((e) => e.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((e) =>
        e.id === changedAnecdote.id ? changedAnecdote : e
      );
    },
    createAnecdotes(state, action) {
      return [
        ...state,
        { content: action.payload.content, id: getId(), votes: 0 },
      ];
    },

    getAnecdotes(state, action) {
      return [...state, ...action.payload];
    },
  },
});

export const { incrementVote, createAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
