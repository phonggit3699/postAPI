const express = require('express');
const postModel = require('../models/post.model');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
res.send("post");
    // res.render('./post');
});

postRouter.post('/', async (req, res) => {
    const post = new postModel({
        title: req.body.title,

        img: req.body.img,

        des: req.body.des,

        post: req.body.post,

        author: "Phong"
    });

    try {
        const savePost = await post.save();
        res.redirect('/todo/todolist')
    }
    catch (err) {
        console.log(err)
    }

});

module.exports = postRouter;