import React from 'react'
import {Space} from "antd";
import {Property} from "./Property";
import {PropertyData, PropertyType, PropertyTypeObj} from "../../types";


type PropertiesProps = {
    properties: PropertyData[];
    deleteProperty: (id: string) => Promise<void>;
    deletingIds: string[];
    types: PropertyTypeObj[];
    loadingTypes: boolean;
    changeProperty: (propId: string, name?: string, type?: PropertyType) => Promise<void>;
};

export const Properties: React.FC<PropertiesProps> = ({
                                                          properties,
                                                          deleteProperty,
                                                          deletingIds,
                                                          types,
                                                          loadingTypes,
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
                    loadingTypes={loadingTypes}
                    changeProperty={changeProperty}
                />
            ))}
        </Space>
    )
}