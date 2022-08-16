import React, {useState} from 'react'
import {Avatar, Button, Col, Form, Input, Modal, Row, Select, Space, Upload} from "antd";
import {AvatarPreview} from "../../../images";
import {requiredRules} from "../../../common/form";
import {UploadOutlined} from "@ant-design/icons";
import {useEmployees, useReferenceBooks} from "../../../hooks";


const {Option} = Select

const CreateEmployeeModal = ({isModalVisible, onCancel}) => {
	const {loading: referenceBooksLoading, departments, positions, projects, roles} = useReferenceBooks()
	const {createEmployee, loading} = useEmployees()
	const fieldNames = ['fioUser', 'email', 'telephone', 'idDepartment', 'idPosition', 'idRole', 'idProject']
	const [form] = Form.useForm()
	const [avatarPreview, setAvatarPreview] = useState(AvatarPreview)
	const [avatar, setAvatar] = useState(null)

	const onUploadChange = (data) => {
		setAvatar(data.file)
		setAvatarPreview(URL.createObjectURL(data.file))
	}

	const handleCreateEmployee = async (data) => {
		const userDataWithAvatar = avatar ? {...data, avatar} : data
		createEmployee(userDataWithAvatar, onCancel)
	}

	return (
		<Modal
			title="Добавить сотрудника"
			visible={isModalVisible}
			onCancel={onCancel}
			confirmLoading={loading}
			onOk={() => {
				form.validateFields(fieldNames)
					.then(() => handleCreateEmployee(form.getFieldsValue(fieldNames)))
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
							<Select loading={referenceBooksLoading}>
								{departments?.map(dep => (
									<Option key={dep.id} value={dep.id}>{dep.name}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name='idPosition' label="Должность" rules={[requiredRules]}>
							<Select loading={referenceBooksLoading}>
								{positions?.map(pos => (
									<Option key={pos.id} value={pos.id}>{pos.name}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="idRole" label='Роль' rules={[requiredRules]}>
							<Select loading={referenceBooksLoading}>
								{roles?.map(role => (
									<Option key={role.id} value={role.id}>{role.name}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="idProject" label='Проект' rules={[requiredRules]}>
							<Select loading={referenceBooksLoading}>
								{projects?.map(proj => (
									<Option key={proj.id} value={proj.id}>{proj.name}</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8} style={{display: 'flex', justifyContent: 'center'}}>
						<Space direction='vertical' align='center'>
							<Avatar src={avatarPreview} size={140}/>
							<Upload
								name="avatar"
								accept='image/png, image/jpg'
								maxCount={1}
								onChange={onUploadChange}
								beforeUpload={() => false}
							>
								<Button icon={<UploadOutlined/>}>Выбрать изображение</Button>
							</Upload>
						</Space>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default CreateEmployeeModal