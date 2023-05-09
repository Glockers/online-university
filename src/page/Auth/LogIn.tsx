import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input } from "antd";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ILoginProps, useLogInMutation } from '../../service/mutations/authUserMutations';
import { useAppDispatch } from '../../utils/hooks/redux';
import { loginUser } from '../../store/reducers/LoginThunk';
import { toast } from 'react-toastify';
import { useAuth } from '../../utils/hooks/useAuth';



const validation = z.object({
    login: z.string(),
    password: z.string().min(4),
});

const LogIn = () => {
    const { LogIn: login } = useAuth()
    const { formState, control, setError, handleSubmit, reset } = useForm<ILoginProps>({
        resolver: zodResolver(validation),
    });

    // const [logIn] = useLogInMutation()

    const handleForm = (data: ILoginProps): void => {
        login(data);
    };

    return (
        <Form onSubmitCapture={handleSubmit(handleForm)}>
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
            <Button style={{ marginTop: "30px" }} htmlType={"submit"}>Войти</Button>
        </Form>
    );
};

export default LogIn;