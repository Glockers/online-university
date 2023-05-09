import { IUserAuth } from '../../models/IUserAuth';
import { api } from "../utils";


export interface ILoginResults {
    user: IUserAuth;
    authToken: string;
}



export interface ILoginProps {
    login: string;
    password: string;
}



export type ISignUpProps = Omit<IUserAuth, "id" | "role"> & { password: string }


const extendedApi = api.injectEndpoints({
    endpoints: (build) => ({
        logIn: build.mutation<ILoginResults, ILoginProps>({
            query: (user) => ({
                url: "/auth/login",
                method: "POST",
                body: user,
            })
        }),
        signUp: build.mutation<any, ISignUpProps>({
            query: (user) => ({
                url: "/auth/register",
                method: "POST",
                body: user,
                // credentials: "include",
            }),

            // transformResponse: (response: any, meta, arg) => response,
            // transformErrorResponse: (response, meta, arg) => response.status
        })
    }),
    overrideExisting: false,
})

export const { useLogInMutation, useSignUpMutation } = extendedApi 