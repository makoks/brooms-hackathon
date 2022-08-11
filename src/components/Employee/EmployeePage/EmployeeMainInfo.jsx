import React from 'react'
import {Avatar, Skeleton, Space, Typography} from "antd";
import StaticInfo from "../StaticInfo";


const EmployeeMainInfo = ({avatar, name, email, phone, department, post, role, project, loading}) => {
	return (
		<Skeleton loading={loading} active avatar paragraph={{rows: 1}}>
			<div style={{
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'space-between'
			}}>
				<Space size='large'>
					<Avatar src={avatar} size={72}/>
					<Space direction='vertical'>
						<Typography.Title level={4}>{name}</Typography.Title>
						<Space size='large'>
							<Typography.Text strong>Почта: <Typography.Text type='secondary'>{email}</Typography.Text></Typography.Text>
							<Typography.Text strong>Телефон: <Typography.Text type='secondary'>{phone}</Typography.Text></Typography.Text>
						</Space>
					</Space>
				</Space>
				<StaticInfo department={department} post={post} role={role} project={project}/>
			</div>
		</Skeleton>
	)
}

export default EmployeeMainInfo