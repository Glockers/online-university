import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header } from "antd/es/layout/layout";
import MenuItem from "antd/es/menu/MenuItem";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { EUserRole } from "../models/Enums";
import { useAuth } from "../utils/hooks/useAuth";
import { EAppRoutes } from "../page/Router";
import { AlertTwoTone, PieChartOutlined, UsbOutlined } from "@ant-design/icons";


type MenuItem = Required<MenuProps>["items"][number] & {
    permisson?: `${EUserRole}`[];
};

const Container = styled(Header)`
  height: 100vh;
  padding: 0;
`;

const withCondition = <T extends any[]>(condition: boolean, results: T) =>
    condition ? results : [];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { isAuthorized, role } = useAuth()
    const items = useMemo<MenuItem[]>(
        () => [
            {
                key: EAppRoutes.HOME,
                icon: <PieChartOutlined />,
                label: "Каталог",
                onClick: () => navigate(EAppRoutes.CATALOG),
            },

            ...withCondition(role === EUserRole.ADMIN, [
                {
                    key: EAppRoutes.MANAGE_COURSE,
                    icon: <AlertTwoTone />,
                    label: "Управ. курсами",
                    onClick: () => navigate(EAppRoutes.MANAGE_COURSE),
                },
                {
                    key: EAppRoutes.MANAGE_USERS,
                    icon: <UsbOutlined />,
                    label: "Управ. пользователями",
                    onClick: () => navigate(EAppRoutes.MANAGE_USERS),
                },
                {
                    key: EAppRoutes.MANAGE_PAYMENT,
                    icon: <UsbOutlined />,
                    label: "Управ. оплатами",
                    onClick: () => navigate(EAppRoutes.MANAGE_PAYMENT),
                },
            ]),
        ],
        [isAuthorized, navigate, role]
    );
    return (
        <Container>
            <Sider
                collapsible
                collapsed={collapsed}
                theme="dark"
                onCollapse={(value) => setCollapsed(value)}
            >
                <div>
                    <Link to="/">
                        Курсы
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </Sider>
        </Container>
    )
}
