import React from 'react'
import {Collapse} from "antd";

const {Panel} = Collapse

const ClusterCollapse = ({properties}) => {
	return (
		<Collapse>
			{properties.map(prop => (
				<Panel key={prop.key} header={prop.title}>
					{prop.children.toString()}
				</Panel>
			))}
		</Collapse>
	)
}

export default ClusterCollapse