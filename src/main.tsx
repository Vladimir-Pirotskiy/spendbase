import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'blur',
    initialState: {isBlurredBg: false},
    reducers: {
        setBlur: (state) => {
            state.isBlurredBg = true
        },
        removeBlur: (state) => {
            state.isBlurredBg = false
        }
    }
})

export const {setBlur, removeBlur} = slice.actions;

const store = configureStore({
    reducer: slice.reducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>

    </React.StrictMode>,
)
