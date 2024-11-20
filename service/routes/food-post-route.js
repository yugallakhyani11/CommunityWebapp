import express from 'express';
import * as foodPostController from '../controllers/food-post-controller.js';

const FoodRouter = express.Router();


// Endpoint for searching food posts
FoodRouter.route('/search')
    .get(foodPostController.searchFoodPosts);

// Endpoints for CRUD operations on food posts
FoodRouter.route('/')
    .get(foodPostController.getFoodPosts)
    .post(foodPostController.createFoodPost);

FoodRouter.route('/:fp_id')
    .get(foodPostController.getFoodPostById)
    .put(foodPostController.updateFoodPost)
    .delete(foodPostController.deleteFoodPostById);

export default FoodRouter;
