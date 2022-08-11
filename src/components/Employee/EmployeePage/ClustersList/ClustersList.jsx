import React from 'react'
import {Badge, Col, Collapse, Input, Row, Space, Typography} from "antd";

const {Panel} = Collapse

const ClustersList = ({clusters, isEdit, editableClusters, onPropChange}) => {
	const data = isEdit ? editableClusters : clusters

	return (
		<Space size='middle' direction='vertical' style={{width: '100%'}}>
			{data.map(cluster => (
				<Collapse key={cluster.id} defaultActiveKey={[cluster.id]}>
					<Panel key={cluster.id} header={cluster.title}>
						<Space size='large' direction='vertical' style={{width: '100%'}}>
							{cluster.properties.map(prop => (
								<Row justify='space-between' align='middle' key={prop.title}>
									<Col>
										<Badge color='blue' text={prop.title}/>
									</Col>
									<Col>
										{isEdit
											? <Input
												size='small'
												value={prop.value}
												onChange={e => onPropChange(cluster.title, prop.title, e.target.value)}
												style={{minWidth: 500}}
											/>
											: <Typography.Text type='secondary'>{prop.value ?? '—'}</Typography.Text>
										}
									</Col>
								</Row>
							))}
						</Space>
					</Panel>
				</Collapse>
			))}
		</Space>
	)
}

export default ClustersList