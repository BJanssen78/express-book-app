const errorHandler = (err, req, res, next) => {
  // TODO: Implement error handling middleware
  console.log(err);
  res
    .status(500)
    .json({ message: "Error code 500: Server error, Something went wrong" });
};

export default errorHandler;
