import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

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

  console.log(mockHandler);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
