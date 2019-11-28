const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorHandler = require("./helpers/errorHandler");
const postRoutes = require("./routes/post/index");
const app = express();

app.use(cors()); //I use "use" to make those libraries avaliable inside the API

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rest-api-node", { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); //This allows me to serve static files like the comics
app.use("/api/post", postRoutes);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening");
});