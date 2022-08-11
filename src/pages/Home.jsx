import React, {useEffect, useState} from 'react';
import {Button, Layout} from 'antd';
import {ContentHeader} from '../components';
import EmployeesTable from "../components/Employee/EmployeesTable";
import CreateEmployeeModal from "../components/Employee/CreateEmployeeModal/CreateEmployeeModal";
import {employeesAPI, referenceBooksAPI} from "../API";

export const Home = ({compareList, addPersonInCompareList, removePersonFromCompareList}) => {
	const [employees, setEmployees] = useState([
		{
			id: 1,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Иванов Иван Иванович',
			email: 'mail@mail.ru',
			phone: '88005553535',
			department: 'ОР',
			post: 'Ведущий эксперт',
			role: 'Разработчик',
			project: 'ДСУД ПОИ'
		},
		{
			id: 2,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Петров Петр Петрович',
			email: 'petr@mail.ru',
			phone: '81234567890',
			department: 'ОД',
			post: 'Эксперт 1 категории',
			role: 'Технический писатель',
			project: 'АС ППА'
		},
		{
			id: 3,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Сотрудников Сотрудник Сотрудникович',
			email: 'mail@mail.ru',
			phone: '88005553535',
			department: 'ОР',
			post: 'Ведущий эксперт',
			role: 'Системный аналитик',
			project: 'ДСУД ПОИ'
		},
		{
			id: 4,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Разработчиков Разработчик Разработчикович',
			email: 'petr@mail.ru',
			phone: '81234567890',
			department: 'ОД',
			post: 'Эксперт 1 категории',
			role: 'Технический писатель',
			project: 'АС ППА'
		},
	])
	const [deletingIds, setDeletingIds] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [roles, setRoles] = useState(undefined)
	const [departments, setDepartments] = useState(undefined)
	const [positions, setPositions] = useState(undefined)
	const [projects, setProjects] = useState(undefined)

	useEffect(() => {
		const {getPositions, getDepartments, getProjects, getRoles} = referenceBooksAPI

		const getReferenceBooks = async () => {
			const positions = await getPositions()
			const departments = await getDepartments()
			const projects = await getProjects()
			const roles = await getRoles()

			setPositions(positions.data._embedded.userPositions)
			setDepartments(departments.data._embedded.userDepartments)
			setProjects(projects.data._embedded.userProjects)
			setRoles(roles.data._embedded.userRoles)
		}

		const getEmployees = async () => {
			const res = await employeesAPI.getEmployees()
			setEmployees(res.data._embedded.user)
			console.log(res.data)
		}

		getReferenceBooks()
		getEmployees()
	}, [])

	const deleteEmployee = async (id) => {
		setDeletingIds(oldDeletingIds => [...oldDeletingIds, id])
		employeesAPI.deleteEmployee(id)
			.then(() => {
				setDeletingIds(oldDeletingIds => oldDeletingIds.filter(dId => dId !== id))
				setEmployees(oldEmployees => oldEmployees.filter(e => e.id !== id))
			})
	}

	const showModal = () => {
		setIsModalVisible(true);
	};

	const hideModal = () => {
		setIsModalVisible(false);
	};

	return (
		<Layout>
			<ContentHeader title='Сотрудники'/>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Button
					onClick={showModal}
					type="primary"
					style={{marginBottom: 16}}
				>
					Добавить сотрудника
				</Button>
				<EmployeesTable
					employees={employees}
					compareList={compareList}
					addInCompareList={addPersonInCompareList}
					removeFromCompareList={removePersonFromCompareList}
					deleteEmployee={deleteEmployee}
					deletingIds={deletingIds}
					roles={roles}
					departments={departments}
					positions={positions}
					projects={projects}
				/>
				<CreateEmployeeModal
					isModalVisible={isModalVisible}
					onCancel={hideModal}
					roles={roles}
					departments={departments}
					positions={positions}
					projects={projects}
				/>
			</Layout.Content>
		</Layout>
	);
};
