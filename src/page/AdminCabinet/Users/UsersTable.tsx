import { ReactElement } from "react";
import TableFactory from "../../../components/Table/table";
import { useGetUsersQuery } from "../../../service/queries/useGetUserQuery";
import { columns } from "./config";
import { useDeleteUserMutation, useUpdateUserMutation } from "../../../service/mutations/userMutations";
import { useNotificationContext } from "../../../utils/notification";
import { Button, Space } from "antd";
import { CSVLink } from "react-csv";


function UsersTable(): ReactElement {
    const { data, isLoading } = useGetUsersQuery()
    const [deleteUser, { isLoading: isDeleted }] = useDeleteUserMutation();
    const [updateUser, { isLoading: isUpdated }] = useUpdateUserMutation();
    const { showMessage } = useNotificationContext()
    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" >
                    <CSVLink filename={"Пользователи"} data={data ? data : []}>Экспортировать</CSVLink>
                </Button>
            </Space>
            <TableFactory<any>
                columns={columns}
                loading={isUpdated || isDeleted || isLoading}
                dataSource={data ? data : []}
                deleteHandler={(data) => {
                    deleteUser(data).unwrap().then(value => {
                        showMessage("Информация удалена", "success")
                    }).catch(err => {
                        showMessage(err.data, "error");
                        console.error(err)
                    })
                }}
                updateHandler={(data) => {
                    updateUser(data).unwrap().then(value => {
                        showMessage("Информация изменена", "success")
                    }).catch(err => {
                        showMessage(err.data, "error");
                        console.error(err)
                    })
                }}

            />
        </>
    )
}

export default UsersTable