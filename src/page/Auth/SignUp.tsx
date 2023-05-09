import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, Input } from "antd";
import { ISignUpProps, useSignUpMutation } from '../../service/mutations/authUserMutations';
import { IUserAuth } from '../../models/IUserAuth';
import { useNotificationContext } from '../../utils/notification';



const validation = z.object({
    login: z.string(),
    password: z.string().min(4),
    email: z.string().email(),
});

const SignIn = () => {
    const { formState, control, handleSubmit, reset } = useForm<ISignUpProps>({
        resolver: zodResolver(validation),
    });
    const { showMessage } = useNotificationContext()

    const [reg] = useSignUpMutation();

    const handleForm = (data: ISignUpProps): void => {
        console.log(data)
        reg(data).unwrap()
            .then((payload) => {
                showMessage("Вы успешно зарегистрировались!", "success")
                reset()
            })
            .catch((err) => {

                if (err?.status === 409) {
                    showMessage("Такой логин или почта уже существует", "error")
                } else {
                    showMessage("Произошла ошибка!", "error")

                    console.error(err)
                }
            }
            )

    };

    return (


        <Form onSubmitCapture={handleSubmit(handleForm)} layout="vertical" >
            <Form.Item
                label="email"
                name="email"
                style={{ marginBottom: 8 }}
                validateStatus={!!formState.errors.email ? "error" : "validating"}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            placeholder="glockerswork@gmail.com"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>
            <Form.Item
                label="Логин"
                name="login"
                style={{ marginBottom: 8 }}
                validateStatus={!!formState.errors.login ? "error" : "validating"}
            >
                <Controller
                    name="login"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            placeholder="megamax"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                style={{ marginBottom: 8 }}
                validateStatus={!!formState.errors.password ? "error" : "validating"}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input.Password
                            placeholder="********"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </Form.Item>

            <Button style={{ marginTop: "30px" }} htmlType={"submit"}>Зарегистрироваться</Button>
        </Form>
    );
};

export default SignIn;