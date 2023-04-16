import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery, useMutation, useQueryClient } from "react-query";

import { getAnecdotes, incrementVote } from "./services/anecdotes";

const App = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (anecdote) => incrementVote(anecdote),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isLoading) return <div>Loading data...</div>;

  if (result.isError) return <div>Problem communicating with the server</div>;

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    mutation.mutate(changedAnecdote);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
