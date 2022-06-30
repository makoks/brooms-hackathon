import React, { useState } from 'react';
import { Space, Typography, Tabs } from 'antd';
import { LoginForm, RegisterForm } from '../components';
import { Logo } from '../images';
import 'antd/dist/antd.css';

export const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('auth');
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
    }}>
      <Space direction="vertical" style={{ width: 370, height: 573 }} size="large">
        <img src={Logo} alt="logo" width={157} height={117} style={{ margin: 'auto', display: 'block' }} />
        <Typography.Title style={{ textAlign: 'center' }}>Электровеники</Typography.Title>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Авторизация" key="auth">
            <LoginForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Регистрация" key="register">
            <RegisterForm setActiveTab={setActiveTab} />
          </Tabs.TabPane>
        </Tabs>
      </Space>
    </div>
    );
};
