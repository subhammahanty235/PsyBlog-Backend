require('dotenv').config()
const express = require('express')
const connectToDB = require('./database')
const cors = require('cors')
connectToDB()
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json());
//routes

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/posts' , require('./routes/posts'))
app.use('/api/admin' , require('./routes/admincms'))
//listening to server
app.listen(port , ()=>{
    console.log("Server Statred")
})