import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

// Check if a token exists in localStorage
const savedToken = localStorage.getItem('token');

const initialState = {
    isLoggedIn: savedToken ? true : false,
    token: savedToken || null,
    username: savedToken ? jwtDecode(savedToken).username : null, // decode username on load
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
            state.username = jwtDecode(action.payload).username;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.username = null;
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
