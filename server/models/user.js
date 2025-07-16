const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    docname: {
        type: String,
        required: true
    },  
    docspec: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    aboutdoc: {
        type: String
    }
});

const User = mongoose.model("save", userSchema);

module.exports = User;
