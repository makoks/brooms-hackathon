import React from 'react'
import {Collapse, Space, Typography} from "antd";
import PropRow from "./PropRow/PropRow";


const ComparisonClusters = ({employees, clusters}) => {
	return (
		<Space size='middle' direction='vertical' style={{width: '100%'}}>
			{clusters.map(cluster => (
				cluster.props.length > 0
					? (
						<Collapse key={`${cluster.id}-collapse`} defaultActiveKey={[cluster.id]}>
							<Collapse.Panel key={cluster.id} header={cluster.title}>
								<Typography.Paragraph>{cluster.definition}</Typography.Paragraph>
								<Space size='middle' direction='vertical' style={{width: '100%'}}>
									{cluster.props.map(prop => (
										<PropRow prop={prop} employees={employees} key={prop.id}/>
									))}
								</Space>
							</Collapse.Panel>
						</Collapse>
					)
					: <></>
			))}
		</Space>
	)
}

export default ComparisonClusters