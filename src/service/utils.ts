import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

export enum ETagType {
    COURSE = "Courses",
    USER = "User",
    ORDER = "Order"
}


export const api = createApi({
    reducerPath: "api",
    tagTypes: [...Object.values(ETagType)],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.0.106:8000/api",
        responseHandler: "content-type",
    }),

    endpoints: () => ({}),
})

// const baseQuery = fetchBaseQuery({
//     baseUrl: "http://192.168.0.106:8000/api",
//     responseHandler: "content-type",
//     prepareHeaders: (headers, { getState }) => {
//         const token = (getState() as RootState).auth.token

//         if (token) {
//             headers.set('authorization', `Bearer ${token}`)
//         }

//     }
// })