import * as blogPostService from './../services/blogpost-service.js';
import { setResponse, setError } from './response-handler.js';

// Get all the existing blogs
export const getAllBlogPosts = async (request, response) => {
    try {
        const params = { ...request.query };
        const blogPosts = await blogPostService.getAllBlogPosts(params);
        if (blogPosts.length) {
            setResponse(blogPosts, response, 200);
        }
        else {
            setResponse({ message: 'Blog posts not found' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

// Get a Blog by Id
export const getBlogPostsById = async (request, response) => {
    try {
        const id = request.params.blogId;
        const blogPost = await blogPostService.getBlogPostsById(id);
        if (blogPost) {
            setResponse(blogPost, response, 200);
        }
        else {
            setResponse({ message: 'Blog post not found' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

// Search a blog post based on keyword
export const getBlogPostsByKeyword = async (request, response) => {
    try {
        const keyword = request.params.keyword;
        const blogPosts = await blogPostService.getBlogPostsByKeyword(keyword);
        if (blogPosts.length) {
            setResponse(blogPosts, response, 200);
        }
        else {
            setResponse({ message: 'Matching blog posts not found' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

// Create a new blog
export const createBlogPost = async (request, response) => {
    try {
        const newBlogPost = { ...request.body };
        const blogPost = await blogPostService.createBlogPost(newBlogPost);
        if (blogPost) {
            setResponse(blogPost, response, 200);
        }
        else {
            setResponse({ message: 'Blog post not created' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

// Update a blog by Id
export const updateBlogPost = async (request, response) => {
    try {
        const id = request.params.blogId;
        const updatedBlog = { ...request.body };
        const blogPost = await blogPostService.updateBlogPost(id, updatedBlog);
        if (blogPost) {
            setResponse(blogPost, response, 200);
        }
        else {
            setResponse({ message: 'Blog to be updated is not found' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

// Delete a blog by Id
export const deleteBlogPost = async (request, response) => {
    try {
        const id = request.params.blogId;
        const blogPost = await blogPostService.deleteBlogPost(id);
        if (blogPost) {
            setResponse({ message: 'Blog deleted successfully' }, response, 200);
        }
        else {
            setResponse({ message: 'Blog to be deleted is not found' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

export const addBlogPostComment = async (request, response) => {
    try {
        const id = request.params.blogId;
        const Comment = { ...request.body };
        Comment.blog = id;
        console.log(Comment);
        const blogPost = await blogPostService.addBlogPostComment(id, Comment);
        if (blogPost) {
            setResponse(blogPost, response, 200);
        }
        else {
            setResponse({ message: 'Blog is not found' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

export const getBlogPostsByAuthor = async(request, response) => {
    try {
        const authorId = request.params.authorId;
        const blogPosts = await blogPostService.getBlogPostsByAuthor(authorId);
        if (blogPosts.length) {
            setResponse(blogPosts, response, 200);
        }
        else {
            setResponse({ message: 'Matching blog posts not found' }, response, 404);
        }
    } catch (error) {
        setError(error, response);
    }
};

