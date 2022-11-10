import React, {useState} from 'react'
import {Form, message, Popover} from "antd";
import {CreateClusterForm} from "./CreateClusterForm";
import {AddButton} from "../../common/AddButton";
import {ClusterData} from "../types";


type CreatingClusterPopoverProps = {
	createCluster: (clusterData: ClusterData) => Promise<void>
}

export const CreatingClusterPopover: React.FC<CreatingClusterPopoverProps> = (props) => {
	const [creating, setCreating] = useState(false)
	const [form] = Form.useForm()

	const createCluster = async (values: ClusterData) => {
		setCreating(true)
		props.createCluster(values)
			.then(() => form.resetFields())
			.catch(() => message.error('Не удалось создать кластер :('))
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