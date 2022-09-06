import React from 'react'
import {Collapse, Space, Typography} from "antd";
import {Property} from "./ClusterCard/Property/Property";


const {Panel} = Collapse

const ClustersList = ({clusters, isEdit, editableClusters, onPropChange}) => {
	const data = isEdit ? editableClusters : clusters

	return (
		<Space size='middle' direction='vertical' style={{width: '100%'}}>
			{data.map(cluster => (
				<Collapse key={cluster.id} defaultActiveKey={[cluster.id]}>
					<Panel key={cluster.id} header={cluster.name}>
						<Typography.Paragraph>{cluster.definition}</Typography.Paragraph>
						<Space size='large' direction='vertical' style={{width: '100%'}}>
							{cluster.properties.map(prop => (
								<Property
									prop={prop}
									isEdit={isEdit}
									onPropChange={onPropChange}
									clusterId={cluster.id}
								/>
							))}
						</Space>
					</Panel>
				</Collapse>
			))}
		</Space>
	)
}

export default ClustersList