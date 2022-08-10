import React, {useState} from 'react';
import {Layout} from 'antd';
import {ContentHeader} from '../components';
import EmployeeMainInfo from "../components/Employee/EmployeePage/EmployeeMainInfo";
import EditBlock from "../components/Employee/EmployeePage/EditBlock";
import ClustersList from "../components/Employee/EmployeePage/ClustersList/ClustersList";


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
			},
			{
				id: '2',
				title: 'Cluster 2',
				properties: [
					{title: 'Свойство', value: 'Значение'},
					{title: 'Цвет глаз', value: 'Голубой'},
					{title: 'Количество зубов', value: undefined}
				]
			}
		]
	})
	const [editableClusters, setEditableClusters] = useState(employee.clusters)
	const [reason, setReason] = useState(1)
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

	const changeClusterField = (clusterTitle, fieldTitle, newValue) => {
		const newClusters = editableClusters.map(cluster => (
			cluster.title === clusterTitle
				? {
					...cluster,
					properties: cluster.properties.map(prop => (
						prop.title === fieldTitle
							? {...prop, value: newValue}
							: prop
					))
				}
				: cluster
		))
		setEditableClusters(newClusters)
	}

	const toggleIsEdit = () => {
		setIsEdit(!isEdit)
	}

	return (
		<Layout>
			<ContentHeader title='Сотрудник' paddingBottom={true}>
				<EmployeeMainInfo loading={loading} {...employee}/>
				<EditBlock
					isEdit={isEdit}
					toggleIsEdit={toggleIsEdit}
					reason={reason}
					setReason={setReason}
					onDiscard={discardChanges}
					onSave={saveChanges}
				/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<ClustersList
					clusters={employee.clusters}
					editableClusters={editableClusters}
					isEdit={isEdit}
					onPropChange={changeClusterField}
				/>
			</Layout.Content>
		</Layout>
	);
};
