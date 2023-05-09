import { IUserAuth } from './../../models/IUserAuth';
import { ETagType, api } from "../utils";
import { ICourseResult } from '../queries/usetGetCourses';

export interface IPropsOrderCourse {
    client: IUserAuth,
    course: ICourseResult
}


export interface IResultOrderCourse {
    session_id: string,
    url: string,
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        buyCourse: build.mutation<IResultOrderCourse, IPropsOrderCourse>({
            query: (data) => ({
                url: "/payment/create-checkout-session",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: ETagType.ORDER, id: "LIST" }]

        }),
    }),
    overrideExisting: false,
})


export const { useBuyCourseMutation } = extendedApi