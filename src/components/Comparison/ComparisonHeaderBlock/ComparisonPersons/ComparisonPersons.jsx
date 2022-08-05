import React from 'react'
import {Col, Row, Space} from "antd";
import {getShortName} from "../../../../common/helpers";
import {CloseCircleTwoTone} from "@ant-design/icons";


const ComparisonPersons = ({persons}) => {
	return (
		<Row gutter={24} justify='space-around'>
			{persons.map(person => (
				<Col key={person.id}>
					<Space direction='vertical' align='center' key={person.id}>
						<CloseCircleTwoTone twoToneColor='#FFA39E' style={{fontSize: 27}}/>
						<span>{getShortName(person)}</span>
					</Space>
				</Col>
			))}
		</Row>
	)
}

export default ComparisonPersons