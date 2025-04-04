const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");

router.get("/", postController.getAll);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

