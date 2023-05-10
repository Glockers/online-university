import { ReactElement } from "react";
import TableFactory from "../../../components/Table/table";
import { columns } from "./config";
import { useGetPaymentCoursesQuery } from "../../../service/queries/useGetPaymentCourses";
import { useDeletePaymentCourseMutation, useUpdatePaymentCourseMutation } from "../../../service/mutations/usePaymentCoursesMutation";
import { useNotificationContext } from "../../../utils/notification";


export function PaymentTable(): ReactElement {

    const { data, isLoading: isLoadingData } = useGetPaymentCoursesQuery();
    const [deleteCourse] = useDeletePaymentCourseMutation()
    const [updateCourse] = useUpdatePaymentCourseMutation();
    const { showMessage } = useNotificationContext()

    return (
        <>
            <TableFactory<any>
                loading={isLoadingData}
                columns={columns}
                dataSource={data ? data : []}
                deleteHandler={(data) => {
                    deleteCourse(data).unwrap()
                        .then(data => {
                            showMessage("Удаление прошло успешно!", "success");
                        })
                        .catch(err => {
                            showMessage(err, "error");
                        })
                }}
                updateHandler={(data) => {
                    try {
                        updateCourse(data).unwrap()
                            .then(data => {
                                showMessage("Изменение прошло успешно!", "success");
                            })
                            .catch(err => {
                                if (err.status === 406) {
                                    showMessage(err?.data, "error");
                                }
                                else {
                                    showMessage("Произошла неизвестная ошибка", "error");
                                }
                            })
                    } catch (error) {
                        console.log(error)
                    }
                }}
            />
        </>
    )
}