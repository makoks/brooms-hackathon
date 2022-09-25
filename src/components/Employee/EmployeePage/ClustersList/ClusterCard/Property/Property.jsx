import React from 'react'
import {Badge, Col, Row, Typography} from "antd";
import {getPropValueByPropType, getValueViewByPropType} from "../../../../../../common/helpers";
import {InputComponent} from "./InputComponent";


export const Property = ({prop, onPropChange, isEdit}) => {
	const value = prop.value[getPropValueByPropType(prop.type)]

	return (
		<Row justify='space-between' align='middle' key={prop.id}>
			<Col>
				<Badge color='blue' text={prop.name}/>
			</Col>
			<Col>
				{isEdit
					? <InputComponent
						prop={prop}
						onChange={onPropChange}
						value={value}
					/>
					: <Typography.Text type='secondary'>
						{getValueViewByPropType(prop.type, value)}
					</Typography.Text>
				}
			</Col>
		</Row>
	)
}