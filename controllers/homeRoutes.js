// imports
const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        // get all blogPosts and JOIN with user data and comment data
        const blogPostData = await BlogPost.findAll({
          include: [
            {
              model: User,
              attributes: ["name"],
            },
            {
              model: Comment,
              attributes: ["comment_body"],
            },
          ],
        });
    
        // serialize data so the template can read it
        const blogPosts = blogPostData.map((blogPost) =>
          blogPost.get({ plain: true })
        );
    
        // pass serialized data and session flag into template
        res.render("homepage", {
          blogPosts,
          logged_in: req.session.logged_in,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });