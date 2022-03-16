module.exports = async () => {
  process.on("unhandledRejection", (e: Error) => {
    console.log(e); // log the error
    throw e;
  });
};
