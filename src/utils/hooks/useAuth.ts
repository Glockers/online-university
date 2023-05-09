import { toast } from 'react-toastify';
import { logOut, selectCurrentUser } from "../../store/reducers/authSlice"
import { useAppDispatch, useAppSelector } from "./redux"
import { useGetMeQuery } from '../../service/queries/useGetMeQuery';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EUserRole } from '../../models/Enums';
import { IUserAuth } from '../../models/IUserAuth';
import { ILoginProps, ILoginResults, useLogInMutation } from '../../service/mutations/authUserMutations';
import { EAppRoutes } from '../../page/Router';
import { loginUser } from '../../store/reducers/LoginThunk';
import { isError } from '@tanstack/react-query';
import useNotification from 'antd/es/notification/useNotification';
import { useNotificationContext } from '../notification';
import { useNavigate } from 'react-router-dom';
import { getFromStorage } from '../localStorage';

export enum EStorageKeys {
    TOKEN = "authToken",
    ROLE = "role",
    USER = "user"
}

interface IGetTokenResults {
    [EStorageKeys.TOKEN]?: string;
    [EStorageKeys.ROLE]?: `${EUserRole}`;
    [EStorageKeys.USER]?: IUserAuth;
}



export interface IAuthState {
    isAuthorized: boolean;
    isLoading: boolean;
    user?: IUserAuth;
    [EStorageKeys.TOKEN]?: string;
    [EStorageKeys.ROLE]?: `${EUserRole}`;
}

export const getToken = (): IGetTokenResults => {
    return Object.values(EStorageKeys).reduce<IGetTokenResults>((acc, key) => {
        return {
            ...acc,
            [key]: localStorage.getItem(key) || undefined,
        };
    }, {});
};

type TError = {
    status?: number;
    data: string
}

export const useAuth = () => {
    const [user, setUser] = useState<any>();

    const dispatch = useAppDispatch();
    const { showMessage } = useNotificationContext();
    const activeUser = useAppSelector(value => value.auth)
    const [isSkip, setIsSkip] = useState<boolean>(true)
    const { data, isLoading } = useGetMeQuery(undefined, { skip: isSkip })


    const [login] = useLogInMutation()


    const LogIn = (data: ILoginProps): void => {
        login(data).unwrap().then((response) => {
            // setLoginData(response);
            setIsSkip(true)
            dispatch(loginUser(response))
            showMessage("Вы успешно вошли в аккаунт", "success")
        }).catch(() => {
            showMessage("Неверный логин или пароль!", "error")

        })
    }

    const logout = () => {
        localStorage.removeItem(EStorageKeys.TOKEN);
        localStorage.removeItem(EStorageKeys.ROLE);
        localStorage.removeItem(EStorageKeys.USER);
        setIsSkip(true)
        dispatch(logOut())
    }



    useEffect(() => {
        if (!isLoading && getFromStorage('authToken')) {
            setIsSkip(true)
            setIsSkip(false)
            setUser(data)
        }
    }, [isLoading]);


    useEffect(() => {
        if (user) {
            dispatch(loginUser({ authToken: getFromStorage('authToken') as string, user: data as IUserAuth }))
        }
    }, [user]);


    return {
        user: activeUser.user,
        isAuthorized: activeUser.isLogged,
        role: activeUser.user.role,
        logout,
        LogIn,
    }
}