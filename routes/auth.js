require('dotenv').config()
const express = require('express')
const User = require('../models/User')
const router = express.Router();
const jwt = require('jsonwebtoken')
const  fetchUser = require('../middleware/fetchuser')
const jwt_sec = "Psyblogtokenpw"

//create a admin , admin can post 
//fileds required : name , email ,password 
router.post('/createadmin',async(req,res)=>{
    let success = false;
    try {
        let user = await User.findOne({email : req.body.email})
        if(user){
            return res.status(404).json({error:error.array()})
        }

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            profilepic:req.body.dpurl
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken  = jwt.sign(data , process.env.JWT_TOKEN);
        success = true;
        res.send(success)
    } catch (error) {
        console.error(error.message)
        message = "Internal Server error , please try again later"
        res.status(500).send(success)
    }
})
//admin log in 
router.post('/adminlogin' , async(req ,res)=>{
    const {email ,password}  = req.body;
    let success = false;
    try {
        let user = await User.findOne({email});
        if (!user) {
            
            return res.status(404).json({ error: "User with this email doesn't exists" });
          }
        let pwcompare = false;
        if(password === user.password)pwcompare = true;
        else{
            return res.status(404).json({ error: "Please try to log in with correct credentials" });
        }
        const data ={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data , process.env.JWT_TOKEN);
        success = true;
        res.json({authtoken , success});

    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    }
})
//get admin details 
router.post('/getadmininfo' ,fetchUser, async(req,res)=>{
    try {
        let userid = req.user.id

        const user = await User.findById(userid)
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server erraaaaor")
    }
})

module.exports = router ;