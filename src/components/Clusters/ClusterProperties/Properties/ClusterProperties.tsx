import React, { useEffect, useState } from 'react'
import { Button, Form, message, Space, Typography } from "antd";
import { clustersAPI, propertiesAPI } from "../../../../API/API";
import { ClusterDefinition } from "../../ClusterInfo/ClusterDefinition";
import { AddButton } from "../../../common/AddButton";
import { CreatePropertyForm } from "../CreatePropertyForm";
import { Loader } from "../../../common/Loader";
import { Properties } from "./Properties";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import '../style.css';
import { NewPropertyData, PropertyData, PropertyType, PropertyTypeObj } from "../../types";
import { Id } from "../../../../API/types";

const PROPS: PropertyData[] = JSON.parse(JSON.stringify({
    "name": "Данные сотрудника",
    "definition": "Данные сотрудника",
    "_embedded": {
        "properties": [{
            "name": "Грейд",
            "id": 1,
            "type": "NUMBER",
            "_links": {
                "cluster": {
                    "href": "https://brooms.herokuapp.com/property/1/cluster{?projection}",
                    "templated": true
                },
                "definitions": {
                    "href": "https://brooms.herokuapp.com/property/1/definitions{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/property/1/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/property/1{?projection}",
                    "templated": true
                }
            }
        }, {
            "name": "Уровень",
            "id": 2,
            "type": "ENUM",
            "_links": {
                "cluster": {
                    "href": "https://brooms.herokuapp.com/property/2/cluster{?projection}",
                    "templated": true
                },
                "definitions": {
                    "href": "https://brooms.herokuapp.com/property/2/definitions{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/property/2/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/property/2{?projection}",
                    "templated": true
                }
            }
        }, {
            "name": "Проект",
            "id": 3,
            "type": "STRING",
            "_links": {
                "cluster": {
                    "href": "https://brooms.herokuapp.com/property/3/cluster{?projection}",
                    "templated": true
                },
                "definitions": {
                    "href": "https://brooms.herokuapp.com/property/3/definitions{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/property/3/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/property/3{?projection}",
                    "templated": true
                }
            }
        }]
    },
    "_links": {
        "self": {
            "href": "https://brooms.herokuapp.com/cluster/1"
        },
        "cluster": {
            "href": "https://brooms.herokuapp.com/cluster/1{?projection}",
            "templated": true
        },
        "properties": {
            "href": "https://brooms.herokuapp.com/cluster/1/properties{?projection}",
            "templated": true
        }
    }
}))._embedded.properties;

const PROPS_TYPES: PropertyTypeObj[] = JSON.parse(JSON.stringify([{
    "type": "NUMBER",
    "title": "Число"
}, {
    "type": "STRING",
    "title": "Строка"
}, {
    "type": "DATE",
    "title": "Дата"
}, {
    "type": "ENUM",
    "title": "Список"
}]))

const { Text } = Typography

type ClusterPropertiesProps = {
    id: Id;
    definition?: string;
    propertyTypes: PropertyTypeObj[];
}

export const ClusterProperties: React.FC<ClusterPropertiesProps> = ({ id, definition, propertyTypes }) => {
    const [addingProperty, setAddingProperty] = useState(false)
    const [properties, setProperties] = useState<PropertyData[]>(PROPS)
    const [deletingPropertyIds, setDeletingPropertyIds] = useState<Id[]>([])
    const [creating, setCreating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const addPropertyHandler = async (propertyData: NewPropertyData) => {
        setCreating(true)
        await clustersAPI.addProperty(id, propertyData)
            .then(({ data: { id } }) => {
                setProperties(p => [...p, { ...propertyData, id }])
                setAddingProperty(false)
                setCreating(false)
                form.resetFields()
            })
            .catch(() => message.error('Не удалось добавить свойство :('))
    }

    const deleteProperty = async (id: Id) => {
        setDeletingPropertyIds(ids => [...ids, id])
        propertiesAPI.deleteProperty(id)
            .then(() => {
                setDeletingPropertyIds(ids => ids.filter(propId => propId !== id))
                setProperties(props => props.filter(prop => prop.id !== id))
            })
            .catch(() => message.error('Не удалось удалить свойство :('))
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
                        return { ...prop, ...propData }
                    }
                    return prop
                }))
            })
            .catch(() => message.error('Не удалось изменить свойство :('))
    }

    useEffect(() => {
        setLoading(true)
        clustersAPI.getClusterProperties(id)
            .then((data) => setProperties(data))
            .catch(() => message.error('Не удалось получить список свойств :('))
            .finally(() => setLoading(false))
    }, [id])

    return (
        <Space direction="vertical" style={{ width: 'calc((100vw - 300px) / 3)' }}>
            <div className='header'>
                <Space direction='vertical' size='middle' style={{ width: '100%' }}>
                    <Text type="secondary" style={{ fontWeight: 'bold' }}>Описание:</Text>
                    <ClusterDefinition id={id} definition={definition} />
                </Space>
                <Button
                    icon={<EyeInvisibleOutlined style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                    className='visible-button'
                    disabled
                />
            </div>
            {addingProperty ? (
                <CreatePropertyForm
                    form={form}
                    onFinish={addPropertyHandler}
                    loading={creating}
                    types={propertyTypes}
                />
            ) : (
                <>
                    <AddButton onClick={() => setAddingProperty(true)} />
                    {loading
                        ? <div style={{ display: 'flex', justifyContent: 'center' }}><Loader /></div>
                        : <Properties
                            properties={PROPS}
                            deletingIds={deletingPropertyIds}
                            deleteProperty={deleteProperty}
                            types={PROPS_TYPES}
                            changeProperty={changeProperty}
                        />
                    }
                </>
            )}
        </Space>
    )
}