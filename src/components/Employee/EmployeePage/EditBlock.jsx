import React, {useEffect, useState} from 'react'
import {Button, Select, Space, Switch, Typography, Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {employeesAPI} from "../../../API/API";
import {AddButton} from "../../common/AddButton";

const {Option} = Select

const EditBlock = ({isEdit, toggleIsEdit, setReason, reason, onSave, onDiscard, saving}) => {
	const [isAddition, setIsAddition] = useState(false)
	const [newReason, setNewReason] = useState('')
	const [reasons, setReasons] = useState([])
	const [loading, setLoading] = useState(false)
	const [creating, setCreating] = useState(false)

	useEffect(() => {
		setLoading(true)
		const getChangeReasons = async () => {
			const res = await employeesAPI.getChangeReasons()
			console.log(res.data)
			setReasons(res.data._embedded.sourceOfChange)
		}

		getChangeReasons()
			.finally(() => setLoading(false))
	}, [])

	const addNewReason = async () => {
		setCreating(true)
		employeesAPI.createReason(newReason)
			.then(() => {
				setReasons(oldReasons => [
					...oldReasons,
					{id: oldReasons.length + 1, name: newReason}
				])
				setNewReason('')
				setIsAddition(false)
			})
			.finally(() => setCreating(false))
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
							loading={loading}
							onDropdownVisibleChange={() => setIsAddition(false)}
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
												disabled={newReason.length === 0}
												loading={creating}
											/>
										</Input.Group>
										: <AddButton onClick={() => setIsAddition(true)}/>
									}
									{menu}
								</>
							)}
						>
							{reasons.map(reason => (
								<Option value={reason.id} key={reason.id}>{reason.name}</Option>
							))}
						</Select>
					</Space>
					<Button onClick={onSave} type='primary' loading={saving}>Сохранить</Button>
					<Button onClick={onDiscard}>Отменить</Button>
				</Space>
			)}
		</Space>
	)
}

export default EditBlock