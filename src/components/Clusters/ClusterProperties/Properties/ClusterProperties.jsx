import React, {useEffect, useState} from 'react'
import {Button, Form, Space, Typography} from "antd";
import {clustersAPI, propertiesAPI} from "../../../../API/API";
import {ClusterDefinition} from "../../ClusterInfo/ClusterDefinition";
import {AddButton} from "../../../common/AddButton";
import {CreatePropertyForm} from "../CreatePropertyForm";
import {Loader} from "../../../common/Loader";
import {Properties} from "./Properties";
import {EyeInvisibleOutlined} from "@ant-design/icons";


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
			<div className='header'>
				<Space direction='vertical' size='small'>
					<Text type="secondary" style={{fontWeight: 'bold'}}>Описание:</Text>
					<ClusterDefinition id={id} definition={definition}/>
				</Space>
				<Button
					icon={<EyeInvisibleOutlined style={{color: 'rgba(0, 0, 0, 0.5)'}}/>}
					className='visible-button'
					disabled
				/>
			</div>
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