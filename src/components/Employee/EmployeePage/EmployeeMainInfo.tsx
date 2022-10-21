import React from 'react'
import {Avatar, Skeleton, Space, Typography} from "antd";
import StaticInfo from "../StaticInfo";
import {AvatarPreview} from "../../../images";


type EmployeeMainInfoProps = {
    avatar: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    post: string;
    role: string;
    project: string;
    loading: boolean;
}

const EmployeeMainInfo: React.FC<EmployeeMainInfoProps> = ({
                                                               avatar,
                                                               name,
                                                               email,
                                                               phone,
                                                               department,
                                                               post,
                                                               role,
                                                               project,
                                                               loading
                                                           }) => {
    return (
        <Skeleton loading={loading} active avatar paragraph={{rows: 1}}>
            <div style={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between'
            }}>
                <Space size='large'>
                    <Avatar src={avatar || AvatarPreview} size={72}/>
                    <Space direction='vertical'>
                        <Typography.Title level={4}>{name}</Typography.Title>
                        <Space size='large'>
                            <Typography.Text strong>Почта: <Typography.Text
                                type='secondary'>{email}</Typography.Text></Typography.Text>
                            <Typography.Text strong>Телефон: <Typography.Text type='secondary'>{phone}</Typography.Text></Typography.Text>
                        </Space>
                    </Space>
                </Space>
                <StaticInfo info={[
                    {title: 'Отдел', value: department},
                    {title: 'Должность', value: post},
                    {title: 'Роль', value: role},
                    {title: 'Проект', value: project},
                ]}/>
            </div>
        </Skeleton>
    )
}

export default EmployeeMainInfo