import { Button, Form, Input } from "antd";
import { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNotificationContext } from "../../../utils/notification";
import { IPropsResponseTask, useSendTaskMutation } from "../../../service/mutations/useTaskResponseMutation";
import { getFromStorage } from "../../../utils/localStorage";
import { IUserAuth } from "../../../models/IUserAuth";

const my_id = getFromStorage<IUserAuth>("user")?.id

export const FormSumbitTusk = (props: any): ReactElement => {
    const { handleSubmit, control, reset } = useForm<IPropsResponseTask>()
    const { showMessage } = useNotificationContext()
    const [sendTaskResponse] = useSendTaskMutation();

    const onSave = (data: IPropsResponseTask) => {
        if (my_id) {
            data.user_id = my_id
            data.task_id = props.task.id
            sendTaskResponse(data).unwrap().then(() => {
                showMessage("Ответ отправлен на проверку", "success");
            }).catch(err => {
                showMessage("Произошла ошибка при отправке", "error");
            })
        }

    }
    return (
        <Form onSubmitCapture={handleSubmit(onSave)}>
            <Form.Item
                label="url git репозитория"
                name="url"
                style={{ marginBottom: 8 }}
                required
            >
                <Controller
                    name="url"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="name"
                            placeholder="https://github.com/Glockers/front"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>
            <Button htmlType="submit">Отправить ответ</Button>
        </Form>
    )
}