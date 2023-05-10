import { IEditableColumnProps } from "../../../components/Table/table.model";
import { ICourseResult } from "../../../service/queries/usetGetCourses";



export const columns: IEditableColumnProps<ICourseResult>[] = [
    {
        title: "ID курса",
        dataIndex: "id",
    },
    {
        title: "Название курса",
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
        title: "Описание курса",
        dataIndex: "description",
        editable: true,
    },
    {
        title: "Cтоимость",
        dataIndex: "cost",
        editable: true,
    },
    {
        title: "Статус курса",
        dataIndex: "status",
        editable: true,
    },
];