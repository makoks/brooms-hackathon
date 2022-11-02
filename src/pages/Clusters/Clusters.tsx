import React, {useState, useEffect} from 'react';
import {Card, Space, Layout} from 'antd';
import {ClusterItem, Loader} from '../../components';
import {clustersAPI} from '../../API/API';
import './index.css';
import {CreatingClusterPopover} from "../../components/Clusters/CreatingClusterPopover/CreatingClusterPopover";
import {ClusterData} from "../../components/Clusters/types";
import {Id} from "../../API/types";
import {usePropertyTypes} from "../../hooks/usePropertyTypes";

export const Clusters = () => {
	const [clusters, setClusters] = useState<ClusterData[]>([]);
	const [loading, setLoading] = useState(false);
	const {types, loading: typesLoading} = usePropertyTypes();

	const createCluster = async (clusterData: ClusterData) => {
		await clustersAPI.createCluster(clusterData)
			.then((res) => setClusters([
				...clusters,
				{...clusterData, id: res.data.id}
			]))
	}

	const deleteCluster = async (id: Id) => {
		clustersAPI.deleteCluster(id)
			.then(() => setClusters(c => c.filter(cluster => cluster.id !== id)))
	}

	useEffect(() => {
		setLoading(true)
		const getClusters = async () => {
			const res = await clustersAPI.getClusters()
			setClusters(res.data._embedded.cluster)
		}

		getClusters()
			.finally(() => setLoading(false))
	}, []);

	return (
		<Layout>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Card
					style={{width: '30%'}}
					bodyStyle={{paddingRight: 0}}
					className='clusters'
					title={<CreatingClusterPopover createCluster={createCluster}/>}
				>
					{!(loading || typesLoading)
						? (
							<Space direction="vertical" style={{width: '100%'}}>
								{clusters.map(cluster => (
									<ClusterItem
										key={cluster.id}
										cluster={cluster}
										deleteCluster={deleteCluster}
										propTypes={types}
									/>
								))}
							</Space>
						)
						: <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
					}
				</Card>
			</Layout.Content>
		</Layout>
	);
};
