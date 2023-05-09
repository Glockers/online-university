import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import React, { ElementType, ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { EAppCourseStatus, ICourseResult } from '../../../service/queries/usetGetCourses';
import { useAddCourseMutation } from '../../../service/mutations/courseMutations';
import { useNotificationContext } from '../../../utils/notification';

export type TFormFields = z.infer<typeof validation>;


const validation = z.object({
    description: z.string().min(10),
    title: z.string().min(5),
    cost: z.number().min(100),
    status: z.nativeEnum(EAppCourseStatus)
})

interface IProps {
    onAdd: (data: Omit<ICourseResult, "id">) => void
}
// { onAdd }: IProps
export const AddForm = (): ReactElement => {
    const [addCourse] = useAddCourseMutation();
    const { showMessage } = useNotificationContext()
    const { handleSubmit, control, formState } = useForm<TFormFields>({
        resolver: zodResolver(validation),
    });

    const onAdd = (data: TFormFields) => {
        addCourse(data).unwrap().then(() => {
            showMessage("Курс добавлен", "success");
        }).catch(err => {
            console.error(err)
            showMessage("Ошибка при добавлени", "error");
        })
    }
    return (
        <>

            <Form onSubmitCapture={handleSubmit(onAdd)}>

                <Form.Item
                    label="Название курса"
                    name="title"
                    style={{ marginBottom: 8 }}
                    required
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="name"
                                placeholder="JAVA Курс"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Описание курса"
                    name="description"
                    style={{ marginBottom: 8 }}
                    required
                >
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="name"
                                placeholder="Java это классно!"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Cтомость курса"
                    name="cost"
                    style={{ marginBottom: 8 }}
                    required
                >
                    <Controller
                        name="cost"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputNumber
                                min={100}
                                type="name"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Название курса"
                    name="status"
                    style={{ marginBottom: 8 }}
                    required
                >
                    <Controller
                        name="status"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Select
                                defaultValue={EAppCourseStatus.CLOSED}
                                options={[
                                    { value: EAppCourseStatus.ACTIVE, label: 'Активный' },
                                    { value: EAppCourseStatus.CLOSED, label: 'Закрытый' },

                                ]}
                                // type="name"
                                // placeholder="Три товарища"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>
                <Button htmlType='submit'>Добавить</Button>

            </Form>
        </>
    )
}
