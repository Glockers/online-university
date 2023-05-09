import { ETagType, api } from "../utils";

const extendedApi = api.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<any[], void>({
            query: () => "/user/getAll",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: ETagType.USER as const, id })),
                        { type: ETagType.USER, id: 'LIST' },
                    ]
                    : [{ type: ETagType.USER, id: 'LIST' }],
        })
    })
})


export const { useGetUsersQuery } = extendedApi