import {Avatar, Button, Table} from 'antd';
import {NavLink} from "react-router-dom";
import React, {useContext} from "react";
import ToCompareButton from "./ToCompareButton/ToCompareButton";
import {DeleteOutlined} from "@ant-design/icons";
import {tableLocale} from "../../common/locale";
import {alphabetSort} from "../../common/helpers";
import {CompareListContext} from "../../providers/CompareListProvider";
import {useReferenceBooks} from "../../hooks";
import {AvatarPreview} from "../../images";

export const EmployeesTable = ({
	                               employees,
	                               employeesLoading,
	                               deleteEmployee,
	                               deletingIds,
	                               setFilters,
	                               setSorters,
	                               setIsExcelDisabled
                               }) => {
	const {loading: referenceBooksLoading, departments, positions, projects, roles} = useReferenceBooks()
	const {compareList, addToCompareList, removeFromCompareList} = useContext(CompareListContext)

	const columns = [
		{
			title: 'Аватар',
			dataIndex: 'avatarUrl',
			key: 'avatarUrl',
			render: (_, {avatarUrl}) => <Avatar size='large' src={avatarUrl ?? AvatarPreview}/>
		},
		{
			title: 'ФИО',
			dataIndex: 'fioUser',
			key: 'fioUser',
			render: (_, {id, fioUser}) => <NavLink to={`employee/${id}`}>{fioUser}</NavLink>,
			filters: employees.map(e => ({text: e.fioUser, value: e.fioUser})),
			filterSearch: true,
			onFilter: (value, record) => record.fioUser === value,
			sorter: (a, b) => alphabetSort(a.fioUser, b.fioUser),
		},
		{title: 'Почта', dataIndex: 'email', key: 'email'},
		{title: 'Телефон', dataIndex: 'telephone', key: 'telephone'},
		{
			title: 'Отдел',
			dataIndex: ['userDepartment', 'name'],
			key: 'userDepartment',
			filters: departments?.map(d => ({text: d.name, value: d.name})),
			onFilter: (value, record) => record.userDepartment.name === value,
		},
		{
			title: 'Должность',
			dataIndex: ['userPosition', 'name'],
			key: 'userPosition',
			filters: positions?.map(p => ({text: p.name, value: p.name})),
			onFilter: (value, record) => record.userPosition.name === value
		},
		{
			title: 'Роль',
			dataIndex: ['userRole', 'name'],
			key: 'userRole',
			filters: roles?.map(r => ({text: r.name, value: r.name})),
			onFilter: (value, record) => record.userRole.name === value
		},
		{
			title: 'Проект',
			dataIndex: ['userProject', 'name'],
			key: 'userProject',
			filters: projects?.map(p => ({text: p.name, value: p.name})),
			onFilter: (value, record) => record.userProject.name === value
		},
		{
			title: '',
			dataIndex: 'compare',
			key: 'compare',
			render: (_, {id}) => <ToCompareButton
				inCompareList={compareList?.includes(id)}
				onAdd={() => addToCompareList(id)}
				onRemove={() => removeFromCompareList(id)}
				disabled={compareList.length === 6}
			/>,
			width: '8%'
		},
		{
			title: '',
			dataIndex: 'delete',
			key: 'delete',
			render: (_, {id}) => (
				<Button
					onClick={() => deleteEmployee(id)}
					loading={deletingIds.indexOf(id) !== -1}
				>
					<DeleteOutlined style={{color: 'red'}}/>
				</Button>
			),
			width: '5%'
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={employees}
			locale={tableLocale}
			loading={referenceBooksLoading || employeesLoading}
			onChange={(_, filters, sorters, {currentDataSource}) => {
				setFilters?.(filters)
				setSorters?.(sorters)
				setIsExcelDisabled?.(currentDataSource.length < 1)
			}}
		/>
	)
}

export default EmployeesTable