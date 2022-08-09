import React, {useState} from 'react';
import {Button, Layout, Select, Space, Switch, Typography} from 'antd';
import {ContentHeader} from '../components';
import EmployeeMainInfo from "../components/Characters/CharacterPage/EmployeeMainInfo";

const {Option} = Select

// const clusters = [
// 	{
// 		name: 'Статистика',
// 		items: [
// 			{name: 'health', value: 120},
// 			{name: 'mana', value: 100},
// 			{name: 'gold', value: 1000},
// 		]
// 	},
// 	{
// 		name: 'Статистика',
// 		items: [
// 			{name: 'last active', value: 120},
// 			{name: 'lvl', value: 100},
// 			{name: 'max HP', value: 1000},
// 			{name: 'max mana', value: 1000},
// 			{name: 'gold', value: 1000},
// 		]
// 	},
// 	{
// 		name: 'Статистика',
// 		items: [
// 			{name: 'last active', value: 120},
// 			{name: 'lvl', value: 100},
// 			{name: 'max HP', value: 1000},
// 			{name: 'max mana', value: 1000},
// 			{name: 'gold', value: 1000},
// 		]
// 	},
// 	{
// 		name: 'Loot',
// 		items: [
// 			{name: 'hat', value: 'Алмазная'},
// 			{name: 'boots', value: 'Железная'},
// 			{name: 'Armor', value: 'Шипованная'},
// 		]
// 	}
// ]

export const Employee = () => {
	// const {id} = useParams()
	const [loading] = useState(false)
	const [employee, setEmployee] = useState({
		id: 1,
		avatar: 'https://random.imagecdn.app/40/40',
		name: 'Иванов Иван Иванович',
		email: 'mail@mail.ru',
		phone: '88005553535',
		department: 'ОР',
		post: 'Ведущий эксперт',
		role: 'Разработчик',
		project: 'ДСУД ПОИ',
		clusters: [
			{
				id: '1',
				title: 'Cluster 1',
				properties: [
					{title: 'Дата приема', value: '2019-02-03'},
					{title: 'Опыт', value: null},
					{title: 'Премия', value: '3 213 213 21 321 321 3 213 213 21 321'}
				]
			}
		]
	})
	const [editableClusters, setEditableClusters] = useState(undefined)
	const [reason, setReason] = useState('levelUp')
	const [isEdit, setIsEdit] = useState(false)

	const saveChanges = () => {
		setEmployee({
			...employee,
			clusters: [...editableClusters]
		})
		toggleIsEdit()
	}

	const discardChanges = () => {
		setEditableClusters([...employee.clusters])
		toggleIsEdit()
	}

	// const changeClusterField = (clusterName, fieldName, newValue) => {
	// 	const newClusters = editableClusters.map(cluster => (
	// 		cluster.name === clusterName
	// 			? {
	// 				...cluster,
	// 				items: cluster.items.map(item => (
	// 					item.name === fieldName
	// 						? {...item, value: newValue}
	// 						: item
	// 				))
	// 			}
	// 			: cluster
	// 	))
	// 	setEditableClusters(newClusters)
	// }

	const toggleIsEdit = () => {
		setIsEdit(!isEdit)
	}

	return (
		<Layout>
			<ContentHeader title='Сотрудник' paddingBottom={true}>
				<EmployeeMainInfo loading={loading} {...employee}/>
				<Space>
					Редактировать:
					<Switch
						checkedChildren="Вкл"
						unCheckedChildren="Выкл"
						checked={isEdit}
						onChange={toggleIsEdit}
					/>
				</Space>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				{isEdit && (
					<div>
						<Typography.Text>Причина изменения: </Typography.Text>
						<Select
							onChange={setReason}
							value={reason}
							style={{minWidth: 300, marginBottom: 16}}
						>
							<Option value="levelUp">Повышение уровня</Option>
							<Option value="levelDown">Понижение уровня</Option>
							<Option value="lootBuy">Покупка лута</Option>
							<Option value="enterGame">Вход в игру</Option>
							<Option value="exitGame">Выход из игры</Option>
						</Select>
					</div>
				)}
				{/*<ClustersList*/}
				{/*	clusters={employee?.clusters ?? []}*/}
				{/*	editableClusters={editableClusters}*/}
				{/*	changeClusterField={changeClusterField}*/}
				{/*	isEdit={isEdit}*/}
				{/*/>*/}
				{isEdit && (
					<Space style={{marginTop: 16, marginLeft: 'auto'}}>
						<Button onClick={saveChanges} type='primary'>Сохранить изменения</Button>
						<Button onClick={discardChanges}>Отменить</Button>
					</Space>
				)}
			</Layout.Content>
		</Layout>
	);
};
