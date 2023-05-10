import { ReactElement } from "react";
import TableFactory from "../../../components/Table/table";
import { columns } from "./columns";
import { useGetAllTaskQuery } from "../../../service/queries/useGetMyTask";

export const TaskTable = (): ReactElement => {
    const { data } = useGetAllTaskQuery()
    return (
        <>
            <TableFactory<any>
                columns={columns}
                dataSource={data ? data : []}
                deleteHandler={() => { }}
                updateHandler={() => { }}
            />
        </>
    )
}