const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { User, Document, Experience } = require("../models");
const { generateRandomCode } = require("../utils/fns");
const {
  sendSuccessRes,
  sendinternalServerError,
  sendError
} = require("../utils/responseHelpers");

const genStaffId = async () => {
  let staffId = generateRandomCode();

  const existingUser = await User.findOne({ where: { staffId: staffId } });

  if (existingUser) {
    genStaffId();
  } else {
    return staffId;
  }
};
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, phonenumber } = req.body;
    console.log({ email, password, phonenumber });

    // confirm that the gen. id does not exist in the DB
    const staffId = await genStaffId();

    const user = await User.create({
      email,
      phonenumber,
      password,
      staffId
    });

    return sendSuccessRes(res, 201, {
      message: "User created successfully",
      user: user
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, id, password } = req.body;

    console.log({ email, id, password });
    if (!email && !id) {
      return sendError(res, 400, {
        message: "Email or Staff ID is required"
      });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email || "" }, { staffId: id || "" }],
        password: password
      }
    });

    if (!user) {
      return sendError(res, 400, { message: "Invalid username/password" });
    }

    return sendSuccessRes(res, 201, {
      message: "User logged in successfully",
      user: user
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const editProfile = async (req, res) => {
  try {
    const { uuid: userId } = req.user;

    // Don't edit email
    delete req.body.email;

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

    return sendSuccessRes(res, 201, {
      message: "Biodata Updated successfully",
      user: user
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const uploadProfilePics = async (req, res) => {
  try {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      fs.unlink(tempPath, function () {
        if (err) throw err;
        return sendError({ message: "Only image files are allowed" });
      });
    }
    const tempPath = req.file.path;
    let originalName = req.file.originalname.replace(" ", "-");
    originalName = `${Date.now()}_${originalName}`;

    const targetPath = path.resolve("./public/uploads/" + originalName);

    fs.rename(tempPath, targetPath, function (err) {
      if (err) throw err;
      return sendSuccessRes(res, 201, {
        message: "Profile picutre uploaded successfully",
        url: `/uploads/${originalName}`
      });
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const resourceUpload = async (req, res) => {
  try {
    const { uuid: userId } = req.user;

    // console.log({ file: req.file, body: req.body.filename });
    // return;
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|pdf|PDF)$/)) {
      fs.unlink(tempPath, function () {
        if (err) throw err;
        return sendError({
          message: "Only image files and pdf files are allowed"
        });
      });
    }

    await Document.create({
      name: req.body.filename,
      fileId: generateRandomCode(),
      uuid: userId
    });

    const documents = await Document.findAll({
      where: {
        uuid: userId
      }
    });

    return sendSuccessRes(res, 201, {
      message: "Document uploaded successfully",
      data: documents
    });
  } catch (error) {
    return sendinternalServerError(res, error);
  }
};

const getUploads = async (req, res) => {
  const { uuid: userId } = req.user;
  const docs = await Document.findAll({
    where: {
      uuid: userId
    }
  });

  return sendSuccessRes(res, 200, {
    message: "Files retrieved successfully",
    data: docs
  });
};

const getExperience = async (req, res) => {
  const { uuid: userId } = req.user;
  const exp = await Experience.findAll({
    where: {
      uuid: userId
    }
  });

  return sendSuccessRes(res, 200, {
    message: "Experience retrieved successfully",
    data: exp
  });
};

const createExperience = async (req, res) => {
  try {
    const { uuid: userId } = req.user;
    const exp = await Experience.create({
      ...req.body,
      uuid: userId
    });

    return sendSuccessRes(res, 201, {
      message: "Experience created successfully",
      data: exp
    });
  } catch (error) {
    sendinternalServerError(res, error);
  }
};

const deleteFile = async (req, res) => {
  try {
    const { uuid: userId } = req.user;
    const { fileId } = req.params;
    await Document.destroy({
      where: {
        uuid: userId,
        fileId: fileId
      }
    });
    const files = await Document.findAll({
      where: {
        uuid: userId
      }
    });
    return sendSuccessRes(res, 201, {
      message: "File deleted successfully",
      data: files
    });
  } catch (error) {
    sendinternalServerError(res, error);
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { uuid: userId } = req.user;
    const { eId } = req.params;
    await Experience.destroy({
      where: {
        uuid: userId,
        id: eId
      }
    });
    const files = await Experience.findAll({
      where: {
        uuid: userId
      }
    });
    return sendSuccessRes(res, 201, {
      message: "Experience item deleted successfully",
      data: files
    });
  } catch (error) {
    sendinternalServerError(res, error);
  }
};
module.exports = {
  createUser,
  login,
  editProfile,
  uploadProfilePics,
  resourceUpload,
  getUploads,
  getExperience,
  createExperience,
  deleteFile,
  deleteExperience
};
