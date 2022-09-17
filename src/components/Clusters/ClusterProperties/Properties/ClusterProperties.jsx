import React, {useEffect, useState} from 'react'
import {Form, Space, Typography} from "antd";
import {clustersAPI} from "../../../../API/API";
import {ClusterDefinition} from "../../ClusterInfo/ClusterDefinition";
import {AddButton} from "../../../common/AddButton";
import {CreatePropertyForm} from "../CreatePropertyForm";
import {Loader} from "../../../common/Loader";
import {Properties} from "./Properties";


const {Text} = Typography

export const ClusterProperties = ({id, definition}) => {
	const [addingProperty, setAddingProperty] = useState(false)
	const [properties, setProperties] = useState([])
	const [creating, setCreating] = useState(false)
	const [loading, setLoading] = useState(false)
	const [form] = Form.useForm()

	const addPropertyHandler = async (propertyData) => {
		setCreating(true)
		await clustersAPI.addProperty(id, propertyData)
			.then(propertyId => {
				setProperties([...properties, {
					...propertyData,
					id: propertyId
				}])
				setAddingProperty(false)
				setCreating(false)
				form.resetFields()
			})
	}

	useEffect(async () => {
		setLoading(true)
		setProperties(await clustersAPI.getClusterProperties(id))
		setLoading(false)
	}, [id])

	return (
		<Space direction="vertical" style={{width: 'calc((100vw - 300px) / 3)'}}>
			<Space direction="vertical" style={{padding: '12px 16px 0 16px', width: '100%'}}>
				<Text type="secondary">Описание:</Text>
				<ClusterDefinition id={id} definition={definition}/>
				<Text type="secondary">Свойства:</Text>
			</Space>
			{addingProperty ? (
				<CreatePropertyForm form={form} onFinish={addPropertyHandler} loading={creating}/>
			) : (
				<>
					<AddButton onClick={() => setAddingProperty(true)}/>
					{loading
						? <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
						: <Properties properties={properties}/>
					}
				</>
			)}
			{/*{mps?.map(mp => (*/}
			{/*	<MpItem*/}
			{/*		mp={mp}*/}
			{/*		key={mp.id}*/}
			{/*		clustersList={clustersList}*/}
			{/*		setClustersList={setClustersList}*/}
			{/*		clusterId={id}*/}
			{/*	/>*/}
			{/*))}*/}
		</Space>
	)
}