import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { IPropsAddTask, useAddTaskMutation } from '../../../service/mutations/useTaskMutation';
import { styled } from 'styled-components';
import { useNotificationContext } from '../../../utils/notification';
const { RangePicker } = DatePicker;

type InputTask = IPropsAddTask & { date: Date[] }


const dateFormat = 'YYYY/MM/DD';

const FormWrapper = styled.div`
    background-color: gainsboro;
    padding: 20px;
    border-radius: 20px;

    margin-bottom: 30px;
`


function FormAddTask(): ReactElement {
    const { handleSubmit, control, reset } = useForm<InputTask>();
    const [addTask] = useAddTaskMutation();
    const { showMessage } = useNotificationContext()
    const onAddHandler = (data: InputTask) => {
        data.startDate = new Date(data.date[0])
        data.endDate = new Date(data.date[1])
        console.log(data)
        addTask(data).unwrap()
            .then(() => showMessage("Задача добавлена", "success"))
            .catch(err => {
                if (err?.status === 406) {
                    showMessage(err?.data, "error")

                } else {
                    showMessage("Задача не была добавлена", "error")
                }
                console.log(err)

            })
        reset()
    }
    return (
        <>
            <FormWrapper>
                <Form onSubmitCapture={handleSubmit(onAddHandler)}>
                    <Form.Item
                        label="Название задачи"
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
                        label="Описание задачи"
                        name="task_description"
                        style={{ marginBottom: 8 }}
                        required
                    >
                        <Controller
                            name="task_description"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <TextArea
                                    placeholder="Описание задачи / Ссылки на материал"
                                    onChange={onChange}
                                    value={value}
                                    maxLength={200}
                                    name='task_description'
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Введите ID курса"
                        name="course"
                        style={{ marginBottom: 8 }}
                        required
                    >
                        <Controller
                            name="course.id"
                            control={control}

                            render={({ field: { value, onChange } }) => (
                                <InputNumber
                                    style={{ width: 300 }}
                                    min={0}
                                    placeholder='Введите ID курса'
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Установите сроки дедлайна"
                        name="date"
                        style={{ marginBottom: 8 }}
                        required
                    >
                        <Controller
                            name="date"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={onChange}
                                />
                            )}
                        />
                    </Form.Item>
                    <Button htmlType="submit" >Добавить задачу</Button>
                </Form>
            </FormWrapper>
        </>
    )
}

export default FormAddTask