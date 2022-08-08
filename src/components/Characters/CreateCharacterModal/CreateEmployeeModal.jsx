import React, {useEffect} from 'react'
import {Button, Form, Image, Input, Modal, Select, Space, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {AvatarPreview} from "../../../images";

const {Option} = Select

const CreateEmployeeModal = ({isModalVisible, createCharacter, onCancel, loading}) => {
	const fieldNames = ['name', 'email', 'phone', 'department', 'post', 'role', 'avatar']
	const [form] = Form.useForm()

	useEffect(() => {
		console.log(form.getFieldValue('name'))
		// console.log(URL.createObjectURL(form.getFieldValue('avatar')))
	}, [form])

	return (
		<Modal
			title="Добавить сотрудника"
			visible={isModalVisible}
			onCancel={onCancel}
			confirmLoading={loading}
			onOk={() => {
				form.validateFields(fieldNames)
					.then(() => createCharacter(form.getFieldsValue(fieldNames)))
			}}
		>
			<Form form={form}>
				<Space>
					<div>
						<Form.Item name="name" label="ФИО" rules={[{required: true}]}>
							<Input/>
						</Form.Item>
						<Form.Item name="email" label="Почта" rules={[{required: true}]}>
							<Input/>
						</Form.Item>
						<Form.Item name="phone" label="Телефон" rules={[{required: true}]}>
							<Input/>
						</Form.Item>
						<Form.Item name="department" label='Отдел' rules={[{required: true}]}>
							<Select>
								<Option>Отдел разработки</Option>
								<Option>Отдел документирования</Option>
								<Option>Отдел тестирования</Option>
								<Option>Head office</Option>
							</Select>
						</Form.Item>
						<Form.Item name='post' label="Должность" rules={[{required: true}]}>
							<Select>
								<Option>Эксперт 1 категории</Option>
								<Option>Ведущий эксперт</Option>
								<Option>Главный инженер</Option>
							</Select>
						</Form.Item>
						<Form.Item name="role" label='Роль'>
							<Select>
								<Option>Разработчик</Option>
								<Option>Тестировщик</Option>
								<Option>Дизайнер</Option>
								<Option>Технический писатель</Option>
							</Select>
						</Form.Item>
						<Form.Item name="project" label='Проект'>
							<Select>
								<Option>ПОИ</Option>
								<Option>АСУП</Option>
							</Select>
						</Form.Item>
					</div>
					<Space direction='vertical' align='center'>
						<Image
							width={140}
							height={140}
							src={AvatarPreview}
							preview={false}
						/>
						<Form.Item name="avatar">
							<Upload accept='image/*'>
								<Button icon={<UploadOutlined />}>Выбрать изображение</Button>
							</Upload>
						</Form.Item>
					</Space>
				</Space>
			</Form>
		</Modal>
	)
}

export default CreateEmployeeModal