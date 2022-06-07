const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const likesSum = likes.reduce((sum, cur) => sum + cur, 0);

  return likesSum;
};

module.exports = { dummy, totalLikes };
