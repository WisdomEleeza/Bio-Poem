import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payload } from "../components/UserNameForm";
import axios from "axios";


type User = {
    userName: string;
    userId: string;
    status: string;
    message: string
};

type Response = {
    data: data;
}

type data = {
    "userId": string
    "message": string
}

type UserName = {
    username: string
}

const initialState: User = {
    userName: '',
    userId: '',
    status: 'null',
    message: ''
};

const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        updateUsername: (state:User, action: PayloadAction<Payload>) => {
            const { userName } = action.payload
            state.userName = userName;
        },
        setError: (state: User, action: PayloadAction<string>) => {
            state.status = 'Error';
            state.message = action.payload;
        },
        resetStatus: (state:User) => {
            state.status = '';
            state.message = ''
        },
        resetUser: (state:User) => {
            state.userName = '';
            state.userId = ''
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(submitUserName.pending, (state) => {
            state.status = 'Loading...';
        })
        .addCase(submitUserName.fulfilled, (state, action: PayloadAction<Response> ) => {
            const { userId, message} = action.payload.data
            state.status = 'Fulfilled';
            state.userId = userId;
            state.message = message;
        })
        .addCase(submitUserName.rejected, (state) => {
            state.status = 'Error'
            state.message = 'Username already exists.'
        })
    },
})

export const submitUserName = createAsyncThunk<Response, UserName, {}>(
    'userName/submitUserName', 
    async (username: UserName) => {
    const url = 'https://bio-poem.onrender.com/api/v1/poems/username'
    try {
        console.log(username);
        
        const response: Response = await axios.post(url, username);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error)
        throw error;
    }
})

export default userSlice.reducer;
export const { updateUsername, resetStatus, resetUser } = userSlice.actions;