import React from 'react'
import {Divider, Space, Statistic} from "antd";


const StaticInfo = ({department, post, role, project}) => {
	return (
		<Space>
			<Statistic title='Отдел' value={department}/>
			<Divider type='vertical'/>
			<Statistic title='Должность' value={post}/>
			<Divider type='vertical'/>
			<Statistic title='Роль' value={role}/>
			<Divider type='vertical'/>
			<Statistic title='Проект' value={project}/>
		</Space>
	)
}

export default StaticInfo