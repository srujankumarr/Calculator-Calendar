import { createSlice } from "@reduxjs/toolkit";
import { dataCgpa, dataSgpa } from "./data";

const calSlice = createSlice({
    name: 'cal',
    initialState: {
        sgpaId: 21,
        sgpaData: localStorage.getItem('SgpaData') !== null ? JSON.parse(localStorage.getItem('SgpaData')) : dataSgpa,
        cgpaId: 21,
        cgpaData: localStorage.getItem('CgpaData') !== null ? JSON.parse(localStorage.getItem('CgpaData')) : dataCgpa
    }, reducers: {
        addSgpaData: (state, action) => {
            action.payload.id = state.sgpaId + 1
            state.sgpaId++
            state.sgpaData = [action.payload, ...state.sgpaData]
            localStorage.setItem('SgpaData', JSON.stringify(state.sgpaData))
        },
        addCgpaData: (state, action) => {
            action.payload.id = state.cgpaId + 1
            state.cgpaId++
            state.cgpaData = [action.payload, ...state.cgpaData]
            localStorage.setItem('CgpaData', JSON.stringify(state.cgpaData))
        },
        setData: (state) => {
            localStorage.setItem("SgpaData", JSON.stringify(state.sgpaData))
            localStorage.setItem("CgpaData", JSON.stringify(state.cgpaData))
        },
        removeItemFromHistory: (state, action) => {
            const { type, id } = action.payload;
            const dataKey = type === 'CGPA' ? 'cgpaData' : 'sgpaData';
            console.log(type, id);
            state[dataKey] = state[dataKey].filter((data) => data.id !== id);
            localStorage.setItem("SgpaData", JSON.stringify(state.sgpaData))
            localStorage.setItem("CgpaData", JSON.stringify(state.cgpaData))
        }
    }
})

export default calSlice