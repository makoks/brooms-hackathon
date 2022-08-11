import React, {useState} from 'react'
import {Col, Form, Image, Input, Modal, Row, Select, Space} from "antd";
import {AvatarPreview} from "../../../images";
import {employeesAPI} from "../../../API";
import {requiredRules} from "../../../common/form";

const {Option} = Select

const CreateEmployeeModal = ({isModalVisible, onCancel, departments, positions, roles, projects}) => {
	const fieldNames = ['fioUser', 'email', 'telephone', 'idDepartment', 'idPosition', 'idRole', 'idProject', 'avatar']
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	const createEmployee = async (data) => {
		setLoading(true)
		employeesAPI.createEmployee(data)
			.then(onCancel)
			.finally(() => setLoading(false))
	}

	return (
		<Modal
			title="Добавить сотрудника"
			visible={isModalVisible}
			onCancel={onCancel}
			confirmLoading={loading}
			onOk={() => {
				form.validateFields(fieldNames)
					.then(() => createEmployee(form.getFieldsValue(fieldNames)))
			}}
			style={{minWidth: 800}}
		>
			<Form form={form}>
				<Row justify='space-between'>
					<Col span={16}>
						<Form.Item name="fioUser" label="ФИО" rules={[requiredRules]}>
							<Input/>
						</Form.Item>
						<Form.Item name="email" label="Почта" rules={[requiredRules]}>
							<Input/>
						</Form.Item>
						<Form.Item name="telephone" label="Телефон" rules={[requiredRules]}>
							<Input/>
						</Form.Item>
						<Form.Item name="idDepartment" label='Отдел' rules={[requiredRules]}>
							<Select>
								{departments?.map(dep => (
									<Option key={dep.id} value={dep.id}>{dep.name}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='idPosition' label="Должность" rules={[requiredRules]}>
							<Select>
								{positions?.map(pos => (
									<Option key={pos.id} value={pos.id}>{pos.name}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="idRole" label='Роль' rules={[requiredRules]}>
							<Select>
								{roles?.map(role => (
									<Option key={role.id} value={role.id}>{role.name}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="idProject" label='Проект' rules={[requiredRules]}>
							<Select>
								{projects?.map(proj => (
									<Option key={proj.id} value={proj.id}>{proj.name}</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8} style={{display: 'flex', justifyContent: 'center'}}>
						<Space direction='vertical' align='center'>
							<Image
								width={140}
								height={140}
								src={AvatarPreview}
								preview={false}
							/>
							{/*<Form.Item name="avatar">*/}
							{/*	/!*<Upload accept='image/*'>*!/*/}
							{/*	/!*	<Button icon={<UploadOutlined/>}>Выбрать изображение</Button>*!/*/}
							{/*	/!*</Upload>*!/*/}
							{/*</Form.Item>*/}
						</Space>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default CreateEmployeeModal