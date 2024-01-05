// imports
const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

// route to create a new blog post
router.post("/", withAuth, async (req, res) => {
    console.log(req.body);
    try {
      const newBlogPost = await BlogPost.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlogPost);
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });