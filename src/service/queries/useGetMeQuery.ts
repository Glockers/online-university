import { IUserAuth } from "../../models/IUserAuth";
import { EStorageKeys, IAuthState } from "../../utils/hooks/useAuth";
import { getFromStorage } from "../../utils/localStorage";
import { api } from "../utils";


const extendedApi = api.injectEndpoints({
    endpoints: builder => ({
        getMe: builder.query<IUserAuth, undefined>({
            query: () => `/user/me/${getFromStorage<IUserAuth>("user")?.id}`
        })
    })
})


export const { useGetMeQuery } = extendedApi