// imports
const User = require("./user");
const BlogPost = require("./blogPost");
const Comment = require("./comment");

// sets up relationship between tables and allows me to join them using Sequelize
User.hasMany(BlogPost, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(BlogPost, {
    foreignKey: "blogPost_id",
    onDelete: "CASCADE",
});

BlogPost.hasMany(Comment, {
    foreignKey: "blogPost_id",
    onDelete: "CASCADE",
});

// export
module.exports = { User, BlogPost, Comment };