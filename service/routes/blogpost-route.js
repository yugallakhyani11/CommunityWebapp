import express from "express";
import * as blogPostController from './../controllers/blogpost-controller.js';

const BlogRouter = express.Router();

// Get all the blogposts and create a blog post
BlogRouter.route('/')
    .get(blogPostController.getAllBlogPosts)
    .post(blogPostController.createBlogPost);

// Get blogposts that match with the keyword searched
BlogRouter.route('/search/:keyword')
    .get(blogPostController.getBlogPostsByKeyword);

// Get, update, delete a blog by Id passed
BlogRouter.route('/:blogId')
    .get(blogPostController.getBlogPostsById)
    .put(blogPostController.updateBlogPost)
    .put(blogPostController.addBlogPostComment)
    .delete(blogPostController.deleteBlogPost);

    BlogRouter.route('/comments/:blogId')
    .put(blogPostController.addBlogPostComment)

BlogRouter.route('/author/:authorId')
    .get(blogPostController.getBlogPostsByAuthor);
    

export default BlogRouter;