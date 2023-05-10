import { createLogger } from 'redux-logger';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/authSlice";
import { api } from "../service/utils";


const reducers = combineReducers({
    auth: userSlice.reducer,
    [api.reducerPath]: api.reducer
})

const logger = createLogger({
    collapsed: true,
});

export const setupStore = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    // .concat(logger)
    ,
    devTools: true
})


export type AppDispatch = typeof setupStore.dispatch
export type RootState = ReturnType<typeof setupStore.getState>