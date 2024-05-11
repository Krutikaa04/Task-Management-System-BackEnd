const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required:true
    },
    gender:{
        type: String,
        required: true
    },
    role:{
        type: ObjectId,
        ref: "Roles",
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now(),
        required: true
    },
    profilePic: {
        type: String
    },
    status:{
        type: String
    }
   
 
})

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;