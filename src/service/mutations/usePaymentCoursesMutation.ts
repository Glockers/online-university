import { ETagType, api } from "../utils";

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        deletePaymentCourse: build.mutation<any, any>({
            query: (user) => ({
                url: "/payment-course/delete",
                method: "POST",
                body: user,
            }),

            invalidatesTags: [{ type: ETagType.PAYMENT_COURSES, id: "LIST" }]
        }),
        updatePaymentCourse: build.mutation<any, any>({
            query: (user) => ({
                url: "/payment-course/update",
                method: "POST",
                body: user,
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {
                console.log(baseQueryReturnValue)
            },
            transformErrorResponse: (response, meta, arg) => {
                console.log(response)
                return response
            },

            invalidatesTags: [{ type: ETagType.PAYMENT_COURSES, id: "LIST" }]
        }),
    }),
    overrideExisting: false,
})


export const { useDeletePaymentCourseMutation, useUpdatePaymentCourseMutation } = extendedApi