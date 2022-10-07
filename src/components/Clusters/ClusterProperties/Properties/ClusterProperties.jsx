import React, {useEffect, useState} from 'react'
import {Form, Space, Typography} from "antd";
import {clustersAPI, propertiesAPI} from "../../../../API/API";
import {ClusterDefinition} from "../../ClusterInfo/ClusterDefinition";
import {AddButton} from "../../../common/AddButton";
import {CreatePropertyForm} from "../CreatePropertyForm";
import {Loader} from "../../../common/Loader";
import {Properties} from "./Properties";


const {Text} = Typography

export const ClusterProperties = ({id, definition}) => {
	const [addingProperty, setAddingProperty] = useState(false)
	const [properties, setProperties] = useState([])
	const [deletingPropertyIds, setDeletingPropertyIds] = useState([])
	const [creating, setCreating] = useState(false)
	const [loading, setLoading] = useState(false)
	const [types, setTypes] = useState([])
	const [loadingTypes, setLoadingTypes] = useState(false)
	const [form] = Form.useForm()

	const addPropertyHandler = async (propertyData) => {
		setCreating(true)
		await clustersAPI.addProperty(id, propertyData)
			.then(({data: {id}}) => {
				setProperties([...properties, {...propertyData, id}])
				setAddingProperty(false)
				setCreating(false)
				form.resetFields()
			})
	}

	const deleteProperty = async (id) => {
		setDeletingPropertyIds(ids => [...ids, id])
		propertiesAPI.deleteProperty(id)
			.then(() => {
				setDeletingPropertyIds(ids => ids.filter(propId => propId !== id))
				setProperties(props => props.filter(prop => prop.id !== id))
			})
	}

	const changeProperty = async (propId, name, type) => {
		const propData = {}
		if (name) {
			propData.name = name
		}
		if (type) {
			propData.type = type
		}

		await propertiesAPI.changeProperty(propId, propData)
			.then(() => {
				setProperties(props => props.map(prop => {
					if (prop.id === propId) {
						return {...prop, ...propData}
					}
					return prop
				}))
			})
	}

	useEffect(() => {
		const getProperties = async () => {
			setProperties(await clustersAPI.getClusterProperties(id))
		}

		setLoading(true)
		getProperties()
			.finally(() => setLoading(false))
	}, [id])

	useEffect(() => {
		const getTypes = async () => {
			setLoadingTypes(true)
			const res = await propertiesAPI.getPropertyTypes()
			setTypes(res)
		}

		getTypes()
			.finally(() => setLoadingTypes(false))
	}, [])

	return (
		<Space direction="vertical" style={{width: 'calc((100vw - 300px) / 3)'}}>
			<Space direction="vertical" style={{padding: '12px 16px 0 16px', width: '100%'}}>
				<Text type="secondary">Описание:</Text>
				<ClusterDefinition id={id} definition={definition}/>
				<Text type="secondary">Свойства:</Text>
			</Space>
			{addingProperty ? (
				<CreatePropertyForm
					form={form}
					onFinish={addPropertyHandler}
					loading={creating}
					types={types}
					loadingTypes={loadingTypes}
				/>
			) : (
				<>
					<AddButton onClick={() => setAddingProperty(true)}/>
					{loading
						? <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
						: <Properties
							properties={properties}
							deletingIds={deletingPropertyIds}
							deleteProperty={deleteProperty}
							types={types}
							loadingTypes={loadingTypes}
							changeProperty={changeProperty}
						/>
					}
				</>
			)}
		</Space>
	)
}