import { useMutation, useQueryClient } from "react-query";
import { addAnecdote } from "../services/anecdotes";
import { useContext } from "react";
import notificationContext from "../context/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const dispatch = useContext(notificationContext)[1];

  const mutation = useMutation({
    mutationFn: (content) => addAnecdote(content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
    onError: ({ response }) => {
      dispatch({ type: "showNotification", payload: response.data.error });

      setTimeout(() => {
        dispatch({ type: "clearNotification", payload: response.data.error });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    mutation.mutate(content);

    dispatch({ type: "showNotification", payload: "Anecdote created" });

    event.target.anecdote.value = "";

    setTimeout(() => {
      dispatch({ type: "clearNotification" });
    }, 3000);
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
