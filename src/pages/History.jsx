import React from 'react';
import {Layout, Select, TreeSelect} from 'antd';
import {ContentHeader} from '../components';

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

export const History = () => {
	return (
		<Layout>
			<ContentHeader title='История изменений' paddingBottom={true}>
				<Select
					showSearch
					placeholder="Select a hero"
					optionFilterProp="children"
					onChange={undefined}
					filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
					mode="multiple"
					style={{ width: '100%' }}
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
					style={{ width: '100%' }}
					placeholder="Select properties"
					allowClear={true}
					showArrow={true}
					treeDefaultExpandAll={true}
				/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
			</Layout.Content>
		</Layout>
	);
};
