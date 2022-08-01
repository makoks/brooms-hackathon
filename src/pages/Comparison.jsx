import React from 'react';
import {Layout, Select, TreeSelect, Collapse} from 'antd';
import {ContentHeader} from '../components';
import ComparisonHeaderBlock from "../components/Comparison/ComparisonHeaderBlock/ComparisonHeaderBlock";
// import {API} from "../API";

// const userProperties = [
// 	{
// 		heroId: '5',
// 		clusters: [
// 			{
// 				title: 'some cluster',
// 				items: [
// 					{name: 'mp-1', value: 19191},
// 					{name: 'mp-2', value: 'sopwpwm'},
// 					{name: 'mp-3', value: 232},
// 				]
// 			},
// 			{
// 				title: 'cluster 2',
// 				items: [
// 					{name: 'mp-001', value: 1},
// 					{name: 'mp-002', value: 'sopwpwm'},
// 					{name: 'mp-003', value: 2},
// 				]
// 			},
// 			{
// 				title: 'some 3',
// 				items: [
// 					{name: '1-mp-1', value: 19191},
// 					{name: '2-mp-2', value: 'sopwpwm'},
// 					{name: '3-mp-3', value: 232},
// 				]
// 			},
// 		]
// 	},
// 	{
// 		heroId: '3',
// 		clusters: [
// 			{
// 				title: 'some cluster',
// 				items: [
// 					{name: 'mp-1', value: 19191},
// 					{name: 'mp-2', value: 'sopwpwm'},
// 					{name: 'mp-3', value: 232},
// 				]
// 			},
// 			{
// 				title: 'cluster 2',
// 				items: [
// 					{name: 'mp-001', value: 1},
// 					{name: 'mp-002', value: 'sopwpwm'},
// 					{name: 'mp-003', value: 2},
// 				]
// 			},
// 			{
// 				title: 'some 3',
// 				items: [
// 					{name: '1-mp-1', value: 19191},
// 					{name: '2-mp-2', value: 'sopwpwm'},
// 					{name: '3-mp-3', value: 232},
// 				]
// 			},
// 		]
// 	},
// 	{
// 		heroId: '6',
// 		clusters: [
// 			{
// 				title: 'some cluster',
// 				items: [
// 					{name: 'mp-1', value: 19191},
// 					{name: 'mp-2', value: 'sopwpwm'},
// 					{name: 'mp-3', value: 232},
// 				]
// 			},
// 			{
// 				title: 'cluster 2',
// 				items: [
// 					{name: 'mp-001', value: 1},
// 					{name: 'mp-002', value: 'sopwpwm'},
// 					{name: 'mp-003', value: 2},
// 				]
// 			},
// 			{
// 				title: 'some 3',
// 				items: [
// 					{name: '1-mp-1', value: 19191},
// 					{name: '2-mp-2', value: 'sopwpwm'},
// 					{name: '3-mp-3', value: 232},
// 				]
// 			},
// 		]
// 	},
// 	{
// 		heroId: '6',
// 		clusters: [
// 			{
// 				title: 'some cluster',
// 				items: [
// 					{name: 'mp-1', value: 19191},
// 					{name: 'mp-2', value: 'sopwpwm'},
// 					{name: 'mp-3', value: 232},
// 				]
// 			},
// 			{
// 				title: 'cluster 2',
// 				items: [
// 					{name: 'mp-001', value: 1},
// 					{name: 'mp-002', value: 'sopwpwm'},
// 					{name: 'mp-003', value: 2},
// 				]
// 			},
// 			{
// 				title: 'some 3',
// 				items: [
// 					{name: '1-mp-1', value: 19191},
// 					{name: '2-mp-2', value: 'sopwpwm'},
// 					{name: '3-mp-3', value: 232},
// 				]
// 			},
// 		]
// 	},
// ]

export const Comparison = () => {
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

	const persons = [
		{
			id: '1',
			name: 'Анастасия',
			surname: 'Проданик',
			patronymic: 'Александровна',
			clusters: [
				{
					id: '1',
					title: 'Cluster 1',
					properties: [
						{
							title: 'Дата приема',
							value: new Date('2019-02-03')
						},
						{
							title: 'Опыт',
							value: 5000
						},
						{
							title: 'Премия',
							value: 85
						}
					]
				}
			]
		},
		{
			id: '2',
			name: 'Анастасия',
			surname: 'Проданик',
			patronymic: 'Александровна',
			clusters: [
				{
					title: 'Cluster 1',
					properties: [
						{
							title: 'Дата приема',
							value: new Date('2019-02-03')
						},
						{
							title: 'Опыт',
							value: 5000
						},
						{
							title: 'Премия',
							value: 85
						}
					]
				}
			]
		},
		{
			id: '3',
			name: 'Анастасия',
			surname: 'Проданик',
			patronymic: 'Александровна',
			clusters: [
				{
					title: 'Cluster 1',
					properties: [
						{
							title: 'Дата приема',
							value: new Date('2019-02-03')
						},
						{
							title: 'Опыт',
							value: 5000
						},
						{
							title: 'Премия',
							value: 85
						}
					]
				}
			]
		},
		{
			id: '4',
			name: 'Анастасия',
			surname: 'Проданик',
			patronymic: 'Александровна',
			clusters: [
				{
					title: 'Cluster 1',
					properties: [
						{
							title: 'Дата приема',
							value: new Date('2019-02-03')
						},
						{
							title: 'Опыт',
							value: 5000
						},
						{
							title: 'Премия',
							value: 85
						}
					]
				}
			]
		},
		{
			id: '5',
			name: 'Анастасия',
			surname: 'Проданик',
			patronymic: 'Александровна',
			clusters: [
				{
					title: 'Cluster 1',
					properties: [
						{
							title: 'Дата приема',
							value: new Date('2019-02-03')
						},
						{
							title: 'Опыт',
							value: 5000
						},
						{
							title: 'Премия',
							value: 85
						}
					]
				}
			]
		},
		{
			id: '6',
			name: 'Анастасия',
			surname: 'Проданик',
			patronymic: 'Александровна',
			clusters: [
				{
					title: 'Cluster 1',
					properties: [
						{
							title: 'Дата приема',
							value: new Date('2019-02-03')
						},
						{
							title: 'Опыт',
							value: 5000
						},
						{
							title: 'Премия',
							value: 85
						}
					]
				}
			]
		}
	]

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
				<ComparisonHeaderBlock persons={persons}/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Collapse onChange={onChange}>
					{persons[0].clusters.map(cluster => (
						<Collapse.Panel key={cluster.id} header={cluster.title}>
							<p>some properties</p>
						</Collapse.Panel>
					))}
				</Collapse>
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

