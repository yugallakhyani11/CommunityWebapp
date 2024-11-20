// services/food-post-service.js

import FoodPost from '../models/food-post.js';

/**
 * Fetches all existing food posts.
 * @returns {Promise<Array>} Array of food posts.
 */
export const getAllFoodPosts = async () => {
    const foodPosts = await FoodPost.find().exec();
    return foodPosts;
};

/**
 * Retrieves a food post by its ID.
 * @param {string} id - ID of the food post to retrieve.
 * @returns {Promise<Object|null>} The retrieved food post, or null if not found.
 */
export const getFoodPostById = async (id) => {
    const foodPost = await FoodPost.findById(id).exec();
    return foodPost;
};

/**
 * Creates a new food post.
 * @param {Object} foodPostData - Data for the new food post.
 * @returns {Promise<Object>} The added food post.
 */
export const createFoodPost = async (foodPostData) => {
    const newFoodPost = new FoodPost(foodPostData);
    return await newFoodPost.save();
};

/**
 * Updates an existing food post.
 * @param {string} id - ID of the food post to update.
 * @param {Object} updatedData - Updated data for the food post.
 * @returns {Promise<Object|null>} The updated food post, or null if not found.
 */
export const updateFoodPost = async (id, updatedData) => {
    const updatedFoodPost = await FoodPost.findByIdAndUpdate(id, updatedData, { new: true }).exec();
    return updatedFoodPost;
};

/**
 * Deletes an existing food post.
 * @param {string} id - ID of the food post to delete.
 * @returns {Promise<Object|null>} The deleted food post, or null if not found.
 */
export const deleteFoodPostById = async (id) => {
    const deletedFoodPost = await FoodPost.findByIdAndDelete(id).exec();
    return deletedFoodPost;
};

/**
 * Filters food posts based on provided criteria.
 * @param {Object} filterCriteria - Criteria to filter food posts.
 * @returns {Promise<Array>} Array of filtered food posts.
 */
export const searchFoodPosts = async (filterCriteria) => {
    const foodPosts = await FoodPost.find(filterCriteria).exec();
    return foodPosts;
};



