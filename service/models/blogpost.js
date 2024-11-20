import mongoose from "mongoose";

const blogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true,
        default: "https://images.pexels.com/photos/10682999/pexels-photo-10682999.jpeg"
    },
    createdDate: {
        type: Date,
        // required: true,
        default: Date.now
    },
    likes: {
        type: Number,
        // required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        // required: true,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
      }]

});

const blogpostModel = mongoose.model('BlogPost', blogpostSchema);

export default blogpostModel;