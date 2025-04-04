import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name  : "search",
    initialState :{
        isSearching : false
    },
    reducers : {
        closeSearch : () => {
            return {
                isSearching : false
            }
        },
        openSearch : () => {
            return {
                isSearching : true
            }
        }
        ,
        toggleSearch : (state) => {
            return {
                isSearching : !state.isSearching
            }
        }
    }
})

export const {openSearch,closeSearch,toggleSearch} = searchSlice.actions
export default searchSlice.reducer