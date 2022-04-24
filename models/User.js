const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    joinedDate:{
        type:Date,
        default:Date.now
    },
    profilepic:{
        type:String
    }
})
const User = mongoose.model('user' , UserSchema);
module.exports = User;