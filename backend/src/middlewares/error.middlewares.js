export const erroHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(`Error Stack: ${err.stack}`);

  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
