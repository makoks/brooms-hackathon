import React from 'react'
import {Badge, Col, Collapse, Row, Space, Typography} from "antd";
import {getInputComponentByPropType, getPropValueByPropType} from "../../../../common/helpers";

const {Panel} = Collapse

const ClustersList = ({clusters, isEdit, editableClusters, onPropChange}) => {
	const data = isEdit ? editableClusters : clusters

	return (
		<Space size='middle' direction='vertical' style={{width: '100%'}}>
			{data.map(cluster => (
				<Collapse key={cluster.nameCluster} defaultActiveKey={[cluster.nameCluster]}>
					<Panel key={cluster.nameCluster} header={cluster.nameCluster}>
						<Typography.Paragraph>
							{cluster.definition}
						</Typography.Paragraph>
						<Space size='large' direction='vertical' style={{width: '100%'}}>
							{cluster.properties.map(prop => {
								const InputComponent = getInputComponentByPropType(prop.typeofMp)
								const value = prop.propertyValueModels[getPropValueByPropType(prop.typeofMp)]
								return (
									<Row justify='space-between' align='middle' key={prop.id}>
										<Col>
											<Badge color='blue' text={prop.nameProp}/>
										</Col>
										<Col>
											{isEdit
												? <InputComponent
													size='small'
													value={value}
													onChange={value => onPropChange(cluster.nameCluster, prop.id, value)}
													style={{minWidth: 500}}
												/>
												: <Typography.Text type='secondary'>
													{!value ? '—' : prop.typeofMp === 'Date'
														? value._d.toLocaleDateString('ru-RU')
														: value
													}
												</Typography.Text>
											}
										</Col>
									</Row>
								)
							})}
						</Space>
					</Panel>
				</Collapse>
			))}
		</Space>
	)
}

export default ClustersList