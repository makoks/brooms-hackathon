import React from 'react'
import {Button, Form, Input} from "antd";
import {requiredRules} from "../../../common/form";


const { TextArea } = Input;

export const CreateClusterForm = ({onFinish, creating, form}) => {
	return (
		<Form style={{width: 350}} onFinish={onFinish} form={form}>
			<Form.Item rules={[requiredRules]} name='name'>
				<Input placeholder='Название'/>
			</Form.Item>
			<Form.Item rules={[requiredRules]} name='definition'>
				<TextArea placeholder='Описание' />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType="submit" loading={creating}>
					Создать
				</Button>
			</Form.Item>
		</Form>
	)
}