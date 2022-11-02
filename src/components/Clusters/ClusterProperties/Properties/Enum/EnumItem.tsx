import React, {useState} from 'react'
import {Button, Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {EditingTextByDoubleClick} from "../../../../common/EditingTextByDoubleClick";


type EnumItemProps = {
	deleting: boolean;
	deleteItem: (id: string) => Promise<void>;
	id: string;
	name: string;
	changeItem: (id: string, name: string) => Promise<void>;
}

export const EnumItem: React.FC<EnumItemProps> = ({deleting, deleteItem, id, ...props}) => {
	const [name, setName] = useState<string | undefined>(props.name)
	const [isEdit, setIsEdit] = useState(false)
	const [loading, setLoading] = useState(false)

	const changeItem = async () => {
		setLoading(true)
		await props.changeItem(id, name as string)
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
				onClick={() => deleteItem(id)}
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