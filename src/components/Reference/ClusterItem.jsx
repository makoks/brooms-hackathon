import React, { useState } from 'react';
import { Space, Button, Typography, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ClusterPopover } from './ClusterPopover';
import { API } from '../../API/API';

export const ClusterItem = ({ cluster, clustersList, setClustersList }) => {
  const [clusterName, setClusterName] = useState(cluster.nameCluster);
  const [editingClusterName, setEditingClusterName] = useState(false);

	const deleteClusterHandler = () => {
    API.deleteCluster(cluster.id);
		setClustersList(clustersList.filter(({ id }) => cluster.id !== id));
	};

  const onEditClusterName = () => {
    setEditingClusterName(false);
    const newClustersList = [...clustersList];
    const currentClaster = newClustersList.find(({ id }) => id === cluster.id);
    currentClaster.nameCluster = clusterName;
    setClustersList(newClustersList);
    API.editCluster(cluster.id, { nameCluster: clusterName });
	};

  return (
    <div>
      <Space size="middle">
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          type="default"
          danger
          size="small"
          onClick={() => deleteClusterHandler(cluster.id)}
        />
        {editingClusterName ? (
          <Input value={clusterName} onChange={e => setClusterName(e.target.value)} onPressEnter={onEditClusterName} />
        ) : (
          <Typography.Text style={{ marginBottom: 0 }} onClick={() => setEditingClusterName(true)}>
            {clusterName}
          </Typography.Text>
        )}
      </Space>
      <ClusterPopover
        clustersList={clustersList}
        setClustersList={setClustersList}
        id={cluster.id}
        definition={cluster.definition}
        mps={cluster.properties}
      />
    </div>
  );
};
