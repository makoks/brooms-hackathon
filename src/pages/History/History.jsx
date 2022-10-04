import React, {useEffect, useState} from 'react';
import {Layout, Select, Space, DatePicker, Button, Table, Form, message} from 'antd';
import {ContentHeader} from '../../components';
import './index.css'
import {dateLocale, tableLocale} from "../../common/locale";
import {historyAPI} from "../../API/API";
import {useEmployees} from "../../hooks";
import moment from "moment/moment";
import {ExcelIcon} from "../../components/common/Icons/ExcelIcon";
import {downloadExcel} from "../../common/helpers";
import {useLocation} from "react-router-dom";

const {RangePicker} = DatePicker
const {Option} = Select

const convertHistory = (historyFromAPI) => {
	const result = []

	for (const propHistory of historyFromAPI) {
		for (const history of propHistory.histories) {
			result.push({
				changeDate: new Date(history.dateTimeChange),
				property: history.propertyName,
				oldValue: history.valueOld ?? '—',
				newValue: history.valueNew ?? '—',
				changeReason: history.sourceOfChangeName
			})
		}
	}
	result.sort((a, b) => b.changeDate - a.changeDate)

	return result
}

export const History = () => {
	const {search} = useLocation()
	const {employees, loading: employeesLoading} = useEmployees()
	const [dates, setDates] = useState([])
	const [employeeId, setEmployeeId] = useState(Number(new URLSearchParams(search).get('id')) || undefined)
	const [history, setHistory] = useState([])
	const [loading, setLoading] = useState(false)
	const [filters, setFilters] = useState([])
	const [loadedEmployee, setLoadedEmployee] = useState(undefined)
	const [loadedDates, setLoadedDates] = useState([])
	const [isExcelLoading, setIsExcelLoading] = useState(false)
	const [isExcelDisabled, setIsExcelDisabled] = useState(
		!history.length || !loadedEmployee || !loadedDates || !loadedDates[0] || !loadedDates[1] || loading
	)

	const columns = [
		{
			title: 'Дата изменения',
			dataIndex: 'changeDate',
			key: 'changeDate',
			render: (_, {changeDate}) => moment(changeDate).format(dateLocale)
		},
		{
			title: 'Атрибут',
			dataIndex: 'property',
			key: 'propertyName',
			filters: [...new Set(history.map(p => p.property))].map(prop => ({text: prop, value: prop})),
			onFilter: (value, record) => record.property === value,
		},
		{
			title: 'Старое значение',
			dataIndex: 'oldValue',
			key: 'oldValue',
		},
		{
			title: 'Новое значение',
			dataIndex: 'newValue',
			key: 'newValue'
		},
		{
			title: 'Причина',
			dataIndex: 'changeReason',
			key: 'changeReason'
		},
	]

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

	const excelLoad = async () => {
		setIsExcelLoading(true)
		historyAPI.excelLoad(
			loadedEmployee,
			loadedDates[0],
			loadedDates[1],
			{filterParams: filters}
		)
			.then(res => downloadExcel(res.data, 'История'))
			.catch(() => message.error('При выгрузке произошла ошибка :('))
			.finally(() => setIsExcelLoading(false))
	}

	const getHistory = async () => {
		setLoading(true)
		historyAPI.getHistory(
			employeeId,
			dates[0]?.format(dateLocale),
			dates[1]?.format(dateLocale)
		)
			.then((res) => {
				setHistory(convertHistory(res.data.propertyHistories))
				setLoadedEmployee(employeeId)
				setLoadedDates([
					dates[0]?.format(dateLocale),
					dates[1]?.format(dateLocale)
				])
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		setIsExcelDisabled(
			!history.length || !loadedEmployee || !loadedDates || !loadedDates[0] || !loadedDates[1] || loading
		)
	}, [history, loadedEmployee, loadedDates, loading])

	return (
		<Layout>
			<ContentHeader title='История изменений' paddingBottom={true}>
				<div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
					<Form className='form'>
						<Space>
							<Form.Item name="name" label="Сотрудник">
								<Select
									showSearch
									filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
									onChange={setEmployeeId}
									value={employeeId}
									style={{width: 450}}
									loading={employeesLoading}
									defaultValue={employeeId}
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
									format={dateLocale}
								/>
							</Form.Item>
							<Button
								type='primary'
								onClick={getHistory}
								disabled={!employeeId || !dates || !dates[0] || !dates[1]}
							>Применить</Button>
						</Space>
					</Form>
					<Button
						style={{marginRight: 10}}
						icon={<ExcelIcon disabled={isExcelDisabled}/>}
						disabled={isExcelDisabled}
						size='large' type='text'
						onClick={excelLoad}
						loading={isExcelLoading}
					/>
				</div>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Table
					columns={columns}
					dataSource={history}
					locale={tableLocale}
					loading={loading}
					onChange={(_, filters, __, {currentDataSource}) => {
						setFiltersHandler(filters)
						setIsExcelDisabled(currentDataSource.length < 1)
					}}
				/>
			</Layout.Content>
		</Layout>
	);
};
