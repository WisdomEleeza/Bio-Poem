import { propsObject } from './../components/Poems';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Poem } from '../components/Carousel2';


type RecentPoemsResponse ={
    success: boolean;
    hasMore: boolean;
    total:number;
    recentPoems: propsObject[];
}

type PopularPoemsResponse = {
    success: boolean;
    popuPoems: propsObject[]
}
interface poemState {
    poems: []
    status: string
    showModal:boolean
    loading: boolean
    poemData: []
    recentPoems: propsObject[]
    singlePoem: Poem,
    popularPoems: propsObject[] 
    popuPoems: []
    vote: boolean,
    voteResponse: string
    hasMore: boolean
    total: number
}

const initialState: poemState = {
    poems: [],
    status: 'idle',
    showModal: false,
    poemData: [],
    loading: false,
    recentPoems: [],
    singlePoem:{
        _id: "",
  firstName: "",
  lastName: "",
  adjectives: "",
  importantRelation: "",
  loves: "",
  feelings: "",
  fears: "",
  accomplishments: "",
  expectations: "",
  residence: "",
  upvotes: 0,
  downvotes: 0,
  backgroundTheme: "",
  profileImage: "",
  user: {
    _id:"",
    username:"",
    profileImage: "",
  }
    },
    popularPoems : [],
    popuPoems: [],
    vote: false,
    voteResponse: '',
    hasMore: false,
    total: 0
}

// type PoemData = {
//     success: boolean;
//     poems: propsObject[]
// }


export const getPopularPoems = createAsyncThunk<PopularPoemsResponse, void, object>('popularPoem/get', async () =>{
    try {
        const response = await axios.get('https://bio-poem.onrender.com/api/v1/poems/popular-poems')
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
})

export const getRecentPoems = createAsyncThunk<RecentPoemsResponse, number, object>('recentPoem/get', async (page) =>{
    try {
        const response = await axios.get(`https://bio-poem.onrender.com/api/v1/poems/recent-poem?page=${page || 1}`)
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
})

// Upvote
export const upvotePoem = createAsyncThunk ('upvotePoem/post', async(singlePoem: Poem)=>{
    const url = `https://bio-poem.onrender.com/api/v1/poems/${singlePoem._id}/upvote`;
      try {
        const response = await axios.post(url);
        console.log('uptake', response);
        return response.data
    } catch (error) {
      console.log(error);
      throw error;
    }
  })

  export const downvotePoem = createAsyncThunk ('downvotePoem/post', async(singlePoem: Poem)=>{
    const url = `https://bio-poem.onrender.com/api/v1/poems/${singlePoem._id}/downvote`;
    try {
      const response = await axios.post(url);
      console.log('downtake', response);
  } catch (error) {
    console.log(error);
    throw error;
  }
  })

const poemSlice = createSlice({
    name: "poem",
    initialState,
    reducers:{
        setShowModal: (state)=>{
            state.showModal = !state.showModal
        },
        setPoemData: (state, action) => {
            state.poemData = action.payload;
          },
          setPoemSingleData:(state,{payload})=>{
            state.singlePoem = payload
          }
    },
    extraReducers(builder) {
        builder
        .addCase(getPopularPoems.pending, (state) => {
            state.loading = true
        })
        .addCase(getPopularPoems.fulfilled, (state, action: PayloadAction<PopularPoemsResponse>) =>{
            state.loading = false
            state.popularPoems = action.payload.popuPoems
        })
        .addCase(getPopularPoems.rejected, (state) =>{
            state.loading = false
        })

            .addCase(getRecentPoems.pending, (state) => {
                state.loading = true
            })
            .addCase(getRecentPoems.fulfilled, (state, action: PayloadAction<RecentPoemsResponse>) =>{
                const {recentPoems, hasMore, total} = action.payload
                state.loading = false
                state.hasMore = hasMore;
                state.total = total
                state.recentPoems = recentPoems;
            })
            .addCase(getRecentPoems.rejected, (state) =>{
                state.loading = false
            })

            .addCase(upvotePoem.pending, (state) =>{
                state.vote = true
            })
            .addCase(upvotePoem.fulfilled, (state,{payload}: PayloadAction<any>) =>{
                state.vote = true
                state.voteResponse = payload
            })
            .addCase(upvotePoem.rejected, (state)=>{
                state.vote = false
            })
    },
})

export const {setShowModal, setPoemData,setPoemSingleData}  = poemSlice.actions
export default poemSlice.reducer
// export const selectRecentPoems = (state: RootState) => state.poem.recentPoems
// export const selectPopularPoems = (state: RootState) => state.poem.popularPoem