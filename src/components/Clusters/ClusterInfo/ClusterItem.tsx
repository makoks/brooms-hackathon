import React, { useState } from 'react';
import { Space, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ClusterPopover } from '../ClusterProperties/ClusterPopover';
import { clustersAPI } from "../../../API/API";
import { EditingTextByDoubleClick } from "../../common/EditingTextByDoubleClick";
import { ClusterData, PropertyTypeObj } from "../types";
import { Id } from "../../../API/types";


type ClusterItemProps = {
	cluster: ClusterData;
	deleteCluster: (id: Id) => Promise<void>;
	propertyTypes: PropertyTypeObj[];
}

export const ClusterItem: React.FC<ClusterItemProps> = ({ cluster, deleteCluster, propertyTypes }) => {
	const [isEdit, setIsEdit] = useState(false)
	const [loading, setLoading] = useState(false)
	const [clusterName, setClusterName] = useState(cluster.name)

	const changeName = async () => {
		setLoading(true)
		clustersAPI.editCluster(cluster.id, clusterName)
			.then(() => setIsEdit(false))
			.catch(() => message.error('Не удалось изменить название кластера :('))
			.finally(() => setLoading(false))
	}

	return (
		<div>
			<Space size="middle">
				<Button
					icon={<DeleteOutlined />}
					shape="circle" type="default"
					danger size="small"
					onClick={() => deleteCluster(cluster.id)}
				/>
				<EditingTextByDoubleClick
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					value={clusterName}
					onChange={setClusterName}
					onBlur={changeName}
					loading={loading}
				/>
			</Space>
			<ClusterPopover cluster={cluster} propertyTypes={propertyTypes} />
		</div>
	);
};
