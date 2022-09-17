import React, {useState} from 'react'
import {Button, Input, message, Space, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {clustersAPI} from "../../../API/API";


const {Paragraph} = Typography

export const ClusterDefinition = ({id, ...props}) => {
	const [definition, setDefinition] = useState(props.definition)
	const [isEdit, setIsEdit] = useState(false)
	const [saving, setSaving] = useState(false)

	const changeDefinition = () => {
		setSaving(true)
		clustersAPI.editCluster(id, undefined, definition)
			.then(() => {
				setSaving(false)
				setIsEdit(false)
			})
			.catch(() => message.error('Не удалось изменить описание'))
	}

	return (
		<>
			{isEdit ? (
				<Space direction='vertical' size='small' style={{width: '100%'}}>
					<Input.TextArea value={definition} onChange={e => setDefinition(e.target.value)}/>
					<Button onClick={changeDefinition} type='primary' loading={saving}>Сохранить</Button>
				</Space>
			) : (
				<>
					{definition ? (
						<Paragraph style={{marginBottom: 0}} onDoubleClick={() => setIsEdit(true)}>
							{definition}
						</Paragraph>
					) : (
						<Button icon={<PlusOutlined/>} type="default" onClick={() => setIsEdit(true)}>
							Добавить описание
						</Button>
					)}
				</>
			)}
		</>
	)
}