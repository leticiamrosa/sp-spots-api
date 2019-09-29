const express = require("express");

// Controllers
const authController = require("./controllers/authController/authController");
const userController = require("./controllers/userController/userController");
const routes = express.Router();

routes.post("/auth", authController.auth);
routes.post("/users/create", authController.create);
// routes.get("/users", userController.getAll);

// router.get("/search", (req, res) => {
//   setImmediate(() => {
//     const jsonStr = req.query.params;
//     try {
//       const jsonObj = JSON.parse(jsonStr);

//       res.send("Success");
//     } catch (e) {
//       res.status(400).send("Invalid JSON string");
//     }
//   });
// });

// routes.post(
//   "/users",
//   multer(multerConfig).single("file"),
//   userController.store
// );

// routes.get("/users", userController.index);

module.exports = routes;
