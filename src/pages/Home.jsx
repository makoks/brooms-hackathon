import React, {useState} from 'react';
import {Button, Layout, message, Space} from 'antd';
import {ContentHeader} from '../components';
import EmployeesTable from "../components/Employee/EmployeesTable";
import CreateEmployeeModal from "../components/Employee/CreateEmployeeModal/CreateEmployeeModal";
import {useEmployees} from "../hooks";
import {employeesAPI} from "../API/API";
import {ExcelIcon} from "../components/common/Icons/ExcelIcon";
import {downloadExcel} from "../common/helpers";

export const Home = () => {
	const {loading, employees, deleteEmployee, deletingIds, createEmployee} = useEmployees()
	const [isExcelLoading, setIsExcelLoading] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [filters, setFilters] = useState([])
	const [sorters, setSorters] = useState([])

	const setFiltersHandler = (filters) => {
		const filterParams = []

		Object.keys(filters).forEach(field => {
			if (!filters[field]) return

			filterParams.push({
				field: field,
				values: filters[field]
			})
		})

		setFilters([...filterParams])
	}

	const setSortersHandler = ({columnKey: field, order}) => {
		const orderTypes = {'ascend': 'ASC', 'descend': 'DESC'}
		const sortParams = [...sorters]
		const param = sortParams.find(p => p.field === field)

		if (param && !order) {
			setSorters(sortParams.filter(p => p.field !== field))
		} else if (param && order) {
			setSorters(sortParams.map(p => {
				if (p.field === field) {
					return {...p, type: orderTypes[order]}
				}
				return p
			}))
		} else if (!param && order) {
			setSorters([...sortParams, {field, type: orderTypes[order]}])
		}
	}

	const showModal = () => {
		setIsModalVisible(true)
	}

	const hideModal = () => {
		setIsModalVisible(false)
	}

	const excelLoad = async () => {
		setIsExcelLoading(true)
		employeesAPI.excelLoad({filterParams: filters, sortParams: sorters})
			.then((res) => {
				downloadExcel(res.data, 'Сотрудники')
			})
			.catch(() => message.error('При выгрузке произошла ошибка :('))
			.finally(() => setIsExcelLoading(false))
	}

	return (
		<Layout>
			<ContentHeader title='Сотрудники'/>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Space align='center' style={{marginBottom: 16}}>
					<Button onClick={showModal} type="primary">
						Добавить сотрудника
					</Button>
					<Button
						icon={<ExcelIcon style={{color: '#00adb5'}}/>}
						size='large'
						type='text'
						onClick={excelLoad}
						loading={isExcelLoading}
					/>
				</Space>
				<EmployeesTable
					employeesLoading={loading}
					employees={employees}
					deleteEmployee={deleteEmployee}
					deletingIds={deletingIds}
					setFilters={setFiltersHandler}
					setSorters={setSortersHandler}
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
