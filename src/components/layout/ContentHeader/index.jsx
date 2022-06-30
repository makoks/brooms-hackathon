import React from 'react';
import { Layout, Space, Typography } from 'antd';
import './styles.css';

export const ContentHeader = ({ title, children, paddingBottom = undefined }) => (
  <Layout.Header
    style={{ padding: `16px 24px ${paddingBottom ? '24px' : 0}`, height: 'auto' }}
    className="content-header"
  >
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ lineHeight: '64px' }}>
        {title}
      </Typography.Title>
      {children}
    </Space>
  </Layout.Header>
);
