import React from 'react'
import {Button, Col, Row, Space, Switch} from "antd";
import ComparisonPersons from "./ComparisonPersons/ComparisonPersons";


const ComparisonHeaderBlock = ({employees, onlyDifferent, setOnlyDifferent, removeFromCompareList}) => {
	return (
		<Row justify='space-between' align='middle' gutter={24}>
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
				<ComparisonPersons employees={employees} removeFromCompareList={removeFromCompareList}/>
			</Col>
			<Col flex='194px'>
				<Button type='primary' disabled={employees.length === 6}>Добавить сотрудника</Button>
			</Col>
		</Row>
	)
}

export default ComparisonHeaderBlock