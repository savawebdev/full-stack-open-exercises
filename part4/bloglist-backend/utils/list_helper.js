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

const mostBlogs = (blogs) => {
  const authors = [...new Set(blogs.map((blog) => blog.author))];

  const authorsBlogs = [];

  authors.forEach((author) => {
    const totalBlogs = blogs.reduce(
      (sum, cur) => (cur.author === author ? sum + 1 : sum),
      0,
    );

    authorsBlogs.push({ author, blogs: totalBlogs });
  });

  console.log(authorsBlogs);

  const mostBlogsAuthor = authorsBlogs.reduce(
    (max, cur) => (cur.blogs > max.blogs ? cur : max),
    authorsBlogs[0],
  );

  return mostBlogsAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
