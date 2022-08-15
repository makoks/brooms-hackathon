import React, {useEffect, useState} from 'react';
import {Button, Layout} from 'antd';
import {ContentHeader} from '../components';
import EmployeesTable from "../components/Employee/EmployeesTable";
import CreateEmployeeModal from "../components/Employee/CreateEmployeeModal/CreateEmployeeModal";
import {employeesAPI} from "../API";

export const Home = ({compareList, addPersonInCompareList, removePersonFromCompareList, referenceBooks, referenceBooksLoading}) => {
	const [employees, setEmployees] = useState([])
	const [deletingIds, setDeletingIds] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)

		const getEmployees = async () => {
			const res = await employeesAPI.getEmployees()
			setEmployees(res.data._embedded.user)
		}

		getEmployees()
			.finally(() => setLoading(false))
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
					loading={loading || referenceBooksLoading}
					{...referenceBooks}
				/>
				<CreateEmployeeModal
					isModalVisible={isModalVisible}
					onCancel={hideModal}
					{...referenceBooks}
				/>
			</Layout.Content>
		</Layout>
	);
};
