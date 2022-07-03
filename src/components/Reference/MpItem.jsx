import React, { useState } from 'react';
import {
  Row,
  Col,
  Space,
  Input,
  Button,
  Select,
  Popover,
  Typography,
} from 'antd';
import { DeleteOutlined, CaretRightOutlined, PlusOutlined } from '@ant-design/icons';
import { EnumItem } from './EnumItem';
import { API } from '../../API';

export const MpItem = ({ mp, clusterId, clustersList, setClustersList }) => {
  const [editingNameProp, setEditingNameProp] = useState(false);
  const [newNameProp, setNewNameProp] = useState(mp.nameProp);
  const [addingEnumName, setAddingEnumName] = useState(false);
  const [newEnumName, setNewEnumName] = useState('');

  const deletePropertyHandler = propertyId => {
    const newClustersList = [ ...clustersList ];
    const currentCluster = newClustersList.find(cluster => clusterId === cluster.id);
    currentCluster.properties = currentCluster.properties.filter(property => propertyId !== property.id);
    setClustersList(newClustersList);
    API.deleteProperty(propertyId);
  };

  const handleTypeChange = typeofMp => {
    const newClustersList = [ ...clustersList ];
    const currentProperty = newClustersList.find(cluster => clusterId === cluster.id)
      .properties.find(({ id }) => id === mp.id);
    currentProperty.typeofMp = typeofMp;
    setClustersList(newClustersList);
    API.editProperty(mp.id, { typeofMp });
  };

  const onEditNameProp = () => {
    const newClustersList = [ ...clustersList ];
    const currentProperty = newClustersList.find(cluster => clusterId === cluster.id)
      .properties.find(({ id }) => id === mp.id);
    currentProperty.nameProp = newNameProp;
    setClustersList(newClustersList);
    API.editProperty(mp.id, { nameProp: newNameProp });
    setEditingNameProp(false);
  };

  const addEnumNameHandler = () => {
    API.addEnum(mp.id, newEnumName).then(enumId => {
			const newClustersList = [ ...clustersList ];
      const currentProperty = newClustersList.find(cluster => clusterId === cluster.id)
        .properties.find(({ id }) => id === mp.id);
      currentProperty.propertyDefinitions = [{
        id: enumId,
        nameEnum: newEnumName,
      }].concat(currentProperty.propertyDefinitions);
      setClustersList(newClustersList);
      setAddingEnumName(false);
      setNewEnumName('');
		});
  };

  return (
    <Row>
      <Col span={18}>
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            type="default"
            danger
            size="small"
            onClick={() => deletePropertyHandler(mp.id)}
          />
          {editingNameProp ? (
            <Input value={newNameProp} onChange={e => setNewNameProp(e.target.value)} onPressEnter={onEditNameProp} />
          ) : (
            <Typography.Text style={{ marginBottom: 0 }} onClick={() => setEditingNameProp(true)}>
              {newNameProp}
            </Typography.Text>
          )}
        </Space>
      </Col>
      <Col span={6}>
        <Select defaultValue={mp.typeofMp} onChange={handleTypeChange} style={{ width: 80 }}>
          <Select.Option value="String">str</Select.Option>
          <Select.Option value="Integer">num</Select.Option>
          <Select.Option value="Enum">enum</Select.Option>
          <Select.Option value="Date">date</Select.Option>
        </Select>
        {mp.typeofMp === 'Enum' && (
          <Popover
            placement="rightTop"
            style={{ padding: 24 }}
            title={
              <Space>
                <Typography.Title level={5}>Enum names</Typography.Title>
                <Button icon={<PlusOutlined />} type="default" onClick={() => setAddingEnumName(true)}>
                  Add enum name
                </Button>
              </Space>
            }
            content={(
              <Space direction="vertical" style={{ width: 'calc((100vw - 300px) / 3)' }}>
                {addingEnumName && (
                  <Input
                    style={{ width: 'calc(100% - 56px)' }}
                    value={newEnumName}
                    onChange={e => setNewEnumName(e.target.value)}
                    onPressEnter={addEnumNameHandler}
                  />
                )}
                {mp.propertyDefinitions?.map(propertyDefinition => (
                  <EnumItem
                    key={propertyDefinition.id}
                    propertyDefinition={propertyDefinition}
                    clustersList={clustersList}
                    setClustersList={setClustersList}
                    clusterId={clusterId}
                    propertyId={mp.id}
                  />
                ))}
              </Space>
            )}
          >
            <Button type="text" style={{ float: 'right' }}>
              <CaretRightOutlined />
            </Button>
          </Popover>
        )}
      </Col>
    </Row>
  );
};
