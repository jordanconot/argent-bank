import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
        token: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        setUserAuthenticated: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    }
});

export const { loginSuccess, loginFailure, logout, setUserAuthenticated } = userSlice.actions;
export default userSlice.reducer;