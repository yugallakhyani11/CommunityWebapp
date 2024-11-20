// models/food-post.js

import mongoose from 'mongoose';

// Define the schema for a food post using Mongoose.Schema
const foodPostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numOfPeople: {
        type: Number,
        required: true
    },
    shelfLife: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NGO",
        required: false,
      },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true 
    },
    description: String
});

// Create the FoodPost model based on the schema
const FoodPost = mongoose.model('FoodPost', foodPostSchema);

export default FoodPost;
