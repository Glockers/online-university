import { ReactElement } from "react";
import { Button, Form, Image, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { PageLayout } from "../../layouts";

import * as S from "./Profile.styles";
import { z } from "zod";
import { useAuth } from "../../utils/hooks/useAuth";

type TFormFields = z.infer<typeof validation>;

const validation = z.object({
    email: z.string().email(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    phoneNumber: z.string().optional(),
});

export const Profile = (): ReactElement => {
    const [form] = Form.useForm();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    //   const { remove, update, isLoading } = useAccountMutation();
    const { formState, control, handleSubmit } = useForm<TFormFields>({
        resolver: zodResolver(validation),
        defaultValues: user,
    });




    return (
        <PageLayout>
            <S.LoginForm
                form={form}
                layout="vertical"
            // onSubmitCapture={handleSubmit(handleForm, console.log)}
            >
                <S.AvatarWrapper>
                    <S.Avatar
                        style={{ marginBottom: 32 }}
                        width={160}
                        height={160}
                        src={"https://i.pravatar.cc/300"}
                    />
                </S.AvatarWrapper>

                <Form.Item
                    label="E-mail"
                    name="email"
                    style={{ marginBottom: 8 }}
                    required
                    validateStatus={!!formState.errors.email ? "error" : "validating"}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="email"
                                placeholder="email@domain.com"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Имя"
                    name="name"
                    style={{ marginBottom: 8 }}
                    required
                    validateStatus={!!formState.errors.firstName ? "error" : "validating"}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="text"
                                placeholder="Виктор"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Фамилия"
                    name="lastName"
                    style={{ marginBottom: 8 }}
                    required
                    validateStatus={!!formState.errors.lastName ? "error" : "validating"}
                >
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="text"
                                placeholder="Краковский"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Номер телефона"
                    name="phoneNumber"
                    style={{ marginBottom: 8 }}
                    validateStatus={
                        !!formState.errors.phoneNumber ? "error" : "validating"
                    }
                >
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="text"
                                placeholder="+375442932345"
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Form.Item>
            </S.LoginForm>
        </PageLayout>
    );
};
