import { ETagType, api } from "../utils";

export interface IPropsResponseTask {
    url: string,
    user_id: number,
    task_id: number
}

const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        sendTask: build.mutation<any, IPropsResponseTask>({
            query: (task) => ({
                url: "/task-response/send-task",
                method: "POST",
                body: task,
            }),
            invalidatesTags: [{ type: ETagType.RESPONSE_TASK, id: "LIST" }]
        }),
    }),
    overrideExisting: false,
})

export const { useSendTaskMutation } = extendedApi