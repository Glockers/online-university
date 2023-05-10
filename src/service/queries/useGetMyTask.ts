import { IResultTask } from './../mutations/useTaskMutation';
import { ETagType, api } from "../utils"

interface IPropsGetMyTask {
    my_id: number,
    id_task: number
}



const extendedApi = api.injectEndpoints({
    endpoints: builder => ({
        getMyAllTask: builder.query<IResultTask[], number>({
            query: (my_id) => ({
                url: '/task/my-all-task',
                params: {
                    _myID: my_id,
                }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: ETagType.TASK as const, id })),
                        { type: ETagType.TASK, id: 'LIST' },
                    ]
                    : [{ type: ETagType.TASK, id: 'LIST' }],
        }),
        getAllTask: builder.query<IResultTask[], void>({
            query: () => ({
                url: '/task/all-task',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: ETagType.TASK as const, id })),
                        { type: ETagType.TASK, id: 'LIST' },
                    ]
                    : [{ type: ETagType.TASK, id: 'LIST' }],
        }),
    })
})


export const { useLazyGetMyAllTaskQuery, useGetAllTaskQuery } = extendedApi