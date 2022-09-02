import React from 'react'
import {Badge, Col, Collapse, Row, Space, Typography} from "antd";
import {getInputComponentByPropType, getPropValueByPropType} from "../../../../common/helpers";
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'


TimeAgo.addDefaultLocale(ru)
const timeAgo = new TimeAgo('ru-RU')
const {Panel} = Collapse

const ClustersList = ({clusters, isEdit, editableClusters, onPropChange}) => {
	const data = isEdit ? editableClusters : clusters

	return (
		<Space size='middle' direction='vertical' style={{width: '100%'}}>
			{data.map(cluster => (
				<Collapse key={cluster.id} defaultActiveKey={[cluster.nameCluster]}>
					<Panel key={cluster.id} header={cluster.nameCluster}>
						<Typography.Paragraph>
							{cluster.definition}
						</Typography.Paragraph>
						<Space size='large' direction='vertical' style={{width: '100%'}}>
							{cluster.properties.map(prop => {
								const InputComponent = getInputComponentByPropType(prop.typeofMp)
								const value = prop.propertyValueModels[getPropValueByPropType(prop.typeofMp)]
								const propValueId = prop.propertyValueModels.id
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
													onChange={value => onPropChange(cluster.id, prop.id, propValueId, value)}
													style={{minWidth: 500}}
													locale='ru_RU'
												/>
												: <Typography.Text type='secondary'>
													{!value ? '—' : prop.typeofMp === 'DATE'
														? timeAgo.format(new Date(value))
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