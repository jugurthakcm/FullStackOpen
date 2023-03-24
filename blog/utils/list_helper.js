const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => acc + val.likes, 0);
};

const favoriteBlog = (blogs) => {
  const {title, author, likes} = blogs.reduce((acc, curr) => {
    return acc.likes > curr.likes ? acc : curr;
  });

  return {title, author, likes};
};

const mostBlogs = (blogs) => {
  const countAuthorWithBlogs = _.countBy(blogs, "author");

  const author = _.maxBy(
    Object.keys(countAuthorWithBlogs),
    (n) => countAuthorWithBlogs[n]
  );

  const authorWithBlogs = _.pick(countAuthorWithBlogs, [author]);

  return {
    author: Object.keys(authorWithBlogs)[0],
    blogs: authorWithBlogs[author],
  };
};

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs};
