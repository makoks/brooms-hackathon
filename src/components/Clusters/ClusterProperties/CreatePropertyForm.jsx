import React from 'react'
import {Button, Form, Input, Select} from "antd";
import {requiredRules} from "../../../common/form";


const {Option} = Select

export const CreatePropertyForm = ({form, onFinish, loading, types, loadingTypes}) => {
	return (
		<Form style={{padding: '0 16px'}} form={form} onFinish={onFinish}>
			<Form.Item rules={[requiredRules]} name='name'>
				<Input placeholder='Название'/>
			</Form.Item>
			<Form.Item rules={[requiredRules]} name='type'>
				<Select placeholder='Типа свойства' loading={loadingTypes} defaultValue='STRING'>
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