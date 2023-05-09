import { createSlice } from "@reduxjs/toolkit"
import { IUserAuth } from "../../models/IUserAuth"
import { loginUser } from "./LoginThunk"
import { RootState } from "../store"

export interface IRepositoryStateAuth {
    user: IUserAuth,
    token: string,
    isLogged: boolean,
    isLoading: boolean,
    error: string
}

const initialState: IRepositoryStateAuth = {
    user: {} as IUserAuth,
    isLogged: false,
    isLoading: false,
    error: "",
    token: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = ""
            state.user = {} as IUserAuth
            state.isLogged = false
            state.error = ""
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.rejected, (state) => {
            state.isLogged = false
            state.isLoading = false
            state.error = state.error
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.authToken
            state.isLogged = true
            state.isLoading = false
            state.error = ""
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLogged = false
            state.isLoading = true
        })
    }
})

export const { logOut } = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token


