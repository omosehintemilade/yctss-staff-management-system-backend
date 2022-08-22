const {
  adminLogin,
  getAllUsers,
  getUserData,
  editUserData,
  validateDocument
} = require("../controllers/admins");

const router = require("express").Router();

router.post("/login", adminLogin);

router.get("/users", getAllUsers);

router.get("/user/:userId", getUserData);

router.patch("/user/:userId", editUserData);

router.patch("/user/:userId/document", validateDocument);

module.exports = router;
