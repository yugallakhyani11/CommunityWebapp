import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type keywordState = String;

const initialState: keywordState = '';

const keywordSlice = createSlice({
    name: 'keyword',
    initialState: initialState,
    reducers: {
        saveKeyword: (state, action: PayloadAction<keywordState>) => {
            return action.payload;
        }
    }
});

export const { saveKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
