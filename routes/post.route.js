const express = require("express");
const router = express.Router();
const AuthMiddleware = require("./../middleware/auth.middleware")
const MulterMiddleware = require("./../middleware/multer.middleware")

const postController = require("../controller/post.controller");

router.get("/", postController.getAll);

router.use(AuthMiddleware);
router.post("/", MulterMiddleware , postController.create);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

module.exports = router;
