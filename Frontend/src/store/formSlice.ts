import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payload } from '../components/FormSection'
// import { submitPoem } from "../submitPoem";
import axios from "axios";

export type data = {
    "firstName":string,
    "adjectives": string,
    "importantRelation": string,
    "loves": string,
    "feelings": string,
    "fears": string,
    "accomplishments": string,
    "expectations": string,
    "residence": string,
    "lastName": string,
    "backgroundTheme": string,
    "fontColor": string,
    "fontFamily": string
}

export type finishedPoem = {
    data: data;
    id: string;
}

export type state = {
    page: number,
    total: number,
    answers: data,
    status: string,
    view: boolean
}

// type answer ={
//     id: string,
//     value: string,
// }


const initialState: state = {
    page: 1,
    total: 5,
    answers: {
        "firstName":"",
        "adjectives": "",
        "importantRelation": "",
        "loves": "",
        "feelings": "",
        "fears": "",
        "accomplishments": "",
        "expectations": "",
        "residence": "",
        "lastName": "",
        "backgroundTheme": "",
        "fontColor": "#000000",
        "fontFamily": "Inter", 
    },
    status: 'null',
    view: false,
}

const formSlice = createSlice ({
    name: 'form',
    initialState,
    reducers: {
        forward: (state: state, )=>{
            if(state.page < state.total){
                state.page++;
            }
        },
        back: (state:state,)=>{
            if(state.page > 1){
                state.page--;
            }
        },
        updateAnswers:(state: state, action: PayloadAction<payload>)=>{
            const {id, answer} = action.payload;
            state.answers[id as keyof data] = answer;
        },
        selectTheme: (state: state, action: PayloadAction<{theme:string}>)=>{
            const {theme} = action.payload;
            state.answers = {
                ...state.answers,
                backgroundTheme: theme
            }
        },
        selectFontColor: (state: state, action: PayloadAction<string>)=> {
            state.answers.fontColor = action.payload;
        },
        selectFontFamily: (state: state, action: PayloadAction<string>)=> {
            state.answers.fontFamily = action.payload
        },
        submitPoemAnswers: (state: state,) => {
                state.page = 5
        },
        setView: (state: state) => {
            state.view = !state.view
        },
        resetState: (state:state) => {
            state.page = 1;
            state.total = 4
            state.answers = {
                "firstName":"",
                "adjectives": "",
                "importantRelation": "",
                "loves": "",
                "feelings": "",
                "fears": "",
                "accomplishments": "",
                "expectations": "",
                "residence": "",
                "lastName": "",
                "backgroundTheme": "",
                "fontColor": "#000000",
                "fontFamily": "Inter"
            }
            state.status = 'null',
            state.view = false
        }
    },
    extraReducers: (builder)=> {
        builder
            .addCase(submitAnswers.pending, (state) =>{
                state.status = 'Loading...'
            })
            .addCase(submitAnswers.fulfilled, (state)=> {
                state.status = 'Fulfilled'
                // state.page = 5
            })
            .addCase(submitAnswers.rejected, (state)=>{
                state.status = 'Error'
            })
    },
})

export const submitAnswers = createAsyncThunk<any, finishedPoem, {}>("answers/submitAnswers", async (data) => {
    const url = `https://bio-poem.onrender.com/api/v1/poems/${data.id}/create-poem`;
    console.log(url);
    try {
        const response = await axios.post(url, data.data);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
})
export const { forward, back, updateAnswers, selectTheme, submitPoemAnswers, resetState, selectFontColor, setView, selectFontFamily } = formSlice.actions
export default formSlice.reducer;




// try {
//     const response = await submitPoem(data);
//     console.log(response);
// } catch (error) {
//     console.error(error)
//     throw error
// }