import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface user {
  "_id":  string
  "username": string
  "profileImage": string
}
export interface singlePoem {
    _id: string
    firstName: string
    adjectives: string,
    importantRelation: string,
    loves: string,
    feelings:string ,
    fears: string,
    accomplishments: string
    expectations: string
    residence: string
    lastName: string
    backgroundTheme: string
    user: user
    upvotes: number,
    downvotes: number,
    createdAt: string,
    updatedAt: string
    __v: number

}

interface RecentSearchState {
  recentSearches: singlePoem[];
}

const initialState: RecentSearchState = {
  recentSearches: [],
};

const recentSearchSlice = createSlice({
  name: 'recentSearch',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<singlePoem>) => {
      const poemToAdd = action.payload;
      const exists = state.recentSearches.some((poem) => poem._id === poemToAdd._id);
      
      if (!exists) {
        state.recentSearches.unshift(poemToAdd);
      }
    },
  },
});

export const { addRecentSearch } = recentSearchSlice.actions;
export default recentSearchSlice.reducer;
