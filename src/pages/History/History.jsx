import React, {useState} from 'react';
import {Layout, Select, Space, DatePicker, Button, Table, Form} from 'antd';
import {ContentHeader} from '../../components';
import './index.css'
import {dateLocale, tableLocale} from "../../common/locale";
import {historyAPI} from "../../API/API";
import {useEmployees} from "../../hooks";

const {RangePicker} = DatePicker
const {Option} = Select

const convertHistory = (historyFromAPI) => {
	const result = []

	for (const propHistory of historyFromAPI) {
		for (const history of propHistory.histories) {
			result.push({
				changeDate: new Date(history.dateChange),
				property: history.propertyName,
				oldValue: history.valueOld ?? '—',
				newValue: history.valueNew ?? '—',
				changeReason: history.sourceOfChangeModelName
			})
		}
	}
	result.sort((a, b) => a.changeDate.value - b.changeDate.value)

	return result
}

export const History = () => {
	const {employees, loading: employeesLoading} = useEmployees()
	const [dates, setDates] = useState([])
	const [employeeId, setEmployeeId] = useState(undefined)
	const [history, setHistory] = useState([])
	const [loading, setLoading] = useState(false)

	const columns = [
		{
			title: 'Дата изменения',
			dataIndex: 'changeDate',
			key: 'changeDate',
			render: (_, {changeDate}) => changeDate.toLocaleDateString('ru-RU')
		},
		{
			title: 'Атрибут',
			dataIndex: 'property',
			key: 'property',
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
			dataIndex: 'changeReason',
			key: 'changeReason'
		},
	]

	const getHistory = async () => {
		setLoading(true)
		const res = await historyAPI.getHistory(
			employeeId,
			dates[0]?.format(dateLocale),
			dates[1]?.format(dateLocale)
		)
			.finally(() => setLoading(false))
		setHistory(convertHistory(res.data.propertyHistories))
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
								loading={employeesLoading}
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
				<Table columns={columns} dataSource={history} locale={tableLocale} loading={loading}/>
			</Layout.Content>
		</Layout>
	);
};
