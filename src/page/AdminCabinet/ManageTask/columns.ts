import moment from "moment";
import { IEditableColumnProps } from "../../../components/Table/table.model";
import { IResultTask } from "../../../service/mutations/useTaskMutation";

export const columns: IEditableColumnProps<IResultTask>[] = [
    {
        title: "ID задачи",
        dataIndex: "id",
    },
    {
        title: "Название задачи",
        dataIndex: "title",
        editable: true,
        sorter: {
            compare: (a, b) => {
                if (a.title && b.title) {
                    return a.title.localeCompare(b.title);
                }
                return a.title ? -1 : b.title ? 1 : 0;
            },
        },
    },
    {
        title: "Описание задачи",
        dataIndex: "task_description",
        editable: true,
    },
    {
        title: "Дата начала",
        dataIndex: "startDate",
        render: (text, record) => moment(record.startDate).format("YYYY-MM-DD HH:mm")

    },
    {
        title: "Дата окончания",
        dataIndex: "endDate",
        render: (text, record) => moment(record.endDate).format("YYYY-MM-DD HH:mm")

    },
];