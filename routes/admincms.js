const express = require("express");
const router = express.Router();
const Blogs = require('../models/Blogs')
const User = require('../models/User');
const fetchUser = require('../middleware/fetchuser')

//routes needed : Ferch User details, Fetch all posts by the user , delete post ,update post , Update Password and User Name ;

router.get('/adminposts' ,fetchUser ,async(req,res)=>{
    try {
        const resp = await Blogs.find({user:req.user.id})
        res.json(resp)
    } catch (error) {
        res.send("error")
    }
}) //done
router.put('/updatepost/:id' , fetchUser ,async(req,res)=>{
    try {
        const {title , shortdesc , description , tag} = req.body;
        const upblog = {};
        if(title){upblog.title = title}
        if(shortdesc){upblog.shortdesc = shortdesc}
        if(description){upblog.description = description}
        if(tag){upblog.tag = tag}
        let blog = await Blogs.findById(req.params.id);
        const sc = await Blogs.findByIdAndUpdate(req.params.id ,{$set:upblog} ,{new:true})
        res.json(sc)
    } catch (error) {
        res.send("error")
    }
}) //done

router.delete('/deletepost/:id' , fetchUser , async(req,res)=>{
    try {
        const resp = await Blogs.findByIdAndDelete(req.params.id);
        res.send("deleted")
    } catch (error) {
        res.send("error")
    }
})
module.exports = router