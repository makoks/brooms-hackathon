import React, {useState} from 'react';
import {Space, Button, Typography, Input, message, Spin} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {ClusterPopover} from '../ClusterProperties/ClusterPopover';
import {clustersAPI} from "../../../API/API";

export const ClusterItem = ({cluster, deleteCluster}) => {
	const [isEdit, setIsEdit] = useState(false)
	const [loading, setLoading] = useState(false)
	const [clusterName, setClusterName] = useState(cluster.name)

	const changeName = async () => {
		setLoading(true)
		clustersAPI.editCluster(cluster.id, clusterName)
			.then(() => setIsEdit(false))
			.catch(() => message.error('Не удалось изменить название кластера'))
			.finally(() => setLoading(false))
	}

	return (
		<div>
			<Space size="middle">
				<Button
					icon={<DeleteOutlined/>}
					shape="circle" type="default"
					danger size="small"
					onClick={() => deleteCluster(cluster.id)}
				/>
				<div>
					{isEdit ? (
						<Input
							value={clusterName}
							onChange={e => setClusterName(e.target.value)}
							onBlur={changeName}
							suffix={loading ? <Spin size='small'/> : <></>}
						/>
					) : (
						<Typography.Text style={{marginBottom: 0}} onDoubleClick={() => setIsEdit(true)}>
							{clusterName}
						</Typography.Text>
					)}
				</div>
			</Space>
			<ClusterPopover cluster={cluster}/>
		</div>
	);
};
