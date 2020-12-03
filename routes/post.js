const express = require('express');
const postModel = require('../models/postv2');
const {verifyToken} = require('../middlewares/verifyToken');
const postRouter = express.Router();

postRouter.get('/post', async (req, res) => {
    const offset = parseInt(req.params.skip);
    const limitPost = parseInt(req.params.limit);
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
});


postRouter.get('/post/:skip/:limit', async (req, res) => {
    const offset = parseInt(req.params.skip);
    const limitPost = parseInt(req.params.limit);
    try {
        const posts = await postModel.find().limit(limitPost).skip(offset).sort({date: -1});
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
});

postRouter.get('/countPost', async (req, res) => {
    try {
        const countPost =  await postModel.countDocuments();
        res.json(countPost);
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


postRouter.get('/newPost',verifyToken, async (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('./post', {
        url: fullUrl
    });  
});

postRouter.post('/newPost',verifyToken ,async (req, res) => {

    const paragraph1 = req.body.paragraph1.replace(/\n/g, "<br />");
    const paragraph2 = req.body.paragraph2.replace(/\n/g, "<br />");
    const paragraph3 = req.body.paragraph3.replace(/\n/g, "<br />");

    const post = new postModel({

        title: req.body.title,

        img: req.body.img,

        des: req.body.des,

        heading1: req.body.heading1,

        paragraph1: paragraph1,

        img2: req.body.img2,

        heading2: req.body.heading2,

        paragraph2: paragraph2,

        img3: req.body.img3,

        heading3: req.body.heading3,

        paragraph3: paragraph3,

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