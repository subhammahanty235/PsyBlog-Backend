const mongoose = require('mongoose')
mongoURL = "mongodb://localhost:27017/PsyBlog?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const connectToDB = ()=>{
    mongoose.connect(mongoURL , ()=>{
        console.log("connected Succesfully")
    })
}
module.exports = connectToDB;