import React, {useEffect, useState} from 'react'
import {Button, Form, Space, Typography} from "antd";
import {clustersAPI, propertiesAPI} from "../../../../API/API";
import {ClusterDefinition} from "../../ClusterInfo/ClusterDefinition";
import {AddButton} from "../../../common/AddButton";
import {CreatePropertyForm} from "../CreatePropertyForm";
import {Loader} from "../../../common/Loader";
import {Properties} from "./Properties";
import {EyeInvisibleOutlined} from "@ant-design/icons";
import '../style.css';
import {NewPropertyData, PropertyData, PropertyType, PropertyTypeObj} from "../../types";
import {Id} from "../../../../API/types";


const {Text} = Typography

type ClusterPropertiesProps = {
    id: Id;
    definition?: string;
    propTypes: PropertyTypeObj[];
}

export const ClusterProperties: React.FC<ClusterPropertiesProps> = ({id, definition, propTypes}) => {
    const [addingProperty, setAddingProperty] = useState(false)
    const [properties, setProperties] = useState<PropertyData[]>([])
    const [deletingPropertyIds, setDeletingPropertyIds] = useState<Id[]>([])
    const [creating, setCreating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const addPropertyHandler = async (propertyData: NewPropertyData) => {
        setCreating(true)
        await clustersAPI.addProperty(id, propertyData)
            .then(({data: {id}}) => {
                setProperties(p => [...p, {...propertyData, id}])
                setAddingProperty(false)
                setCreating(false)
                form.resetFields()
            })
    }

    const deleteProperty = async (id: Id) => {
        setDeletingPropertyIds(ids => [...ids, id])
        propertiesAPI.deleteProperty(id)
            .then(() => {
                setDeletingPropertyIds(ids => ids.filter(propId => propId !== id))
                setProperties(props => props.filter(prop => prop.id !== id))
            })
    }

    const changeProperty = async (propId: Id, name?: string, type?: PropertyType) => {
        const propData: NewPropertyData = {}
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

    return (
        <Space direction="vertical" style={{width: 'calc((100vw - 300px) / 3)'}}>
            <div className='header'>
                <Space direction='vertical' size='middle' style={{width: '100%'}}>
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
                    types={propTypes}
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
                            types={propTypes}
                            changeProperty={changeProperty}
                        />
                    }
                </>
            )}
        </Space>
    )
}