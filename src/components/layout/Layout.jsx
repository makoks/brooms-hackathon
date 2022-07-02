import React, { useState } from 'react';
import { Layout as AntdLayout, Menu, Space, Typography, Switch } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { ProfileOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import { Logo } from '../../images';
import { useCurrentPage } from '../../hooks';

export const Layout = () => {
  const currentPage = useCurrentPage();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

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
              Heroes App
            </Typography.Text>
          </Space>
          <Space size="large">
            <Switch
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbFilled />}
              onChange={setIsDarkTheme}
            />
          </Space>
        </AntdLayout.Header>
        <AntdLayout>
          <AntdLayout.Sider style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)' }}>
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} selectedKeys={[currentPage]} items={[
              { label: <Link to="/">Home</Link>, key: 'home', icon: <ProfileOutlined /> },
              { label: <Link to="reference">MP Reference</Link>, key: 'reference', icon: <ProfileOutlined /> },
              { label: <Link to="changing">Properties Changing</Link>, key: 'changing', icon: <ProfileOutlined /> },
              { label: 'Reports', key: 'reports', icon: <ProfileOutlined />, children: [
                { label: <Link to="comparison">Comparison</Link>, key: 'comparison', icon: <ProfileOutlined /> },
                { label: <Link to="history">History</Link>, key: 'history', icon: <ProfileOutlined /> },
              ] },
            ]} />
          </AntdLayout.Sider>
          <Outlet />
        </AntdLayout>
      </AntdLayout>
    </div>
  );
};
