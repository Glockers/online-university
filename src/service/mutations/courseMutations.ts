import { ICourseResult } from "../queries/usetGetCourses";
import { ETagType, api } from "../utils";



const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        addCourse: build.mutation<any, ICourseResult>({
            query: (book) => ({
                url: "/course/add",
                method: "POST",
                body: book,
            }),
            invalidatesTags: [{ type: ETagType.COURSE, id: "LIST" }]

        }),
        deleteCourse: build.mutation<any, ICourseResult>({
            query: (book) => ({
                url: "/course/delete",
                method: "POST",
                body: book,
            }),
            invalidatesTags: [{ type: ETagType.COURSE, id: "LIST" }]
        }),
        updateCourse: build.mutation<any, ICourseResult>({
            query: (book) => ({
                url: "/course/update",
                method: "POST",
                body: book,
            }),
            invalidatesTags: [{ type: ETagType.COURSE, id: "LIST" }]
        }),
    }),
    overrideExisting: false,
})

export const { useAddCourseMutation, useDeleteCourseMutation, useUpdateCourseMutation } = extendedApi