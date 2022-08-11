import React, {useState} from 'react'
import {Button, Select, Space, Switch, Typography, Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const {Option} = Select

const EditBlock = ({isEdit, toggleIsEdit, setReason, reason, onSave, onDiscard}) => {
	const [isAddition, setIsAddition] = useState(false)
	const [newReason, setNewReason] = useState('')
	const [reasons, setReasons] = useState([
		{value: 1, text: 'Причина 1'},
		{value: 2, text: 'Причина 2'},
		{value: 3, text: 'Причина 3'},
		{value: 4, text: 'Причина 4'},
	])

	const addNewReason = () => {
		setReasons(oldReasons => [
			...oldReasons,
			{value: oldReasons.length + 1, text: newReason}
		])
		setNewReason('')
		setIsAddition(false)
	}

	return (
		<Space size='large' align='center' style={{marginTop: 15, height: 40}}>
			{!isEdit && <Space align='center'>
				Редактировать:
				<Switch checkedChildren="Вкл" unCheckedChildren="Выкл" checked={isEdit} onChange={toggleIsEdit}/>
			</Space>}
			{isEdit && (
				<Space align='center'>
					<Space align='center'>
						<Typography.Text>
							<Typography.Text type='danger'>*</Typography.Text> Причина изменения:
						</Typography.Text>
						<Select
							onChange={setReason}
							value={reason}
							style={{minWidth: 300}}
							dropdownRender={menu => (
								<>
									{isAddition
										? <Input.Group compact>
											<Input
												value={newReason}
												onChange={e => setNewReason(e.target.value)}
												style={{width: '85%', borderRadius: 0}}
											/>
											<Button
												type="primary"
												style={{width: '15%', borderRadius: 0}}
												icon={<PlusOutlined/>}
												onClick={addNewReason}
											/>
										</Input.Group>
										: <Button
											onClick={() => setIsAddition(true)}
											type='primary' block
											style={{borderRadius: 0}}
										>+ Добавить</Button>
									}
									{menu}
								</>
							)}
						>
							{reasons.map(reason => (
								<Option value={reason.value} key={reason.value}>{reason.text}</Option>
							))}
						</Select>
					</Space>
					<Button onClick={onSave} type='primary'>Сохранить</Button>
					<Button onClick={onDiscard}>Отменить</Button>
				</Space>
			)}
		</Space>
	)
}

export default EditBlock