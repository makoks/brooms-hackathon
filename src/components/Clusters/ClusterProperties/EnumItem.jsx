import React, { useState } from 'react';
import { Space, Button, Typography, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { API } from '../../../API/API';

export const EnumItem = ({ propertyDefinition, clusterId, propertyId, clustersList, setClustersList }) => {
  const [editingEnumName, setEditingEnumName] = useState(false);
  const [newEnumName, setNewEnumName] = useState(propertyDefinition.nameEnum);

  const deleteEnumHandler = () => {
    const newClustersList = [ ...clustersList ];
    const currentProperty = newClustersList.find(cluster => clusterId === cluster.id)
      .properties.find(({ id }) => id === propertyId);
    currentProperty.propertyDefinitions = currentProperty.propertyDefinitions
      .filter(({ id }) => id !== propertyDefinition.id);
    setClustersList(newClustersList);
    API.deleteEnum(propertyDefinition.id);
  };

  const onEditEnumName = () => {
    const newClustersList = [ ...clustersList ];
    const currentEnum = newClustersList.find(cluster => clusterId === cluster.id)
      .properties.find(({ id }) => id === propertyId)
      .propertyDefinitions.find(({ id }) => id === propertyDefinition.id);
    currentEnum.nameEnum = newEnumName;
    setClustersList(newClustersList);
    API.editEnum(propertyDefinition.id, { nameEnum: newEnumName });
    setEditingEnumName(false);
  };

  return (
    <Space size="middle">
      <Button
        icon={<DeleteOutlined />}
        shape="circle"
        type="default"
        danger
        size="small"
        onClick={() => deleteEnumHandler(propertyDefinition.id)}
      />
      {editingEnumName ? (
        <Input value={newEnumName} onChange={e => setNewEnumName(e.target.value)} onPressEnter={onEditEnumName} />
      ) : (
        <Typography.Text style={{ marginBottom: 0 }} onClick={() => setEditingEnumName(true)}>
          {newEnumName}
        </Typography.Text>
      )}
    </Space>
  );
};
