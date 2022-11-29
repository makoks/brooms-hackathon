import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { requiredRules } from '../../../common/form';
import './style.css';

export const LoginForm = () => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            className='login-form'
        >
            <Form.Item name="login" rules={[requiredRules]} className='login-form__item'>
                <Input
                    prefix={<UserOutlined style={{ color: '#13C2C2' }} />}
                    placeholder="Логин"
                    className='login-form__input'
                    size='large'
                />
            </Form.Item>
            <Form.Item name="password" rules={[requiredRules]} className='login-form__item'>
                <Input.Password
                    prefix={<LockOutlined style={{ color: '#13C2C2' }} />}
                    type="password"
                    placeholder="Пароль"
                    className='login-form__input'
                    size='large'
                    iconRender={() => undefined}
                />
            </Form.Item>
            <Form.Item className='login-form__item'>
                <Button type="primary" htmlType="submit" size='large'>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};
