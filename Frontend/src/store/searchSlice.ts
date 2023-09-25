import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

interface SearchState {
    openSearch: boolean,
    loading: boolean,
    response: PoemData 
}
export interface usersId {
    "_id":  string
    "username": string
    "profileImage": string
  }
  
export type data = {
    "_id": string  
    "firstName":string
    "adjectives": string
    "importantRelation": string
    "loves": string
    "feelings": string
    "fears": string
    "accomplishments": string
    "expectations": string
    "residence": string
    "lastName": string
    "backgroundTheme": string
    "user": usersId
    "userName": string
      
  }

export type PoemData = {
    success: boolean;
    poems: data[]
}

const initialState: SearchState = {
    openSearch: false,
    loading: false,
    response: {
        success:false,
        poems: []
    },
}


export const searchPoem = createAsyncThunk<PoemData, void, object>('search/get', async () => {
    try {
        const response = await axios.get('https://bio-poem.onrender.com/api/v1/poems/all-poems')
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
})

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setOpenSearch: (state) => {
            state.openSearch = !state.openSearch
        },
        resetSearchState: (state) => {
            state.openSearch = initialState.openSearch;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPoem.pending, (state) => {
                state.loading = true
            })
            .addCase(searchPoem.fulfilled, (state, action: PayloadAction<PoemData>) => {
                state.loading = false
                state.response = action.payload
            })
            .addCase(searchPoem.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { setOpenSearch, resetSearchState } = searchSlice.actions
export default searchSlice.reducer
