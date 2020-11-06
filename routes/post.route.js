const express = require('express');
const postModel = require('../models/post.model');

const postRouter = express.Router();


postRouter.get('/', async (req, res) => {
    res.send('Hello Worlds')
});
postRouter.get('/postAPI', async (req, res) => {
    try{
        const posts = await postModel.find();
        res.json(posts);
    }
    catch (err){
        res.json({error: err});
    }
});

postRouter.get('/newPost', async (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
   res.render('./post', {
       url: fullUrl
   });
   res.redirect('./post');
});


postRouter.get('/postAPI/:id', async (req, res) => {
    try{
        const posts = await postModel.findById(req.params.id);
        res.json(posts);
    }
    catch (err){
        res.json({error: err});
    }
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
        res.send(req);
    }
    catch (err) {
        console.log(err)
    }

});

module.exports = postRouter;