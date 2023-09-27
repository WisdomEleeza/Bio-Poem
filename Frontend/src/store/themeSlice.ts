import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type pattern = {
    id: string
    image: string
}
export type state = {
theme: string,
patterns: pattern[]
status: string
};

type action = {
    payload: string
}

const initialState: state = {
    theme: 'none',
    patterns: [],
    status: "null",
};

const themeSlice = createSlice({
    name: 'theme',
    initialState, 
    reducers: {
        changeThemeOption: (state: state, {payload}: action) => {
            if(state.theme !== payload){
                state.theme = payload
            }
        },
        resetTheme: (state: state) => {
            state.theme = 'none'
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(getPatterns.pending, (state)=> {
            state.status = "Pending"
        })
        .addCase(getPatterns.fulfilled, (state, action)=> {
            state.patterns = action.payload;
            state.status = "Fulfilled"
        })
        .addCase(getPatterns.rejected, (state)=> {
            state.status = "Error"
        })
    }
})

export const getPatterns = createAsyncThunk<pattern[], void, {}>("patterns/getPatterns", async () => {
    const baseUrl = "https://bio-poem.onrender.com/api/v1/poems/all-images";
    try {
        const response = await axios.get(baseUrl);
        console.log(response);
        return response;
    } catch (error) {
        throw error
    }
})

export const {changeThemeOption, resetTheme} = themeSlice.actions;
export default themeSlice.reducer