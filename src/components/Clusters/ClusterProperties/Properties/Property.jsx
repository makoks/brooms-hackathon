import React, {useState} from 'react'
import {Button, Select, Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {EditingTextByDoubleClick} from "../../../common/EditingTextByDoubleClick";
import {EnumPopover} from "./Enum/EnumPopover";


const {Option} = Select

export const Property = ({property, deleteProperty, deleting, types, loadingTypes, changeProperty}) => {
	const [isEdit, setIsEdit] = useState(false)
	const [loading, setLoading] = useState(false)
	const [propName, setPropName] = useState(property.name)
	const [type, setType] = useState(property.type)

	const changeName = () => {
		setLoading(true)
		changeProperty(property.id, propName)
			.then(() => {
				setLoading(false)
				setIsEdit(false)
			})
	}

	const changeType = (newType) => {
		setLoading(true)
		changeProperty(property.id, undefined, newType)
			.then(() => {
				setType(newType)
				setLoading(false)
				setIsEdit(false)
			})
	}

	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginRight: type === 'ENUM' ? 0 : 46
		}}>
			<Space size="middle">
				<Button
					icon={<DeleteOutlined/>}
					shape="circle" type="default"
					danger size="small"
					disabled={deleting}
					onClick={deleteProperty}
				/>
				<EditingTextByDoubleClick
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					value={propName}
					onChange={setPropName}
					onBlur={changeName}
					loading={loading}
				/>
			</Space>
			<div>
				<Select
					value={type}
					onChange={value => changeType(value)}
					loading={loadingTypes || loading}
					style={{width: 90}}
				>
					{types.map(t => (
						<Option value={t.type} key={t.type}>{t.title}</Option>
					))}
				</Select>
				{type === 'ENUM' && <EnumPopover id={property.id}/>}
			</div>
		</div>
	)
}