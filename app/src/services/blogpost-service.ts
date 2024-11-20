import { useState } from "react";
import { BlogPost } from "../models/blogpost";

const serverURL = 'http://localhost:3000';

// Get all the blogs available
const getBlogs = async () => {
  const response = await fetch(`${serverURL}/blogposts`, {
    method: 'GET',
  })
  return response.json();
}

// Get a blog based on Id
const getBlogPostById = async (blog_id: string) => {
  const response = await fetch(`${serverURL}/blogposts/${blog_id}`, {
    method: 'GET',
  })
  return response.json();
}

// Update a blog based on Id
const updateBlogPostById = async (blog: BlogPost) => {
  const response = await fetch(`${serverURL}/blogposts/${blog._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      likes: blog.likes,
      dislikes: blog.dislikes
      
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to update blog post likes');
  }
  else
    return response.json();
};

// Create a blog
const createBlogPost = async (title: string, content: string, image: string, author: any) => {
  // console.log(formData);
  const response = await fetch(`${serverURL}/blogposts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
      image: image,
      author: author
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to create blog post');
  }
  else
    return response.json();
};

// Search a blog based on keyword
const searchBlogByKeyword = async (keyword: string) => {
  const response = await fetch(`${serverURL}/blogposts/search/${keyword}`, {
    method: 'GET',
  })
  return response.json();
};

// Add comment on the blog
const addBlogPostComment = async (blog: BlogPost, comment: string) => {
  const response = await fetch(`${serverURL}/blogposts/comments/${blog._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: comment,
      createdBy: blog.author._id
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }
  else
    return response.json();
};

// Get blogs based on author
const getBlogPostsByAuthor = async (authorId: string) => {
  const response = await fetch(`${serverURL}/blogposts/author/${authorId}`, {
    method: 'GET',
  })
  return response.json();
};

// Delete blogs based on Id
const deleteBlogPostById = async(blog_id: string) => {
  try {
    const response = await fetch(`${serverURL}/blogposts/${blog_id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

const blogpostService = {
  getBlogs,
  getBlogPostById,
  updateBlogPostById,
  createBlogPost,
  searchBlogByKeyword,
  addBlogPostComment,
  getBlogPostsByAuthor,
  deleteBlogPostById
};

export default blogpostService;
