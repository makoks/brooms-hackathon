import React, {useState} from 'react';
import {Button, Layout, Space} from 'antd';
import {ContentHeader} from '../components';
import EmployeesTable from "../components/Employee/EmployeesTable";
import CreateEmployeeModal from "../components/Employee/CreateEmployeeModal/CreateEmployeeModal";
import {useEmployees} from "../hooks";
import {FileExcelOutlined} from "@ant-design/icons";

export const Home = () => {
	const {loading, employees, deleteEmployee, deletingIds, createEmployee} = useEmployees()
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
				<Space align='center' style={{marginBottom: 16}}>
					<Button onClick={showModal} type="primary">
						Добавить сотрудника
					</Button>
					<Button
						icon={<FileExcelOutlined/>}
						size='large'
						type='text'
						disabled={true}
					/>
				</Space>
				<EmployeesTable
					employeesLoading={loading}
					employees={employees}
					deleteEmployee={deleteEmployee}
					deletingIds={deletingIds}
				/>
				<CreateEmployeeModal
					isModalVisible={isModalVisible}
					onCancel={hideModal}
					createEmployee={createEmployee}
					loading={loading}
				/>
			</Layout.Content>
		</Layout>
	);
};
