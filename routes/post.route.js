const express = require("express");
const router = express.Router();
const AuthMiddleware = require("./../middleware/auth.middleware");

const postController = require("../controller/post.controller");
const postMiddleware = require("../middleware/post.middleware");

router.get("/", postController.getAll);

router.use(AuthMiddleware);
router.post("/", postController.create);

router.use(postMiddleware);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

module.exports = router;
