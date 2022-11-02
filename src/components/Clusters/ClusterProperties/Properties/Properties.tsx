import React from 'react'
import {Space} from "antd";
import {Property} from "./Property";
import {PropertyData, PropertyType, PropertyTypeObj} from "../../types";
import {Id} from "../../../../API/types";


type PropertiesProps = {
    properties: PropertyData[];
    deleteProperty: (id: Id) => Promise<void>;
    deletingIds: Id[];
    types: PropertyTypeObj[];
    changeProperty: (propId: Id, name?: string, type?: PropertyType) => Promise<void>;
};

export const Properties: React.FC<PropertiesProps> = ({
                                                          properties,
                                                          deleteProperty,
                                                          deletingIds,
                                                          types,
                                                          changeProperty
                                                      }) => {
    return (
        <Space direction="vertical" size='middle' style={{width: '100%', padding: '12px 0 12px 16px'}}>
            {properties.map(property => (
                <Property
                    key={property.id}
                    property={property}
                    deleteProperty={() => deleteProperty(property.id)}
                    deleting={deletingIds.includes(property.id)}
                    types={types}
                    changeProperty={changeProperty}
                />
            ))}
        </Space>
    )
}