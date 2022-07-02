import React from 'react'
import {Button, Form, Input, Modal, Select, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

const {Option} = Select

const CreateCharacterModal = ({isModalVisible, createCharacter, onCancel}) => {
	const fieldNames = ['nickname', 'race', 'class', 'about', 'avatar', 'guild']
	const [form] = Form.useForm()

	return (
		<Modal
			title="Добавить персонажа"
			visible={isModalVisible}
			onCancel={onCancel}
			onOk={() => {
				form.validateFields(fieldNames)
					.then(() => createCharacter(form.getFieldsValue(fieldNames)))
			}}
		>
			<Form form={form}>
				<Form.Item name="nickname" label="Никнейм" rules={[{required: true}]}>
					<Input/>
				</Form.Item>
				<Form.Item name="race" label="Раса" rules={[{required: true}]}>
					<Select>
						<Option value="Эльф">Эльф</Option>
						<Option value="Хоббит">Хоббит</Option>
						<Option value="Орк">Орк</Option>
					</Select>
				</Form.Item>
				<Form.Item name="class" label="Класс" rules={[{required: true}]}>
					<Select>
						<Option value="Лучник">Лучник</Option>
						<Option value="Вор">Вор</Option>
						<Option value="Убийца">Убийца</Option>
					</Select>
				</Form.Item>
				<Form.Item name="guild" label='Гильдия' rules={[{required: true}]}>
					<Select>
						<Option value="Нечистая сила">Нечистая сила</Option>
						<Option value="Парикмахерская">Парикмахерская</Option>
						<Option value="Садоводы">Садоводы</Option>
					</Select>
				</Form.Item>
				<Form.Item name='about' label="О персонаже" rules={[{required: true}]}>
					<Input.TextArea autoSize={{minRows: 2, maxRows: 6}}/>
				</Form.Item>
				<Form.Item name="avatar" label='Аватар'>
					<Upload maxCount={1}>
						<Button icon={<UploadOutlined />}>Загрузить аватар</Button>
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default CreateCharacterModal