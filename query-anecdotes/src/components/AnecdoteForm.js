import { useMutation, useQueryClient } from "react-query";
import { addAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (content) => addAnecdote(content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    mutation.mutate(content);

    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
