import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './loginSlice'
import dashboardSlice from "./dashboardSlice";
import calSlice from "./calculatorSlice";


const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        dashboard: dashboardSlice.reducer,
        cal: calSlice.reducer,

    }
})
export const loginActions = loginSlice.actions
export const dashboardActions = dashboardSlice.actions
export const calActions = calSlice.actions
export default store