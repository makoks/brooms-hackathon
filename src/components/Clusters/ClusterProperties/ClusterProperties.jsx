import React, {useEffect, useState} from 'react'
import {Button, Input, Space, Typography} from "antd";
import {CheckOutlined, PlusOutlined} from "@ant-design/icons";
import {MpItem} from "../../Reference/MpItem";
import {API} from "../../../API/API";
import {ClusterDefinition} from "./ClusterDefinition";


const {Text} = Typography

export const ClusterProperties = ({id, mps, setClustersList, clustersList, definition}) => {
	const [addingProperty, setAddingProperty] = useState(false);
	const [newPropertyName, setNewPropertyName] = useState('')

	const addPropertyHandler = () => {
		setAddingProperty(false);
		API.addProperty(id, newPropertyName).then(propertyId => {
			const newClustersList = [...clustersList];
			const currentCluster = newClustersList.find(cluster => id === cluster.id);
			currentCluster.properties = [{
				id: propertyId,
				nameProp: newPropertyName,
				typeofMp: 'String',
			}].concat(currentCluster.properties);
			setClustersList(newClustersList);
			setNewPropertyName('');
		});
	}

	useEffect(() => {

	}, [])

	return (
		<Space direction="vertical" style={{width: 'calc((100vw - 300px) / 3)'}}>
			<Text type="secondary">Описание:</Text>
			<ClusterDefinition id={id} definition={definition}/>
			<Text type="secondary">Свойства:</Text>
			{addingProperty ? (
				<Input.Group compact style={{marginBottom: 8}}>
					<Input
						style={{width: 'calc(100% - 56px)'}}
						value={newPropertyName}
						onChange={e => setNewPropertyName(e.target.value)}
						onPressEnter={addPropertyHandler}
					/>
					<Button type="primary" icon={<CheckOutlined/>} onClick={addPropertyHandler}/>
				</Input.Group>
			) : (
				<Button icon={<PlusOutlined/>} type="default" onClick={() => setAddingProperty(true)}>
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
	)
}