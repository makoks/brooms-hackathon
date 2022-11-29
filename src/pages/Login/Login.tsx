import React from 'react';
import { Image, Typography } from 'antd'
import { Logo } from '../../images'
import './style.css'
import { LoginForm } from '../../components/Login/LoginForm/LoginForm';

export const Login = () => {
    return (
        <section className='login-wrapper'>
            <div className='login-inner'>
                <Image src={Logo} preview={false} width={150} />
                <Typography.Title level={1}>Сотрудники</Typography.Title>
                <LoginForm />
            </div>
        </section>
    );
};
