import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    userImage: ''
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState, 
    reducers: {
        setProfile: (state: {userImage: string}, action: PayloadAction<string>) => {
            state.userImage = action.payload
        },
        resetProfile: (state: {userImage: string}) => {
            state.userImage = '';
        }
    }
});

export default userProfileSlice.reducer;
export const { setProfile, resetProfile } = userProfileSlice.actions;

