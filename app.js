const express = require("express");
const app = express();

const {connect} = require('./database/connection.js');

//always return json objects
app.use(express.json());

const database = async () => {
    await connect();
}

database();

const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route")

//common headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST", "PUT", "DELETE");
    next();
});


app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute)

module.exports = app;