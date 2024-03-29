import {createSlice} from "@reduxjs/toolkit";
import {TFiles} from "../../types";
import {filesData} from "../../initData.ts";

interface InitialStateType {
    isBlurredBg: boolean;
    isActive: string;
    fileData: TFiles;
}

const initialState: InitialStateType = {
    isBlurredBg: false,
    isActive: '',
    fileData: filesData
};


export const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setBlur: (state) => {
            state.isBlurredBg = true
        },
        removeBlur: (state) => {
            state.isBlurredBg = false
        },
        setIsActive: (state, action) => {
            state.isActive = action.payload
        },
        fileData: (state, action) => {
            state.fileData = action.payload
        }

    }
})

export const {setBlur, removeBlur, setIsActive, fileData} = slice.actions;
