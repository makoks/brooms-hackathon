import React, {useEffect, useState} from 'react';
import {
	Row,
	Col,
	Layout,
	Select,
	TreeSelect,
	Typography,
} from 'antd';
import {ContentHeader} from '../components';
import {API} from "../API";

const userProperties = [
	{
		heroId: '5',
		clusters: [
			{
				title: 'some cluster',
				items: [
					{name: 'mp-1', value: 19191},
					{name: 'mp-2', value: 'sopwpwm'},
					{name: 'mp-3', value: 232},
				]
			},
			{
				title: 'cluster 2',
				items: [
					{name: 'mp-001', value: 1},
					{name: 'mp-002', value: 'sopwpwm'},
					{name: 'mp-003', value: 2},
				]
			},
			{
				title: 'some 3',
				items: [
					{name: '1-mp-1', value: 19191},
					{name: '2-mp-2', value: 'sopwpwm'},
					{name: '3-mp-3', value: 232},
				]
			},
		]
	},
	{
		heroId: '3',
		clusters: [
			{
				title: 'some cluster',
				items: [
					{name: 'mp-1', value: 19191},
					{name: 'mp-2', value: 'sopwpwm'},
					{name: 'mp-3', value: 232},
				]
			},
			{
				title: 'cluster 2',
				items: [
					{name: 'mp-001', value: 1},
					{name: 'mp-002', value: 'sopwpwm'},
					{name: 'mp-003', value: 2},
				]
			},
			{
				title: 'some 3',
				items: [
					{name: '1-mp-1', value: 19191},
					{name: '2-mp-2', value: 'sopwpwm'},
					{name: '3-mp-3', value: 232},
				]
			},
		]
	},
	{
		heroId: '6',
		clusters: [
			{
				title: 'some cluster',
				items: [
					{name: 'mp-1', value: 19191},
					{name: 'mp-2', value: 'sopwpwm'},
					{name: 'mp-3', value: 232},
				]
			},
			{
				title: 'cluster 2',
				items: [
					{name: 'mp-001', value: 1},
					{name: 'mp-002', value: 'sopwpwm'},
					{name: 'mp-003', value: 2},
				]
			},
			{
				title: 'some 3',
				items: [
					{name: '1-mp-1', value: 19191},
					{name: '2-mp-2', value: 'sopwpwm'},
					{name: '3-mp-3', value: 232},
				]
			},
		]
	},
	{
		heroId: '6',
		clusters: [
			{
				title: 'some cluster',
				items: [
					{name: 'mp-1', value: 19191},
					{name: 'mp-2', value: 'sopwpwm'},
					{name: 'mp-3', value: 232},
				]
			},
			{
				title: 'cluster 2',
				items: [
					{name: 'mp-001', value: 1},
					{name: 'mp-002', value: 'sopwpwm'},
					{name: 'mp-003', value: 2},
				]
			},
			{
				title: 'some 3',
				items: [
					{name: '1-mp-1', value: 19191},
					{name: '2-mp-2', value: 'sopwpwm'},
					{name: '3-mp-3', value: 232},
				]
			},
		]
	},
]

const clustersTitles = userProperties[0].clusters.map(cluster => cluster.title)


export const Comparison = () => {
	const [heroesIds] = useState(JSON.parse(localStorage.getItem('compareList')) ?? [])
	const [heroes, setHeroes] = useState([])

	useEffect(() => {
		const getHero = (id) => {
			return API.getHero(id)
		}

		Promise.all(heroesIds.map(id => getHero(id)))
			.then(res => {
				console.log(res)
				setHeroes(res)
			})
	}, [heroesIds])

	const mutableProperties = [
		{
			title: 'Cluster 1',
			value: '0-0',
			key: '0-0',
			children: [
				{
					title: 'MP 1',
					value: '0-0-0',
					key: '0-0-0',
				},
				{
					title: 'MP 2',
					value: '0-0-1',
					key: '0-0-1',
				},
			],
		},
		{
			title: 'Cluster 2',
			value: '0-1',
			key: '0-1',
			children: [
				{
					title: 'MP 3',
					value: '0-1-0',
					key: '0-1-0',
				},
				{
					title: 'MP 4',
					value: '0-1-1',
					key: '0-1-1',
				},
				{
					title: 'MP 5',
					value: '0-1-2',
					key: '0-1-2',
				},
			],
		},
	];

	const onChange = () => {
	};

	return (
		<Layout>
			<ContentHeader title='Сравнение' paddingBottom={true}>
				<Select
					showSearch
					placeholder="Select a hero"
					optionFilterProp="children"
					onChange={onChange}
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					mode="multiple"
					style={{width: '100%'}}
					allowClear={true}
					maxTagCount={6}
					showArrow={true}
				>
					<Select.Option value="jack">Hero 1</Select.Option>
					<Select.Option value="lucy">Hero 2</Select.Option>
					<Select.Option value="tom">Hero 3</Select.Option>
				</Select>
				<TreeSelect
					treeData={mutableProperties}
					treeCheckable={true}
					style={{width: '100%'}}
					placeholder="Select properties"
					allowClear={true}
					showArrow={true}
					treeDefaultExpandAll={true}
				/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Row gutter={8}>
					{/*	username line*/}
					<Col span={24}>
						<Row gutter={8}>
							<Col span={24/7}/>
							{heroes.map(hero => (
								<Col span={24/7}>
									{hero.data.heroName}
								</Col>
							))}
						</Row>
					</Col>
					{clustersTitles.map(title => (
						<Col span={24}>
							<Typography.Title level={4}>{title}</Typography.Title>
							{/*{userProperties.find()(props => (*/}
							{/*	<Row gutter={8}>*/}

							{/*	</Row>*/}
							{/*))}*/}
						</Col>
					))}

				</Row>
			</Layout.Content>
		</Layout>
	);
};

