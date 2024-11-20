import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogPost } from "../../models/blogpost";

export type blogState = BlogPost;

const initialState: blogState = {_id: null,
    title: '',
    content: '',
    createdDate: new Date(),
    likes: 0,
    dislikes: 0,
    author: null,
    comments: null}

const blogSlice = createSlice({
    name: 'blog',
    initialState: initialState,
    reducers: {
        loadBlog: (state, action: PayloadAction<blogState>) => {
            return action.payload;
        }
    }
});

export const { loadBlog } = blogSlice.actions;
export default blogSlice.reducer;
