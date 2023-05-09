import React, { ReactElement } from 'react'
import { useGetCoursesQuery } from '../../../service/queries/usetGetCourses'
import { useAddCourseMutation, useDeleteCourseMutation, useUpdateCourseMutation } from '../../../service/mutations/courseMutations'
import TableFactory from '../../../components/Table/table';
import { columns } from './config';
import { useNotificationContext } from '../../../utils/notification';
import { Button, Space } from 'antd';
import { CSVLink } from 'react-csv';

function CourseTable(): ReactElement {
    const { data } = useGetCoursesQuery()
    const [deleteCourse, { isLoading: isDeleted }] = useDeleteCourseMutation();
    const [updateCourse, { isLoading: usUpdated }] = useUpdateCourseMutation();
    const { showMessage } = useNotificationContext()

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" >
                    <CSVLink filename={"Курсы"} data={data ? data : []}>Экспортировать</CSVLink>
                </Button>
            </Space>
            <TableFactory<any>
                columns={columns}
                loading={usUpdated || isDeleted}
                dataSource={data ? data : []}
                deleteHandler={(data) => {
                    deleteCourse(data).unwrap().then(value => {
                        showMessage("Информация удалена", "success")
                    }).catch(err => {
                        showMessage(err.data, "error");
                        console.error(err)
                    })
                }}
                updateHandler={(data) => {
                    updateCourse(data).unwrap().then(value => {
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

export default CourseTable