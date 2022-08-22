const {
  sendError,
  sendSuccessRes,
  sendinternalServerError
} = require("../utils/responseHelpers");

const { User, Document, Experience } = require("../models");

// ADMIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admins = [
      {
        email: "inspire.admin@gmail.com",
        password: "1234"
      }
    ];

    const admin = admins.find((a) => {
      return a.email == email, a.password == password;
    });

    if (!admin) {
      return sendError(res, 400, {
        message: "Invalid admin login credentials"
      });
    }

    return sendSuccessRes(res, 200, {
      message: "User logged in successfully",
      user: admin
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});

    return sendSuccessRes(res, 200, {
      message: "User logged in successfully",
      users: users
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        uuid: userId
      }
    });
    const docs = await Document.findAll({
      where: {
        uuid: userId
      }
    });
    const exps = await Experience.findAll({
      where: {
        uuid: userId
      }
    });

    return sendSuccessRes(res, 200, {
      message: "User data fetched successfully",
      data: {
        user: user,
        documents: docs,
        experiences: exps
      }
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const editUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        uuid: userId
      }
    });

    for (const [key, value] of Object.entries(req.body)) {
      console.log({ key, value });
      user[key] = value;
    }

    await user.save();

    return sendSuccessRes(res, 200, {
      message: "User data updated successfully",
      user: user
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const validateDocument = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fileId, status } = req.body;

    const doc = await Document.findOne({
      where: {
        uuid: userId,
        fileId: fileId
      }
    });

    doc.status = +status;

    await doc.save();

    const docs = await Document.findAll({
      where: {
        uuid: userId
      }
    });

    return sendSuccessRes(res, 200, {
      message: "Document status updated successfully",
      documents: docs
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

module.exports = {
  adminLogin,
  getAllUsers,
  getUserData,
  editUserData,
  validateDocument
};
