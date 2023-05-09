import { FC, ReactElement, useState } from "react";
import { IUserAuth } from "../../models/IUserAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import { Tabs, TabsProps } from "antd";
import SignIn from "./SignUp";
import LogIn from "./LogIn";
import { PageLayout } from "../../layouts";


const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Авторизация`,
        children: <LogIn />,
    },
    {
        key: '2',
        label: `Регистрация`,
        children: <SignIn />,
    },
];

export const AuthRootComponent: FC = (): ReactElement => {
    return (
        <PageLayout>
            <Tabs defaultActiveKey="1" items={items} />
        </PageLayout>
    )
}