const Post = require("../../../comic-reader-data/schemas/post")
const validationHandler = require("../../helpers/validationHandler")

exports.index = (req, res) => {
    res.send({ message: "hi I am a comic" });
};

exports.store = async (req, res, next) => {
    try{
        validationHandler(req);

        let post = new Post();
        post.description = req.body.description;
        post.image = req.file.filename;
        post = await post.save();
        res.send(post);
    }catch(err){
        next(err);
    }

};