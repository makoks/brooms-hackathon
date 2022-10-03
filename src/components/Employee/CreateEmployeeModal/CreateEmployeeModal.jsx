import React, {useState} from 'react'
import {Avatar, Button, Col, Form, Input, message, Modal, Row, Select, Space, Upload} from "antd";
import {AvatarPreview} from "../../../images";
import {emailRules, maxLengthRule, requiredRules} from "../../../common/form";
import {UploadOutlined} from "@ant-design/icons";
import {useReferenceBooks} from "../../../hooks";
import './style.css'


const {Option} = Select

const CreateEmployeeModal = ({isModalVisible, onCancel, createEmployee, loading}) => {
	const {loading: referenceBooksLoading, departments, positions, projects, roles} = useReferenceBooks()
	const fieldNames = ['fioUser', 'email', 'telephone', 'idDepartment', 'idPosition', 'idRole', 'idProject']
	const [form] = Form.useForm()
	const [avatarPreview, setAvatarPreview] = useState(AvatarPreview)
	const [fileList, setFileList] = useState([])
	// const [number, setNumber] = useState('')
	// const [maskedNumber, setMaskedNumber] = useState('')

	const onUploadChange = ({fileList: newFileList}) => {
		if (newFileList.length) {
			const isAvailableSize = newFileList[0].size / 1024 / 1024 <= 5
			const isAvailableType = newFileList[0].type === 'image/png' || newFileList[0].type === 'image/jpg'
			const response = `${!isAvailableType ? 'Файл должен быть в формате jpg или png.\n' : ''}
							${!isAvailableSize ? 'Размер файла должен быть не больше 5 мб.' : ''}`

			setFileList([{
				...newFileList[0],
				status: isAvailableSize && isAvailableType ? 'done' : 'error',
				response
			}])
			setAvatarPreview(URL.createObjectURL(newFileList[0].originFileObj) ?? AvatarPreview)
		} else {
			setFileList([])
			setAvatarPreview(AvatarPreview)
		}
	}

	const handleCreateEmployee = async (data) => {
		const userDataWithAvatar = fileList.length ? {...data, avatar: fileList[0].originFileObj} : data
		createEmployee(userDataWithAvatar, () => {
			onCancel()
			form.resetFields()
			setFileList([])
			setAvatarPreview(AvatarPreview)
		})
	}

	// useEffect(() => {
	// 	window.addEventListener("DOMContentLoaded", function() {
	// 		[].forEach.call( document.querySelectorAll('.tel'), function(input) {
	// 			var keyCode;
	// 			function mask(event) {
	// 				event.keyCode && (keyCode = event.keyCode);
	// 				var pos = this.selectionStart;
	// 				if (pos < 3) event.preventDefault();
	// 				var matrix = "+7 (___) ___ ____",
	// 					i = 0,
	// 					def = matrix.replace(/\D/g, ""),
	// 					val = this.value.replace(/\D/g, ""),
	// 					new_value = matrix.replace(/[_\d]/g, function(a) {
	// 						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
	// 					});
	// 				i = new_value.indexOf("_");
	// 				if (i != -1) {
	// 					i < 5 && (i = 3);
	// 					new_value = new_value.slice(0, i)
	// 				}
	// 				var reg = matrix.substr(0, this.value.length).replace(/_+/g,
	// 					function(a) {
	// 						return "\\d{1," + a.length + "}"
	// 					}).replace(/[+()]/g, "\\$&");
	// 				reg = new RegExp("^" + reg + "$");
	// 				if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
	// 				if (event.type == "blur" && this.value.length < 5)  this.value = ""
	// 			}
	//
	// 			input.addEventListener("input", mask, false);
	// 			input.addEventListener("focus", mask, false);
	// 			input.addEventListener("blur", mask, false);
	// 			input.addEventListener("keydown", mask, false)
	//
	// 		});
	//
	// 	});
	// }, [])

	return (
		<Modal
			title="Добавить сотрудника"
			visible={isModalVisible}
			onCancel={onCancel}
			confirmLoading={loading}
			cancelText='Отмена'
			onOk={() => {
				if (fileList.length && fileList[0].status === 'error') {
					message.error(fileList[0].response)
				} else {
					form.validateFields(fieldNames)
						.then(() => handleCreateEmployee(form.getFieldsValue(fieldNames)))
				}
			}}
			style={{minWidth: 800}}
			destroyOnClose={true}
		>
			<Form form={form}>
				<Row justify='space-between'>
					<Col span={16}>
						<Form.Item name="fioUser" label="ФИО" rules={[requiredRules, maxLengthRule(250)]}>
							<Input/>
						</Form.Item>
						<Form.Item name="email" label="Почта" rules={[requiredRules, emailRules, maxLengthRule(250)]}>
							<Input/>
						</Form.Item>
						<Form.Item name="telephone" label="Телефон" rules={[requiredRules, maxLengthRule(20)]}>
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
						<Form.Item name="idProject" label='Проект'>
							<Select loading={referenceBooksLoading}>
								{projects?.map(proj => (
									<Option key={proj.id} value={proj.id}>{proj.name}</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8} style={{display: 'flex', justifyContent: 'center', maxWidth: 250}}>
						<Space direction='vertical' align='center' style={{width: '100%'}} className='upload-avatar'>
							<Avatar src={avatarPreview} size={140}/>
							<Upload
								name="avatar"
								accept='image/png, image/jpg'
								fileList={fileList}
								maxCount={1}
								onChange={onUploadChange}
								beforeUpload={(file) => {
									const isAvailableSize = file.size / 1024 / 1024 <= 5
									const isAvailableType = file.type === 'image/png' || file.type === 'image/jpg'

									if (!isAvailableSize) {
										message.error('Размер файла должен быть не больше 5 мб')
									}
									if (!isAvailableType) {
										message.error('Файл должен быть в формате jpg или png')
									}

									return !isAvailableType || !isAvailableSize
								}}
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