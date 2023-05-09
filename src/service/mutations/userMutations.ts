import { ETagType, api } from "../utils";

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        deleteUser: build.mutation<any, any>({
            query: (user) => ({
                url: "/user/delete",
                method: "POST",
                body: user,
            }),
            invalidatesTags: [{ type: ETagType.USER, id: "LIST" }]
        }),
        updateUser: build.mutation<any, any>({
            query: (user) => ({
                url: "/user/update",
                method: "POST",
                body: user,
            }),
            invalidatesTags: [{ type: ETagType.USER, id: "LIST" }]
        }),
    }),
    overrideExisting: false,
})


export const { useDeleteUserMutation, useUpdateUserMutation } = extendedApi