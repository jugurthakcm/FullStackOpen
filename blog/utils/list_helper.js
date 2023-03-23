const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => acc + val.likes, 0);
};


const favoriteBlog = (blogs) => {
  const {title, author, likes} = blogs.reduce((acc, curr) => {
    return acc.likes > curr.likes ? acc : curr
  })

  return {title, author, likes}
}
module.exports = {dummy, totalLikes, favoriteBlog};
