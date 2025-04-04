const express = require("express");
const router = express.Router();
const AuthMiddleware = require("./../middleware/auth.middleware")

const postController = require("../controller/comment.controller");

router.post("/posts/:postId", AuthMiddleware, postController.create);
router.put("/:id", AuthMiddleware, postController.update);
router.delete("/:id", AuthMiddleware, postController.delete);

module.exports = router;
