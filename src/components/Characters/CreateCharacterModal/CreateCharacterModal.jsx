import React, {useEffect, useState} from 'react'
import {Form, Input, Modal, Select} from "antd";
import {API} from "../../../API";

const {Option} = Select

const CreateCharacterModal = ({isModalVisible, createCharacter, onCancel, loading}) => {
	const fieldNames = ['heroName', 'idRace', 'idHeroClass', 'about', 'avatarHero', 'idGuild']
	const [races, setRaces] = useState([])
	const [classes, setClasses] = useState([])
	const [guilds, setGuilds] = useState([])
	const [form] = Form.useForm()

	useEffect(() => {
		Promise.all([
			API.getHeroRaces(),
			API.getHeroClasses(),
			API.getHeroGuilds()
		])
			.then((values) => {
				console.log(values)
				setRaces(values[0].data._embedded.heroRaces)
				setClasses(values[1].data._embedded.heroClasses)
				setGuilds(values[2].data._embedded.heroGuilds)
			})
	}, [])

	return (
		<Modal
			title="Добавить персонажа"
			visible={isModalVisible}
			onCancel={onCancel}
			confirmLoading={loading}
			onOk={() => {
				form.validateFields(fieldNames)
					.then(() => createCharacter(form.getFieldsValue(fieldNames)))
			}}
		>
			<Form form={form}>
				<Form.Item name="heroName" label="Имя" rules={[{required: true}]}>
					<Input/>
				</Form.Item>
				<Form.Item name="idRace" label="Раса" rules={[{required: true}]}>
					<Select>
						{races.map(race => (
							<Option value={race.id} key={'race-' + race.id}>{race.raceName}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="idHeroClass" label="Класс" rules={[{required: true}]}>
					<Select>
						{classes.map(c => (
							<Option value={c.id} key={'class-' + c.id}>{c.nameClass}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name="idGuild" label='Гильдия' rules={[{required: true}]}>
					<Select>
						{guilds.map(g => (
							<Option value={g.id} key={'guild-' + g.id}>{g.nameGuild}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name='about' label="О персонаже" rules={[{required: true}]}>
					<Input.TextArea autoSize={{minRows: 2, maxRows: 6}}/>
				</Form.Item>
				<Form.Item name="avatarHero" label='Аватар'>
					<Input placeholder='Ссылка на изображение'/>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default CreateCharacterModal