const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const sumLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favouriteBlog = (blogs) => {
  return blogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    0
  );
};

const mostBlogs = (blogs) => {
  const arr = [];
  blogs.forEach((blog) => arr.push(blog.author));
  let totalBlogsByAuth = _.countBy(arr);
  let authorName = Object.keys(totalBlogsByAuth).reduce((a, b) =>
    totalBlogsByAuth[a] > totalBlogsByAuth[b] ? a : b
  );
  return {
    author: authorName,
    blogs: totalBlogsByAuth[authorName],
  };
};

const mostLikes = (blogs) => {
  const arr = [];
  blogs.forEach((blog) => {
    let count = blog.likes;
    while (count > 0) {
      arr.push(blog.author);
      count -= 1;
    }
  });
  let totalLikesByAuth = _.countBy(arr);
  let authorName = Object.keys(totalLikesByAuth).reduce((a, b) =>
    totalLikesByAuth[a] > totalLikesByAuth[b] ? a : b
  );
  return {
    author: authorName,
    likes: totalLikesByAuth[authorName],
  };
};

module.exports = { dummy, sumLikes, favouriteBlog, mostBlogs, mostLikes };
