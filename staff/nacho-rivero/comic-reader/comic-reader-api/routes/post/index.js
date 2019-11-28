const express = require("express");
const postController = require("../../logic/postController/index");
const uploadImage = require("../../helpers/multer");
const { hasDescription } = require("../../utils/validation")
const router = express.Router();

router.get('/', postController.index);
router.post('/', uploadImage('posts').single('image'), hasDescription, postController.store);

//router.patch("/:id", hasDescription, postController.update);
//router.delete("/:id", postController.delete);
module.exports = router;