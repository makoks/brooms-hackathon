import React from 'react';
import {Button, Col, Layout, Row, Space, Typography} from 'antd';
import './styles.css';
import {ArrowRightOutlined} from "@ant-design/icons";

export const ContentHeader = ({ title, children, paddingBottom = undefined, link }) => (
  <Layout.Header
    style={{ padding: `16px 24px ${paddingBottom ? '24px' : 0}`, height: 'auto' }}
    className="content-header"
  >
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify='space-between' align='middle'>
        <Col>
          <Typography.Title level={4} style={{ lineHeight: '64px' }}>
            {title}
          </Typography.Title>
        </Col>
        {link && (
            <Col>
              <Button type="link" href={link.route}>{link.text}<ArrowRightOutlined /></Button>
            </Col>
        )}
      </Row>
      {children}
    </Space>
  </Layout.Header>
);
