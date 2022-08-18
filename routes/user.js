const multer = require("multer");

const {
  createUser,
  login,
  editProfile,
  uploadProfilePics,
  resourceUpload,
  getUploads,
  createExperience,
  getExperience,
  deleteFile,
  deleteExperience
} = require("../controllers/users");
const { verifyUser } = require("../middlewares");

// Set multer file storage folder
const upload = multer({ dest: "public/uploads/" });

const router = require("express").Router();

router.post("/create", createUser);

router.post("/login", login);

router.post("/profile/upload", upload.single("file"), uploadProfilePics);

router.patch("/biodata", verifyUser, editProfile);

router.post("/files/upload", upload.single("file"), verifyUser, resourceUpload);

router.get("/files", verifyUser, getUploads);

router.delete("/files/:fileId", verifyUser, deleteFile);

router.post("/experience/create", verifyUser, createExperience);

router.get("/experience", verifyUser, getExperience);

router.delete("/experience/:eId", verifyUser, deleteExperience);

module.exports = router;
