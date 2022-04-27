const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Blogs = require('../models/Blogs');
const User = require('../models/User');

//routes

//fetch all notes , it doesn.t need any log in to fetch the blogs
router.get('/fetchblogs' , async(req,res)=>{
    try {
        const blogdata = await Blogs.find();
        res.json(blogdata);

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

//route to post a blog
router.post('/addblog' , fetchUser ,async(req,res)=>{
    try {
        const {title , shortdesc , description , uploadedBy ,tag} = req.body;
        const blog = new Blogs({
            title , shortdesc ,  description , uploadedBy ,tag ,user:req.user.id
        })
        const saveblog = await blog.save();
        res.json(saveblog)

    } catch (error) {
        return res.status(400).send(error.message)
    }
})
router.put('/likepost/:id' ,fetchUser, async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("email , -_id")
       
        const lists = await Blogs.findById(req.params.id).select("likedBy , -_id");
       
        let found = false;
        
            for(i =0 ;i<lists.likedBy.length;i++){
                if(lists.likedBy[i] === user.email){
                    found = true;
                   
                    break;
                }
            }
            if(found === false){
                let numlike = await Blogs.findById(req.params.id).select("likes , -_id")
                const resp = await Blogs.findByIdAndUpdate(req.params.id , {$set:{likes:numlike.likes+=1}})
                const respo = await Blogs.findByIdAndUpdate(req.params.id ,{$push:{likedBy:user.email}})
                res.send(found)
            }
            else{
                res.send(found)
            }
        
        
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.put('/dislikepost/:id' , async(req,res)=>{
    try {
        let post = await Blogs.findById(req.params.id);
        // let numlike = await Blogs.find({_id:req.params.id}).select("likes");
        let numlike = await Blogs.findById(req.params.id).select("likes , -_id")
        const resp= await Blogs.findByIdAndUpdate(req.params.id , {$set:{likes:numlike.likes-=1}});
        // res.send(res.json());
        res.send(numlike)
        
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.post('/add/:id',fetchUser,async(req,res)=>{
    const emailid = await User.findById(req.user.id).select("email , -_id");
    try {
        const addta = await Blogs.findByIdAndUpdate(req.params.id ,{$push:{likedBy:emailid.email},})
        res.send(addta)
    } catch (error) {
        res.send("error")
    }
})

module.exports = router