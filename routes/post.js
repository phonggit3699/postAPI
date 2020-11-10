const express = require('express');
const postModel = require('../models/post');
const verifyToken = require('../middlewares/verifyToken');
const postRouter = express.Router();

postRouter.get('/post', async (req, res) => {
    try {
        const posts = await postModel.find();
        res.json(posts);
    }
    catch (err) {
        res.json({ error: err });
    }
});

postRouter.get('/newPost', async (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('./post', {
        url: fullUrl
    });  
});

postRouter.post('/newPost', async (req, res) => {

    const post = new postModel({
        title: req.body.title,

        img: req.body.img,

        des: req.body.des,

        post: req.body.post,

        author: req.body.author
    });

    try {
        const savePost = await post.save();
        res.json({ status: "sucess"});
    }
    catch (err) {
        res.json({error: err.message});
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


module.exports = postRouter;