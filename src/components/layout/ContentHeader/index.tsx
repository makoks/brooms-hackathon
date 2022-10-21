import React from 'react';
import {Col, Layout, Row, Space, Typography} from 'antd';
import './styles.css';
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

type ContentHeaderProps = {
    title: string;
    children?: React.ReactNode;
    paddingBottom?: boolean;
    link?: {
        route: string;
        text: string;
    }
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({title, children, paddingBottom = undefined, link}) => (
    <Layout.Header
        style={{padding: `16px 24px ${paddingBottom ? '24px' : 0}`, height: 'auto'}}
        className="content-header"
    >
        <Space direction="vertical" style={{width: '100%'}}>
            <Row justify='space-between' align='middle'>
                <Col>
                    <Typography.Title level={4} style={{lineHeight: '64px'}}>
                        {title}
                    </Typography.Title>
                </Col>
                {link && (
                    <Col>
                        <Link to={link.route} className='history-link'>{link.text}<ArrowRightOutlined/></Link>
                    </Col>
                )}
            </Row>
            {children}
        </Space>
    </Layout.Header>
);
