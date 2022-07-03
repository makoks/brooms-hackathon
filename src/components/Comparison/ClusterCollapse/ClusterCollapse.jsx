import React from 'react'
import {Collapse} from "antd";

const {Panel} = Collapse

const ClusterCollapse = ({title, items, key}) => {
	return (
		<>
			{items.map(prop => (
				<Panel key={key} header={title}>
					{<ul>{prop.name} : {prop.value}</ul>}
				</Panel>
			))}
		</>
	)
}

export default ClusterCollapse