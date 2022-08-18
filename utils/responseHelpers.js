const { isRequired } = require("./fns");

const sendSuccessRes = (res, status, data) => {
  res.status(status).json({ success: true, ...data });
};

const sendError = (res, status, error) => {
  if (!error.message) {
    error.message = isRequired("Error message");
  }
  res.status(status).json({
    success: false,
    ...error
  });
};

const sendinternalServerError = (res, error) => {
  console.log({ error });
  res.status(500).json({
    success: false,
    message:
      "We're sorry, an error occured on our end. We'll get it fixed as soon as possible"
  });
};

module.exports = {
  sendSuccessRes,
  sendinternalServerError,
  sendError
};
