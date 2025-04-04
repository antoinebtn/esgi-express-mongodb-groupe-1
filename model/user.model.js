const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const user = new Schema({
    email: {
        type: String,
        unique: true,
        validate: function(value){
            return /.+@.+/.test(value);
        }
    },
    username: {
        type: String,
        unique: true
    },
    password: String
});

const User = mongoose.model('User',user);

module.exports = User;