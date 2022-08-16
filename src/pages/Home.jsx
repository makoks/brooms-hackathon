import React, {useState} from 'react';
import {Button, Layout} from 'antd';
import {ContentHeader} from '../components';
import EmployeesTable from "../components/Employee/EmployeesTable";
import CreateEmployeeModal from "../components/Employee/CreateEmployeeModal/CreateEmployeeModal";

export const Home = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)

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
				<Button onClick={showModal} type="primary" style={{marginBottom: 16}}>
					Добавить сотрудника
				</Button>
				<EmployeesTable />
				<CreateEmployeeModal isModalVisible={isModalVisible} onCancel={hideModal}/>
			</Layout.Content>
		</Layout>
	);
};
