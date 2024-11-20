import blogpostModel from "../models/blogpost.js";
import commentModel from "../models/comment.js";
 
/**
* Get all the existing blogs
*
* @param {*} params - parameter is not required to retrieve all the blogs
* @returns
*/
export const getAllBlogPosts = async (params = {}) => {
    const blogPosts = await blogpostModel.find(params)
        .populate('author')
        .populate({
            path: 'comments',
            populate: { path: 'createdBy' }})
        .exec(); 
    return blogPosts;
}

/**
* Get Blogs by Id
*
* @param {*} id
* @returns
*/
export const getBlogPostsById = async(id) => {
    const blogPost = await blogpostModel.findById(id)
        .populate('author')
        .populate({
            path: 'comments',
            populate: { path: 'createdBy' }})
        .exec();
    return blogPost;
}

/**
* Search a blog post based on keyword
*
* @param {*} keyword
* @returns
*/
export const getBlogPostsByKeyword = async (keyword) => {
    const blogPosts = await blogpostModel.find({
        $or: [
            { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in title
            { content: { $regex: keyword, $options: 'i' } } // Case-insensitive search in content
        ]
    }).populate('author')
    .populate({
        path: 'comments',
        populate: { path: 'createdBy' }})
        .exec();
    return blogPosts;
}

/**
* Create a new blog
*
* @param {*} newBlogPost
* @returns
*/
export const createBlogPost = async (newBlogPost) => {
    const blogPost = new blogpostModel(newBlogPost);
    blogPost
        .populate('author')
    return await blogPost.save();
}

/**
* Update a blog by Id
*
* @param {*} id
* @param {*} updatedBlog
* @returns
*/
export const updateBlogPost = async (id, updatedBlog) => {
    const updatedBlogPost = await blogpostModel.findByIdAndUpdate(id, updatedBlog, {new: true}).populate('author').populate({
        path: 'comments',
        populate: { path: 'createdBy' }}).exec();
    return updatedBlogPost;
}

/**
* Delete a blog by Id
*
* @param {*} id
* @returns
*/
export const deleteBlogPost = async (id) => {
    const deletedBlogPost = await blogpostModel.findByIdAndDelete(id).exec();
    return deletedBlogPost;
        
}

export const addBlogPostComment = async (id, comment) => {
    const newComment = new commentModel(comment);
    newComment.save();
    const blogPost = await blogpostModel.findById(id)
    .populate('author')
    .populate({
        path: 'comments',
        populate: { path: 'createdBy' }})
    .exec();
    blogPost.comments.push(newComment);
    return await blogPost.save();
}

export const getBlogPostsByAuthor = async (authorId) => {
    const blogPosts = await blogpostModel.find({ author: authorId })
        .populate('author')
        .populate({
            path: 'comments',
            populate: { path: 'createdBy' }
        })
        .exec();
    return blogPosts;
}

