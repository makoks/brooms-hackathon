import React, { useState } from 'react';
import {
  Space,
  Input,
  Button,
  Popover,
  Typography,
} from 'antd';
import { PlusOutlined, CaretRightOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';

export const ClusterPopover = ({ id, definition, mps, setClustersList, clustersList }) => {
  const [addingDefinition, setAddingDefinition] = useState(false);
  const [newDefinition, setNewDefinition] = useState('');
  const [addingProperty, setAddingProperty] = useState(false);
  const [newPropertyName, setNewPropertyName] = useState('');

  const addDefinitionHandler = () => {
    setAddingDefinition(false);
    const newClustersList = [ ...clustersList ];
    const currentCluster = newClustersList.find(cluster => id === cluster.id);
    currentCluster.definition = newDefinition;
    console.log(newClustersList);
    setClustersList(newClustersList);
  };

  const addPropertyHandler = () => {
    setAddingProperty(false);
    const newClustersList = [ ...clustersList ];
    const currentCluster = newClustersList.find(cluster => id === cluster.id);
    currentCluster.properties = [{
      id: Math.random(),
      propName: newPropertyName,
    }].concat(clustersList);
    setClustersList(newClustersList);
  };

  const deletePropertyHandler = propertyId => {
    const newClustersList = [ ...clustersList ];
    const currentCluster = newClustersList.find(cluster => id === cluster.id);
    currentCluster.properties = currentCluster.properties.filter(property => propertyId !== property.id);
    setClustersList(newClustersList);
  };

  return (
    <Popover placement="rightTop" style={{ padding: 24 }} content={(
      <Space direction="vertical" style={{ width: 'calc((100vw - 300px) / 3)' }}>
        <Typography.Text type="secondary">Definition:</Typography.Text>
        {definition ? (
          <Typography.Paragraph editable={{ triggerType: 'text' }} style={{ marginBottom: 0 }}>
            {definition}
          </Typography.Paragraph>
        ) : (
          <>
            {addingDefinition ? (
              <>
                <Input.TextArea value={newDefinition} onChange={e => setNewDefinition(e.target.value)} />
                <Button onClick={addDefinitionHandler}>Save</Button>
              </>
            ) : (
              <Button icon={<PlusOutlined />} type="default" onClick={() => setAddingDefinition(true)}>
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
          <div key={mp.id}>
            <Space size="middle">
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                type="default"
                danger
                size="small"
                onClick={() => deletePropertyHandler(mp.id)}
              />
              <Typography.Paragraph editable={{ triggerType: 'text' }} style={{ marginBottom: 0 }}>
                {mp.nameProp}
              </Typography.Paragraph>
            </Space>
            {/* <ClusterPopover
              clustersList={clustersList}
              setClustersList={setClustersList}
              id={cluster.id}
              definition={cluster.definition}
              mps={cluster.properties}
            /> */}
          </div>
        ))}
      </Space>
    )}>
      <Button type="text" style={{ float: 'right' }}>
        <CaretRightOutlined />
      </Button>
    </Popover>
  );
};
