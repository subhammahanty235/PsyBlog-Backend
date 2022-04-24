const mongoose = require('mongoose')
const {Schema} = mongoose;

const BlogSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title:{
        type :String,
        required:true
    },
    shortdesc:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    uploaded:{
        type:Date,
        default:Date.now
    },
    uploadedBy:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    likes:{
        type:"Number",
        default:0,
    },
    likedBy:[String],

})

module.exports = mongoose.model('posts' , BlogSchema);