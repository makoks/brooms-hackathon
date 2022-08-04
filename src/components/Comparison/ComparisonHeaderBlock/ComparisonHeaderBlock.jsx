import React from 'react'
import {Button, Col, Row, Space, Switch} from "antd";
import ComparisonPersons from "./ComparisonPersons/ComparisonPersons";


const ComparisonHeaderBlock = ({persons, onlyDifferent, setOnlyDifferent}) => {
	return (
		<Row justify='space-between' align='middle' gutter={24} style={{marginTop: 25}}>
			<Col flex='224px'>
				<Space size='small'>
					Только различия:
					<Switch
						checkedChildren="вкл"
						unCheckedChildren="выкл"
						checked={onlyDifferent}
						onChange={setOnlyDifferent}
					/>
				</Space>
			</Col>
			<Col flex='auto'>
				<ComparisonPersons persons={persons}/>
			</Col>
			<Col flex='194px'>
				<Button type='primary' disabled={persons.length === 6}>Добавить сотрудника</Button>
			</Col>
		</Row>
	)
}

export default ComparisonHeaderBlock