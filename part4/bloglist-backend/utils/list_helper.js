const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const likesSum = likes.reduce((sum, cur) => sum + cur, 0);

  return likesSum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'There are no blogs in the list';
  }

  if (blogs.length === 1) {
    return blogs[0];
  }

  const favorite = blogs.reduce(
    (max, cur) => (cur.likes > max.likes ? cur : max),
    blogs[0],
  );

  return favorite;
};

module.exports = { dummy, totalLikes, favoriteBlog };
