import { createSlice } from "@reduxjs/toolkit";

export type state = {
theme: string,
};

type action = {
    payload: string
}

const initialState: state = {
    theme: 'none'
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
    }
})

export const {changeThemeOption, resetTheme} = themeSlice.actions;
export default themeSlice.reducer