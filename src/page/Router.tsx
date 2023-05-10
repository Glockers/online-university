import { ReactElement } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { AuthRootComponent } from "./Auth"
import { useAuth } from "../utils/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { Layout, Spin } from "antd";
import Sidebar from "../components/SideBar";
import styled from "styled-components";
import { PageLayout } from "../layouts";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { Profile } from "./Profile";
import { EUserRole } from "../models/Enums";
import { NotFound } from "./Not-found";
import Catalog from "./Catalog";
import CoursePage from "./AdminCabinet/Course";
import UsersPage from "./AdminCabinet/Users";
import PaymentManagmentPage from "./AdminCabinet/PaymentManagment";
import ManageTask from "./AdminCabinet/ManageTask/ManageTask";

const StyledLayout = styled(PageLayout)`
  display: block;
  width: 100%;
`;


export enum EAppRoutes {
    HOME = "/",
    AUTH = '/auth',
    PROFILE = "/profile",
    CATALOG = "/catalog",
    NOT_FOUND = "*",
    MANAGE_COURSE = "/manage-course",
    MANAGE_USERS = "/manage-users",
    MANAGE_PAYMENT = "/manage-payments",
    MANAGE_TASK = "/manage-task",

}

const commonRoute = [
    <Route path={EAppRoutes.CATALOG} element={<div />} />,
]

export const Routing = (): ReactElement => {
    const { role, isLoading } = useAuth();
    return (
        <>
            <Layout style={{ height: "100vh" }}>
                <Sidebar />
                <StyledLayout style={{ display: "block" }}>
                    <AppHeader />
                    <main>

                        <Routes>
                            {role === EUserRole.USER ?
                                <Route >
                                    <Route path={EAppRoutes.AUTH} element={<Navigate to={EAppRoutes.PROFILE} />} />
                                    <Route path={EAppRoutes.PROFILE} element={<Profile />} />

                                </Route> : null
                            }

                            {role === EUserRole.ADMIN ?
                                <Route>
                                    <Route path={EAppRoutes.AUTH} element={<Navigate to={EAppRoutes.PROFILE} />} />
                                    <Route path={EAppRoutes.PROFILE} element={<Profile />} />
                                    <Route path={EAppRoutes.MANAGE_COURSE} element={<CoursePage />} />
                                    <Route path={EAppRoutes.MANAGE_USERS} element={<UsersPage />} />
                                    <Route path={EAppRoutes.MANAGE_PAYMENT} element={<PaymentManagmentPage />} />
                                    <Route path={EAppRoutes.MANAGE_TASK} element={<ManageTask />} />

                                </Route> : null
                            }

                            <Route path={EAppRoutes.CATALOG} element={<Catalog />} />
                            <Route path={EAppRoutes.PROFILE} element={<Navigate to={EAppRoutes.AUTH} />} />
                            <Route path={EAppRoutes.AUTH} element={<AuthRootComponent />} />

                            <Route path={EAppRoutes.NOT_FOUND} element={<NotFound />} />

                        </Routes>
                    </main>
                    <AppFooter />
                </StyledLayout >
            </Layout >

            <ToastContainer />
        </>
    )
}