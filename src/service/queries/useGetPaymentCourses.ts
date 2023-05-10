import { IUserAuth } from "../../models/IUserAuth";
import { ETagType, api } from "../utils";
import { ICourseResult } from "./usetGetCourses";

export enum EAppCourseProgressive {
    COMPLETED = "completed",
    WAIT_CHECK = "wait_check",
    LISTEN_MATERIAL = "listen_material"
}

export interface IResultPaymentCourses {
    id: number,
    user: IUserAuth,
    course: ICourseResult,
    stripe_id: string,
    localDateTime: Date,
    courseProgressStatus: EAppCourseProgressive
}

const extendedApi = api.injectEndpoints({
    endpoints: builder => ({
        getPaymentCourses: builder.query<IResultPaymentCourses[], void>({
            query: () => "/payment-course/getAll",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: ETagType.PAYMENT_COURSES as const, id })),
                        { type: ETagType.PAYMENT_COURSES, id: 'LIST' },
                    ]
                    : [{ type: ETagType.PAYMENT_COURSES, id: 'LIST' }],
        })
    })
})


export const { useGetPaymentCoursesQuery, useLazyGetPaymentCoursesQuery } = extendedApi