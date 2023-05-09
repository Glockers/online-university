import { ETagType, api } from "../utils";

const extendedApi = api.injectEndpoints({
    endpoints: builder => ({
        getCourses: builder.query<any[], void>({
            query: () => "/course/getAll",
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
