const { User } = require("./models");
const {
  sendError,
  sendinternalServerError
} = require("./utils/responseHelpers");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["token"];

    if (!token || token == "undefined") {
      return sendError(res, 401, {
        message: "Invalid request headers. Failed to authenticate token."
      });
    }

    const user = await User.findOne({
      where: {
        uuid: token
      }
    });
    if (!user) {
      return sendError(res, 401, { message: "This user is not recognized" });
    }

    req.user = user;

    next();
  } catch (error) {
    sendinternalServerError(res, error);
  }
};

module.exports = { verifyUser };
