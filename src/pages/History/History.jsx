import React, {useEffect, useState} from 'react';
import {Layout, Select, Space, DatePicker, Button, Table, Form} from 'antd';
import {ContentHeader} from '../../components';
import './index.css'
import {tableLocale} from "../../common/locale";
import {employeesAPI, historyAPI} from "../../API";

const {RangePicker} = DatePicker
const {Option} = Select

const data = [
	{
		key: 1,
		changeDate: '20.12.2022',
		property: 'Оклад',
		oldValue: 20000,
		newValue: 40000,
		reason: 'Повышение оклада без повышения должности'
	},
	{
		key: 2,
		changeDate: '20.12.2022',
		property: 'Оклад',
		oldValue: 20000,
		newValue: 40000,
		reason: 'Повышение оклада без повышения должности'
	},
	{
		key: 3,
		changeDate: '20.12.2022',
		property: 'Оклад',
		oldValue: 20000,
		newValue: 40000,
		reason: 'Повышение оклада без повышения должности'
	},
	{
		key: 4,
		changeDate: '20.12.2022',
		property: 'Оклад',
		oldValue: 20000,
		newValue: 40000,
		reason: 'Повышение оклада без повышения должности'
	},
	{
		key: 5,
		changeDate: '20.12.2022',
		property: 'Оклад',
		oldValue: 20000,
		newValue: 40000,
		reason: 'Повышение оклада без повышения должности'
	},
];

const columns = [
	{
		title: 'Дата изменения',
		dataIndex: 'changeDate',
		key: 'changeDate'
	},
	{
		title: 'Атрибут',
		dataIndex: 'property',
		key: 'property',
		filters: ['Оклад', 'Должность', 'Роль', 'Проект'].map(p => ({text: p, value: p})),
		onFilter: (value, record) => record.property === value
	},
	{
		title: 'Старое значение',
		dataIndex: 'oldValue',
		key: 'oldValue'
	},
	{
		title: 'Новое значение',
		dataIndex: 'newValue',
		key: 'newValue'
	},
	{
		title: 'Причина',
		dataIndex: 'reason',
		key: 'reason'
	},
]

export const History = () => {
	const [dates, setDates] = useState([])
	const [employeeId, setEmployeeId] = useState(undefined)
	const [employees, setEmployees] = useState([])
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

	const getHistory = async () => {
		const res = historyAPI.getHistory(
			employeeId,
			dates[0]._d.toLocaleDateString('ru-RU'),
			dates[1]._d.toLocaleDateString('ru-RU')
		)
		console.log(res)
	}

	return (
		<Layout>
			<ContentHeader title='История изменений' paddingBottom={true}>
				<Form className='form'>
					<Space>
						<Form.Item name="name" label="Сотрудник">
							<Select
								showSearch
								filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
								onChange={setEmployeeId}
								value={employeeId}
								style={{width: 450}}
								loading={loading}
							>
								{employees.map(employee => (
									<Option value={employee.id} key={employee.id}>{employee.fioUser}</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item name="dateRange" label="Период изменений">
							<RangePicker
								value={dates}
								onCalendarChange={setDates}
								placeholder={['Начало', 'Конец']}
							/>
						</Form.Item>
						<Button type='primary' onClick={getHistory}>Применить</Button>
					</Space>
				</Form>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Table columns={columns} dataSource={data} locale={tableLocale}/>
			</Layout.Content>
		</Layout>
	);
};
