import React, { useState } from 'react';
import { Layout as AntdLayout, Menu, Space, Typography, Button, Switch } from 'antd';
import { Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { LogoutOutlined, ProfileOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import { Logo } from '../../images';
import { useAuth, useCurrentPage } from '../../hooks';

export const Layout = () => {
  const currentPage = useCurrentPage();
  const discordToken = useAuth();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const navigate = useNavigate();
  const onLogoutHandler = () => {
    localStorage.removeItem('discord_token');
    navigate('login');
  };

  if (!discordToken) {
    return <Navigate to="login" />;
  }

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <AntdLayout style={{ minHeight: '100vh' }}>
        <AntdLayout.Header style={{
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #424242'
        }}>
          <Space size="middle">
            <img src={Logo} alt="logo" width={32} height={24} />
            <Typography.Text strong style={{ color: '#fff', fontSize: 18 }}>
              Электровеники
            </Typography.Text>
          </Space>
          <Space size="large">
            <Switch
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbFilled />}
              onChange={setIsDarkTheme}
            />
            <Button type="link" onClick={onLogoutHandler} style={{ fontSize: 20, color: '#fff' }}>
              <LogoutOutlined />
            </Button>
          </Space>
        </AntdLayout.Header>
        <AntdLayout>
          <AntdLayout.Sider style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)' }}>
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} selectedKeys={[currentPage]} items={[
              { label: <Link to="/">Home</Link>, key: 'home', icon: <ProfileOutlined /> },
              { label: <Link to="page">Page</Link>, key: 'page', icon: <ProfileOutlined /> },
            ]} />
          </AntdLayout.Sider>
          <Outlet />
        </AntdLayout>
      </AntdLayout>
    </div>
  );
};
