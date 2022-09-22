import React, {useState} from 'react'
import {Button, Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {EditingTextByDoubleClick} from "../../../../common/EditingTextByDoubleClick";


export const EnumItem = ({deleting, deleteItem, id, ...props}) => {
	const [name, setName] = useState(props.name)
	const [isEdit, setIsEdit] = useState(false)
	const [loading, setLoading] = useState(false)

	const changeItem = async () => {
		setLoading(true)
		await props.changeItem(id, name)
		setLoading(false)
		setIsEdit(false)
	}

	return (
		<Space size="middle" style={{width: '100%'}}>
			<Button
				icon={<DeleteOutlined/>}
				shape="circle" type="default"
				danger size="small"
				disabled={deleting}
				onClick={deleteItem}
			/>
			<EditingTextByDoubleClick
				isEdit={isEdit}
				setIsEdit={setIsEdit}
				value={name}
				onChange={setName}
				onBlur={changeItem}
				loading={loading}
			/>
		</Space>
	)
}