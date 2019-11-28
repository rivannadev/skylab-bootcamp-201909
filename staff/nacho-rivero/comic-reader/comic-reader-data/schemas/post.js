const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    image: { type: String, required: true },
    description: { type: String, required: true }

});

module.exports = mongoose.model("post", PostSchema);