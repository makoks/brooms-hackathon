import React, {useState} from 'react'
import {Form, Popover} from "antd";
import {CreateClusterForm} from "./CreateClusterForm";
import {AddButton} from "../../common/AddButton";


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
			<AddButton />
		</Popover>
	)
}