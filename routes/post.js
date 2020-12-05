const express = require('express');
const postModel = require('../models/post');
const { verifyToken } = require('../middlewares/verifyToken');
const postRouter = express.Router();

//get all post
postRouter.get('/post', async (req, res) => {
    const offset = parseInt(req.params.skip);
    const limitPost = parseInt(req.params.limit);
    try {
        //using mongooes to get post
        const posts = await postModel.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
});


//get post by limit and offset
postRouter.get('/post/:skip/:limit', async (req, res) => {
    const offset = parseInt(req.params.skip);
    const limitPost = parseInt(req.params.limit);
    try {
        //using mongooes to get post
        const posts = await postModel.find().limit(limitPost).skip(offset).sort({ date: -1 });
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
});

//get post by categories
postRouter.get('/category/:tag', async (req, res) => {

    //get category from url
    const category = req.params.tag;
    console.log('hello')
    try {
        //using mongooes to get post
        const posts = await postModel.find({ category: category }).limit(6).skip(0);
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
});


//count all post 
postRouter.get('/countPost', async (req, res) => {
    try {
        const countPost = await postModel.countDocuments();
        res.json(countPost);
    }
    catch (err) {
        res.json({ error: err });
    }
});

postRouter.get('/newPost', verifyToken, async (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('./post', {
        url: fullUrl
    });
});

postRouter.post('/newPost', verifyToken, async (req, res) => {

    const des = req.body.des.replace(/\n/g, "<br/>");
    const postContent= req.body.post.replace(/\n/g, "<br/>");

    const post = new postModel({

        title: req.body.title,

        img: req.body.img,

        des: des,

        post: postContent,
        
        author: req.body.author,
        
        category: req.body.category

    });

    try {
        const savePost = await post.save();
        res.json({ status: "sucess" });
    }
    catch (err) {
        res.json({ error: err.message });
    }

});

postRouter.get('/post/:id', async (req, res) => {
    try {
        const posts = await postModel.findById(req.params.id);
        res.json(posts);
    }
    catch (err) {
        res.json({ error: err });
    }
});


// postRouter.post('/post', async (req, res) => {
//     const offset = parseInt(req.body.skip);
//     const limitPost = parseInt(req.body.limit);
//     try {
//         const posts = await postModel.find().limit(limitPost).skip(offset).sort({Date: -1});

//         res.status(200).json(posts);

//     }
//     catch (err) {
//         res.json({ error: err });
//     }
// });



module.exports = postRouter;