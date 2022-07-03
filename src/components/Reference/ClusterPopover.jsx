import React, { useState } from 'react';
import {
  Space,
  Input,
  Button,
  Popover,
  Typography,
} from 'antd';
import { PlusOutlined, CaretRightOutlined, CheckOutlined } from '@ant-design/icons';
import { MpItem } from './MpItem';
import { API } from '../../API';

export const ClusterPopover = ({ id, definition, mps, setClustersList, clustersList }) => {
  const [newDefinition, setNewDefinition] = useState('');
  const [addingProperty, setAddingProperty] = useState(false);
  const [newPropertyName, setNewPropertyName] = useState('');
  const [editingDefinition, setEditingDefinition] = useState(false);

  const editDefinitionHandler = () => {
    setEditingDefinition(false);
    const newClustersList = [ ...clustersList ];
    const currentCluster = newClustersList.find(cluster => id === cluster.id);
    currentCluster.definition = newDefinition;
    setClustersList(newClustersList);
    API.editCluster(id, { definition: newDefinition });
  };

  const addPropertyHandler = () => {
    setAddingProperty(false);
    API.addProperty(id, newPropertyName).then(propertyId => {
			const newClustersList = [ ...clustersList ];
      const currentCluster = newClustersList.find(cluster => id === cluster.id);
      currentCluster.properties = [{
        id: propertyId,
        nameProp: newPropertyName,
        typeofMp: 'String',
      }].concat(currentCluster.properties);
      setClustersList(newClustersList);
      setNewPropertyName('');
		});
  };

  return (
    <Popover placement="rightTop" content={(
      <Space direction="vertical" style={{ width: 'calc((100vw - 300px) / 3)' }}>
        <Typography.Text type="secondary">Definition:</Typography.Text>
        {editingDefinition ? (
          <>
            <Input.TextArea value={newDefinition} onChange={e => setNewDefinition(e.target.value)} />
            <Button onClick={editDefinitionHandler}>Save</Button>
          </>
        ) : (
          <>
            {definition ? (
              <Typography.Paragraph style={{ marginBottom: 0 }} onClick={() => setEditingDefinition(true)}>
                {definition}
              </Typography.Paragraph>
            ) : (
              <Button icon={<PlusOutlined />} type="default" onClick={() => setEditingDefinition(true)}>
                Add definition
              </Button>
            )}
          </>
        )}
        <Typography.Text type="secondary">Mutable properties:</Typography.Text>
        {addingProperty ? (
          <Input.Group compact style={{ marginBottom: 8 }}>
            <Input
              style={{ width: 'calc(100% - 56px)' }}
              value={newPropertyName}
              onChange={e => setNewPropertyName(e.target.value)}
              onPressEnter={addPropertyHandler}
            />
            <Button type="primary" icon={<CheckOutlined />} onClick={addPropertyHandler} />
          </Input.Group>
        ) : (
          <Button icon={<PlusOutlined />} type="default" onClick={() => setAddingProperty(true)}>
            Add property
          </Button>
        )}
        {mps?.map(mp => (
          <MpItem
            mp={mp}
            key={mp.id}
            clustersList={clustersList}
            setClustersList={setClustersList}
            clusterId={id}
          />
        ))}
      </Space>
    )}>
      <Button type="text" style={{ float: 'right' }}>
        <CaretRightOutlined />
      </Button>
    </Popover>
  );
};
