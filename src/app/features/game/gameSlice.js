import {createSlice} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
const gameSlice = createSlice({
    name : "games",
    initialState : {
        isLoading : false,
        list : [],
        error : ""
    },
    reducers : {
        fetchGames : (state,action) => {
            return {
                ...state,
                isLoading : true
            }
        },
        setGames : (state,action) => {
            return {
                isLoading : false,
                list : action.payload,
                error : ""
            }
        },
        setErrors : (state,action) => {
            return {
                isLoading : false,
                list : [],
                error : action.payload || "something went wrong"
            }
        }

    }
})

const persistConfig = {
    key : "games",
    storage
}
export const {setErrors,setGames,fetchGames} = gameSlice.actions
export default persistReducer(persistConfig,gameSlice.reducer);