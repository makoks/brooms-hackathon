import React from 'react'
import {Button, Form, FormInstance, Input} from "antd";
import {requiredRules} from "../../../common/form";
import {ClusterData} from "../types";


const { TextArea } = Input;

type CreateClusterFormProps = {
	onFinish: (values: ClusterData) => void;
	creating: boolean;
	form: FormInstance<ClusterData>;
}

export const CreateClusterForm: React.FC<CreateClusterFormProps> = ({onFinish, creating, form}) => {
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