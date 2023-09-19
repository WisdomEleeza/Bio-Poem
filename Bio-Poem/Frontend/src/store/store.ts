import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, } from "redux-persist"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import storage  from "redux-persist/lib/storage"
import formSlice from "./formSlice"
import searchSlice from "./searchSlice";
import themeSlice from "./themeSlice";
import darkModeSlice from "./darkModeSlice";
import poemSlice from "./poemSlice";
import userSlice from "./userSlice";
import userProfileSlice from './userProfile'
import recentSearchSlice from "./recentSearchSlice";


const persistConfig = {
    key: 'root',
    storage,
  }

    const rootReducer = combineReducers({
        form: formSlice,
        poem: poemSlice, 
        search: searchSlice,
        theme: themeSlice,
        darkMode: darkModeSlice,
        user: userSlice,
        userProfile: userProfileSlice,
        recentSearch: recentSearchSlice
    })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
});

export type RootState = ReturnType<typeof rootReducer>; 
export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector