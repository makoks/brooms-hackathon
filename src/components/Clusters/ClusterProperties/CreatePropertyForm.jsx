import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Select} from "antd";
import {requiredRules} from "../../../common/form";
import {propertiesAPI} from "../../../API/API";


const {Option} = Select

export const CreatePropertyForm = ({form, onFinish, loading}) => {
	const [types, setTypes] = useState([])
	const [loadingTypes, setLoadingTypes] = useState(false)

	useEffect(() => {
		const getTypes = async () => {
			setLoadingTypes(true)
			const res = await propertiesAPI.getPropertyTypes()
			setTypes(res)
		}

		getTypes()
			.finally(() => setLoadingTypes(false))
	}, [])

	return (
		<Form style={{padding: '0 16px'}} form={form} onFinish={onFinish}>
			<Form.Item rules={[requiredRules]} name='name'>
				<Input placeholder='Название'/>
			</Form.Item>
			<Form.Item rules={[requiredRules]} name='type'>
				<Select placeholder='Типа свойства' loading={loadingTypes}>
					{types.map(t => (
						<Option value={t.type} key={t.type}>{t.title}</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType="submit" loading={loading || loadingTypes}>
					Создать
				</Button>
			</Form.Item>
		</Form>
	)
}