// <Row gutter={8}>
// 	<Col span={4}>
// 		<Card>
// 			<Card.Meta
// 				title="Hero 1"
// 				avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
// 			/>
// 			<List
// 				dataSource={['Cluster 1', 'Cluster 2']}
// 				renderItem={cluster => (
// 					<List.Item>
// 						<Space direction="vertical">
// 							<Typography.Title level={5}>{cluster}</Typography.Title>
// 							<Space>
// 								<Typography.Text type="secondary">MP 1:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 2:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 3:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 						</Space>
// 					</List.Item>
// 				)}
// 			/>
// 		</Card>
// 	</Col>
// 	<Col span={4}>
// 		<Card>
// 			<Card.Meta
// 				title="Hero 1"
// 				avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
// 			/>
// 			<List
// 				dataSource={['Cluster 1', 'Cluster 2']}
// 				renderItem={cluster => (
// 					<List.Item>
// 						<Space direction="vertical">
// 							<Typography.Title level={5}>{cluster}</Typography.Title>
// 							<Space>
// 								<Typography.Text type="secondary">MP 1:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 2:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 3:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 						</Space>
// 					</List.Item>
// 				)}
// 			/>
// 		</Card>
// 	</Col>
// 	<Col span={4}>
// 		<Card>
// 			<Card.Meta
// 				title="Hero 1"
// 				avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
// 			/>
// 			<List
// 				dataSource={['Cluster 1', 'Cluster 2']}
// 				renderItem={cluster => (
// 					<List.Item>
// 						<Space direction="vertical">
// 							<Typography.Title level={5}>{cluster}</Typography.Title>
// 							<Space>
// 								<Typography.Text type="secondary">MP 1:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 2:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 3:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 						</Space>
// 					</List.Item>
// 				)}
// 			/>
// 		</Card>
// 	</Col>
// 	<Col span={4}>
// 		<Card>
// 			<Card.Meta
// 				title="Hero 1"
// 				avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
// 			/>
// 			<List
// 				dataSource={['Cluster 1', 'Cluster 2']}
// 				renderItem={cluster => (
// 					<List.Item>
// 						<Space direction="vertical">
// 							<Typography.Title level={5}>{cluster}</Typography.Title>
// 							<Space>
// 								<Typography.Text type="secondary">MP 1:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 2:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 3:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 						</Space>
// 					</List.Item>
// 				)}
// 			/>
// 		</Card>
// 	</Col>
// 	<Col span={4}>
// 		<Card>
// 			<Card.Meta
// 				title="Hero 1"
// 				avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
// 			/>
// 			<List
// 				dataSource={['Cluster 1', 'Cluster 2']}
// 				renderItem={cluster => (
// 					<List.Item>
// 						<Space direction="vertical">
// 							<Typography.Title level={5}>{cluster}</Typography.Title>
// 							<Space>
// 								<Typography.Text type="secondary">MP 1:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 2:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 							<Space>
// 								<Typography.Text type="secondary">MP 3:</Typography.Text>
// 								<Typography.Text>Value</Typography.Text>
// 							</Space>
// 						</Space>
// 					</List.Item>
// 				)}
// 			/>
// 		</Card>
// 	</Col>
// </Row>

