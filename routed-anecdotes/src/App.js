import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Route, Routes, useMatch} from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import AnecdoteContext from "./context/AnecdotesContext";
import notificationContext from "./context/NotificationContext";

const App = () => {
  const [anecdotes, dispatchAnecdotes] = useContext(AnecdoteContext);
  const navigate = useNavigate();
  const [notification, dispatchNotification] = useContext(notificationContext);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    dispatchAnecdotes({type: "ADD", payload: anecdote});
    dispatchNotification({
      type: "showNotification",
      payload: `A new anecdote ${anecdote.content} has been created!`,
    });

    navigate("/");

    setTimeout(() => {
      dispatchNotification({type: "clearNotification"});
    }, 5000);
  };

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   };

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  // };

  const match = useMatch("/anecdotes/:id");

  const anecdote = match
    ? anecdotes.find((e) => e.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      {notification.visible && <p>{notification.content}</p>}

      <Routes>
        <Route
          exact
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
