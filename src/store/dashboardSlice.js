import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        openSearchDrawer: false,
        notificationPop: false,
        anchorElement: null
    },
    reducers: {
        toggleSearchDrawer: (state) => {
            state.openSearchDrawer = !state.openSearchDrawer
        },
        openNotificationPopUp: (state, action) => {
            state.notificationPop = !state.notificationPop
            state.anchorElement = action.payload
        },
        closeNotificationPopUp: (state) => {
            state.notificationPop = !state.notificationPop
            state.anchorElement = null
        }
    }
})
export default dashboardSlice