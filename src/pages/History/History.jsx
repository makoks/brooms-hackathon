import React, {useEffect, useState} from 'react';
import {Layout, Select, Space, DatePicker, Button, Table, Form} from 'antd';
import {ContentHeader} from '../../components';
import {API} from "../../API";
import './index.css'

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
		key: 'property'
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
	const [hero, setHero] = useState(undefined)
	const [heroes, setHeroes] = useState([])

	useEffect(() => {
		const getHeroes = async () => {
			const res = await API.getHeroes()
			setHeroes(res.data._embedded.hero)
		}

		getHeroes()
	}, [])

	return (
		<Layout>
			<ContentHeader title='История изменений' paddingBottom={true}>
				<Form className='form'>
					<Space>
						<Form.Item name="name" label="Сотрудник">
							<Select
								showSearch
								filterOption={(input, option) => {
									option.title.toLowerCase().includes(input.toLowerCase())
								}}
								onChange={selectedId => setHero(heroes.find(({id}) => id === selectedId))}
								value={hero}
								style={{width: 450}}
							>
								{heroes.map(hero => (
									<Option value={hero.id} key={hero.id}>{hero.heroName}</Option>
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
						<Button type='primary'>Применить</Button>
					</Space>
				</Form>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Table columns={columns} dataSource={data}/>
			</Layout.Content>
		</Layout>
	);
};
