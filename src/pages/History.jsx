import React, {useEffect, useState} from 'react';
import {Layout, Select, Space, Typography, DatePicker, Button, Table, TreeSelect} from 'antd';
import {ContentHeader} from '../components';
import {API} from "../API";

const {RangePicker} = DatePicker
const {Option} = Select
const {Column, ColumnGroup} = Table

const data = [
	{
		key: '1',
		changeDate: new Date('12-12-2000').toLocaleDateString('ru-RU'),
		reason: 'Повышение уровня',
		stats: {
			level: 32,
			mana: 1212,
			gold: 1212121,
		},
		loot: {
			hat: 'Железо',
			boots: 'Кожа',
			armor: 'Лед'
		}
	},
	{
		key: '2',
		changeDate: new Date('01-11-1978').toLocaleDateString('ru-RU'),
		reason: 'Повышение уровня',
		stats: {
			level: 54,
			mana: 181,
			gold: 12120,
		},
		loot: {
			hat: 'Ткань',
			boots: 'Кожа',
			armor: 'Железо'
		}
	},
	{
		key: '3',
		changeDate: new Date('10-10-1998').toLocaleDateString('ru-RU'),
		reason: 'Выход из игры',
		stats: {
			level: 50,
			mana: 111,
			gold: 12000,
		},
		loot: {
			hat: 'Огонь',
			boots: null,
			armor: 'Дерево'
		}
	},
];

export const History = () => {
	const [dates, setDates] = useState([])
	const [hero, setHero] = useState(undefined)
	const [heroes, setHeroes] = useState([])
	const [clusters, setClusters] = useState([]);
	const [selectedProperties, setSelectedProperties] = useState([]);

	useEffect(() => {
		const getHeroes = async () => {
			const res = await API.getHeroes()
			setHeroes(res.data._embedded.hero)
		}
		const fetchClusters = async () => {
			const fetchedClusters = await API.clusters();
			setClusters(fetchedClusters.map(cluster => ({
				title: cluster.nameCluster,
				value: cluster.id,
				key: cluster.id,
				children: cluster.properties.map(property => ({
					title: property.nameProp,
					value: `${cluster.id}-${property.id}`,
					key: `${cluster.id}-${property.id}`,
				})),
			})));
		}

		getHeroes()
		fetchClusters();
	}, [])

	return (
		<Layout>
			<ContentHeader title='История изменений' paddingBottom={true}>
				{JSON.stringify(hero)}
				<Select
					showSearch
					filterOption={(input, option) => {
						console.log(option);
						option.title.toLowerCase().includes(input.toLowerCase())
					}}
					onChange={selectedId => setHero(heroes.find(({ id }) => id === selectedId))}
					value={hero}
					placeholder="Select hero"
					style={{ width: 300 }}
				>
					{heroes.map(hero => (
						<Option value={hero.id} key={hero.id}>{hero.heroName}</Option>
					))}
				</Select>
				<TreeSelect
					treeData={clusters}
					treeCheckable={true}
					style={{ width: '100%' }}
					placeholder="Select properties"
					allowClear={true}
					showArrow={true}
					treeDefaultExpandAll={true}
					onChange={setSelectedProperties}
				/>
				<Space>
					<Typography.Text>Выберите период изменений</Typography.Text>
					<RangePicker value={dates} onCalendarChange={setDates}/>
					<Button type='primary' disabled={!hero || !selectedProperties.length || !dates?.[1]}>
						Применить
					</Button>
				</Space>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Table dataSource={data} bordered>
					<Column title="Дата изменения" dataIndex="changeDate" key="changeDate" />
					<Column title="Причина" dataIndex="reason" key="reason" />
					<ColumnGroup title='Статистика'>
						<Column title="Уровень" dataIndex={['stats', 'level']} key='stats.level' />
						<Column title="Мана" dataIndex={['stats', 'mana']} key="stats.mana" />
						<Column title="Золото" dataIndex={['stats', 'gold']} key="stats.gold" />
					</ColumnGroup>
					<ColumnGroup title='Лут'>
						<Column title="Шляпа" dataIndex={['loot', 'hat']} key='loot.hat' />
						<Column title="Ботинки" dataIndex={['loot', 'boots']} key="loot.boots" />
						<Column title="Броня" dataIndex={['loot', 'armor']} key="loot.armor" />
					</ColumnGroup>
				</Table>
			</Layout.Content>
		</Layout>
	);
};
