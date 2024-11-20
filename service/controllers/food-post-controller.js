import * as foodPostService from '../services/food-post-service.js';
import { setResponse, setError } from './response-handler.js';

// Controller function to retrieve all food posts
export const getFoodPosts = async (req, res) => {
    try {
        const foodPosts = await foodPostService.getAllFoodPosts();
        setResponse(foodPosts, res, 200);
    } catch (error) {
        setError(error, res);
    }
};

// Controller function to retrieve a food post by ID
export const getFoodPostById = async (req, res) => {
    try {
        const { fp_id } = req.params;
        const foodPost = await foodPostService.getFoodPostById(fp_id);
        if (foodPost) {
        setResponse(foodPost, res, 200);
        }
        else {
            setResponse({ message: 'Food post not found' }, res, 404); // Added status code 404
        }
    } catch (error) {
        setError(error, res);
    }
};

// Controller function to create a new food post
export const createFoodPost = async (req, res) => {
    try {
        const newFoodPost = req.body;
        const createdFoodPost = await foodPostService.createFoodPost(newFoodPost);
        setResponse(createdFoodPost, res, 201);
    } catch (error) {
        setError(error, res);
    }
};

// Controller function to update an existing food post
export const updateFoodPost = async (req, res) => {
    try {
        const { fp_id } = req.params;
        const updatedFoodPost = await foodPostService.updateFoodPost(fp_id, req.body);
        if (updatedFoodPost) {
        setResponse(updatedFoodPost, res, 200);
        }
        else {
            setResponse({ message: 'Food post not found' }, res, 404); // Added status code 404
        }
   
    } catch (error) {
        setError(error, res);
    }
};

// Controller function to delete a food post by ID
export const deleteFoodPostById = async (req, res) => {
    try {
        const { fp_id } = req.params;
        await foodPostService.deleteFoodPostById(fp_id);
        setResponse({ message: 'Food post deleted successfully' }, res, 204);
    } catch (error) {
        setError(error, res);
    }
};

// Controller function to search food posts based on criteria
export const searchFoodPosts = async (req, res) => {
    try {
        // Extracting search criteria from the query parameters
        const { keyword, startDate, endDate, minNumOfPeople, maxNumOfPeople, minShelfLife, maxShelfLife } = req.query;
        
        // Constructing the filter criteria
        const filterCriteria = {};
        
        // Adding keyword search criteria
        if (keyword) {
            filterCriteria.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }
        
        // Adding date range criteria
        if (startDate && endDate) {
            filterCriteria.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        // Adding numOfPeople range criteria
        if (minNumOfPeople && maxNumOfPeople) {
            filterCriteria.numOfPeople = {
                $gte: minNumOfPeople,
                $lte: maxNumOfPeople
            };
        }

        // Adding shelfLife range criteria
        if (minShelfLife && maxShelfLife) {
            filterCriteria.shelfLife = {
                $gte: minShelfLife,
                $lte: maxShelfLife
            };
        }

        // Fetching food posts based on the filter criteria
        const foodPosts = await foodPostService.searchFoodPosts(filterCriteria);
        
        // Sending the response
        setResponse(foodPosts, res, 200);
    } catch (error) {
        setError(error, res);
    }
};







































// import * as foodPostService from '../services/food-post-service.js';
// import { setResponse, setError } from './response-handler.js';

// // Controller function to retrieve all food posts
// export const getFoodPosts = async (req, res) => {
//     try {
//         const foodPosts = await foodPostService.getAllFoodPosts();
//         setResponse(foodPosts, res);
//     } catch (error) {
//         setError(error, res);
//     }
// };

// // Controller function to retrieve a food post by ID
// export const getFoodPostById = async (req, res) => {
//     try {
//         const { fp_id } = req.params;
//         const foodPost = await foodPostService.getFoodPostById(fp_id);
//         setResponse(foodPost, res);
//     } catch (error) {
//         setError(error, res);
//     }
// };

// // Controller function to create a new food post
// export const createFoodPost = async (req, res) => {
//     try {
//         const newFoodPost = req.body;
//         const createdFoodPost = await foodPostService.createFoodPost(newFoodPost);
//         setResponse(createdFoodPost, res);
//     } catch (error) {
//         setError(error, res);
//     }
// };

// // Controller function to update an existing food post
// export const updateFoodPost = async (req, res) => {
//     try {
//         const { fp_id } = req.params;
//         const updatedFoodPost = await foodPostService.updateFoodPost(fp_id, req.body);
//         setResponse(updatedFoodPost, res);
//     } catch (error) {
//         setError(error, res);
//     }
// };

// // Controller function to delete a food post by ID
// export const deleteFoodPostById = async (req, res) => {
//     try {
//         const { fp_id } = req.params;
//         await foodPostService.deleteFoodPost(fp_id);
//         setResponse({ message: 'Food post deleted successfully' }, res);
//     } catch (error) {
//         setError(error, res);
//     }
// };




































// // controllers/food-post-controller.js

// import * as foodPostService from '../services/food-post-service.js';
// import { setResponse, setError } from './response-handler.js';

// /**
//  * Controller function to handle fetching all food posts.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  */
// export const getAllFoodPosts = async (req, res) => {
//     try {
//         const foodPosts = await foodPostService.getAllFoodPosts();
//         setResponse(foodPosts, res);
//     } catch (error) {
//         setError(error, res);
//     }
// };

// /**
//  * Controller function to handle retrieving a food post by its ID.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  */
// export const getFoodPostById = async (req, res) => {
//     try {
//         const { fp_id } = req.params;
//         const foodPost = await foodPostService.getFoodPostById(fp_id);
//         if (foodPost) {
//             setResponse(foodPost, res);
//         } else {
//             res.status(404).json({ error: 'Food post not found' });
//         }
//     } catch (error) {
//         setError(error, res);
//     }
// };

// /**
//  * Controller function to handle creating a new food post.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  */
// export const createFoodPost = async (req, res) => {
//     try {
//         const newFoodPost = await foodPostService.createFoodPost(req.body);
//         res.status(201).json(newFoodPost);
//     } catch (error) {
//         setError(error, res);
//     }
// };

// /**
//  * Controller function to handle updating an existing food post.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  */
// export const updateFoodPost = async (req, res) => {
//     try {
//         const { fp_id } = req.params;
//         const updatedFoodPost = await foodPostService.updateFoodPost(fp_id, req.body);
//         if (updatedFoodPost) {
//             setResponse(updatedFoodPost, res);
//         } else {
//             res.status(404).json({ error: 'Food post not found' });
//         }
//     } catch (error) {
//         setError(error, res);
//     }
// };

// /**
//  * Controller function to handle deleting a food post by its ID.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  */
// export const deleteFoodPost = async (req, res) => {
//     try {
//         const { fp_id } = req.params;
//         const deletedFoodPost = await foodPostService.deleteFoodPost(fp_id);
//         if (deletedFoodPost) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ error: 'Food post not found' });
//         }
//     } catch (error) {
//         setError(error, res);
//     }
// };
