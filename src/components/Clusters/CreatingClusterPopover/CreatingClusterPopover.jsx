import React, {useState} from 'react'
import {Button, Form, Popover} from "antd";
import {CreateClusterForm} from "./CreateClusterForm";


export const CreatingClusterPopover = (props) => {
	const [creating, setCreating] = useState(false)
	const [form] = Form.useForm()

	const createCluster = async (values) => {
		setCreating(true)
		props.createCluster(values)
			.then(() => form.resetFields())
			.finally(() => setCreating(false))
	}

	return (
		<Popover
			content={<CreateClusterForm
				form={form}
				onFinish={createCluster}
				creating={creating}
			/>}
			placement="rightTop"
			trigger='click'
		>
			<Button
				type='primary'
				block
				style={{borderRadius: 0}}
			>
				+ Добавить
			</Button>
		</Popover>
	)
}