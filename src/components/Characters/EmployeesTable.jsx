import {Avatar, Button, Table} from 'antd';
import {NavLink} from "react-router-dom";
import React, {useState, useEffect} from "react";
import ToCompareButton from "./ToCompareButton/ToCompareButton";
import {DeleteOutlined} from "@ant-design/icons";
import {tableLocale} from "../../common/locale";

const departments = ['ОР', 'ОД', 'Headoffice']
const posts = ['Эксперт 1 категории', 'Ведущий эксперт', 'Главный инженер']
const roles = ['Разработчик', 'Системный аналитик', 'Технический писатель']
const projects = ['ДСУД ПОИ', 'АС ППА']

export const EmployeesTable = ({
	                               compareList,
	                               addInCompareList,
	                               removeFromCompareList,
	                               deleteHero,
	                               deletingIds,
	                               ...props
                               }) => {
	const [employees, setEmployees] = useState(props.employees ?? [])

	useEffect(() => {
		setEmployees(props.employees.map(character => ({...character, key: character.id,})))
	}, [props.employees, compareList])

	const columns = [
		{
			title: 'Аватар',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (_, {avatar}) => <Avatar size='large' src={avatar}/>
		},
		{
			title: 'ФИО',
			dataIndex: 'name',
			key: 'name',
			render: (_, {id, name}) => <NavLink to={`hero/${id}`}>{name}</NavLink>,
			filters: employees.map(e => ({text: e.name, value: e.name})),
			filterSearch: true,
			onFilter: (value, record) => record.name.includes(value),
			sorter: (a, b) => {
				const nameA = a.name.toLowerCase()
				const nameB = b.name.toLowerCase()
				if (nameA < nameB)
					return -1
				if (nameA > nameB)
					return 1
				return 0
			},
		},
		{title: 'Почта', dataIndex: 'email', key: 'email'},
		{title: 'Телефон', dataIndex: 'phone', key: 'phone'},
		{
			title: 'Отдел',
			dataIndex: 'department',
			key: 'department',
			filters: departments.map(d => ({text: d, value: d})),
			onFilter: (value, record) => record.department.includes(value)
		},
		{
			title: 'Должность',
			dataIndex: 'post',
			key: 'post',
			filters: posts.map(p => ({text: p, value: p})),
			onFilter: (value, record) => record.post.includes(value)
		},
		{
			title: 'Роль',
			dataIndex: 'role',
			key: 'role',
			filters: roles.map(r => ({text: r, value: r})),
			onFilter: (value, record) => record.role.includes(value)
		},
		{
			title: 'Проект',
			dataIndex: 'project',
			key: 'project',
			filters: projects.map(p => ({text: p, value: p})),
			onFilter: (value, record) => record.project.includes(value)
		},
		{
			title: '',
			dataIndex: 'compare',
			key: 'compare',
			render: (_, {id}) => <ToCompareButton
				inCompareList={compareList?.includes(id)}
				onAdd={() => addInCompareList(id)}
				onRemove={() => removeFromCompareList(id)}
				disabled={compareList.length === 6}
			/>,
			width: '8%'
		},
		{
			title: '',
			dataIndex: 'remove',
			key: 'remove',
			render: (_, {id}) => (
				<Button
					onClick={() => deleteHero(id)}
					loading={deletingIds.indexOf(id) !== -1}
				>
					<DeleteOutlined style={{color: 'red'}}/>
				</Button>
			),
			width: '5%'
		},
	]

	return (
		<Table columns={columns} dataSource={employees} locale={tableLocale}/>
	)
}

export default EmployeesTable