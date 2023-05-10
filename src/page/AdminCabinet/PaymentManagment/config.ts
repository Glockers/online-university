import moment from "moment";
import { IEditableColumnProps } from "../../../components/Table/table.model";
import { EAppCourseProgressive, IResultPaymentCourses } from "../../../service/queries/useGetPaymentCourses";



export const columns: IEditableColumnProps<IResultPaymentCourses>[] = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "stipe платеж",
        dataIndex: "stripe_id",
    },
    {
        title: "Дата оплаты",
        dataIndex: "localDateTime",
        render: (text, record) => moment(record.localDateTime).format("YYYY-MM-DD HH:mm")
    },
    {
        title: "Клиент ID",
        dataIndex: ["user", "id"],
        editable: true,
    },
    {
        title: "Номер курса",
        dataIndex: ["course", "id"],
        editable: true,
    },
    {
        title: "Статус прохождения",
        dataIndex: "courseProgressStatus",
        editable: true,
    },
];