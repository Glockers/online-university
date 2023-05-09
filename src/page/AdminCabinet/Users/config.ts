import { IEditableColumnProps } from "../../../components/Table/table.model";
import { IUserAuth } from "../../../models/IUserAuth";
import { ICourseResult } from "../../../service/queries/usetGetCourses";



export const columns: IEditableColumnProps<IUserAuth>[] = [
    {
        title: "ID пользователя",
        dataIndex: "id",
    },
    {
        title: "Логин пользователя",
        dataIndex: "login",
        editable: true,
        sorter: {
            compare: (a, b) => {
                if (a.login && b.login) {
                    return a.login.localeCompare(b.login);
                }
                return a.login ? -1 : b.login ? 1 : 0;
            },
        },
    },
    {
        title: "email клиента",
        dataIndex: "email",
        editable: true,
    },
    {
        title: "Роль",
        dataIndex: "role",
        editable: true,
    },
];