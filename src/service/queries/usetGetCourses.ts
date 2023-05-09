import { ETagType, api } from "../utils"


export enum ESortType {
    MONY_HIGHT = "monyHight",
    MONY_LOW = "monyLow",
}

enum EAppCourseStatus {

    ACTIVE = "active",
    CLOSED = "closed"
}

export interface ICourseResult {
    id: number,
    description: string;
    title: string;
    cost: number;
    status: EAppCourseStatus,
}


const extendedApi = api.injectEndpoints({
    endpoints: builder => ({
        getCourses: builder.query<ICourseResult[], void>({
            query: () => "/course/getAll",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: ETagType.COURSE as const, id })),
                        { type: ETagType.COURSE, id: 'LIST' },
                    ]
                    : [{ type: ETagType.COURSE, id: 'LIST' }],
        })
    })
})

export const { useGetCoursesQuery } = extendedApi