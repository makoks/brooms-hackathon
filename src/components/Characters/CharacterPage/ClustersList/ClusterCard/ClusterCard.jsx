import React from 'react'
import {Badge, Card, Col, Input, Row, Space, Typography} from "antd";


const ClusterCard = ({name, items, isEdit, changeClusterField}) => {
	return (
		<Card title={name}>
			<Space size='small' direction='vertical' style={{width: '100%'}}>
				{items.map(item => (
					<Row justify='space-between' key={item.name}>
						<Col><Badge color='blue' text={item.name}/></Col>
						<Col>
							{
								isEdit
									? <Input
										value={item.value}
										onChange={(e) => changeClusterField(name, item.name, e.target.value)}
									/>
									: <Typography.Text style={{color: 'rgba(0, 0, 0, 0.45)'}}>{item.value}</Typography.Text>
							}
						</Col>
					</Row>
				))}
			</Space>
		</Card>
	)
}

export default ClusterCard