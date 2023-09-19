import { createSlice } from "@reduxjs/toolkit";
interface  darkModeState {
  toggle: boolean
}

const initialState : darkModeState ={
    toggle: false
}

const darkModeSlice  = createSlice({
    name:'darkMode',
    initialState,
    reducers: {
        setDarkMode: (state)=>{
            state.toggle = !state.toggle
        },
    }
})

export default darkModeSlice.reducer
export const {setDarkMode} = darkModeSlice.actions