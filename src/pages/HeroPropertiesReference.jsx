import React, { useState, useEffect } from 'react';
import {
	Card,
	Space,
	Input,
	Layout,
	Button,
	Typography,
} from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { ContentHeader, ClusterItem } from '../components';
import { API } from '../API';

export const HeroPropertiesReference = () => {
	const [addingCluster, setAddingCluster] = useState(false);
	const [newClusterName, setNewClusterName] = useState('');
	const [clustersList, setClustersList] = useState([]);

	const addClusterHandler = () => {
		API.addCluster(newClusterName).then(id => {
			setClustersList([{
				id,
				nameCluster: newClusterName,
			}].concat(clustersList));
			setAddingCluster(false);
			setNewClusterName('');
		});
	};

	useEffect(() => {
		const fetchClusters = async () => {
			setClustersList(await API.clusters());
		};
		fetchClusters();
	}, []);

	return (
		<Layout>
			<ContentHeader title='Hero Properties Reference' />
			<Layout.Content style={{ margin: '27px 34px' }}>
				<Card style={{ width: '30%' }} bodyStyle={{ paddingRight: 0 }} title={(
					<Space>
						<Typography.Title level={5} style={{ marginBottom: 0 }}>Clusters</Typography.Title>
						<Button icon={<PlusOutlined />} type="default" onClick={() => setAddingCluster(true)}>
							Add cluster
						</Button>
					</Space>
				)}>
					{addingCluster && (
						<Input.Group compact style={{ marginBottom: 8 }}>
							<Input
								style={{ width: 'calc(100% - 56px)' }}
								value={newClusterName}
								onChange={e => setNewClusterName(e.target.value)}
								onPressEnter={addClusterHandler}
							/>
							<Button type="primary" icon={<CheckOutlined />} onClick={addClusterHandler} />
						</Input.Group>
					)}
					<Space direction="vertical" style={{ width: '100%' }}>
						{clustersList.map(cluster => (
							<ClusterItem
								key={cluster.id}
								cluster={cluster}
								clustersList={clustersList}
								setClustersList={setClustersList}
							/>
						))}
					</Space>
				</Card>
      </Layout.Content>
		</Layout>
	);
};
