import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserAuth } from "../../models/IUserAuth";
import { axiosPublic } from "../../api/utils";
import { ILoginResults } from "../../service/mutations/authUserMutations";
import { EStorageKeys } from "../../utils/hooks/useAuth";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: ILoginResults, { rejectWithValue }) => {
        try {
            localStorage.setItem(EStorageKeys.TOKEN, JSON.stringify(data.authToken));
            localStorage.setItem(EStorageKeys.ROLE, JSON.stringify(data.user.role));
            localStorage.setItem(EStorageKeys.USER, JSON.stringify(data.user));
            return data
        } catch (error: any) {
            return rejectWithValue("Не удалось загрузить пользователя");
        }
    }
)
