import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

const initialBlog = {
  title: "Javascript Creation",
  url: "www.javascript.com",
  likes: 12,
  author: "Steve",
  user: {
    name: "Jugurtha Kacimi",
  },
};

test("renders title of the blog", () => {
  render(<Blog blog={initialBlog} />);

  const titleAuthor = screen.getByText("Javascript Creation Steve");

  expect(titleAuthor).toBeDefined();
});

describe("Toggle View", () => {
  test("if likes and url aren't shown in the beginning", () => {
    render(<Blog blog={initialBlog} />);
    const url = screen.queryByText("www.javascript.com");
    const likes = screen.queryByText("12");
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("if view button is clicked then url and likes will be rendered", async () => {
    render(<Blog blog={initialBlog} />);
    const user = userEvent.setup();
    const button = screen.getByText("View");

    await user.click(button);

    const url = screen.queryByText("www.javascript.com");
    const likes = screen.queryByText("12");

    expect(url).toBeVisible();
    expect(likes).toBeVisible();
  });
});

test("if like button is clicked twice then component receive two event handlers", async () => {
  const mockHandler = jest.fn();
  render(<Blog blog={initialBlog} incrementLikes={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("View");

  await user.click(button);

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("if create blog form updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();

  const user = userEvent.setup();

  render(<CreateBlog addBlog={createBlog} />);

  const title = screen.getByPlaceholderText("Title");
  const author = screen.getByPlaceholderText("Author");
  const url = screen.getByPlaceholderText("Url");

  const submit = screen.getByText("Submit");

  await user.type(title, "Javascript Creation");
  await user.type(author, "Steve");
  await user.type(url, "www.javascript.com");

  await user.click(submit);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toBe("Javascript Creation");
  expect(createBlog.mock.calls[0][1]).toBe("Steve");
  expect(createBlog.mock.calls[0][2]).toBe("www.javascript.com");
});
