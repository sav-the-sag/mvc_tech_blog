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

// route set up to find single blog post and render blogPost page
router.get("/blogPost/:id", withAuth, async (req, res) => {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id, {
        // Join user data and comment data with blog post data
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Comment,
            include: [User],
          },
        ],
      });
  
      const blogPost = blogPostData.get({ plain: true });
      console.log(blogPost);
  
      res.render("blogPost", {
        ...blogPost,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
      res.redirect("/login");
    }
  });

// route to allow logged in user access to the dashboard page
// use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
    try {
      // find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        // join user blog post and comment data with user data
        include: [
          {
            model: BlogPost,
            include: [User],
          },
          {
            model: Comment,
          },
        ],
      });
  
      const user = userData.get({ plain: true });
      console.log(user)
  
      res.render("dashboard", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });