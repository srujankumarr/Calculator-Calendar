import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        email: 'admin@gmail.com',
        password: 'admin',
        loggedIn: false
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn = true
            window.location.href = '/dashboard/calendar'
            // if (state.email === action.payload.email && state.password === action.payload.password) {
            //     state.loggedIn = true
            // }
        },
        logout: (state) => {
            state.loggedIn = false
        }
    }
})


export default loginSlice