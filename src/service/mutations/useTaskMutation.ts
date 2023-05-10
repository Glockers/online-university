import { ICourseResult } from "../queries/usetGetCourses";
import { ETagType, api } from "../utils";

export interface IResultTask {
    id: number,
    course: ICourseResult,
    title: string,
    task_description: string,
    startDate: Date,
    endDate: Date,
}

export type IPropsAddTask = Omit<IResultTask, "id">

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        addTask: build.mutation<IResultTask, IPropsAddTask>({
            query: (task) => ({
                url: "/task/save",
                method: "POST",
                body: task,
            }),
            invalidatesTags: [{ type: ETagType.TASK, id: "LIST" }]
        }),
        deleteTask: build.mutation<any, IResultTask>({
            query: (task) => ({
                url: "/task/delete",
                method: "POST",
                body: task,
            }),
            invalidatesTags: [{ type: ETagType.TASK, id: "LIST" }]
        }),
        updateTask: build.mutation<any, IResultTask>({
            query: (task) => ({
                url: "/user/update",
                method: "POST",
                body: task,
            }),
            invalidatesTags: [{ type: ETagType.TASK, id: "LIST" }]
        }),
    }),
    overrideExisting: false,
})

export const { useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = extendedApi