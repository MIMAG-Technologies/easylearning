// Middleware function for handling 404 errors (Not Found)
const notFoundHandler = (req, res, next) => {
  return res.status(404).send(`<h1>Route Not Found!</h1>`);
};

module.exports = notFoundHandler;
