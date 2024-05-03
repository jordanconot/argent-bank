import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: null,
        isLoading: false,
        error: null
    },
    reducers: {
        requestProfile: state => {
            state.isLoading = true;
            state.error = null;
        },
        receiveProfile: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        profileError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.data = null;
        },
        clearProfile: state => {
            state.data = null;
            state.isLoading = false;
            state.error = null;
        }
    }
});

export const { requestProfile, receiveProfile, profileError, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;