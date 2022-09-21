import React from 'react'
import {Space} from "antd";
import {Property} from "./Property";


export const Properties = ({properties, deleteProperty, deletingIds, types, loadingTypes, changeProperty}) => {
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