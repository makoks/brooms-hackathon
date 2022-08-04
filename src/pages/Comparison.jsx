import React, {useState} from 'react';
import {Layout, Select, TreeSelect} from 'antd';
import {ContentHeader} from '../components';
import ComparisonHeaderBlock from "../components/Comparison/ComparisonHeaderBlock/ComparisonHeaderBlock";
import ComparisonClusters from "../components/Comparison/ComparisonClusters/ComparisonClusters";

export const Comparison = () => {
	const [onlyDifferent, setOnlyDifferent] = useState(false)
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
							value: '2019-02-03'
						},
						{
							title: 'Опыт',
							value: null
						},
						{
							title: 'Премия',
							value: '3 213 213 21 321 321 3 213 213 21 321'
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
							value: '2019-02-03'
						}
					]
				},
				{
					title: 'Cluster 2',
					properties: [
						{
							title: 'Title',
							value: 'Word'
						},
						{
							title: 'Value',
							value: 1000
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
							value: '2019-02-03'
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
							value: '2019-02-03'
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
				},
				{
					title: 'Cluster 2',
					properties: [
						{
							title: 'Title',
							value: 'OOOOOOO'
						},
						{
							title: 'Value',
							value: 1000
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
							value: '2019-02-03'
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
				<ComparisonHeaderBlock
					persons={persons}
					onlyDifferent={onlyDifferent}
					setOnlyDifferent={setOnlyDifferent}
				/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<ComparisonClusters
					persons={persons}
					onlyDifferent={onlyDifferent}
				/>
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

