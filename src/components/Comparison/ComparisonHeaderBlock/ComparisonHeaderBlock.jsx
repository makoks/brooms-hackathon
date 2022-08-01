import React from 'react'
import {Button, Col, Row, Space, Switch} from "antd";
import ComparisonPersons from "./ComparisonPersons/ComparisonPersons";


const ComparisonHeaderBlock = ({persons}) => {
	return (
		<Row justify='space-between' align='middle' style={{marginTop: 25}}>
			<Col>
				<Space size='small'>
					Только различия:
					<Switch checkedChildren="вкл" unCheckedChildren="выкл"/>
				</Space>
			</Col>
			<Col>
				<ComparisonPersons persons={persons}/>
			</Col>
			<Col>
				<Button type='primary' disabled={persons.length === 6}>Добавить сотрудника</Button>
			</Col>
		</Row>
	)
}

export default ComparisonHeaderBlock